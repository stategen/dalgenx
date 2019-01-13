/**
 *  Do not remove this unless you get business authorization.
 *  User_me
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {user_meInitModel, User_meModel, User_meState} from "../interfaces/User_meFaces";
import User_meApis from "../apis/User_meApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import RoleType from "../enums/RoleType";
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";


export class User_meCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};

    /**  */
    const getCurrentUserPayload = yield User_meCommand.getCurrentUser_effect({payload}, {call, put, select});
    newPayload = User_meCommand.getCurrentUser_success_reducer(<User_meState>newPayload, getCurrentUserPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /**  */
  static * getCurrentUser_effect({payload}, {call, put, select}) {
    const user: User = yield call(User_meApis.getCurrentUser, payload);

    const newPayload: User_meState = {
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
  static getCurrentUser_success_reducer = (state: User_meState, payload): User_meState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 修改用户 */
  static * update_effect({payload}, {call, put, select}) {
    const user: User = yield call(User_meApis.update, payload);
    const oldUserArea = yield select((_) => _.user_me.userArea);
    const users = updateArray(oldUserArea.list, user ? user : null, "userId");

    const newPayload: User_meState = {
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
  static update_success_reducer = (state: User_meState, payload): User_meState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const user_meModel: User_meModel = user_meInitModel;

user_meModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(user_meModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getCurrentUserParams = user_meModel.getCurrentUserInitParamsFn ? user_meModel.getCurrentUserInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, ...getCurrentUserParams}
    dispatch({
      type: 'user_me/setup',
      payload,
    })
  })
};

user_meModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, user_meModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (user_meModel.getInitState) {
    const initState = user_meModel.getInitState();
    yield put(User_meCommand.updateState_type(initState));
  }

  const newPayload = yield User_meCommand.setup_effect({payload}, {call, put, select});
  yield put(User_meCommand.setup_success_type(newPayload));
};

user_meModel.reducers.setup_success = (state: User_meState, {payload}): User_meState => {
  return mergeObjects(
    state,
    payload,
  );
};

/**  */
user_meModel.effects.getCurrentUser = function* ({payload}, {call, put, select}) {
  const newPayload = yield User_meCommand.getCurrentUser_effect({payload}, {call, put, select});
  yield put(User_meCommand.getCurrentUser_success_type(newPayload));
};

user_meModel.reducers.getCurrentUser_success = (state: User_meState, {payload}): User_meState => {
  return User_meCommand.getCurrentUser_success_reducer(state, payload);
};

/** 修改用户 */
user_meModel.effects.update = function* ({payload}, {call, put, select}) {
  const newPayload = yield User_meCommand.update_effect({payload}, {call, put, select});
  yield put(User_meCommand.update_success_type(newPayload));
};

user_meModel.reducers.update_success = (state: User_meState, {payload}): User_meState => {
  return User_meCommand.update_success_reducer(state, payload);
};
