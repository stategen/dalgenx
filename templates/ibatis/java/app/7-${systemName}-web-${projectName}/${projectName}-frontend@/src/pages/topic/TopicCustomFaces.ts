/**
 *  Do not remove this unless you get business authorization.
 *  Topic
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Subscriptions, Reducer, AreaState, mergeObjects} from '@utils/DvaUtil';
import Topic from "@i/beans/Topic";
import TopicReply from "@i/beans/TopicReply";
import {TopicState} from '@i/interfaces/TopicFaces';
import TopicType from "@i/enums/TopicType";

/*** keep this export */
export const topicCustomState = {
  topicType: TopicType.all,
  isLoading:true,
  height:0,
}

/*** keep this export */
export interface TopicCustomSubscriptions extends Subscriptions {

}

/*** keep this export */
export interface TopicCustomEffects extends Effects {

}

/*** keep this export */
export interface TopicCustomReducers extends Reducers<TopicState> {

}
