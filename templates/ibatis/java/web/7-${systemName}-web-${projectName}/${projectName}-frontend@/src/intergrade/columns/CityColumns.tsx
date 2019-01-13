/**
 *  Do not remove this unless you get business authorization.
 *  City
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import City from "../beans/City"
import UIColumns from "@utils/UIColumns";

namespace CityColumns {

  /** cityId  */
  export const cityId = {
    key: 'cityId',
    dataIndex: 'cityId',
    title: 'cityId',
    renderColumn: UIColumns.InputRender,
    isId: true,
    config: {
      rules: [
        {
          max: 32,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: City, index: number) =>{
      return cityId.renderColumn(record, null, text, index, cityId);
    },
  } as ColumnConfig<City>;

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
    render: (text: any, record: City, index: number) =>{
      return name.renderColumn(record, null, text, index, name);
    },
  } as ColumnConfig<City>;

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
    render: (text: any, record: City, index: number) =>{
      return pycode.renderColumn(record, null, text, index, pycode);
    },
  } as ColumnConfig<City>;

  /** provinceId  */
  export const provinceId = {
    key: 'provinceId',
    dataIndex: 'provinceId',
    title: 'provinceId',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: City, index: number) =>{
      return provinceId.renderColumn(record, null, text, index, provinceId);
    },
  } as ColumnConfig<City>;

  /** postcode  */
  export const postcode = {
    key: 'postcode',
    dataIndex: 'postcode',
    title: 'postcode',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 50,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: City, index: number) =>{
      return postcode.renderColumn(record, null, text, index, postcode);
    },
  } as ColumnConfig<City>;

  /** areacode  */
  export const areacode = {
    key: 'areacode',
    dataIndex: 'areacode',
    title: 'areacode',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 50,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: City, index: number) =>{
      return areacode.renderColumn(record, null, text, index, areacode);
    },
  } as ColumnConfig<City>;

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
    render: (text: any, record: City, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<City>;

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
    render: (text: any, record: City, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<City>;

  /** 是否删除(0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除(0:正常',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: City, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<City>;

  /** cityId s  */
  export const cityIds = {
    key: 'cityIds',
    dataIndex: 'cityIds',
    title: 'cityId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<City>;

  /** nameLike  */
  export const nameLike = {
    key: 'nameLike',
    dataIndex: 'nameLike',
    title: 'nameLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<City>;

  /** pycodeLike  */
  export const pycodeLike = {
    key: 'pycodeLike',
    dataIndex: 'pycodeLike',
    title: 'pycodeLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<City>;

  /** provinceId s  */
  export const provinceIds = {
    key: 'provinceIds',
    dataIndex: 'provinceIds',
    title: 'provinceId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<City>;

  /** postcodeLike  */
  export const postcodeLike = {
    key: 'postcodeLike',
    dataIndex: 'postcodeLike',
    title: 'postcodeLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<City>;

  /** areacodeLike  */
  export const areacodeLike = {
    key: 'areacodeLike',
    dataIndex: 'areacodeLike',
    title: 'areacodeLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<City>;

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
  } as ColumnConfig<City>;

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
  } as ColumnConfig<City>;

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
  } as ColumnConfig<City>;

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
  } as ColumnConfig<City>;

  /** value  */
  export const value = {
    key: 'value',
    dataIndex: 'value',
    title: 'value',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: City, index: number) =>{
      return value.renderColumn(record, null, text, index, value);
    },
  } as ColumnConfig<City>;

  /** title  */
  export const title = {
    key: 'title',
    dataIndex: 'title',
    title: 'title',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: City, index: number) =>{
      return title.renderColumn(record, null, text, index, title);
    },
  } as ColumnConfig<City>;


  export const renderColumns = {
    cityId,
    name,
    pycode,
    provinceId,
    postcode,
    areacode,
    createTime,
    updateTime,
    value,
    title,
  }

}

export default CityColumns;