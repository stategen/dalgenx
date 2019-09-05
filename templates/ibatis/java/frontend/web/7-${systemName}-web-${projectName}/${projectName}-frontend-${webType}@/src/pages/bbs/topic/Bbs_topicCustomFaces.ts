/**
 *  Do not remove this unless you get business authorization.
 *  Bbs_topic
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Subscriptions, Reducer, AreaState, mergeObjects} from '@utils/DvaUtil';
import AntdPageList from "@i/beans/AntdPageList";
import {PaginationProps} from "antd/lib/pagination";
import Topic from "@i/beans/Topic";
import TopicType from "@i/enums/TopicType";
import {Bbs_topicState} from '@i/interfaces/Bbs_topicFaces';

/*** keep this export */
export const bbs_topicCustomState = {

}

/*** keep this export */
export interface Bbs_topicCustomSubscriptions extends Subscriptions {

}

/*** keep this export */
export interface Bbs_topicCustomEffects extends Effects {

}

/*** keep this export */
export interface Bbs_topicCustomReducers extends Reducers<Bbs_topicState> {

}
