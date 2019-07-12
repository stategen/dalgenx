/**
 *  Do not remove this unless you get business authorization.
 *  Topic_detail_$topicId
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Subscriptions, Reducer, AreaState, mergeObjects} from '@utils/DvaUtil';
import PageList from "@i/beans/PageList";
import {PaginationProps} from "antd/lib/pagination";
import Topic from "@i/beans/Topic";
import TopicReply from "@i/beans/TopicReply";
import {Topic_detail_$topicIdState} from '@i/interfaces/Topic_detail_$topicIdFaces';

/*** keep this export */
export const topic_detail_$topicIdCustomState = {

}

/*** keep this export */
export interface Topic_detail_$topicIdCustomSubscriptions extends Subscriptions {

}

/*** keep this export */
export interface Topic_detail_$topicIdCustomEffects extends Effects {

}

/*** keep this export */
export interface Topic_detail_$topicIdCustomReducers extends Reducers<Topic_detail_$topicIdState> {

}

export interface TopicReplyEx extends TopicReply{
  show
}
