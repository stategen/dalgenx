/**
 *  Do not remove this unless you get business authorization.
 *  User_me
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {user_meCustomState,User_meCustomSubscriptions , User_meCustomEffects, User_meCustomReducers} from '@pages/user/me/User_meCustomFaces'
import RoleType from "../enums/RoleType";
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface User_meInitState extends BaseState {
  userArea?: AreaState<User>;
}

export type User_meState = User_meInitState & Partial<typeof user_meCustomState>;

export interface User_meInitSubscriptions extends Subscriptions{
  setup?: Subscription;
}

export type User_meSubscriptions = User_meInitSubscriptions & User_meCustomSubscriptions;

export interface User_meInitEffects extends Effects {
  setup?: Effect;
  /**  */
  getCurrentUser?: Effect,
  /** 修改用户 */
  update?: Effect,
}

export type User_meEffects = User_meInitEffects & User_meCustomEffects;

interface User_meInitReducers<S extends User_meState> extends Reducers<S> {
  setup_success?: Reducer<User_meState>,
  /**   成功后 更新状态*/
  getCurrentUser_success?: Reducer<User_meState>,
  /** 修改用户  成功后 更新状态*/
  update_success?: Reducer<User_meState>,
}

export type User_meReducers = User_meInitReducers<User_meState> & User_meCustomReducers;

export interface User_meModel extends IModel<User_meState, User_meReducers, User_meEffects> {
  /** user_me */
  namespace?: string;
  /** /user/me */
  pathname?: string;
  state?: User_meState;
  reducers?: User_meReducers;
  effects?: User_meEffects;
  subscriptions?: User_meSubscriptions;
  getCurrentUserInitParamsFn?: SetupParamsFun;
  getInitState?: () => User_meState;
}

export interface User_meProps extends ConnectionPros {
  user_meState?: User_meState,
}

export let user_meInitModel: User_meModel = <User_meModel>{
  namespace: 'user_me',
  pathname: '/user/me',
  state: {},
  subscriptions: {},
  reducers: <User_meReducers>{},
  effects: <User_meEffects>{},
};

export const user_meUserAreaState = {
  areaName: 'userArea',
};

user_meInitModel.getInitState = () => {
  const initState = mergeObjects({userArea: {...user_meUserAreaState, ...initAreaState}},user_meCustomState);
  return initState;
}

user_meInitModel.state=user_meInitModel.getInitState();
user_meInitModel = (mergeObjects(abstractModel, user_meInitModel));

/***把 namespace 带过来，以便生成路径*/
export const user_meEffects = modelPathsProxy<User_meEffects>(user_meInitModel);

/***把 namespace 带过来，以便生成路径*/
export const user_meReducers = modelPathsProxy<User_meReducers>(user_meInitModel);

export class User_meDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: user_meInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  static setup_effect(params?: {}, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_meState) {
    return {
      type: user_meInitModel.namespace + '/setup',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  }

  /**  */
  static getCurrentUser_effect(params?: {}, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_meState) {
    return {
      type: user_meInitModel.namespace + '/getCurrentUser',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /** 修改用户 */
  static update_effect(params: { hoppyIds?: number[], cascaderPostAddressIds?: number[], username?: string, password?: string, roleType?: RoleType, name?: string, nickName?: string, age?: number, address?: string, avatarImgId?: string, email?: string, valiDatetime?: Date, birthdayDate?: Date, workTime?: Date, provinceId?: string, cityId?: string, status?: StatusEnum, grade?: number, sex?: boolean, postAddressId?: string, userId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: User_meState) {
    return {
      type: user_meInitModel.namespace + '/update',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  static updateState_reducer(user_meState: User_meState) {
    return {
      type: user_meInitModel.namespace + '/updateState',
      payload: {
        ...user_meState,
      }
    }
  }

}