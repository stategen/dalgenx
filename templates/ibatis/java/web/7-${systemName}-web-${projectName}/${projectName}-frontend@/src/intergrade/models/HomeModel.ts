/**
 *  Do not remove this unless you get business authorization.
 *  Home
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {homeInitModel, HomeModel, HomeState} from "../interfaces/HomeFaces";
import HomeApis from "../apis/HomeApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";


export class HomeCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};

    /**  */
    const getDashboardPayload = yield HomeCommand.getDashboard_effect({payload}, {call, put, select});
    newPayload = HomeCommand.getDashboard_success_reducer(<HomeState>newPayload, getDashboardPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /**  */
  static * getDashboard_effect({payload}, {call, put, select}) {
    const result: any = yield call(HomeApis.getDashboard, payload);

    const newPayload: HomeState = {
      ...result,
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getDashboard_success_type(payload) {
    return {type: "getDashboard_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static getDashboard_success_reducer = (state: HomeState, payload): HomeState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const homeModel: HomeModel = homeInitModel;

homeModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(homeModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getDashboardParams = homeModel.getDashboardInitParamsFn ? homeModel.getDashboardInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, ...getDashboardParams}
    dispatch({
      type: 'home/setup',
      payload,
    })
  })
};

homeModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, homeModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (homeModel.getInitState) {
    const initState = homeModel.getInitState();
    yield put(HomeCommand.updateState_type(initState));
  }

  const newPayload = yield HomeCommand.setup_effect({payload}, {call, put, select});
  yield put(HomeCommand.setup_success_type(newPayload));
};

homeModel.reducers.setup_success = (state: HomeState, {payload}): HomeState => {
  return mergeObjects(
    state,
    payload,
  );
};

/**  */
homeModel.effects.getDashboard = function* ({payload}, {call, put, select}) {
  const newPayload = yield HomeCommand.getDashboard_effect({payload}, {call, put, select});
  yield put(HomeCommand.getDashboard_success_type(newPayload));
};

homeModel.reducers.getDashboard_success = (state: HomeState, {payload}): HomeState => {
  return HomeCommand.getDashboard_success_reducer(state, payload);
};
