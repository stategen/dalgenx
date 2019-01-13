/**
 *  Do not remove this unless you get business authorization.
 *  User
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";
import {apiUrlKey} from "../configs/tradeCms-config";

export default class UserApis {
  /**
   * POST /api/user/delete
   * 删除用户
   */
  static delete(params: { userId: string } | string): string {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/user/delete';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {userId: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/user/deleteByUserIds
   * 批量删除用户
   */
  static deleteByUserIds(params: { userIds?: string[] } | string[]): string[] {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/user/deleteByUserIds';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {userIds: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/user/getUserPageList
   * 用户列表
   */
  static getUserPageList(params: { userId?: string, userIds?: string[], usernameLike?: string, roleTypes?: string[], ageMin?: number, ageMax?: number, valiDatetimeMin?: Date, birthdayDateMin?: Date, workTimeMin?: Date, provinceId?: string, cityIds?: string[], statuss?: StatusEnum[], gradeMin?: number, postAddressId?: string, page?: number, pageSize?: number }): AntdPageList<User> {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/user/getUserPageList';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/user/insert
   * 创建用户
   */
  static insert(params: { hoppyIds?: number[], cascaderPostAddressIds?: number[], username?: string, password?: string, roleType?: string, name?: string, nickName?: string, age?: number, address?: string, avatarImgId?: string, email?: string, valiDatetime?: Date, birthdayDate?: Date, workTime?: Date, provinceId?: string, cityId?: string, status?: StatusEnum, grade?: number, sex?: boolean, postAddressId?: string, userId?: string }): User {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/user/insert';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/user/update
   * 修改用户
   */
  static update(params: { hoppyIds?: number[], cascaderPostAddressIds?: number[], username?: string, password?: string, roleType?: string, name?: string, nickName?: string, age?: number, address?: string, avatarImgId?: string, email?: string, valiDatetime?: Date, birthdayDate?: Date, workTime?: Date, provinceId?: string, cityId?: string, status?: StatusEnum, grade?: number, sex?: boolean, postAddressId?: string, userId?: string }): User {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/user/update';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

}