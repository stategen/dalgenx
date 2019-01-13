/**
 *  Do not remove this unless you get business authorization.
 *  User_$userId
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {user_$userIdInitModel, User_$userIdModel, User_$userIdState} from "../interfaces/User_$userIdFaces";
import User_$userIdApis from "../apis/User_$userIdApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import User from "../beans/User";


export class User_$userIdCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};

    /** 获取用户详情 */
    const getUserByIdPayload = yield User_$userIdCommand.getUserById_effect({payload}, {call, put, select});
    newPayload = User_$userIdCommand.getUserById_success_reducer(<User_$userIdState>newPayload, getUserByIdPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /** 获取用户详情 */
  static * getUserById_effect({payload}, {call, put, select}) {
    const user: User = yield call(User_$userIdApis.getUserById, payload);

    const newPayload: User_$userIdState = {
      userArea: {
        list: user ? [user] : [],
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getUserById_success_type(payload) {
    return {type: "getUserById_success", payload: payload};
  }

  /** 获取用户详情  成功后 更新状态*/
  static getUserById_success_reducer = (state: User_$userIdState, payload): User_$userIdState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const user_$userIdModel: User_$userIdModel = user_$userIdInitModel;

user_$userIdModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(user_$userIdModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getUserByIdParams = user_$userIdModel.getUserByIdInitParamsFn ? user_$userIdModel.getUserByIdInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, ...getUserByIdParams}
    dispatch({
      type: 'user_$userId/setup',
      payload,
    })
  })
};
user_$userIdModel.getUserByIdInitParamsFn = RouteUtil.getParams;

user_$userIdModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, user_$userIdModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (user_$userIdModel.getInitState) {
    const initState = user_$userIdModel.getInitState();
    yield put(User_$userIdCommand.updateState_type(initState));
  }

  const newPayload = yield User_$userIdCommand.setup_effect({payload}, {call, put, select});
  yield put(User_$userIdCommand.setup_success_type(newPayload));
};

user_$userIdModel.reducers.setup_success = (state: User_$userIdState, {payload}): User_$userIdState => {
  return mergeObjects(
    state,
    payload,
  );
};

/** 获取用户详情 */
user_$userIdModel.effects.getUserById = function* ({payload}, {call, put, select}) {
  const newPayload = yield User_$userIdCommand.getUserById_effect({payload}, {call, put, select});
  yield put(User_$userIdCommand.getUserById_success_type(newPayload));
};

user_$userIdModel.reducers.getUserById_success = (state: User_$userIdState, {payload}): User_$userIdState => {
  return User_$userIdCommand.getUserById_success_reducer(state, payload);
};
