/**
 *  Do not remove this unless you get business authorization.
 *  User_detail_$username
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {user_detail_$usernameCustomState,User_detail_$usernameCustomSubscriptions , User_detail_$usernameCustomEffects, User_detail_$usernameCustomReducers} from '@pages/user/detail/$username/User_detail_$usernameCustomFaces'
import RoleType from "../enums/RoleType";
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface User_detail_$usernameInitState extends BaseState {
  userArea?: AreaState<User>;
}

export type User_detail_$usernameState = User_detail_$usernameInitState & Partial<typeof user_detail_$usernameCustomState>;

export interface User_detail_$usernameInitSubscriptions extends Subscriptions{
  setup?: Subscription;
}

export type User_detail_$usernameSubscriptions = User_detail_$usernameInitSubscriptions & User_detail_$usernameCustomSubscriptions;

export interface User_detail_$usernameInitEffects extends Effects {
  setup?: Effect;
  /**  */
  getCurrentUser?: Effect,
  /**  */
  getUserData?: Effect,
  /** 修改用户 */
  update?: Effect,
}

export type User_detail_$usernameEffects = User_detail_$usernameInitEffects & User_detail_$usernameCustomEffects;

interface User_detail_$usernameInitReducers<S extends User_detail_$usernameState> extends Reducers<S> {
  setup_success?: Reducer<User_detail_$usernameState>,
  /**   成功后 更新状态*/
  getCurrentUser_success?: Reducer<User_detail_$usernameState>,
  /**   成功后 更新状态*/
  getUserData_success?: Reducer<User_detail_$usernameState>,
  /** 修改用户  成功后 更新状态*/
  update_success?: Reducer<User_detail_$usernameState>,
}

export type User_detail_$usernameReducers = User_detail_$usernameInitReducers<User_detail_$usernameState> & User_detail_$usernameCustomReducers;

export interface User_detail_$usernameModel extends IModel<User_detail_$usernameState, User_detail_$usernameReducers, User_detail_$usernameEffects> {
  /** user_detail_$username */
  namespace?: string;
  /** /user/detail/:username */
  pathname?: string;
  state?: User_detail_$usernameState;
  reducers?: User_detail_$usernameReducers;
  effects?: User_detail_$usernameEffects;
  subscriptions?: User_detail_$usernameSubscriptions;
  getCurrentUserInitParamsFn?: SetupParamsFun;
  getUserDataInitParamsFn?: SetupParamsFun;
  getInitState?: () => User_detail_$usernameState;
}

export interface User_detail_$usernameProps extends ConnectionPros {
  user_detail_$usernameState?: User_detail_$usernameState,
}

export let user_detail_$usernameInitModel: User_detail_$usernameModel = <User_detail_$usernameModel>{
  namespace: 'user_detail_$username',
  pathname: '/user/detail/:username',
  state: {},
  subscriptions: {},
  reducers: <User_detail_$usernameReducers>{},
  effects: <User_detail_$usernameEffects>{},
};

export const user_detail_$usernameUserAreaState = {
  areaName: 'userArea',
};

user_detail_$usernameInitModel.getInitState = () => {
  const initState = mergeObjects({userArea: {...user_detail_$usernameUserAreaState, ...initAreaState}},user_detail_$usernameCustomState);
  return initState;
}

user_detail_$usernameInitModel.state=user_detail_$usernameInitModel.getInitState();
user_detail_$usernameInitModel = (mergeObjects(abstractModel, user_detail_$usernameInitModel));

/***把 namespace 带过来，以便生成路径*/
export const user_detail_$usernameEffects = modelPathsProxy<User_detail_$usernameEffects>(user_detail_$usernameInitModel);

/***把 namespace 带过来，以便生成路径*/
export const user_detail_$usernameReducers = modelPathsProxy<User_detail_$usernameReducers>(user_detail_$usernameInitModel);

export class User_detail_$usernameDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: user_detail_$usernameInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  static setup_effect(
              getCurrentUserInitParams?: {params?: {}, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_detail_$usernameState},
              getUserDataInitParams?: {params: { username?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_detail_$usernameState},
               params?: {}) {
    return {
      type: user_detail_$usernameInitModel.namespace + '/setup',
      payload: {
        ...params,
        getCurrentUserInitParams,
        getUserDataInitParams,
      }
    }
  }

  /**  */
  static getCurrentUser_effect(params?: {}, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_detail_$usernameState) {
    return {
      type: user_detail_$usernameInitModel.namespace + '/getCurrentUser',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /**  */
  static getUserData_effect(params: { username?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_detail_$usernameState) {
    return {
      type: user_detail_$usernameInitModel.namespace + '/getUserData',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /** 修改用户 */
  static update_effect(params: { hoppyIds?: number[], cascaderPostAddressIds?: number[], username?: string, password?: string, roleType?: RoleType, name?: string, nickName?: string, age?: number, address?: string, avatarImgId?: string, email?: string, valiDatetime?: Date, birthdayDate?: Date, workTime?: Date, provinceId?: string, cityId?: string, status?: StatusEnum, grade?: number, sex?: boolean, postAddressId?: string, userId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_detail_$usernameState) {
    return {
      type: user_detail_$usernameInitModel.namespace + '/update',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  static updateState_reducer(user_detail_$usernameState: User_detail_$usernameState) {
    return {
      type: user_detail_$usernameInitModel.namespace + '/updateState',
      payload: {
        ...user_detail_$usernameState,
      }
    }
  }

}