/**
 *  Do not remove this unless you get business authorization.
 *  User_$userId
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

import User from "../beans/User";
import {apiUrlKey} from "../configs/tradeCms-config";

export default class User_$userIdApis {
  /**
   * POST /api/user/:userId
   * 获取用户详情
   */
  static getUserById(params: { userId: string } | string): User {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/user/:userId';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {userId: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

}