/**
 *  Do not remove this unless you get business authorization.
 *  App
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {appInitModel, AppModel, AppState} from "../interfaces/AppFaces";
import AppApis from "../apis/AppApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import City from "../beans/City";
import Hoppy from "../beans/Hoppy";
import Menu from "../beans/Menu";
import Province from "../beans/Province";
import Region from "../beans/Region";
import SimpleResponse from "../beans/SimpleResponse";
import User from "../beans/User";


export class AppCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};
    const {getAllMenusParams = null, getCookieUserParams = null, ...lastParams} = payload || {};

    /** 获所所有菜单 */
    const getAllMenusPayload = yield AppCommand.getAllMenus_effect({payload: {...lastParams, ...getAllMenusParams}}, {call, put, select});
    newPayload = AppCommand.getAllMenus_success_reducer(<AppState>newPayload, getAllMenusPayload);
    /**  */
    const getCookieUserPayload = yield AppCommand.getCookieUser_effect({payload: {...lastParams, ...getCookieUserParams}}, {call, put, select});
    newPayload = AppCommand.getCookieUser_success_reducer(<AppState>newPayload, getCookieUserPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /** 获所所有菜单 */
  static * getAllMenus_effect({payload}, {call, put, select}) {
    const menus: Menu[] = yield call(AppApis.getAllMenus, payload);

    const newPayload: AppState = {
      menuArea: {
        list: menus ? menus : [],
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getAllMenus_success_type(payload) {
    return {type: "getAllMenus_success", payload: payload};
  }

  /** 获所所有菜单  成功后 更新状态*/
  static getAllMenus_success_reducer = (state: AppState, payload): AppState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * getCookieUser_effect({payload}, {call, put, select}) {
    const user: User = yield call(AppApis.getCookieUser, payload);

    const newPayload: AppState = {
      userArea: {
        list: user ? [user] : [],
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getCookieUser_success_type(payload) {
    return {type: "getCookieUser_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static getCookieUser_success_reducer = (state: AppState, payload): AppState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * logout_effect({payload}, {call, put, select}) {
    const simpleResponse: SimpleResponse = yield call(AppApis.logout, payload);
    if (simpleResponse && !simpleResponse.success) {
      throw simpleResponse.message;
    }

    const newPayload: AppState = {
      userArea: {
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static logout_success_type(payload) {
    return {type: "logout_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static logout_success_reducer = (state: AppState, payload): AppState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const appModel: AppModel = appInitModel;

appModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(appModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getAllMenusParams = appModel.getAllMenusInitParamsFn ? appModel.getAllMenusInitParamsFn({pathname, match, keys}) : null;
    const getCookieUserParams = appModel.getCookieUserInitParamsFn ? appModel.getCookieUserInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, getAllMenusParams, getCookieUserParams}
    dispatch({
      type: 'app/setup',
      payload,
    })
  })
};

appModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, appModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (appModel.getInitState) {
    const initState = appModel.getInitState();
    yield put(AppCommand.updateState_type(initState));
  }

  const newPayload = yield AppCommand.setup_effect({payload}, {call, put, select});
  yield put(AppCommand.setup_success_type(newPayload));
};

appModel.reducers.setup_success = (state: AppState, {payload}): AppState => {
  return mergeObjects(
    state,
    payload,
  );
};

/** 获所所有菜单 */
appModel.effects.getAllMenus = function* ({payload}, {call, put, select}) {
  const newPayload = yield AppCommand.getAllMenus_effect({payload}, {call, put, select});
  yield put(AppCommand.getAllMenus_success_type(newPayload));
};

appModel.reducers.getAllMenus_success = (state: AppState, {payload}): AppState => {
  return AppCommand.getAllMenus_success_reducer(state, payload);
};

/**  */
appModel.effects.getCookieUser = function* ({payload}, {call, put, select}) {
  const newPayload = yield AppCommand.getCookieUser_effect({payload}, {call, put, select});
  yield put(AppCommand.getCookieUser_success_type(newPayload));
};

appModel.reducers.getCookieUser_success = (state: AppState, {payload}): AppState => {
  return AppCommand.getCookieUser_success_reducer(state, payload);
};

/**  */
appModel.effects.logout = function* ({payload}, {call, put, select}) {
  const newPayload = yield AppCommand.logout_effect({payload}, {call, put, select});
  yield put(AppCommand.logout_success_type(newPayload));
};

appModel.reducers.logout_success = (state: AppState, {payload}): AppState => {
  return AppCommand.logout_success_reducer(state, payload);
};
