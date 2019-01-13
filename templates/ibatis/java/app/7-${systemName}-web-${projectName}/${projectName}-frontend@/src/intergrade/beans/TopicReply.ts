/**
 *  Do not remove this unless you get business authorization.
 *  TopicReply
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import User from "../beans/User";
import {Bean} from "@utils/DvaUtil";

/** replyId */
export const TopicReply_ID: string = 'replyId';

export default interface TopicReply extends Bean {

  /** author */
  author?: User;

  /** ups */
  ups?: string[];

  /** isUped */
  isUped?: boolean;

  /** upCount */
  upCount?: number;

  /** replyId */
  replyId?: string;

  /** topicId */
  topicId?: string;

  /** authorId */
  authorId?: string;

  /** content */
  content?: string;

  /** parentReplyId */
  parentReplyId?: string;

  /** 创建时间 */
  createTime?: Date;

  /** 更新时间 */
  updateTime?: Date;

  /** 是否删除(0:正常，1删除) */
  deleteFlag?: number;

  /** replyId s */
  replyIds?: string[];

  /** topicId s */
  topicIds?: string[];

  /** authorId s */
  authorIds?: string[];

  /** contentLike */
  contentLike?: string;

  /** parentReplyId s */
  parentReplyIds?: string[];

  /** 创建时间Min */
  createTimeMin?: Date;

  /** 创建时间Max */
  createTimeMax?: Date;

  /** 更新时间Min */
  updateTimeMin?: Date;

  /** 更新时间Max */
  updateTimeMax?: Date;

  /** id */
  id?: string;

}

