/**
 *  Do not remove this unless you get business authorization.
 *  FileSummary
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import FileSummary from "../beans/FileSummary"
import UIColumns from "@utils/UIColumns";

namespace FileSummaryColumns {

  /** fileId  */
  export const fileId = {
    key: 'fileId',
    dataIndex: 'fileId',
    title: 'fileId',
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
    render: (text: any, record: FileSummary, index: number) =>{
      return fileId.renderColumn(record, null, text, index, fileId);
    },
  } as ColumnConfig<FileSummary>;

  /** url  */
  export const url = {
    key: 'url',
    dataIndex: 'url',
    title: 'url',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 255,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: FileSummary, index: number) =>{
      return url.renderColumn(record, null, text, index, url);
    },
  } as ColumnConfig<FileSummary>;

  /** size  */
  export const size = {
    key: 'size',
    dataIndex: 'size',
    title: 'size',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: FileSummary, index: number) =>{
      return size.renderColumn(record, null, text, index, size);
    },
  } as ColumnConfig<FileSummary>;

  /** name  */
  export const name = {
    key: 'name',
    dataIndex: 'name',
    title: 'name',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 128,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: FileSummary, index: number) =>{
      return name.renderColumn(record, null, text, index, name);
    },
  } as ColumnConfig<FileSummary>;

  /** type  */
  export const type = {
    key: 'type',
    dataIndex: 'type',
    title: 'type',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: FileSummary, index: number) =>{
      return type.renderColumn(record, null, text, index, type);
    },
  } as ColumnConfig<FileSummary>;

  /** userId  */
  export const userId = {
    key: 'userId',
    dataIndex: 'userId',
    title: 'userId',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: FileSummary, index: number) =>{
      return userId.renderColumn(record, null, text, index, userId);
    },
  } as ColumnConfig<FileSummary>;

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
    render: (text: any, record: FileSummary, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<FileSummary>;

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
    render: (text: any, record: FileSummary, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<FileSummary>;

  /** 是否删除 (0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: FileSummary, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<FileSummary>;

  /** fileId s  */
  export const fileIds = {
    key: 'fileIds',
    dataIndex: 'fileIds',
    title: 'fileId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<FileSummary>;

  /** sizeMin  */
  export const sizeMin = {
    key: 'sizeMin',
    dataIndex: 'sizeMin',
    title: 'sizeMin',
    noJson: true,
    config: {
    },
  } as ColumnConfig<FileSummary>;

  /** sizeMax  */
  export const sizeMax = {
    key: 'sizeMax',
    dataIndex: 'sizeMax',
    title: 'sizeMax',
    noJson: true,
    config: {
    },
  } as ColumnConfig<FileSummary>;

  /** nameLike  */
  export const nameLike = {
    key: 'nameLike',
    dataIndex: 'nameLike',
    title: 'nameLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<FileSummary>;

  /** type s  */
  export const types = {
    key: 'types',
    dataIndex: 'types',
    title: 'type',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<FileSummary>;

  /** userId s  */
  export const userIds = {
    key: 'userIds',
    dataIndex: 'userIds',
    title: 'userId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<FileSummary>;

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
  } as ColumnConfig<FileSummary>;

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
  } as ColumnConfig<FileSummary>;

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
  } as ColumnConfig<FileSummary>;

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
  } as ColumnConfig<FileSummary>;

  /** uid  */
  export const uid = {
    key: 'uid',
    dataIndex: 'uid',
    title: 'uid',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: FileSummary, index: number) =>{
      return uid.renderColumn(record, null, text, index, uid);
    },
  } as ColumnConfig<FileSummary>;


  export const fileSummaryRenderColumns = {
    fileId,
    url,
    size,
    name,
    type,
    userId,
    createTime,
    updateTime,
    uid,
  }

}

export default FileSummaryColumns;