/**
 *  Do not remove this unless you get business authorization.
 *  Topic_detail_$topicId
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {topic_detail_$topicIdInitModel, Topic_detail_$topicIdModel, Topic_detail_$topicIdState} from "../interfaces/Topic_detail_$topicIdFaces";
import Topic_detail_$topicIdApis from "../apis/Topic_detail_$topicIdApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import PageList from "../beans/PageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicReply from "../beans/TopicReply";


export class Topic_detail_$topicIdCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};
    const {getTopicDetailParams = null, getTopicReplyPageListParams = null, ...lastParams} = payload || {};

    /**  */
    const getTopicDetailPayload = yield Topic_detail_$topicIdCommand.getTopicDetail_effect({payload: {...lastParams, ...getTopicDetailParams}}, {call, put, select});
    newPayload = Topic_detail_$topicIdCommand.getTopicDetail_success_reducer(<Topic_detail_$topicIdState>newPayload, getTopicDetailPayload);
    /**  */
    const getTopicReplyPageListPayload = yield Topic_detail_$topicIdCommand.getTopicReplyPageList_effect({payload: {...lastParams, ...getTopicReplyPageListParams}}, {call, put, select});
    newPayload = Topic_detail_$topicIdCommand.getTopicReplyPageList_success_reducer(<Topic_detail_$topicIdState>newPayload, getTopicReplyPageListPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /**  */
  static * PostReply_effect({payload}, {call, put, select}) {
    const topicReply: TopicReply = yield call(Topic_detail_$topicIdApis.PostReply, payload);
    const oldTopicReplyArea = yield select((_) => _.topic_detail_$topicId.topicReplyArea);
    const topicReplys = updateArray(oldTopicReplyArea.list, topicReply ? topicReply : null, "replyId");

    const newPayload: Topic_detail_$topicIdState = {
      topicReplyArea: {
        list: topicReplys,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static PostReply_success_type(payload) {
    return {type: "PostReply_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static PostReply_success_reducer = (state: Topic_detail_$topicIdState, payload): Topic_detail_$topicIdState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * getTopicDetail_effect({payload}, {call, put, select}) {
    const topic: Topic = yield call(Topic_detail_$topicIdApis.getTopicDetail, payload);

    const newPayload: Topic_detail_$topicIdState = {
      topicArea: {
        list: topic ? [topic] : [],
        queryRule: payload,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getTopicDetail_success_type(payload) {
    return {type: "getTopicDetail_success", payload: payload};
  }

  static * getTopicDetail_refresh_effect({payload}, {call, put, select}) {
    const oldTopicArea = yield select((_) => _.topic_detail_$topicId.topicArea);
    payload = {...oldTopicArea.queryRule};
    const newPayload = yield Topic_detail_$topicIdCommand.getTopicDetail_effect({payload}, {call, put, select});
    return newPayload;
  }

  /**   成功后 更新状态*/
  static getTopicDetail_success_reducer = (state: Topic_detail_$topicIdState, payload): Topic_detail_$topicIdState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * getTopicReplyPageList_effect({payload}, {call, put, select}) {
    const oldTopicReplyArea = yield select((_) => _.topic_detail_$topicId.topicReplyArea);
    payload = {page: 1, pageSize: 10, ...oldTopicReplyArea.queryRule, ...payload};
    const topicReplyPageList: PageList<TopicReply> = yield call(Topic_detail_$topicIdApis.getTopicReplyPageList, payload);
    const pagination = topicReplyPageList ? topicReplyPageList.pagination : null;
    const topicReplys = updateArray(oldTopicReplyArea.list, topicReplyPageList ? topicReplyPageList.items : null, "replyId");

    const newPayload: Topic_detail_$topicIdState = {
      topicReplyArea: {
        list: topicReplys,
        pagination,
        queryRule: payload,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getTopicReplyPageList_success_type(payload) {
    return {type: "getTopicReplyPageList_success", payload: payload};
  }

  static * getTopicReplyPageList_next_effect({payload}, {call, put, select}) {
    const oldTopicReplyArea = yield select((_) => _.topic_detail_$topicId.topicReplyArea);
    const pagination = oldTopicReplyArea.pagination;
    let page = pagination.current;
    page = (page ? page : 0) + 1;
    const totalPages = Math.trunc(pagination.total / (pagination.pageSize || 10)) + 1;
    page = Math.min(page, totalPages)
    payload = {...oldTopicReplyArea.queryRule, page};
    const newPayload = yield Topic_detail_$topicIdCommand.getTopicReplyPageList_effect({payload}, {call, put, select});
    return newPayload;
  }

  static * getTopicReplyPageList_refresh_effect({payload}, {call, put, select}) {
    const oldTopicReplyArea = yield select((_) => _.topic_detail_$topicId.topicReplyArea);
    payload = {...oldTopicReplyArea.queryRule};
    const newPayload = yield Topic_detail_$topicIdCommand.getTopicReplyPageList_effect({payload}, {call, put, select});
    return newPayload;
  }

  /**   成功后 更新状态*/
  static getTopicReplyPageList_success_reducer = (state: Topic_detail_$topicIdState, payload): Topic_detail_$topicIdState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /**  */
  static * replyUp_effect({payload}, {call, put, select}) {
    const topicReply: TopicReply = yield call(Topic_detail_$topicIdApis.replyUp, payload);
    const oldTopicReplyArea = yield select((_) => _.topic_detail_$topicId.topicReplyArea);
    const topicReplys = updateArray(oldTopicReplyArea.list, topicReply ? topicReply : null, "replyId");

    const newPayload: Topic_detail_$topicIdState = {
      topicReplyArea: {
        list: topicReplys,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static replyUp_success_type(payload) {
    return {type: "replyUp_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static replyUp_success_reducer = (state: Topic_detail_$topicIdState, payload): Topic_detail_$topicIdState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const topic_detail_$topicIdModel: Topic_detail_$topicIdModel = topic_detail_$topicIdInitModel;

topic_detail_$topicIdModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(topic_detail_$topicIdModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getTopicDetailParams = topic_detail_$topicIdModel.getTopicDetailInitParamsFn ? topic_detail_$topicIdModel.getTopicDetailInitParamsFn({pathname, match, keys}) : null;
    const getTopicReplyPageListParams = topic_detail_$topicIdModel.getTopicReplyPageListInitParamsFn ? topic_detail_$topicIdModel.getTopicReplyPageListInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, getTopicDetailParams, getTopicReplyPageListParams}
    dispatch({
      type: 'topic_detail_$topicId/setup',
      payload,
    })
  })
};
topic_detail_$topicIdModel.getTopicDetailInitParamsFn = RouteUtil.getParams;
topic_detail_$topicIdModel.getTopicReplyPageListInitParamsFn = RouteUtil.getParams;

topic_detail_$topicIdModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, topic_detail_$topicIdModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (topic_detail_$topicIdModel.getInitState) {
    const initState = topic_detail_$topicIdModel.getInitState();
    yield put(Topic_detail_$topicIdCommand.updateState_type(initState));
  }

  const newPayload = yield Topic_detail_$topicIdCommand.setup_effect({payload}, {call, put, select});
  yield put(Topic_detail_$topicIdCommand.setup_success_type(newPayload));
};

topic_detail_$topicIdModel.reducers.setup_success = (state: Topic_detail_$topicIdState, {payload}): Topic_detail_$topicIdState => {
  return mergeObjects(
    state,
    payload,
  );
};

/**  */
topic_detail_$topicIdModel.effects.PostReply = function* ({payload}, {call, put, select}) {
  const newPayload = yield Topic_detail_$topicIdCommand.PostReply_effect({payload}, {call, put, select});
  yield put(Topic_detail_$topicIdCommand.PostReply_success_type(newPayload));
};

topic_detail_$topicIdModel.reducers.PostReply_success = (state: Topic_detail_$topicIdState, {payload}): Topic_detail_$topicIdState => {
  return Topic_detail_$topicIdCommand.PostReply_success_reducer(state, payload);
};

/**  */
topic_detail_$topicIdModel.effects.getTopicDetail = function* ({payload}, {call, put, select}) {
  const newPayload = yield Topic_detail_$topicIdCommand.getTopicDetail_effect({payload}, {call, put, select});
  yield put(Topic_detail_$topicIdCommand.getTopicDetail_success_type(newPayload));
};

topic_detail_$topicIdModel.effects.getTopicDetail_refresh = function* ({payload}, {call, put, select}) {
  const newPayload = yield Topic_detail_$topicIdCommand.getTopicDetail_refresh_effect({payload}, {call, put, select});
  yield put(Topic_detail_$topicIdCommand.getTopicDetail_success_type(newPayload));
};

topic_detail_$topicIdModel.reducers.getTopicDetail_success = (state: Topic_detail_$topicIdState, {payload}): Topic_detail_$topicIdState => {
  return Topic_detail_$topicIdCommand.getTopicDetail_success_reducer(state, payload);
};

/**  */
topic_detail_$topicIdModel.effects.getTopicReplyPageList = function* ({payload}, {call, put, select}) {
  const newPayload = yield Topic_detail_$topicIdCommand.getTopicReplyPageList_effect({payload}, {call, put, select});
  yield put(Topic_detail_$topicIdCommand.getTopicReplyPageList_success_type(newPayload));
};

topic_detail_$topicIdModel.effects.getTopicReplyPageList_next = function* ({payload}, {call, put, select}) {
  const newPayload = yield Topic_detail_$topicIdCommand.getTopicReplyPageList_next_effect({payload}, {call, put, select});
  yield put(Topic_detail_$topicIdCommand.getTopicReplyPageList_success_type(newPayload));
};

topic_detail_$topicIdModel.effects.getTopicReplyPageList_refresh = function* ({payload}, {call, put, select}) {
  const newPayload = yield Topic_detail_$topicIdCommand.getTopicReplyPageList_refresh_effect({payload}, {call, put, select});
  yield put(Topic_detail_$topicIdCommand.getTopicReplyPageList_success_type(newPayload));
};

topic_detail_$topicIdModel.reducers.getTopicReplyPageList_success = (state: Topic_detail_$topicIdState, {payload}): Topic_detail_$topicIdState => {
  return Topic_detail_$topicIdCommand.getTopicReplyPageList_success_reducer(state, payload);
};

/**  */
topic_detail_$topicIdModel.effects.replyUp = function* ({payload}, {call, put, select}) {
  const newPayload = yield Topic_detail_$topicIdCommand.replyUp_effect({payload}, {call, put, select});
  yield put(Topic_detail_$topicIdCommand.replyUp_success_type(newPayload));
};

topic_detail_$topicIdModel.reducers.replyUp_success = (state: Topic_detail_$topicIdState, {payload}): Topic_detail_$topicIdState => {
  return Topic_detail_$topicIdCommand.replyUp_success_reducer(state, payload);
};
