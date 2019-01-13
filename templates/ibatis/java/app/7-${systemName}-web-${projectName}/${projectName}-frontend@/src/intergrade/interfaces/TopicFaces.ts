/**
 *  Do not remove this unless you get business authorization.
 *  Topic
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {topicCustomState,TopicCustomSubscriptions , TopicCustomEffects, TopicCustomReducers} from '@pages/topic/TopicCustomFaces'
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface TopicInitState extends BaseState {
  topicArea?: AreaState<Topic>;
}

export type TopicState = TopicInitState & Partial<typeof topicCustomState>;

export interface TopicInitSubscriptions extends Subscriptions{
  setup?: Subscription;
}

export type TopicSubscriptions = TopicInitSubscriptions & TopicCustomSubscriptions;

export interface TopicInitEffects extends Effects {
  setup?: Effect;
  /**  */
  getTopicPageList?: Effect,
  getTopicPageList_next?: Effect,
  /**  */
  update?: Effect,
}

export type TopicEffects = TopicInitEffects & TopicCustomEffects;

interface TopicInitReducers<S extends TopicState> extends Reducers<S> {
  setup_success?: Reducer<TopicState>,
  /**   成功后 更新状态*/
  getTopicPageList_success?: Reducer<TopicState>,
  /**   成功后 更新状态*/
  update_success?: Reducer<TopicState>,
}

export type TopicReducers = TopicInitReducers<TopicState> & TopicCustomReducers;

export interface TopicModel extends IModel<TopicState, TopicReducers, TopicEffects> {
  /** topic */
  namespace?: string;
  /** /topic */
  pathname?: string;
  state?: TopicState;
  reducers?: TopicReducers;
  effects?: TopicEffects;
  subscriptions?: TopicSubscriptions;
  getTopicPageListInitParamsFn?: SetupParamsFun;
  getInitState?: () => TopicState;
}

export interface TopicProps extends ConnectionPros {
  topicState?: TopicState,
}

export let topicInitModel: TopicModel = <TopicModel>{
  namespace: 'topic',
  pathname: '/topic',
  state: {},
  subscriptions: {},
  reducers: <TopicReducers>{},
  effects: <TopicEffects>{},
};

export const topicTopicAreaState = {
  areaName: 'topicArea',
};

topicInitModel.getInitState = () => {
  const initState = mergeObjects({topicArea: {...topicTopicAreaState, ...initAreaState}},topicCustomState);
  return initState;
}

topicInitModel.state=topicInitModel.getInitState();
topicInitModel = (mergeObjects(abstractModel, topicInitModel));

/***把 namespace 带过来，以便生成路径*/
export const topicEffects = modelPathsProxy<TopicEffects>(topicInitModel);

/***把 namespace 带过来，以便生成路径*/
export const topicReducers = modelPathsProxy<TopicReducers>(topicInitModel);

export class TopicDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: topicInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  static setup_effect(params: { topicType?: TopicType, mdrender?: boolean, page?: number, pageSize?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: TopicState) {
    return {
      type: topicInitModel.namespace + '/setup',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  }

  /**  */
  static getTopicPageList_effect(params: { topicType?: TopicType, mdrender?: boolean, page?: number, pageSize?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: TopicState) {
    return {
      type: topicInitModel.namespace + '/getTopicPageList',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };

  static getTopicPageList_next_effect() {
    return {
      type: topicInitModel.namespace + '/getTopicPageList_next',
      payload: {
      }
    }
  };


  /**  */
  static update_effect(params: { authorId?: string, topicType?: string, content?: string, title?: string, lastReplyAt?: string, good?: string, top?: string, visitCount?: number, createAt?: string, testTimestamp?: Date, testDatetime?: Date, testDate?: Date, testTime?: Date, topicId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: TopicState) {
    return {
      type: topicInitModel.namespace + '/update',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  static updateState_reducer(topicState: TopicState) {
    return {
      type: topicInitModel.namespace + '/updateState',
      payload: {
        ...topicState,
      }
    }
  }

}