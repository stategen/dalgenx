/**
 *  Do not remove this unless you get business authorization.
 *  Hoppy
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import Hoppy from "../beans/Hoppy"
import UIColumns from "@utils/UIColumns";

namespace HoppyColumns {

  /** hoppyId  */
  export const hoppyId = {
    key: 'hoppyId',
    dataIndex: 'hoppyId',
    title: 'hoppyId',
    renderColumn: UIColumns.InputRender,
    isId: true,
    config: {
    },
    render: (text: any, record: Hoppy, index: number) =>{
      return hoppyId.renderColumn(record, null, text, index, hoppyId);
    },
  } as ColumnConfig<Hoppy>;

  /** hoppyName  */
  export const hoppyName = {
    key: 'hoppyName',
    dataIndex: 'hoppyName',
    title: 'hoppyName',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Hoppy, index: number) =>{
      return hoppyName.renderColumn(record, null, text, index, hoppyName);
    },
  } as ColumnConfig<Hoppy>;

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
    render: (text: any, record: Hoppy, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<Hoppy>;

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
    render: (text: any, record: Hoppy, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<Hoppy>;

  /** 是否删除(0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除(0:正常',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: Hoppy, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<Hoppy>;

  /** hoppyId s  */
  export const hoppyIds = {
    key: 'hoppyIds',
    dataIndex: 'hoppyIds',
    title: 'hoppyId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Hoppy>;

  /** hoppyNameLike  */
  export const hoppyNameLike = {
    key: 'hoppyNameLike',
    dataIndex: 'hoppyNameLike',
    title: 'hoppyNameLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Hoppy>;

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
  } as ColumnConfig<Hoppy>;

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
  } as ColumnConfig<Hoppy>;

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
  } as ColumnConfig<Hoppy>;

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
  } as ColumnConfig<Hoppy>;

  /** value  */
  export const value = {
    key: 'value',
    dataIndex: 'value',
    title: 'value',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Hoppy, index: number) =>{
      return value.renderColumn(record, null, text, index, value);
    },
  } as ColumnConfig<Hoppy>;

  /** title  */
  export const title = {
    key: 'title',
    dataIndex: 'title',
    title: 'title',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Hoppy, index: number) =>{
      return title.renderColumn(record, null, text, index, title);
    },
  } as ColumnConfig<Hoppy>;


  export const hoppyRenderColumns = {
    hoppyId,
    hoppyName,
    createTime,
    updateTime,
    value,
    title,
  }

}

export default HoppyColumns;