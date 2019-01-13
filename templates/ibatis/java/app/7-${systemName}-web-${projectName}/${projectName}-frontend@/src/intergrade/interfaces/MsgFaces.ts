/**
 *  Do not remove this unless you get business authorization.
 *  Msg
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {msgCustomState,MsgCustomSubscriptions , MsgCustomEffects, MsgCustomReducers} from '@pages/msg/MsgCustomFaces'
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface MsgInitState extends BaseState {
}

export type MsgState = MsgInitState & Partial<typeof msgCustomState>;

export interface MsgInitSubscriptions extends Subscriptions{
}

export type MsgSubscriptions = MsgInitSubscriptions & MsgCustomSubscriptions;

export interface MsgInitEffects extends Effects {
}

export type MsgEffects = MsgInitEffects & MsgCustomEffects;

interface MsgInitReducers<S extends MsgState> extends Reducers<S> {
}

export type MsgReducers = MsgInitReducers<MsgState> & MsgCustomReducers;

export interface MsgModel extends IModel<MsgState, MsgReducers, MsgEffects> {
  /** msg */
  namespace?: string;
  /** /msg */
  pathname?: string;
  state?: MsgState;
  reducers?: MsgReducers;
  effects?: MsgEffects;
  subscriptions?: MsgSubscriptions;
}

export interface MsgProps extends ConnectionPros {
  msgState?: MsgState,
}

export let msgInitModel: MsgModel = <MsgModel>{
  namespace: 'msg',
  pathname: '/msg',
  state: {},
  subscriptions: {},
  reducers: <MsgReducers>{},
  effects: <MsgEffects>{},
};

msgInitModel.getInitState = () => {
  const initState = msgCustomState;
  return initState;
}

msgInitModel.state=msgInitModel.getInitState();
msgInitModel = (mergeObjects(abstractModel, msgInitModel));

/***把 namespace 带过来，以便生成路径*/
export const msgEffects = modelPathsProxy<MsgEffects>(msgInitModel);

/***把 namespace 带过来，以便生成路径*/
export const msgReducers = modelPathsProxy<MsgReducers>(msgInitModel);

export class MsgDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: msgInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  static updateState_reducer(msgState: MsgState) {
    return {
      type: msgInitModel.namespace + '/updateState',
      payload: {
        ...msgState,
      }
    }
  }

}