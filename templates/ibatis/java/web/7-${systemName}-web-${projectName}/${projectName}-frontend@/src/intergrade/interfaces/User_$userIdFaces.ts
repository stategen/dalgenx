/**
 *  Do not remove this unless you get business authorization.
 *  User_$userId
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {user_$userIdCustomState,User_$userIdCustomSubscriptions , User_$userIdCustomEffects, User_$userIdCustomReducers} from '@pages/user/$userId/User_$userIdCustomFaces'
import User from "../beans/User";
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface User_$userIdInitState extends BaseState {
  userArea?: AreaState<User>;
}

export type User_$userIdState = User_$userIdInitState & Partial<typeof user_$userIdCustomState>;

export interface User_$userIdInitSubscriptions extends Subscriptions{
  setup?: Subscription;
}

export type User_$userIdSubscriptions = User_$userIdInitSubscriptions & User_$userIdCustomSubscriptions;

export interface User_$userIdInitEffects extends Effects {
  setup?: Effect;
  /** 获取用户详情 */
  getUserById?: Effect,
}

export type User_$userIdEffects = User_$userIdInitEffects & User_$userIdCustomEffects;

interface User_$userIdInitReducers<S extends User_$userIdState> extends Reducers<S> {
  setup_success?: Reducer<User_$userIdState>,
  /** 获取用户详情  成功后 更新状态*/
  getUserById_success?: Reducer<User_$userIdState>,
}

export type User_$userIdReducers = User_$userIdInitReducers<User_$userIdState> & User_$userIdCustomReducers;

export interface User_$userIdModel extends IModel<User_$userIdState, User_$userIdReducers, User_$userIdEffects> {
  /** user_$userId */
  namespace?: string;
  /** /user/:userId */
  pathname?: string;
  state?: User_$userIdState;
  reducers?: User_$userIdReducers;
  effects?: User_$userIdEffects;
  subscriptions?: User_$userIdSubscriptions;
  getUserByIdInitParamsFn?: SetupParamsFun;
  getInitState?: () => User_$userIdState;
}

export interface User_$userIdProps extends ConnectionPros {
  user_$userIdState?: User_$userIdState,
}

export let user_$userIdInitModel: User_$userIdModel = <User_$userIdModel>{
  namespace: 'user_$userId',
  pathname: '/user/:userId',
  state: {},
  subscriptions: {},
  reducers: <User_$userIdReducers>{},
  effects: <User_$userIdEffects>{},
};

export const user_$userIdUserAreaState = {
  areaName: 'userArea',
};

user_$userIdInitModel.getInitState = () => {
  const initState = mergeObjects({userArea: {...user_$userIdUserAreaState, ...initAreaState}},user_$userIdCustomState);
  return initState;
}

user_$userIdInitModel.state=user_$userIdInitModel.getInitState();
user_$userIdInitModel = (mergeObjects(abstractModel, user_$userIdInitModel));

/***把 namespace 带过来，以便生成路径*/
export const user_$userIdEffects = modelPathsProxy<User_$userIdEffects>(user_$userIdInitModel);

/***把 namespace 带过来，以便生成路径*/
export const user_$userIdReducers = modelPathsProxy<User_$userIdReducers>(user_$userIdInitModel);

export class User_$userIdDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: user_$userIdInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  static setup_effect(params: { userId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_$userIdState) {
    return {
      type: user_$userIdInitModel.namespace + '/setup',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  }

  /** 获取用户详情 */
  static getUserById_effect(params: { userId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_$userIdState) {
    return {
      type: user_$userIdInitModel.namespace + '/getUserById',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  static updateState_reducer(user_$userIdState: User_$userIdState) {
    return {
      type: user_$userIdInitModel.namespace + '/updateState',
      payload: {
        ...user_$userIdState,
      }
    }
  }

}