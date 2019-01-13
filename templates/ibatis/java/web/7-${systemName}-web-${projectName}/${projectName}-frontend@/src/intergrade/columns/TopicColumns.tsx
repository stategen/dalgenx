/**
 *  Do not remove this unless you get business authorization.
 *  Topic
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import Topic from "../beans/Topic"
import UIColumns from "@utils/UIColumns";
import {topicTypeOptions} from '../enums/TopicType';

namespace TopicColumns {

  /** author  */
  export const author = {
    key: 'author',
    dataIndex: 'author',
    title: 'author',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Topic, index: number) =>{
      return author.renderColumn(record, null, text, index, author);
    },
  } as ColumnConfig<Topic>;

  /** replyCount  */
  export const replyCount = {
    key: 'replyCount',
    dataIndex: 'replyCount',
    title: 'replyCount',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Topic, index: number) =>{
      return replyCount.renderColumn(record, null, text, index, replyCount);
    },
  } as ColumnConfig<Topic>;

  /** 主题ID  */
  export const topicId = {
    key: 'topicId',
    dataIndex: 'topicId',
    title: '主题ID',
    renderColumn: UIColumns.HiddenRender,
    isId: true,
    typeIsHidden: true,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',
    render: (text: any, record: Topic, index: number) =>{
      return topicId.renderColumn(record, null, text, index, topicId);
    },
  } as ColumnConfig<Topic>;

  /** 作者ID  */
  export const authorId = {
    key: 'authorId',
    dataIndex: 'authorId',
    title: '作者ID',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Topic, index: number) =>{
      return authorId.renderColumn(record, null, text, index, authorId);
    },
  } as ColumnConfig<Topic>;

  /** 主题类型  */
  export const topicType = {
    key: 'topicType',
    dataIndex: 'topicType',
    title: '主题类型',
    renderColumn: UIColumns.SelectRender,
    isEnum: true,
    referConfig: {
      options: topicTypeOptions,
    },
    config: {
    },
    render: (text: any, record: Topic, index: number) =>{
      return topicType.renderColumn(record, null, text, index, topicType);
    },
  } as ColumnConfig<Topic>;

  /** 内容  */
  export const content = {
    key: 'content',
    dataIndex: 'content',
    title: '内容',
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
    render: (text: any, record: Topic, index: number) =>{
      return content.renderColumn(record, null, text, index, content);
    },
  } as ColumnConfig<Topic>;

  /** 标题  */
  export const title = {
    key: 'title',
    dataIndex: 'title',
    title: '标题',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Topic, index: number) =>{
      return title.renderColumn(record, null, text, index, title);
    },
  } as ColumnConfig<Topic>;

  /** 最后回复  TIMESTAMP*/
  export const lastReplyAt = {
    key: 'lastReplyAt',
    dataIndex: 'lastReplyAt',
    title: '最后回复',
    renderColumn: UIColumns.TimeStampRender,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
    render: (text: any, record: Topic, index: number) =>{
      return lastReplyAt.renderColumn(record, null, text, index, lastReplyAt);
    },
  } as ColumnConfig<Topic>;

  /** 精华  */
  export const good = {
    key: 'good',
    dataIndex: 'good',
    title: '精华',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Topic, index: number) =>{
      return good.renderColumn(record, null, text, index, good);
    },
  } as ColumnConfig<Topic>;

  /** 置顶  */
  export const top = {
    key: 'top',
    dataIndex: 'top',
    title: '置顶',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Topic, index: number) =>{
      return top.renderColumn(record, null, text, index, top);
    },
  } as ColumnConfig<Topic>;

  /** 浏览次数  */
  export const visitCount = {
    key: 'visitCount',
    dataIndex: 'visitCount',
    title: '浏览次数',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Topic, index: number) =>{
      return visitCount.renderColumn(record, null, text, index, visitCount);
    },
  } as ColumnConfig<Topic>;

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
    render: (text: any, record: Topic, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<Topic>;

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
    render: (text: any, record: Topic, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<Topic>;

  /** 是否删除(0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除(0:正常',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: Topic, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<Topic>;

  /** 主题ID s  */
  export const topicIds = {
    key: 'topicIds',
    dataIndex: 'topicIds',
    title: '主题ID',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 作者ID s  */
  export const authorIds = {
    key: 'authorIds',
    dataIndex: 'authorIds',
    title: '作者ID',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 主题类型 s  */
  export const topicTypes = {
    key: 'topicTypes',
    dataIndex: 'topicTypes',
    title: '主题类型',
    noJson: true,
    isEnum: true,
    isArray: true,
    referConfig: {
      options: topicTypeOptions,
    },
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 内容Like  */
  export const contentLike = {
    key: 'contentLike',
    dataIndex: 'contentLike',
    title: '内容Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 标题Like  */
  export const titleLike = {
    key: 'titleLike',
    dataIndex: 'titleLike',
    title: '标题Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 最后回复Min  TIMESTAMP*/
  export const lastReplyAtMin = {
    key: 'lastReplyAtMin',
    dataIndex: 'lastReplyAtMin',
    title: '最后回复Min',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 最后回复Max  TIMESTAMP*/
  export const lastReplyAtMax = {
    key: 'lastReplyAtMax',
    dataIndex: 'lastReplyAtMax',
    title: '最后回复Max',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 精华Min  */
  export const goodMin = {
    key: 'goodMin',
    dataIndex: 'goodMin',
    title: '精华Min',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 精华Max  */
  export const goodMax = {
    key: 'goodMax',
    dataIndex: 'goodMax',
    title: '精华Max',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 置顶Min  */
  export const topMin = {
    key: 'topMin',
    dataIndex: 'topMin',
    title: '置顶Min',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 置顶Max  */
  export const topMax = {
    key: 'topMax',
    dataIndex: 'topMax',
    title: '置顶Max',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 浏览次数Min  */
  export const visitCountMin = {
    key: 'visitCountMin',
    dataIndex: 'visitCountMin',
    title: '浏览次数Min',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Topic>;

  /** 浏览次数Max  */
  export const visitCountMax = {
    key: 'visitCountMax',
    dataIndex: 'visitCountMax',
    title: '浏览次数Max',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Topic>;

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
  } as ColumnConfig<Topic>;

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
  } as ColumnConfig<Topic>;

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
  } as ColumnConfig<Topic>;

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
  } as ColumnConfig<Topic>;


  export const renderColumns = {
    replyCount,
    topicId,
    authorId,
    topicType,
    content,
    title,
    lastReplyAt,
    good,
    top,
    visitCount,
    createTime,
    updateTime,
  }

}

export default TopicColumns;