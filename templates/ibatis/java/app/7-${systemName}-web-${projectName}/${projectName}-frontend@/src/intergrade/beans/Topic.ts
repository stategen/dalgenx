/**
 *  Do not remove this unless you get business authorization.
 *  Topic
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import TopicType from "../enums/TopicType";
import User from "../beans/User";
import {Bean} from "@utils/DvaUtil";

/** topicId */
export const Topic_ID: string = 'topicId';

export default interface Topic extends Bean {

  /** author */
  author?: User;

  /** replyCount */
  replyCount?: number;

  /** 主题ID */
  topicId?: string;

  /** 作者ID */
  authorId?: string;

  /** 主题类型 */
  topicType?: TopicType;

  /** 内容 */
  content?: string;

  /** 标题 */
  title?: string;

  /** 最后回复 */
  lastReplyAt?: Date;

  /** 精华 */
  good?: number;

  /** 置顶 */
  top?: number;

  /** 浏览次数 */
  visitCount?: number;

  /** 创建时间 */
  createTime?: Date;

  /** 更新时间 */
  updateTime?: Date;

  /** 是否删除(0:正常，1删除) */
  deleteFlag?: number;

  /** 主题ID s */
  topicIds?: string[];

  /** 作者ID s */
  authorIds?: string[];

  /** 主题类型 s */
  topicTypes?: TopicType[];

  /** 内容Like */
  contentLike?: string;

  /** 标题Like */
  titleLike?: string;

  /** 最后回复Min */
  lastReplyAtMin?: Date;

  /** 最后回复Max */
  lastReplyAtMax?: Date;

  /** 精华Min */
  goodMin?: number;

  /** 精华Max */
  goodMax?: number;

  /** 置顶Min */
  topMin?: number;

  /** 置顶Max */
  topMax?: number;

  /** 浏览次数Min */
  visitCountMin?: number;

  /** 浏览次数Max */
  visitCountMax?: number;

  /** 创建时间Min */
  createTimeMin?: Date;

  /** 创建时间Max */
  createTimeMax?: Date;

  /** 更新时间Min */
  updateTimeMin?: Date;

  /** 更新时间Max */
  updateTimeMax?: Date;

}

