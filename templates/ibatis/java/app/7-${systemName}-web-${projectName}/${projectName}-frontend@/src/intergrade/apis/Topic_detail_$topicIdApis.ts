/**
 *  Do not remove this unless you get business authorization.
 *  Topic_detail_$topicId
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

import PageList from "../beans/PageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicReply from "../beans/TopicReply";
import {apiUrlKey} from "../configs/tradeApp-config";

export default class Topic_detail_$topicIdApis {
  /**
   * POST /api/topic/:topicId/postReply
   * 
   */
  static PostReply(params: { topicId: string, topicReply?: TopicReply }): TopicReply {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/:topicId/postReply';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/topic/:topicId
   * 
   */
  static getTopicDetail(params: { topicId: string } | string): Topic {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/:topicId';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {topicId: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/topic/:topicId/getReplies
   * 
   */
  static getTopicReplyPageList(params: { topicId: string, page?: number, pageSize?: number }): PageList<TopicReply> {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/:topicId/getReplies';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/topic/reply/:replyId
   * 
   */
  static replyUp(params: { replyId: string } | string): TopicReply {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/reply/:replyId';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {replyId: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

}