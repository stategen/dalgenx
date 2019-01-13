/**
 *  Do not remove this unless you get business authorization.
 *  Bbs_topic
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {bbs_topicInitModel, Bbs_topicModel, Bbs_topicState} from "../interfaces/Bbs_topicFaces";
import Bbs_topicApis from "../apis/Bbs_topicApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";


export class Bbs_topicCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};

    /**  */
    const getTopicPageListPayload = yield Bbs_topicCommand.getTopicPageList_effect({payload}, {call, put, select});
    newPayload = Bbs_topicCommand.getTopicPageList_success_reducer(<Bbs_topicState>newPayload, getTopicPageListPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /**  */
  static * delete_effect({payload}, {call, put, select}) {
    const result: string = yield call(Bbs_topicApis.delete, payload);
    const oldTopicArea = yield select((_) => _.bbs_topic.topicArea);
    const topics = delateArray(oldTopicArea.list, result ? result : null, "topicId");

    const newPayload: Bbs_topicState = {
      topicArea: {
        list: topics,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static delete_success_type(payload) {
    return {type: "delete_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static delete_success_reducer = (state: Bbs_topicState, payload): Bbs_topicState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * deleteByTopicIds_effect({payload}, {call, put, select}) {
    const result: string[] = yield call(Bbs_topicApis.deleteByTopicIds, payload);
    const oldTopicArea = yield select((_) => _.bbs_topic.topicArea);
    const topics = delateArray(oldTopicArea.list, result ? result : null, "topicId");

    const newPayload: Bbs_topicState = {
      topicArea: {
        list: topics,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static deleteByTopicIds_success_type(payload) {
    return {type: "deleteByTopicIds_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static deleteByTopicIds_success_reducer = (state: Bbs_topicState, payload): Bbs_topicState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * getTopicPageList_effect({payload}, {call, put, select}) {
    const oldTopicArea = yield select((_) => _.bbs_topic.topicArea);
    payload = {page: 1, pageSize: 10, ...oldTopicArea.queryRule, ...payload};
    const topicPageList: AntdPageList<Topic> = yield call(Bbs_topicApis.getTopicPageList, payload);
    const pagination = topicPageList ? topicPageList.pagination : null;

    const newPayload: Bbs_topicState = {
      topicArea: {
        list: topicPageList ? topicPageList.list : [],
        pagination,
        queryRule: payload,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getTopicPageList_success_type(payload) {
    return {type: "getTopicPageList_success", payload: payload};
  }

  static * getTopicPageList_next_effect({payload}, {call, put, select}) {
    const oldTopicArea = yield select((_) => _.bbs_topic.topicArea);
    const pagination = oldTopicArea.pagination;
    let page = pagination.current;
    page = (page ? page : 0) + 1;
    const totalPages = Math.trunc(pagination.total / (pagination.pageSize || 10)) + 1;
    page = Math.min(page, totalPages)
    payload = {...oldTopicArea.queryRule, page};
    const newPayload = yield Bbs_topicCommand.getTopicPageList_effect({payload}, {call, put, select});
    return newPayload;
  }

  /**   成功后 更新状态*/
  static getTopicPageList_success_reducer = (state: Bbs_topicState, payload): Bbs_topicState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * insert_effect({payload}, {call, put, select}) {
    const topic: Topic = yield call(Bbs_topicApis.insert, payload);
    const oldTopicArea = yield select((_) => _.bbs_topic.topicArea);
    const topics = updateArray(oldTopicArea.list, topic ? topic : null, "topicId");

    const newPayload: Bbs_topicState = {
      topicArea: {
        list: topics,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static insert_success_type(payload) {
    return {type: "insert_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static insert_success_reducer = (state: Bbs_topicState, payload): Bbs_topicState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * update_effect({payload}, {call, put, select}) {
    const topic: Topic = yield call(Bbs_topicApis.update, payload);
    const oldTopicArea = yield select((_) => _.bbs_topic.topicArea);
    const topics = updateArray(oldTopicArea.list, topic ? topic : null, "topicId");

    const newPayload: Bbs_topicState = {
      topicArea: {
        list: topics,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static update_success_type(payload) {
    return {type: "update_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static update_success_reducer = (state: Bbs_topicState, payload): Bbs_topicState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const bbs_topicModel: Bbs_topicModel = bbs_topicInitModel;

bbs_topicModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(bbs_topicModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getTopicPageListParams = bbs_topicModel.getTopicPageListInitParamsFn ? bbs_topicModel.getTopicPageListInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, ...getTopicPageListParams}
    dispatch({
      type: 'bbs_topic/setup',
      payload,
    })
  })
};

bbs_topicModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, bbs_topicModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (bbs_topicModel.getInitState) {
    const initState = bbs_topicModel.getInitState();
    yield put(Bbs_topicCommand.updateState_type(initState));
  }

  const newPayload = yield Bbs_topicCommand.setup_effect({payload}, {call, put, select});
  yield put(Bbs_topicCommand.setup_success_type(newPayload));
};

bbs_topicModel.reducers.setup_success = (state: Bbs_topicState, {payload}): Bbs_topicState => {
  return mergeObjects(
    state,
    payload,
  );
};

/**  */
bbs_topicModel.effects.delete = function* ({payload}, {call, put, select}) {
  const newPayload = yield Bbs_topicCommand.delete_effect({payload}, {call, put, select});
  yield put(Bbs_topicCommand.delete_success_type(newPayload));
};

bbs_topicModel.reducers.delete_success = (state: Bbs_topicState, {payload}): Bbs_topicState => {
  return Bbs_topicCommand.delete_success_reducer(state, payload);
};

/**  */
bbs_topicModel.effects.deleteByTopicIds = function* ({payload}, {call, put, select}) {
  const newPayload = yield Bbs_topicCommand.deleteByTopicIds_effect({payload}, {call, put, select});
  yield put(Bbs_topicCommand.deleteByTopicIds_success_type(newPayload));
};

bbs_topicModel.reducers.deleteByTopicIds_success = (state: Bbs_topicState, {payload}): Bbs_topicState => {
  return Bbs_topicCommand.deleteByTopicIds_success_reducer(state, payload);
};

/**  */
bbs_topicModel.effects.getTopicPageList = function* ({payload}, {call, put, select}) {
  const newPayload = yield Bbs_topicCommand.getTopicPageList_effect({payload}, {call, put, select});
  yield put(Bbs_topicCommand.getTopicPageList_success_type(newPayload));
};

bbs_topicModel.effects.getTopicPageList_next = function* ({payload}, {call, put, select}) {
  const newPayload = yield Bbs_topicCommand.getTopicPageList_next_effect({payload}, {call, put, select});
  yield put(Bbs_topicCommand.getTopicPageList_success_type(newPayload));
};

bbs_topicModel.reducers.getTopicPageList_success = (state: Bbs_topicState, {payload}): Bbs_topicState => {
  return Bbs_topicCommand.getTopicPageList_success_reducer(state, payload);
};

/**  */
bbs_topicModel.effects.insert = function* ({payload}, {call, put, select}) {
  const newPayload = yield Bbs_topicCommand.insert_effect({payload}, {call, put, select});
  yield put(Bbs_topicCommand.insert_success_type(newPayload));
};

bbs_topicModel.reducers.insert_success = (state: Bbs_topicState, {payload}): Bbs_topicState => {
  return Bbs_topicCommand.insert_success_reducer(state, payload);
};

/**  */
bbs_topicModel.effects.update = function* ({payload}, {call, put, select}) {
  const newPayload = yield Bbs_topicCommand.update_effect({payload}, {call, put, select});
  yield put(Bbs_topicCommand.update_success_type(newPayload));
};

bbs_topicModel.reducers.update_success = (state: Bbs_topicState, {payload}): Bbs_topicState => {
  return Bbs_topicCommand.update_success_reducer(state, payload);
};
