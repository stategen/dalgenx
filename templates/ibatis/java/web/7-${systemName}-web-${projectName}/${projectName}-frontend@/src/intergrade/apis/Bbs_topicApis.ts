/**
 *  Do not remove this unless you get business authorization.
 *  Bbs_topic
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";
import {apiUrlKey} from "../configs/tradeCms-config";

export default class Bbs_topicApis {
  /**
   * POST /api/topic/delete
   * 
   */
  static delete(params: { topicId?: string } | string): string {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/delete';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {topicId: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/topic/deleteByTopicIds
   * 
   */
  static deleteByTopicIds(params: { topicIds?: string[] } | string[]): string[] {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/deleteByTopicIds';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = (params instanceof Object && !Array.isArray(params)) ? params : {topicIds: params};
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/topic/getTopicPageList
   * 
   */
  static getTopicPageList(params: { topicIds?: string[], authorIds?: string[], topicType?: TopicType, topicTypes?: TopicType[], title?: string, titleLike?: string, visitCountMin?: number, visitCountMax?: number, page?: number, pageSize?: number }): AntdPageList<Topic> {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/getTopicPageList';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/topic/insert
   * 
   */
  static insert(params: { topicId?: string, authorId?: string, topicType?: TopicType, content?: string, title?: string, lastReplyAt?: Date, good?: number, top?: number, visitCount?: number }): Topic {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/insert';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

  /**
   * POST /api/topic/update
   * 
   */
  static update(params: { authorId?: string, topicType?: TopicType, content?: string, title?: string, lastReplyAt?: Date, good?: number, top?: TopicType, visitCount?: number, topicId?: string }): Topic {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '/api/topic/update';
    requestInit.mediaType = MediaType.FORM;
    requestInit.data = params;
    requestInit.method = Method.POST;
    return Net.fetch(requestInit);
  }

}