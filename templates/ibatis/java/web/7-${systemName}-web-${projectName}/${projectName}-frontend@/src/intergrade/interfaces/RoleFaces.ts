/**
 *  Do not remove this unless you get business authorization.
 *  Role
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, abstractModel} from '@utils/DvaUtil';
import {roleCustomState,RoleCustomSubscriptions , RoleCustomEffects, RoleCustomReducers} from '@pages/role/RoleCustomFaces'
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Role from "../beans/Role";
import RoleType from "../enums/RoleType";
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface RoleInitState extends BaseState {
  roleArea?: AreaState<Role>;
}

export type RoleState = RoleInitState & Partial<typeof roleCustomState>;

export interface RoleInitSubscriptions extends Subscriptions{
  setup?: Subscription;
}

export type RoleSubscriptions = RoleInitSubscriptions & RoleCustomSubscriptions;

export interface RoleInitEffects extends Effects {
  setup?: Effect;
  /** 删除角色 */
  delete?: Effect,
  /** 批量删除角色 */
  deleteByRoleIds?: Effect,
  /** 角色分页列表,多条件 */
  getRolePageList?: Effect,
  getRolePageList_next?: Effect,
  /** 创建角色 */
  insert?: Effect,
  /** 更新角色 */
  update?: Effect,
}

export type RoleEffects = RoleInitEffects & RoleCustomEffects;

interface RoleInitReducers<S extends RoleState> extends Reducers<S> {
  setup_success?: Reducer<RoleState>,
  /** 删除角色  成功后 更新状态*/
  delete_success?: Reducer<RoleState>,
  /** 批量删除角色  成功后 更新状态*/
  deleteByRoleIds_success?: Reducer<RoleState>,
  /** 角色分页列表,多条件  成功后 更新状态*/
  getRolePageList_success?: Reducer<RoleState>,
  /** 创建角色  成功后 更新状态*/
  insert_success?: Reducer<RoleState>,
  /** 更新角色  成功后 更新状态*/
  update_success?: Reducer<RoleState>,
}

export type RoleReducers = RoleInitReducers<RoleState> & RoleCustomReducers;

export interface RoleModel extends IModel<RoleState, RoleReducers, RoleEffects> {
  /** role */
  namespace?: string;
  /** /role */
  pathname?: string;
  state?: RoleState;
  reducers?: RoleReducers;
  effects?: RoleEffects;
  subscriptions?: RoleSubscriptions;
  getRolePageListInitParamsFn?: SetupParamsFun;
  getInitState?: () => RoleState;
}

export interface RoleProps extends ConnectionPros {
  roleState?: RoleState,
}

export let roleInitModel: RoleModel = <RoleModel>{
  namespace: 'role',
  pathname: '/role',
  state: {},
  subscriptions: {},
  reducers: <RoleReducers>{},
  effects: <RoleEffects>{},
};

export const roleRoleAreaState = {
  areaName: 'roleArea',
};

roleInitModel.getInitState = () => {
  const initState = mergeObjects({roleArea: {...roleRoleAreaState, ...initAreaState}},roleCustomState);
  return initState;
}

roleInitModel.state=roleInitModel.getInitState();
roleInitModel = (mergeObjects(abstractModel, roleInitModel));

/***把 namespace 带过来，以便生成路径*/
export const roleEffects = modelPathsProxy<RoleEffects>(roleInitModel);

/***把 namespace 带过来，以便生成路径*/
export const roleReducers = modelPathsProxy<RoleReducers>(roleInitModel);

export class RoleDispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: roleInitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }

  static setup_effect(params: { roleIds?: string[], roleNameLike?: string, descriptionLike?: string, createTimeMin?: Date, createTimeMax?: Date, updateTimeMin?: Date, updateTimeMax?: Date, roleTypes?: RoleType[], showDateMin?: Date, showDateMax?: Date, showTimeMin?: Date, showTimeMax?: Date, showDateTimeMin?: Date, showDateTimeMax?: Date, page?: number, pageSize?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: RoleState) {
    return {
      type: roleInitModel.namespace + '/setup',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  }

  /** 删除角色 */
  static delete_effect(params: { roleId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: RoleState) {
    return {
      type: roleInitModel.namespace + '/delete',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /** 批量删除角色 */
  static deleteByRoleIds_effect(params: { roleIds?: string[] }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: RoleState) {
    return {
      type: roleInitModel.namespace + '/deleteByRoleIds',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /** 角色分页列表,多条件 */
  static getRolePageList_effect(params: { roleIds?: string[], roleNameLike?: string, descriptionLike?: string, createTimeMin?: Date, createTimeMax?: Date, updateTimeMin?: Date, updateTimeMax?: Date, roleTypes?: RoleType[], showDateMin?: Date, showDateMax?: Date, showTimeMin?: Date, showTimeMax?: Date, showDateTimeMin?: Date, showDateTimeMax?: Date, page?: number, pageSize?: number }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: RoleState) {
    return {
      type: roleInitModel.namespace + '/getRolePageList',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };

  static getRolePageList_next_effect() {
    return {
      type: roleInitModel.namespace + '/getRolePageList_next',
      payload: {
      }
    }
  };


  /** 创建角色 */
  static insert_effect(params: { roleId?: string, roleName?: string, description?: string, roleType?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: RoleState) {
    return {
      type: roleInitModel.namespace + '/insert',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  /** 更新角色 */
  static update_effect(params: { roleName?: string, description?: string, roleType?: string, roleId?: string }, areaExtraProps__?: AreaState<any>, stateExtraProps__?: RoleState) {
    return {
      type: roleInitModel.namespace + '/update',
      payload: {
        ...params,
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };


  static updateState_reducer(roleState: RoleState) {
    return {
      type: roleInitModel.namespace + '/updateState',
      payload: {
        ...roleState,
      }
    }
  }

}