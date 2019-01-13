/**
 *  Do not remove this unless you get business authorization.
 *  TopicReply
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import TopicReply from "../beans/TopicReply"
import UIColumns from "@utils/UIColumns";

namespace TopicReplyColumns {

  /** author  */
  export const author = {
    key: 'author',
    dataIndex: 'author',
    title: 'author',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return author.renderColumn(record, null, text, index, author);
    },
  } as ColumnConfig<TopicReply>;

  /** ups  */
  export const ups = {
    key: 'ups',
    dataIndex: 'ups',
    title: 'ups',
    renderColumn: UIColumns.InputRender,
    isArray: true,
    config: {
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return ups.renderColumn(record, null, text, index, ups);
    },
  } as ColumnConfig<TopicReply>;

  /** isUped  */
  export const isUped = {
    key: 'isUped',
    dataIndex: 'isUped',
    title: 'isUped',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return isUped.renderColumn(record, null, text, index, isUped);
    },
  } as ColumnConfig<TopicReply>;

  /** upCount  */
  export const upCount = {
    key: 'upCount',
    dataIndex: 'upCount',
    title: 'upCount',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return upCount.renderColumn(record, null, text, index, upCount);
    },
  } as ColumnConfig<TopicReply>;

  /** replyId  */
  export const replyId = {
    key: 'replyId',
    dataIndex: 'replyId',
    title: 'replyId',
    renderColumn: UIColumns.InputRender,
    isId: true,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return replyId.renderColumn(record, null, text, index, replyId);
    },
  } as ColumnConfig<TopicReply>;

  /** topicId  */
  export const topicId = {
    key: 'topicId',
    dataIndex: 'topicId',
    title: 'topicId',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return topicId.renderColumn(record, null, text, index, topicId);
    },
  } as ColumnConfig<TopicReply>;

  /** authorId  */
  export const authorId = {
    key: 'authorId',
    dataIndex: 'authorId',
    title: 'authorId',
    renderColumn: UIColumns.SelectRender,
    referConfig: {
      api: 'getUserOptions',
      referField: 'author',
    },
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',
    render: (text: any, record: TopicReply, index: number) =>{
      return authorId.renderColumn(record, null, text, index, authorId);
    },
  } as ColumnConfig<TopicReply>;

  /** content  */
  export const content = {
    key: 'content',
    dataIndex: 'content',
    title: 'content',
    renderColumn: UIColumns.TextareaRender,
    config: {
      rules: [
        {
          max: 65535,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',
    render: (text: any, record: TopicReply, index: number) =>{
      return content.renderColumn(record, null, text, index, content);
    },
  } as ColumnConfig<TopicReply>;

  /** parentReplyId  */
  export const parentReplyId = {
    key: 'parentReplyId',
    dataIndex: 'parentReplyId',
    title: 'parentReplyId',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return parentReplyId.renderColumn(record, null, text, index, parentReplyId);
    },
  } as ColumnConfig<TopicReply>;

  /** 创建时间  TIMESTAMP*/
  export const createTime = {
    key: 'createTime',
    dataIndex: 'createTime',
    title: '创建时间',
    renderColumn: UIColumns.TimeStampRender,
    hidden: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<TopicReply>;

  /** 更新时间  TIMESTAMP*/
  export const updateTime = {
    key: 'updateTime',
    dataIndex: 'updateTime',
    title: '更新时间',
    renderColumn: UIColumns.TimeStampRender,
    hidden: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<TopicReply>;

  /** 是否删除(0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除(0:正常',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<TopicReply>;

  /** replyId s  */
  export const replyIds = {
    key: 'replyIds',
    dataIndex: 'replyIds',
    title: 'replyId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** topicId s  */
  export const topicIds = {
    key: 'topicIds',
    dataIndex: 'topicIds',
    title: 'topicId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** authorId s  */
  export const authorIds = {
    key: 'authorIds',
    dataIndex: 'authorIds',
    title: 'authorId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** contentLike  */
  export const contentLike = {
    key: 'contentLike',
    dataIndex: 'contentLike',
    title: 'contentLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** parentReplyId s  */
  export const parentReplyIds = {
    key: 'parentReplyIds',
    dataIndex: 'parentReplyIds',
    title: 'parentReplyId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** 创建时间Min  TIMESTAMP*/
  export const createTimeMin = {
    key: 'createTimeMin',
    dataIndex: 'createTimeMin',
    title: '创建时间Min',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** 创建时间Max  TIMESTAMP*/
  export const createTimeMax = {
    key: 'createTimeMax',
    dataIndex: 'createTimeMax',
    title: '创建时间Max',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** 更新时间Min  TIMESTAMP*/
  export const updateTimeMin = {
    key: 'updateTimeMin',
    dataIndex: 'updateTimeMin',
    title: '更新时间Min',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** 更新时间Max  TIMESTAMP*/
  export const updateTimeMax = {
    key: 'updateTimeMax',
    dataIndex: 'updateTimeMax',
    title: '更新时间Max',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<TopicReply>;

  /** id  */
  export const id = {
    key: 'id',
    dataIndex: 'id',
    title: 'id',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: TopicReply, index: number) =>{
      return id.renderColumn(record, null, text, index, id);
    },
  } as ColumnConfig<TopicReply>;


  export const topicReplyRenderColumns = {
    ups,
    isUped,
    upCount,
    replyId,
    topicId,
    authorId,
    content,
    parentReplyId,
    createTime,
    updateTime,
    id,
  }

}

export default TopicReplyColumns;