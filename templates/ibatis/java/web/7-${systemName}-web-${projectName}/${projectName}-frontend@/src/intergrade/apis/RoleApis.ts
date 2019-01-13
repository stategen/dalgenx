/**
 *  Do not remove this unless you get business authorization.
 *  Role
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Role from "../beans/Role";
import RoleType from "../enums/RoleType";
import {apiUrlKey} from "../configs/tradeCms-config";

export default class RoleApis {
  /**
   * POST /api/role/delete
   * 删除角色
   */
  static delete(params: { roleId?: string } | string): string {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/role/delete';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {roleId: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/role/deleteByRoleIds
   * 批量删除角色
   */
  static deleteByRoleIds(params: { roleIds: string[] } | string[]): string[] {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/role/deleteByRoleIds';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {roleIds: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/role/getRolePageList
   * 角色分页列表,多条件
   */
  static getRolePageList(params: { roleIds?: string[], roleNameLike?: string, descriptionLike?: string, createTimeMin?: Date, createTimeMax?: Date, updateTimeMin?: Date, updateTimeMax?: Date, roleTypes?: RoleType[], showDateMin?: Date, showDateMax?: Date, showTimeMin?: Date, showTimeMax?: Date, showDateTimeMin?: Date, showDateTimeMax?: Date, page?: number, pageSize?: number }): AntdPageList<Role> {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/role/getRolePageList';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/role/insert
   * 创建角色
   */
  static insert(params: { roleId?: string, roleName?: string, description?: string, roleType?: string }): Role {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/role/insert';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/role/update
   * 更新角色
   */
  static update(params: { roleName?: string, description?: string, roleType?: string, roleId?: string }): Role {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/role/update';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

}