/**
 *  Do not remove this unless you get business authorization.
 *  User_me
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

import RoleType from "../enums/RoleType";
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";
import {apiUrlKey} from "../configs/tradeApp-config";

export default class User_meApis {
  /**
   * POST /api/user/getCurrentUser
   * 
   */
  static getCurrentUser(params?: {}): User {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/user/getCurrentUser';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/user/update
   * 修改用户
   */
  static update(params: { hoppyIds?: number[], cascaderPostAddressIds?: number[], username?: string, password?: string, roleType?: RoleType, name?: string, nickName?: string, age?: number, address?: string, avatarImgId?: string, email?: string, valiDatetime?: Date, birthdayDate?: Date, workTime?: Date, provinceId?: string, cityId?: string, status?: StatusEnum, grade?: number, sex?: boolean, postAddressId?: string, userId?: string }): User {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/user/update';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

}