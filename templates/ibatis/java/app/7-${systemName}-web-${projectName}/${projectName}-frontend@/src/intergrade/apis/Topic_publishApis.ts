/**
 *  Do not remove this unless you get business authorization.
 *  Topic_publish
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";
import {apiUrlKey} from "../configs/tradeApp-config";

export default class Topic_publishApis {
  /**
   * POST /api/topic/saveTopic
   * 
   */
  static saveTopic(params: { topicId?: string, topicType?: TopicType, content?: string, title?: string }): Topic {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/saveTopic';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

}