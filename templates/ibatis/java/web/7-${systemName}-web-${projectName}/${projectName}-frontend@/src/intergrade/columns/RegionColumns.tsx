/**
 *  Do not remove this unless you get business authorization.
 *  Region
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import Region from "../beans/Region"
import UIColumns from "@utils/UIColumns";
import {regionTypeOptions} from '../enums/RegionType';

namespace RegionColumns {

  /** isLeaf  */
  export const isLeaf = {
    key: 'isLeaf',
    dataIndex: 'isLeaf',
    title: 'isLeaf',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Region, index: number) =>{
      return isLeaf.renderColumn(record, null, text, index, isLeaf);
    },
  } as ColumnConfig<Region>;

  /** 主键  */
  export const regionId = {
    key: 'regionId',
    dataIndex: 'regionId',
    title: '主键',
    renderColumn: UIColumns.InputRender,
    isId: true,
    config: {
    },
    render: (text: any, record: Region, index: number) =>{
      return regionId.renderColumn(record, null, text, index, regionId);
    },
  } as ColumnConfig<Region>;

  /** 父ID  */
  export const parentRegionId = {
    key: 'parentRegionId',
    dataIndex: 'parentRegionId',
    title: '父ID',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Region, index: number) =>{
      return parentRegionId.renderColumn(record, null, text, index, parentRegionId);
    },
  } as ColumnConfig<Region>;

  /** 路径  */
  export const path = {
    key: 'path',
    dataIndex: 'path',
    title: '路径',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 255,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Region, index: number) =>{
      return path.renderColumn(record, null, text, index, path);
    },
  } as ColumnConfig<Region>;

  /** 层级  */
  export const level = {
    key: 'level',
    dataIndex: 'level',
    title: '层级',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Region, index: number) =>{
      return level.renderColumn(record, null, text, index, level);
    },
  } as ColumnConfig<Region>;

  /** regionType  */
  export const regionType = {
    key: 'regionType',
    dataIndex: 'regionType',
    title: 'regionType',
    renderColumn: UIColumns.SelectRender,
    isEnum: true,
    referConfig: {
      options: regionTypeOptions,
    },
    config: {
    },
    render: (text: any, record: Region, index: number) =>{
      return regionType.renderColumn(record, null, text, index, regionType);
    },
  } as ColumnConfig<Region>;

  /** 中文名称  */
  export const name = {
    key: 'name',
    dataIndex: 'name',
    title: '中文名称',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 255,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Region, index: number) =>{
      return name.renderColumn(record, null, text, index, name);
    },
  } as ColumnConfig<Region>;

  /** 英文名称  */
  export const nameEn = {
    key: 'nameEn',
    dataIndex: 'nameEn',
    title: '英文名称',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 255,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Region, index: number) =>{
      return nameEn.renderColumn(record, null, text, index, nameEn);
    },
  } as ColumnConfig<Region>;

  /** 中文拼音  */
  export const namePinyin = {
    key: 'namePinyin',
    dataIndex: 'namePinyin',
    title: '中文拼音',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 255,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Region, index: number) =>{
      return namePinyin.renderColumn(record, null, text, index, namePinyin);
    },
  } as ColumnConfig<Region>;

  /** 代码  */
  export const code = {
    key: 'code',
    dataIndex: 'code',
    title: '代码',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 50,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Region, index: number) =>{
      return code.renderColumn(record, null, text, index, code);
    },
  } as ColumnConfig<Region>;

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
    render: (text: any, record: Region, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<Region>;

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
    render: (text: any, record: Region, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<Region>;

  /** 是否删除 (0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: Region, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<Region>;

  /** 主键 s  */
  export const regionIds = {
    key: 'regionIds',
    dataIndex: 'regionIds',
    title: '主键',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Region>;

  /** 父ID s  */
  export const parentRegionIds = {
    key: 'parentRegionIds',
    dataIndex: 'parentRegionIds',
    title: '父ID',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Region>;

  /** 路径Like  */
  export const pathLike = {
    key: 'pathLike',
    dataIndex: 'pathLike',
    title: '路径Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Region>;

  /** 层级Min  */
  export const levelMin = {
    key: 'levelMin',
    dataIndex: 'levelMin',
    title: '层级Min',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Region>;

  /** 层级Max  */
  export const levelMax = {
    key: 'levelMax',
    dataIndex: 'levelMax',
    title: '层级Max',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Region>;

  /** regionType s  */
  export const regionTypes = {
    key: 'regionTypes',
    dataIndex: 'regionTypes',
    title: 'regionType',
    noJson: true,
    isEnum: true,
    isArray: true,
    referConfig: {
      options: regionTypeOptions,
    },
    config: {
    },
  } as ColumnConfig<Region>;

  /** 中文名称Like  */
  export const nameLike = {
    key: 'nameLike',
    dataIndex: 'nameLike',
    title: '中文名称Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Region>;

  /** 英文名称Like  */
  export const nameEnLike = {
    key: 'nameEnLike',
    dataIndex: 'nameEnLike',
    title: '英文名称Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Region>;

  /** 中文拼音Like  */
  export const namePinyinLike = {
    key: 'namePinyinLike',
    dataIndex: 'namePinyinLike',
    title: '中文拼音Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Region>;

  /** 代码Like  */
  export const codeLike = {
    key: 'codeLike',
    dataIndex: 'codeLike',
    title: '代码Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Region>;

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
  } as ColumnConfig<Region>;

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
  } as ColumnConfig<Region>;

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
  } as ColumnConfig<Region>;

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
  } as ColumnConfig<Region>;

  /** value  */
  export const value = {
    key: 'value',
    dataIndex: 'value',
    title: 'value',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Region, index: number) =>{
      return value.renderColumn(record, null, text, index, value);
    },
  } as ColumnConfig<Region>;

  /** title  */
  export const title = {
    key: 'title',
    dataIndex: 'title',
    title: 'title',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Region, index: number) =>{
      return title.renderColumn(record, null, text, index, title);
    },
  } as ColumnConfig<Region>;


  export const renderColumns = {
    isLeaf,
    regionId,
    parentRegionId,
    path,
    level,
    regionType,
    name,
    nameEn,
    namePinyin,
    code,
    createTime,
    updateTime,
    value,
    title,
  }

}

export default RegionColumns;