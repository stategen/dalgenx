/**
 *  Do not remove this unless you get business authorization.
 *  Topic_detail_$topicId
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {topic_detail_$topicIdCustomState,Topic_detail_$topicIdCustomSubscriptions , Topic_detail_$topicIdCustomEffects, Topic_detail_$topicIdCustomReducers} from '@pages/topic/detail/$topicId/Topic_detail_$topicIdCustomFaces'
import PageList from "../beans/PageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicReply from "../beans/TopicReply";
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface Topic_detail_$topicIdInitState extends BaseState {
  topicArea?: AreaState<Topic>;
  topicReplyArea?: AreaState<TopicReply>;
}

export type Topic_detail_$topicIdState = Topic_detail_$topicIdInitState & Partial<typeof topic_detail_$topicIdCustomState>;

export interface Topic_detail_$topicIdInitSubscriptions extends Subscriptions{
  setup?: Subscription;
}

export type Topic_detail_$topicIdSubscriptions = Topic_detail_$topicIdInitSubscriptions & Topic_detail_$topicIdCustomSubscriptions;

export interface Topic_detail_$topicIdInitEffects extends Effects {
  setup?: Effect;
  /**  */
  PostReply?: Effect,
  /**  */
  getTopicDetail?: Effect,
  getTopicDetail_refresh?: Effect,
  /**  */
  getTopicReplyPageList?: Effect,
  getTopicReplyPageList_next?: Effect,
  getTopicReplyPageList_refresh?: Effect,
  /**  */
  replyUp?: Effect,
}

export type Topic_detail_$topicIdEffects = Topic_detail_$topicIdInitEffects & Topic_detail_$topicIdCustomEffects;

interface Topic_detail_$topicIdInitReducers<S extends Topic_detail_$topicIdState> extends Reducers<S> {
  setup_success?: Reducer<Topic_detail_$topicIdState>,
  /**   成功后 更新状态*/
  PostReply_success?: Reducer<Topic_detail_$topicIdState>,
  /**   成功后 更新状态*/
  getTopicDetail_success?: Reducer<Topic_detail_$topicIdState>,
  /**   成功后 更新状态*/
  getTopicReplyPageList_success?: Reducer<Topic_detail_$topicIdState>,
  /**   成功后 更新状态*/
  replyUp_success?: Reducer<Topic_detail_$topicIdState>,
}

export type Topic_detail_$topicIdReducers = Topic_detail_$topicIdInitReducers<Topic_detail_$topicIdState> & Topic_detail_$topicIdCustomReducers;

export interface Topic_detail_$topicIdModel extends IModel<Topic_detail_$topicIdState, Topic_detail_$topicIdReducers, Topic_detail_$topicIdEffects> {
  /** topic_detail_$topicId */
  namespace?: string;
  /** /topic/detail/:topicId */
  pathname?: string;
  state?: Topic_detail_$topicIdState;
  reducers?: Topic_detail_$topicIdReducers;
  effects?: Topic_detail_$topicIdEffects;
  subscriptions?: Topic_detail_$topicIdSubscriptions;
  getTopicDetailInitParamsFn?: SetupParamsFun;
  getTopicReplyPageListInitParamsFn?: SetupParamsFun;
  getInitState?: () => Topic_detail_$topicIdState;
}

export interface Topic_detail_$topicIdProps extends ConnectionPros {
  topic_detail_$topicIdState?: Topic_detail_$topicIdState,
}

export let topic_detail_$topicIdInitModel: Topic_detail_$topicIdModel = <Topic_detail_$topicIdModel>{
  namespace: 'topic_detail_$topicId',
  pathname: '/topic/detail/:topicId',
  state: {},
  subscriptions: {},
  reducers: <Topic_detail_$topicIdReducers>{},
  effects: <Topic_detail_$topicIdEffects>{},
};

export const topic_detail_$topicIdTopicAreaState = {
  areaName: 'topicArea',
};

export const topic_detail_$topicIdTopicReplyAreaState = {
  areaName: 'topicReplyArea',
};

topic_detail_$topicIdInitModel.getInitState = () => {
  const initState = mergeObjects({topicArea: {...topic_detail_$topicIdTopicAreaState, ...initAreaState}, topicReplyArea: {...topic_detail_$topicIdTopicReplyAreaState, ...initAreaState}},topic_detail_$topicIdCustomState);
  return initState;
}

topic_detail_$topicIdInitModel.state=topic_detail_$topicIdInitModel.getInitState();
topic_detail_$topicIdInitModel = (mergeObjects(abstractModel, topic_detail_$topicIdInitModel));

/***把 namespace 带过来，以便生成路径*/
export const topic_detail_$topicIdEffects = modelPathsProxy<Topic_detail_$topicIdEffects>(topic_detail_$topicIdInitModel);

/***把 namespace 带过来，以便生成路径*/
export const topic_detail_$topicIdReducers = modelPathsProxy<Topic_detail_$topicIdReducers>(topic_detail_$topicIdInitModel);

export class Topic_detail_$topicIdDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: topic_detail_$topicIdInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  static setup_effect(
              getTopicDetailInitParams?: {params: { topicId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Topic_detail_$topicIdState},
              getTopicReplyPageListInitParams?: {params: { topicId?: string, page?: number, pageSize?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Topic_detail_$topicIdState},
               params?: {}) {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/setup',
      payload: {
        ...params,
        getTopicDetailInitParams,
        getTopicReplyPageListInitParams,
      }
    }
  }

  /**  */
  static PostReply_effect(params: { topicId?: string, topicReply?: TopicReply }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Topic_detail_$topicIdState) {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/PostReply',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /**  */
  static getTopicDetail_effect(params: { topicId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Topic_detail_$topicIdState) {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/getTopicDetail',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };

  static getTopicDetail_refresh_effect() {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/getTopicDetail_refresh',
      payload: {
      }
    }
  };


  /**  */
  static getTopicReplyPageList_effect(params: { topicId?: string, page?: number, pageSize?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Topic_detail_$topicIdState) {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/getTopicReplyPageList',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };

  static getTopicReplyPageList_next_effect() {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/getTopicReplyPageList_next',
      payload: {
      }
    }
  };

  static getTopicReplyPageList_refresh_effect() {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/getTopicReplyPageList_refresh',
      payload: {
      }
    }
  };


  /**  */
  static replyUp_effect(params: { replyId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Topic_detail_$topicIdState) {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/replyUp',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  static updateState_reducer(topic_detail_$topicIdState: Topic_detail_$topicIdState) {
    return {
      type: topic_detail_$topicIdInitModel.namespace + '/updateState',
      payload: {
        ...topic_detail_$topicIdState,
      }
    }
  }

}