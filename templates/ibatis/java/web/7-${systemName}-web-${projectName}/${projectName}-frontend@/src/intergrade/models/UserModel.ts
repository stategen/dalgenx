/**
 *  Do not remove this unless you get business authorization.
 *  User
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {userInitModel, UserModel, UserState} from "../interfaces/UserFaces";
import UserApis from "../apis/UserApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";


export class UserCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};

    /** 用户列表 */
    const getUserPageListPayload = yield UserCommand.getUserPageList_effect({payload}, {call, put, select});
    newPayload = UserCommand.getUserPageList_success_reducer(<UserState>newPayload, getUserPageListPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /** 删除用户 */
  static * delete_effect({payload}, {call, put, select}) {
    const result: string = yield call(UserApis.delete, payload);
    const oldUserArea = yield select((_) => _.user.userArea);
    const users = delateArray(oldUserArea.list, result ? result : null, "userId");

    const newPayload: UserState = {
      userArea: {
        list: users,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static delete_success_type(payload) {
    return {type: "delete_success", payload: payload};
  }

  /** 删除用户  成功后 更新状态*/
  static delete_success_reducer = (state: UserState, payload): UserState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 批量删除用户 */
  static * deleteByUserIds_effect({payload}, {call, put, select}) {
    const result: string[] = yield call(UserApis.deleteByUserIds, payload);
    const oldUserArea = yield select((_) => _.user.userArea);
    const users = delateArray(oldUserArea.list, result ? result : null, "userId");

    const newPayload: UserState = {
      userArea: {
        list: users,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static deleteByUserIds_success_type(payload) {
    return {type: "deleteByUserIds_success", payload: payload};
  }

  /** 批量删除用户  成功后 更新状态*/
  static deleteByUserIds_success_reducer = (state: UserState, payload): UserState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 用户列表 */
  static * getUserPageList_effect({payload}, {call, put, select}) {
    const oldUserArea = yield select((_) => _.user.userArea);
    payload = {page: 1, pageSize: 10, ...oldUserArea.queryRule, ...payload};
    const userPageList: AntdPageList<User> = yield call(UserApis.getUserPageList, payload);
    const pagination = userPageList ? userPageList.pagination : null;

    const newPayload: UserState = {
      userArea: {
        list: userPageList ? userPageList.list : [],
        pagination,
        queryRule: payload,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getUserPageList_success_type(payload) {
    return {type: "getUserPageList_success", payload: payload};
  }

  static * getUserPageList_next_effect({payload}, {call, put, select}) {
    const oldUserArea = yield select((_) => _.user.userArea);
    const pagination = oldUserArea.pagination;
    let page = pagination.current;
    page = (page ? page : 0) + 1;
    const totalPages = Math.trunc(pagination.total / (pagination.pageSize || 10)) + 1;
    page = Math.min(page, totalPages)
    payload = {...oldUserArea.queryRule, page};
    const newPayload = yield UserCommand.getUserPageList_effect({payload}, {call, put, select});
    return newPayload;
  }

  /** 用户列表  成功后 更新状态*/
  static getUserPageList_success_reducer = (state: UserState, payload): UserState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 创建用户 */
  static * insert_effect({payload}, {call, put, select}) {
    const user: User = yield call(UserApis.insert, payload);
    const oldUserArea = yield select((_) => _.user.userArea);
    const users = updateArray(oldUserArea.list, user ? user : null, "userId");

    const newPayload: UserState = {
      userArea: {
        list: users,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static insert_success_type(payload) {
    return {type: "insert_success", payload: payload};
  }

  /** 创建用户  成功后 更新状态*/
  static insert_success_reducer = (state: UserState, payload): UserState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 修改用户 */
  static * update_effect({payload}, {call, put, select}) {
    const user: User = yield call(UserApis.update, payload);
    const oldUserArea = yield select((_) => _.user.userArea);
    const users = updateArray(oldUserArea.list, user ? user : null, "userId");

    const newPayload: UserState = {
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
  static update_success_reducer = (state: UserState, payload): UserState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const userModel: UserModel = userInitModel;

userModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(userModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getUserPageListParams = userModel.getUserPageListInitParamsFn ? userModel.getUserPageListInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, ...getUserPageListParams}
    dispatch({
      type: 'user/setup',
      payload,
    })
  })
};

userModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, userModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (userModel.getInitState) {
    const initState = userModel.getInitState();
    yield put(UserCommand.updateState_type(initState));
  }

  const newPayload = yield UserCommand.setup_effect({payload}, {call, put, select});
  yield put(UserCommand.setup_success_type(newPayload));
};

userModel.reducers.setup_success = (state: UserState, {payload}): UserState => {
  return mergeObjects(
    state,
    payload,
  );
};

/** 删除用户 */
userModel.effects.delete = function* ({payload}, {call, put, select}) {
  const newPayload = yield UserCommand.delete_effect({payload}, {call, put, select});
  yield put(UserCommand.delete_success_type(newPayload));
};

userModel.reducers.delete_success = (state: UserState, {payload}): UserState => {
  return UserCommand.delete_success_reducer(state, payload);
};

/** 批量删除用户 */
userModel.effects.deleteByUserIds = function* ({payload}, {call, put, select}) {
  const newPayload = yield UserCommand.deleteByUserIds_effect({payload}, {call, put, select});
  yield put(UserCommand.deleteByUserIds_success_type(newPayload));
};

userModel.reducers.deleteByUserIds_success = (state: UserState, {payload}): UserState => {
  return UserCommand.deleteByUserIds_success_reducer(state, payload);
};

/** 用户列表 */
userModel.effects.getUserPageList = function* ({payload}, {call, put, select}) {
  const newPayload = yield UserCommand.getUserPageList_effect({payload}, {call, put, select});
  yield put(UserCommand.getUserPageList_success_type(newPayload));
};

userModel.effects.getUserPageList_next = function* ({payload}, {call, put, select}) {
  const newPayload = yield UserCommand.getUserPageList_next_effect({payload}, {call, put, select});
  yield put(UserCommand.getUserPageList_success_type(newPayload));
};

userModel.reducers.getUserPageList_success = (state: UserState, {payload}): UserState => {
  return UserCommand.getUserPageList_success_reducer(state, payload);
};

/** 创建用户 */
userModel.effects.insert = function* ({payload}, {call, put, select}) {
  const newPayload = yield UserCommand.insert_effect({payload}, {call, put, select});
  yield put(UserCommand.insert_success_type(newPayload));
};

userModel.reducers.insert_success = (state: UserState, {payload}): UserState => {
  return UserCommand.insert_success_reducer(state, payload);
};

/** 修改用户 */
userModel.effects.update = function* ({payload}, {call, put, select}) {
  const newPayload = yield UserCommand.update_effect({payload}, {call, put, select});
  yield put(UserCommand.update_success_type(newPayload));
};

userModel.reducers.update_success = (state: UserState, {payload}): UserState => {
  return UserCommand.update_success_reducer(state, payload);
};
