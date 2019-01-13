import {AppDispatch, appEffects, appInitModel, AppModel, appReducers, AppState} from "@i/interfaces/AppFaces";

import {routerRedux} from 'dva/router'
import {parse} from 'qs'
import config from '@utils/config'
import queryString from 'query-string'
import RoleType from "@i/enums/RoleType"
import SimpleResponse from "@i/beans/SimpleResponse";
import AppApis from '@i/apis/AppApis';
import {loginInitModel} from "@i/interfaces/LoginFaces";
import Menu from "@i/beans/Menu";
import {BaseState, mergeObjects} from "@utils/DvaUtil";
import {AppCommand, appModel} from "@i/models/AppModel";
import {appCustomState, Permission} from "@pages/app/AppCustomFaces";
import RouteUtil from "@utils/RouteUtil";
import MenuUtil from "@utils/MenuUtil";
import {homeInitModel} from "@i/interfaces/HomeFaces";

const {prefix} = config;


appModel.subscriptions.setupHistory = ({dispatch, history}) => {
  history.listen((location) => {
    dispatch({
      type: appReducers.updateState,
      payload: {
        locationPathname: location.pathname,
        locationQuery: location.query,
      },
    })
  })
};

appModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((location) => {
    const pathname = location.pathname;
    dispatch({
      type: appEffects.appendRoute,
      payload: pathname,
    })
  });

  dispatch(AppDispatch.setup_effect())
  let tid
  window.onresize = () => {
    clearTimeout(tid)
    tid = setTimeout(() => {
      dispatch({type: appEffects.changeNavbar})
    }, 300)
  }
};


appModel.effects.setup = function* ({payload,}, {call, put, select}) {
  const appState:AppState= yield AppCommand.setup_effect({payload}, {call, put, select});
  // const user: User = yield call(AppApis.getCookieUser);
  const user = appState.userArea.list[0];

  const locationPathname = yield select(_=>_.app.locationPathname)//appState.locationPathname;
  if (!user) {
    if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
      yield put(routerRedux.push({
        pathname: loginInitModel.pathname,
        search: queryString.stringify({
          from: locationPathname,
        }),
      }))
    }
    return;
  }

  // let menus: Menu[] = yield call(AppApis.getAllMenus,{});
  let menus = appState.menuArea.list;
  const homeMenu = MenuUtil.filterMenuByPathname(homeInitModel.pathname, menus);

  const permission = <Permission> {};

  if (user.roleType === RoleType.ADMIN || user.roleType === RoleType.DEVELOPER) {
    permission.visit = menus.map((menu: Menu) => menu.menuId)
  } else {
    menus = menus.filter((menu: Menu) => {
      return (homeMenu === menu)
        || (permission.visit.includes(menu.menuId))
        || (menu.mpid ? permission.visit.includes(menu.mpid) || menu.mpid == -1 : true)
        || (menu.bpid ? permission.visit.includes(menu.bpid) : true);
    })
  }

  yield put({
    type: appReducers.updateState,
    payload: <AppState>{
      ...appState,
      routeOrders: {
        [homeMenu.route]: 1,
      },
      permission,
      homeMenu,
      menuArea: {
        list: menus
      }
    },
  })

  if (location.pathname === loginInitModel.pathname) {
    yield put(routerRedux.push({
      pathname: homeInitModel.pathname,
    }))
  }
};

appModel.effects.appendRoute = function* ({payload}, {call, put, select}) {
  const appState: AppState = yield select(_ => _.app);
  const route = payload;
  const order = RouteUtil.checkNotExistAndGetNextOrder(appState.routeOrders, route);
  if (order) {
    yield put({
      type: appReducers.updateState,
      payload: <AppState>{
        routeOrders: {
          [route]: order,
        }
      }
    })
  }
}

appModel.reducers.removeRoute = (state: AppState, {payload}) => {
  const routeOrders = state.routeOrders;
  if (routeOrders[payload]) {
    delete routeOrders[payload];
    return {
      ...state,
      routeOrders,
    }
  }
  return state;
}

appModel.effects.logout = function* ({payload,}, {call, put, select}) {
  const simpleResponse: SimpleResponse = yield call(AppApis.logout, parse(payload))
  if (simpleResponse.success) {
    const homeMenu = yield select(_ => _.app.homeMenu);
    yield put({
      type: appReducers.updateState,
      payload: <AppState>{
        userArea: {
          list: [],
        },
        permission: {visit: []},
        menuArea: {
          list: [homeMenu],
        }
      }
    })
    yield put({type: appEffects.setup})
  } else {
    throw (simpleResponse.message)
  }
};

appModel.effects.changeNavbar = function* (action, {put, select}) {
  const {app} = yield (select(_ => _))
  const isNavbar = document.body.clientWidth < 769
  if (isNavbar !== app.isNavbar) {
    yield put({type: appReducers.handleNavbar, payload: isNavbar})
  }
};

appModel.reducers.switchSider = (state) => {
  window.localStorage.setItem(prefix+'siderFold', JSON.stringify(!state.siderFold))
  return {
    ...state,
    siderFold: !state.siderFold,
  }
};

appModel.reducers.switchTheme = (state) => {
  window.localStorage.setItem(prefix+'darkTheme', JSON.stringify(!state.darkTheme))
  return {
    ...state,
    darkTheme: !state.darkTheme,
  }
};

appModel.reducers.switchMenuPopver = (state) => {
  return {
    ...state,
    menuPopoverVisible: !state.menuPopoverVisible,
  }
};

appModel.reducers.handleNavbar = (state, {payload}) => {
  return {
    ...state,
    isNavbar: payload,
  }
};

appModel.reducers.handleNavOpenKeys = (state, {payload: navOpenKeys}) => {
  return {
    ...state,
    ...navOpenKeys,
  }
};

//不用 default,在layouts中，以更作为默认model
export const appDefaultModel =appModel;
