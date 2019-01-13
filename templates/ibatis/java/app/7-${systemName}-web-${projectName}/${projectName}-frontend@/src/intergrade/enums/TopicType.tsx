/**
 *  Do not remove this unless you get business authorization.
 *  TopicType
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Options} from "@utils/DvaUtil"

enum TopicType {
  /** 精华 */
  good = "good",
  /** 分享 */
  share = "share",
  /** 问答 */
  ask = "ask",
  /** 招聘 */
  job = "job",
  /** 测试 */
  dev = "dev"

}

export const topicTypeOptions = {
  /** 精华 */
  good: {
    value: TopicType.good,
    title: '精华',
  },

  /** 分享 */
  share: {
    value: TopicType.share,
    title: '分享',
  },

  /** 问答 */
  ask: {
    value: TopicType.ask,
    title: '问答',
  },

  /** 招聘 */
  job: {
    value: TopicType.job,
    title: '招聘',
  },

  /** 测试 */
  dev: {
    value: TopicType.dev,
    title: '测试',
  }

}

export default TopicType;