/**
 *  Do not remove this unless you get business authorization.
 *  FileSummary
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

import FileSummary from "../beans/FileSummary";
import {UploadFile} from 'antd/es/upload/interface';
import {apiUrlKey} from "../configs/tradeCms-config";

export default class FileSummaryApis {
  /**
   * POST /api/fileSummary/upload
   * 
   */
  static upload(params: { file: UploadFile } | UploadFile): FileSummary {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/fileSummary/upload';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {file: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

}