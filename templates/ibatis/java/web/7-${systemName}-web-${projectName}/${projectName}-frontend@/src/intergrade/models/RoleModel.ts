/**
 *  Do not remove this unless you get business authorization.
 *  Role
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {roleInitModel, RoleModel, RoleState} from "../interfaces/RoleFaces";
import RoleApis from "../apis/RoleApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Role from "../beans/Role";
import RoleType from "../enums/RoleType";


export class RoleCommand extends BaseCommand {
  static * setup_effect({payload}, {call, put, select}) {
    let newPayload = {};

    /** 角色分页列表,多条件 */
    const getRolePageListPayload = yield RoleCommand.getRolePageList_effect({payload}, {call, put, select});
    newPayload = RoleCommand.getRolePageList_success_reducer(<RoleState>newPayload, getRolePageListPayload);
    return newPayload;
  };

  static setup_success_type(payload) {
    return {type: "setup_success", payload: payload};
  }


  /** 删除角色 */
  static * delete_effect({payload}, {call, put, select}) {
    const result: string = yield call(RoleApis.delete, payload);
    const oldRoleArea = yield select((_) => _.role.roleArea);
    const roles = delateArray(oldRoleArea.list, result ? result : null, "roleId");

    const newPayload: RoleState = {
      roleArea: {
        list: roles,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static delete_success_type(payload) {
    return {type: "delete_success", payload: payload};
  }

  /** 删除角色  成功后 更新状态*/
  static delete_success_reducer = (state: RoleState, payload): RoleState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 批量删除角色 */
  static * deleteByRoleIds_effect({payload}, {call, put, select}) {
    const result: string[] = yield call(RoleApis.deleteByRoleIds, payload);
    const oldRoleArea = yield select((_) => _.role.roleArea);
    const roles = delateArray(oldRoleArea.list, result ? result : null, "roleId");

    const newPayload: RoleState = {
      roleArea: {
        list: roles,
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static deleteByRoleIds_success_type(payload) {
    return {type: "deleteByRoleIds_success", payload: payload};
  }

  /** 批量删除角色  成功后 更新状态*/
  static deleteByRoleIds_success_reducer = (state: RoleState, payload): RoleState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 角色分页列表,多条件 */
  static * getRolePageList_effect({payload}, {call, put, select}) {
    const oldRoleArea = yield select((_) => _.role.roleArea);
    payload = {page: 1, pageSize: 10, ...oldRoleArea.queryRule, ...payload};
    const rolePageList: AntdPageList<Role> = yield call(RoleApis.getRolePageList, payload);
    const pagination = rolePageList ? rolePageList.pagination : null;

    const newPayload: RoleState = {
      roleArea: {
        list: rolePageList ? rolePageList.list : [],
        pagination,
        queryRule: payload,
        ...{
          doEdit: false,
        },
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static getRolePageList_success_type(payload) {
    return {type: "getRolePageList_success", payload: payload};
  }

  static * getRolePageList_next_effect({payload}, {call, put, select}) {
    const oldRoleArea = yield select((_) => _.role.roleArea);
    const pagination = oldRoleArea.pagination;
    let page = pagination.current;
    page = (page ? page : 0) + 1;
    const totalPages = Math.trunc(pagination.total / (pagination.pageSize || 10)) + 1;
    page = Math.min(page, totalPages)
    payload = {...oldRoleArea.queryRule, page};
    const newPayload = yield RoleCommand.getRolePageList_effect({payload}, {call, put, select});
    return newPayload;
  }

  /** 角色分页列表,多条件  成功后 更新状态*/
  static getRolePageList_success_reducer = (state: RoleState, payload): RoleState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 创建角色 */
  static * insert_effect({payload}, {call, put, select}) {
    const role: Role = yield call(RoleApis.insert, payload);
    const oldRoleArea = yield select((_) => _.role.roleArea);
    const roles = updateArray(oldRoleArea.list, role ? role : null, "roleId");

    const newPayload: RoleState = {
      roleArea: {
        list: roles,
        ...{
          doEdit: false,
        },
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static insert_success_type(payload) {
    return {type: "insert_success", payload: payload};
  }

  /** 创建角色  成功后 更新状态*/
  static insert_success_reducer = (state: RoleState, payload): RoleState => {
    return mergeObjects(
      state,
      payload,
    );
  };

  /** 更新角色 */
  static * update_effect({payload}, {call, put, select}) {
    const role: Role = yield call(RoleApis.update, payload);
    const oldRoleArea = yield select((_) => _.role.roleArea);
    const roles = updateArray(oldRoleArea.list, role ? role : null, "roleId");

    const newPayload: RoleState = {
      roleArea: {
        list: roles,
        ...{
          doEdit: false,
        },
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static update_success_type(payload) {
    return {type: "update_success", payload: payload};
  }

  /** 更新角色  成功后 更新状态*/
  static update_success_reducer = (state: RoleState, payload): RoleState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const roleModel: RoleModel = roleInitModel;

roleModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(roleModel.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
    const getRolePageListParams = roleModel.getRolePageListInitParamsFn ? roleModel.getRolePageListInitParamsFn({pathname, match, keys}) : null;
    payload = {...payload, ...getRolePageListParams}
    dispatch({
      type: 'role/setup',
      payload,
    })
  })
};

roleModel.effects.setup = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, roleModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (roleModel.getInitState) {
    const initState = roleModel.getInitState();
    yield put(RoleCommand.updateState_type(initState));
  }

  const newPayload = yield RoleCommand.setup_effect({payload}, {call, put, select});
  yield put(RoleCommand.setup_success_type(newPayload));
};

roleModel.reducers.setup_success = (state: RoleState, {payload}): RoleState => {
  return mergeObjects(
    state,
    payload,
  );
};

/** 删除角色 */
roleModel.effects.delete = function* ({payload}, {call, put, select}) {
  const newPayload = yield RoleCommand.delete_effect({payload}, {call, put, select});
  yield put(RoleCommand.delete_success_type(newPayload));
};

roleModel.reducers.delete_success = (state: RoleState, {payload}): RoleState => {
  return RoleCommand.delete_success_reducer(state, payload);
};

/** 批量删除角色 */
roleModel.effects.deleteByRoleIds = function* ({payload}, {call, put, select}) {
  const newPayload = yield RoleCommand.deleteByRoleIds_effect({payload}, {call, put, select});
  yield put(RoleCommand.deleteByRoleIds_success_type(newPayload));
};

roleModel.reducers.deleteByRoleIds_success = (state: RoleState, {payload}): RoleState => {
  return RoleCommand.deleteByRoleIds_success_reducer(state, payload);
};

/** 角色分页列表,多条件 */
roleModel.effects.getRolePageList = function* ({payload}, {call, put, select}) {
  const newPayload = yield RoleCommand.getRolePageList_effect({payload}, {call, put, select});
  yield put(RoleCommand.getRolePageList_success_type(newPayload));
};

roleModel.effects.getRolePageList_next = function* ({payload}, {call, put, select}) {
  const newPayload = yield RoleCommand.getRolePageList_next_effect({payload}, {call, put, select});
  yield put(RoleCommand.getRolePageList_success_type(newPayload));
};

roleModel.reducers.getRolePageList_success = (state: RoleState, {payload}): RoleState => {
  return RoleCommand.getRolePageList_success_reducer(state, payload);
};

/** 创建角色 */
roleModel.effects.insert = function* ({payload}, {call, put, select}) {
  const newPayload = yield RoleCommand.insert_effect({payload}, {call, put, select});
  yield put(RoleCommand.insert_success_type(newPayload));
};

roleModel.reducers.insert_success = (state: RoleState, {payload}): RoleState => {
  return RoleCommand.insert_success_reducer(state, payload);
};

/** 更新角色 */
roleModel.effects.update = function* ({payload}, {call, put, select}) {
  const newPayload = yield RoleCommand.update_effect({payload}, {call, put, select});
  yield put(RoleCommand.update_success_type(newPayload));
};

roleModel.reducers.update_success = (state: RoleState, {payload}): RoleState => {
  return RoleCommand.update_success_reducer(state, payload);
};
