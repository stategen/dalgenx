/**
 *  Do not remove this unless you get business authorization.
 *  User_detail_$username
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {user_detail_$usernameInitModel, User_detail_$usernameModel, User_detail_$usernameState} from "../interfaces/User_detail_$usernameFaces";
import User_detail_$usernameApis from "../apis/User_detail_$usernameApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import RoleType from "../enums/RoleType";
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";


export class User_detail_$usernameCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};
    const {getCurrentUserParams = null, getUserDataParams = null, ...lastParams} = payload || {};

    /**  */
    const getCurrentUserPayload = yield User_detail_$usernameCommand.getCurrentUser_effect({payload: {...lastParams, ...getCurrentUserParams}}, {call, put, select});
    newPayload = User_detail_$usernameCommand.getCurrentUser_success_reducer(<User_detail_$usernameState>newPayload, getCurrentUserPayload);
    /**  */
    const getUserDataPayload = yield User_detail_$usernameCommand.getUserData_effect({payload: {...lastParams, ...getUserDataParams}}, {call, put, select});
    newPayload = User_detail_$usernameCommand.getUserData_success_reducer(<User_detail_$usernameState>newPayload, getUserDataPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /**  */
  static * getCurrentUser_effect({payload}, {call, put, select}) {
    const user: User = yield call(User_detail_$usernameApis.getCurrentUser, payload);

    const newPayload: User_detail_$usernameState = {
      userArea: {
        list: user ? [user] : [],
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getCurrentUser_success_type(payload) {
    return {type: "getCurrentUser_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static getCurrentUser_success_reducer = (state: User_detail_$usernameState, payload): User_detail_$usernameState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * getUserData_effect({payload}, {call, put, select}) {
    const user: User = yield call(User_detail_$usernameApis.getUserData, payload);

    const newPayload: User_detail_$usernameState = {
      userArea: {
        list: user ? [user] : [],
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getUserData_success_type(payload) {
    return {type: "getUserData_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static getUserData_success_reducer = (state: User_detail_$usernameState, payload): User_detail_$usernameState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 修改用户 */
  static * update_effect({payload}, {call, put, select}) {
    const user: User = yield call(User_detail_$usernameApis.update, payload);
    const oldUserArea = yield select((_) => _.user_detail_$username.userArea);
    const users = updateArray(oldUserArea.list, user ? user : null, "userId");

    const newPayload: User_detail_$usernameState = {
      userArea: {
        list: users,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static update_success_type(payload) {
    return {type: "update_success", payload: payload};
  }

  /** 修改用户  成功后 更新状态*/
  static update_success_reducer = (state: User_detail_$usernameState, payload): User_detail_$usernameState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const user_detail_$usernameModel: User_detail_$usernameModel = user_detail_$usernameInitModel;

user_detail_$usernameModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(user_detail_$usernameModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getCurrentUserParams = user_detail_$usernameModel.getCurrentUserInitParamsFn ? user_detail_$usernameModel.getCurrentUserInitParamsFn({pathname, match, keys}) : null;
    const getUserDataParams = user_detail_$usernameModel.getUserDataInitParamsFn ? user_detail_$usernameModel.getUserDataInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, getCurrentUserParams, getUserDataParams}
    dispatch({
      type: 'user_detail_$username/setup',
      payload,
    })
  })
};
user_detail_$usernameModel.getCurrentUserInitParamsFn = RouteUtil.getParams;
user_detail_$usernameModel.getUserDataInitParamsFn = RouteUtil.getParams;

user_detail_$usernameModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, user_detail_$usernameModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (user_detail_$usernameModel.getInitState) {
    const initState = user_detail_$usernameModel.getInitState();
    yield put(User_detail_$usernameCommand.updateState_type(initState));
  }

  const newPayload = yield User_detail_$usernameCommand.setup_effect({payload}, {call, put, select});
  yield put(User_detail_$usernameCommand.setup_success_type(newPayload));
};

user_detail_$usernameModel.reducers.setup_success = (state: User_detail_$usernameState, {payload}): User_detail_$usernameState => {
  return mergeObjects(
    state,
    payload,
  );
};

/**  */
user_detail_$usernameModel.effects.getCurrentUser = function* ({payload}, {call, put, select}) {
  const newPayload = yield User_detail_$usernameCommand.getCurrentUser_effect({payload}, {call, put, select});
  yield put(User_detail_$usernameCommand.getCurrentUser_success_type(newPayload));
};

user_detail_$usernameModel.reducers.getCurrentUser_success = (state: User_detail_$usernameState, {payload}): User_detail_$usernameState => {
  return User_detail_$usernameCommand.getCurrentUser_success_reducer(state, payload);
};

/**  */
user_detail_$usernameModel.effects.getUserData = function* ({payload}, {call, put, select}) {
  const newPayload = yield User_detail_$usernameCommand.getUserData_effect({payload}, {call, put, select});
  yield put(User_detail_$usernameCommand.getUserData_success_type(newPayload));
};

user_detail_$usernameModel.reducers.getUserData_success = (state: User_detail_$usernameState, {payload}): User_detail_$usernameState => {
  return User_detail_$usernameCommand.getUserData_success_reducer(state, payload);
};

/** 修改用户 */
user_detail_$usernameModel.effects.update = function* ({payload}, {call, put, select}) {
  const newPayload = yield User_detail_$usernameCommand.update_effect({payload}, {call, put, select});
  yield put(User_detail_$usernameCommand.update_success_type(newPayload));
};

user_detail_$usernameModel.reducers.update_success = (state: User_detail_$usernameState, {payload}): User_detail_$usernameState => {
  return User_detail_$usernameCommand.update_success_reducer(state, payload);
};
