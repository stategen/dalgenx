/**
 *  Do not remove this unless you get business authorization.
 *  Topic_publish
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {topic_publishCustomState,Topic_publishCustomSubscriptions , Topic_publishCustomEffects, Topic_publishCustomReducers} from '@pages/topic/publish/Topic_publishCustomFaces'
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface Topic_publishInitState extends BaseState {
  topicArea?: AreaState<Topic>;
}

export type Topic_publishState = Topic_publishInitState & Partial<typeof topic_publishCustomState>;

export interface Topic_publishInitSubscriptions extends Subscriptions{
}

export type Topic_publishSubscriptions = Topic_publishInitSubscriptions & Topic_publishCustomSubscriptions;

export interface Topic_publishInitEffects extends Effects {
  /**  */
  saveTopic?: Effect,
}

export type Topic_publishEffects = Topic_publishInitEffects & Topic_publishCustomEffects;

interface Topic_publishInitReducers<S extends Topic_publishState> extends Reducers<S> {
  /**   成功后 更新状态*/
  saveTopic_success?: Reducer<Topic_publishState>,
}

export type Topic_publishReducers = Topic_publishInitReducers<Topic_publishState> & Topic_publishCustomReducers;

export interface Topic_publishModel extends IModel<Topic_publishState, Topic_publishReducers, Topic_publishEffects> {
  /** topic_publish */
  namespace?: string;
  /** /topic/publish */
  pathname?: string;
  state?: Topic_publishState;
  reducers?: Topic_publishReducers;
  effects?: Topic_publishEffects;
  subscriptions?: Topic_publishSubscriptions;
}

export interface Topic_publishProps extends ConnectionPros {
  topic_publishState?: Topic_publishState,
}

export let topic_publishInitModel: Topic_publishModel = <Topic_publishModel>{
  namespace: 'topic_publish',
  pathname: '/topic/publish',
  state: {},
  subscriptions: {},
  reducers: <Topic_publishReducers>{},
  effects: <Topic_publishEffects>{},
};

export const topic_publishTopicAreaState = {
  areaName: 'topicArea',
};

topic_publishInitModel.getInitState = () => {
  const initState = mergeObjects({topicArea: {...topic_publishTopicAreaState, ...initAreaState}},topic_publishCustomState);
  return initState;
}

topic_publishInitModel.state=topic_publishInitModel.getInitState();
topic_publishInitModel = (mergeObjects(abstractModel, topic_publishInitModel));

/***把 namespace 带过来，以便生成路径*/
export const topic_publishEffects = modelPathsProxy<Topic_publishEffects>(topic_publishInitModel);

/***把 namespace 带过来，以便生成路径*/
export const topic_publishReducers = modelPathsProxy<Topic_publishReducers>(topic_publishInitModel);

export class Topic_publishDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: topic_publishInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  /**  */
  static saveTopic_effect(params: { topicId?: string, topicType?: TopicType, content?: string, title?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Topic_publishState) {
    return {
      type: topic_publishInitModel.namespace + '/saveTopic',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  static updateState_reducer(topic_publishState: Topic_publishState) {
    return {
      type: topic_publishInitModel.namespace + '/updateState',
      payload: {
        ...topic_publishState,
      }
    }
  }

}