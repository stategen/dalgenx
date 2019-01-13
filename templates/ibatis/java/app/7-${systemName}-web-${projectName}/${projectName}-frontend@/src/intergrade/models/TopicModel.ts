/**
 *  Do not remove this unless you get business authorization.
 *  Topic
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {topicInitModel, TopicModel, TopicState} from "../interfaces/TopicFaces";
import TopicApis from "../apis/TopicApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";


export class TopicCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};

    /**  */
    const getTopicPageListPayload = yield TopicCommand.getTopicPageList_effect({payload}, {call, put, select});
    newPayload = TopicCommand.getTopicPageList_success_reducer(<TopicState>newPayload, getTopicPageListPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /**  */
  static * getTopicPageList_effect({payload}, {call, put, select}) {
    const oldTopicArea = yield select((_) => _.topic.topicArea);
    payload = {page: 1, pageSize: 10, ...oldTopicArea.queryRule, ...payload};
    const topicPageList: AntdPageList<Topic> = yield call(TopicApis.getTopicPageList, payload);
    const pagination = topicPageList ? topicPageList.pagination : null;
    const topics = updateArray(oldTopicArea.list, topicPageList ? topicPageList.list : null, "topicId");

    const newPayload: TopicState = {
      topicArea: {
        list: topics,
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
    const oldTopicArea = yield select((_) => _.topic.topicArea);
    const pagination = oldTopicArea.pagination;
    let page = pagination.current;
    page = (page ? page : 0) + 1;
    const totalPages = Math.trunc(pagination.total / (pagination.pageSize || 10)) + 1;
    page = Math.min(page, totalPages)
    payload = {...oldTopicArea.queryRule, page};
    const newPayload = yield TopicCommand.getTopicPageList_effect({payload}, {call, put, select});
    return newPayload;
  }

  /**   成功后 更新状态*/
  static getTopicPageList_success_reducer = (state: TopicState, payload): TopicState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * update_effect({payload}, {call, put, select}) {
    const topic: Topic = yield call(TopicApis.update, payload);
    const oldTopicArea = yield select((_) => _.topic.topicArea);
    const topics = updateArray(oldTopicArea.list, topic ? topic : null, "topicId");

    const newPayload: TopicState = {
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
  static update_success_reducer = (state: TopicState, payload): TopicState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const topicModel: TopicModel = topicInitModel;

topicModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(topicModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getTopicPageListParams = topicModel.getTopicPageListInitParamsFn ? topicModel.getTopicPageListInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, ...getTopicPageListParams}
    dispatch({
      type: 'topic/setup',
      payload,
    })
  })
};

topicModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, topicModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (topicModel.getInitState) {
    const initState = topicModel.getInitState();
    yield put(TopicCommand.updateState_type(initState));
  }

  const newPayload = yield TopicCommand.setup_effect({payload}, {call, put, select});
  yield put(TopicCommand.setup_success_type(newPayload));
};

topicModel.reducers.setup_success = (state: TopicState, {payload}): TopicState => {
  return mergeObjects(
    state,
    payload,
  );
};

/**  */
topicModel.effects.getTopicPageList = function* ({payload}, {call, put, select}) {
  const newPayload = yield TopicCommand.getTopicPageList_effect({payload}, {call, put, select});
  yield put(TopicCommand.getTopicPageList_success_type(newPayload));
};

topicModel.effects.getTopicPageList_next = function* ({payload}, {call, put, select}) {
  const newPayload = yield TopicCommand.getTopicPageList_next_effect({payload}, {call, put, select});
  yield put(TopicCommand.getTopicPageList_success_type(newPayload));
};

topicModel.reducers.getTopicPageList_success = (state: TopicState, {payload}): TopicState => {
  return TopicCommand.getTopicPageList_success_reducer(state, payload);
};

/**  */
topicModel.effects.update = function* ({payload}, {call, put, select}) {
  const newPayload = yield TopicCommand.update_effect({payload}, {call, put, select});
  yield put(TopicCommand.update_success_type(newPayload));
};

topicModel.reducers.update_success = (state: TopicState, {payload}): TopicState => {
  return TopicCommand.update_success_reducer(state, payload);
};
