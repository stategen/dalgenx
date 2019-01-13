/**
 *  Do not remove this unless you get business authorization.
 *  Province
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import Province from "../beans/Province"
import UIColumns from "@utils/UIColumns";

namespace ProvinceColumns {

  /** provinceId  */
  export const provinceId = {
    key: 'provinceId',
    dataIndex: 'provinceId',
    title: 'provinceId',
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
    render: (text: any, record: Province, index: number) =>{
      return provinceId.renderColumn(record, null, text, index, provinceId);
    },
  } as ColumnConfig<Province>;

  /** name  */
  export const name = {
    key: 'name',
    dataIndex: 'name',
    title: 'name',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 100,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Province, index: number) =>{
      return name.renderColumn(record, null, text, index, name);
    },
  } as ColumnConfig<Province>;

  /** pycode  */
  export const pycode = {
    key: 'pycode',
    dataIndex: 'pycode',
    title: 'pycode',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 50,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Province, index: number) =>{
      return pycode.renderColumn(record, null, text, index, pycode);
    },
  } as ColumnConfig<Province>;

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
    render: (text: any, record: Province, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<Province>;

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
    render: (text: any, record: Province, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<Province>;

  /** 是否删除(0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除(0:正常',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: Province, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<Province>;

  /** provinceId s  */
  export const provinceIds = {
    key: 'provinceIds',
    dataIndex: 'provinceIds',
    title: 'provinceId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Province>;

  /** nameLike  */
  export const nameLike = {
    key: 'nameLike',
    dataIndex: 'nameLike',
    title: 'nameLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Province>;

  /** pycodeLike  */
  export const pycodeLike = {
    key: 'pycodeLike',
    dataIndex: 'pycodeLike',
    title: 'pycodeLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Province>;

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
  } as ColumnConfig<Province>;

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
  } as ColumnConfig<Province>;

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
  } as ColumnConfig<Province>;

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
  } as ColumnConfig<Province>;

  /** value  */
  export const value = {
    key: 'value',
    dataIndex: 'value',
    title: 'value',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Province, index: number) =>{
      return value.renderColumn(record, null, text, index, value);
    },
  } as ColumnConfig<Province>;

  /** title  */
  export const title = {
    key: 'title',
    dataIndex: 'title',
    title: 'title',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Province, index: number) =>{
      return title.renderColumn(record, null, text, index, title);
    },
  } as ColumnConfig<Province>;


  export const provinceRenderColumns = {
    provinceId,
    name,
    pycode,
    createTime,
    updateTime,
    value,
    title,
  }

}

export default ProvinceColumns;