/**
 *  Do not remove this unless you get business authorization.
 *  App
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {routerRedux} from 'dva/router'
import {mergeObjects} from "@utils/DvaUtil";
import {AppCommand, appModel} from "@i/models/AppModel";
import {AppDispatch, appEffects, AppModel, appReducers, AppState} from "@i/interfaces/AppFaces";
import AppApis from "@i/apis/AppApis";
import {appCustomState} from './AppCustomFaces';
import SimpleResponse from "@i/beans/SimpleResponse";
import queryString from 'query-string'
import config from "@utils/config";
import {loginInitModel} from "@i/interfaces/LoginFaces";
import RouteUtil from "@utils/RouteUtil";
import {parse} from 'qs'
import {homeInitModel} from "@i/interfaces/HomeFaces";


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
};


appModel.effects.setup = function* ({payload,}, {call, put, select}) {
  const appState:AppState= yield AppCommand.setup_effect({payload}, {call, put, select});
  const user = appState.userArea.list[0];

  const locationPathname = yield select(_=>_.app.locationPathname)
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

  yield put({
    type: appReducers.updateState,
    payload: <AppState>{
      ...appState,
      routeOrders: {
        [homeInitModel.namespace]: 1,
      },
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
    yield put({
      type: appReducers.updateState,
      payload: <AppState>{
        userArea: {
          list: [],
        },
      }
    })
    yield put({type: appEffects.setup})
  } else {
    throw (simpleResponse.message)
  }
};

//不用 default,在layouts中，以更作为默认model
export const appDefaultModel =appModel;