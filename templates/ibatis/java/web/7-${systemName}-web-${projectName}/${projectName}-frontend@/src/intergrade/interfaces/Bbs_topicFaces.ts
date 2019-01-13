/**
 *  Do not remove this unless you get business authorization.
 *  Bbs_topic
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {bbs_topicCustomState,Bbs_topicCustomSubscriptions , Bbs_topicCustomEffects, Bbs_topicCustomReducers} from '@pages/bbs/topic/Bbs_topicCustomFaces'
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface Bbs_topicInitState extends BaseState {
  topicArea?: AreaState<Topic>;
}

export type Bbs_topicState = Bbs_topicInitState & Partial<typeof bbs_topicCustomState>;

export interface Bbs_topicInitSubscriptions extends Subscriptions{
  setup?: Subscription;
}

export type Bbs_topicSubscriptions = Bbs_topicInitSubscriptions & Bbs_topicCustomSubscriptions;

export interface Bbs_topicInitEffects extends Effects {
  setup?: Effect;
  /**  */
  delete?: Effect,
  /**  */
  deleteByTopicIds?: Effect,
  /**  */
  getTopicPageList?: Effect,
  getTopicPageList_next?: Effect,
  /**  */
  insert?: Effect,
  /**  */
  update?: Effect,
}

export type Bbs_topicEffects = Bbs_topicInitEffects & Bbs_topicCustomEffects;

interface Bbs_topicInitReducers<S extends Bbs_topicState> extends Reducers<S> {
  setup_success?: Reducer<Bbs_topicState>,
  /**   成功后 更新状态*/
  delete_success?: Reducer<Bbs_topicState>,
  /**   成功后 更新状态*/
  deleteByTopicIds_success?: Reducer<Bbs_topicState>,
  /**   成功后 更新状态*/
  getTopicPageList_success?: Reducer<Bbs_topicState>,
  /**   成功后 更新状态*/
  insert_success?: Reducer<Bbs_topicState>,
  /**   成功后 更新状态*/
  update_success?: Reducer<Bbs_topicState>,
}

export type Bbs_topicReducers = Bbs_topicInitReducers<Bbs_topicState> & Bbs_topicCustomReducers;

export interface Bbs_topicModel extends IModel<Bbs_topicState, Bbs_topicReducers, Bbs_topicEffects> {
  /** bbs_topic */
  namespace?: string;
  /** /bbs/topic */
  pathname?: string;
  state?: Bbs_topicState;
  reducers?: Bbs_topicReducers;
  effects?: Bbs_topicEffects;
  subscriptions?: Bbs_topicSubscriptions;
  getTopicPageListInitParamsFn?: SetupParamsFun;
  getInitState?: () => Bbs_topicState;
}

export interface Bbs_topicProps extends ConnectionPros {
  bbs_topicState?: Bbs_topicState,
}

export let bbs_topicInitModel: Bbs_topicModel = <Bbs_topicModel>{
  namespace: 'bbs_topic',
  pathname: '/bbs/topic',
  state: {},
  subscriptions: {},
  reducers: <Bbs_topicReducers>{},
  effects: <Bbs_topicEffects>{},
};

export const bbs_topicTopicAreaState = {
  areaName: 'topicArea',
};

bbs_topicInitModel.getInitState = () => {
  const initState = mergeObjects({topicArea: {...bbs_topicTopicAreaState, ...initAreaState}},bbs_topicCustomState);
  return initState;
}

bbs_topicInitModel.state=bbs_topicInitModel.getInitState();
bbs_topicInitModel = (mergeObjects(abstractModel, bbs_topicInitModel));

/***把 namespace 带过来，以便生成路径*/
export const bbs_topicEffects = modelPathsProxy<Bbs_topicEffects>(bbs_topicInitModel);

/***把 namespace 带过来，以便生成路径*/
export const bbs_topicReducers = modelPathsProxy<Bbs_topicReducers>(bbs_topicInitModel);

export class Bbs_topicDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: bbs_topicInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  static setup_effect(params: { topicIds?: string[], authorIds?: string[], topicType?: TopicType, topicTypes?: TopicType[], title?: string, titleLike?: string, visitCountMin?: number, visitCountMax?: number, page?: number, pageSize?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Bbs_topicState) {
    return {
      type: bbs_topicInitModel.namespace + '/setup',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  }

  /**  */
  static delete_effect(params: { topicId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Bbs_topicState) {
    return {
      type: bbs_topicInitModel.namespace + '/delete',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /**  */
  static deleteByTopicIds_effect(params: { topicIds?: string[] }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Bbs_topicState) {
    return {
      type: bbs_topicInitModel.namespace + '/deleteByTopicIds',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /**  */
  static getTopicPageList_effect(params: { topicIds?: string[], authorIds?: string[], topicType?: TopicType, topicTypes?: TopicType[], title?: string, titleLike?: string, visitCountMin?: number, visitCountMax?: number, page?: number, pageSize?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Bbs_topicState) {
    return {
      type: bbs_topicInitModel.namespace + '/getTopicPageList',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };

  static getTopicPageList_next_effect() {
    return {
      type: bbs_topicInitModel.namespace + '/getTopicPageList_next',
      payload: {
      }
    }
  };


  /**  */
  static insert_effect(params: { topicId?: string, authorId?: string, topicType?: TopicType, content?: string, title?: string, lastReplyAt?: Date, good?: number, top?: number, visitCount?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Bbs_topicState) {
    return {
      type: bbs_topicInitModel.namespace + '/insert',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /**  */
  static update_effect(params: { authorId?: string, topicType?: TopicType, content?: string, title?: string, lastReplyAt?: Date, good?: number, top?: TopicType, visitCount?: number, topicId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: Bbs_topicState) {
    return {
      type: bbs_topicInitModel.namespace + '/update',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  static updateState_reducer(bbs_topicState: Bbs_topicState) {
    return {
      type: bbs_topicInitModel.namespace + '/updateState',
      payload: {
        ...bbs_topicState,
      }
    }
  }

}