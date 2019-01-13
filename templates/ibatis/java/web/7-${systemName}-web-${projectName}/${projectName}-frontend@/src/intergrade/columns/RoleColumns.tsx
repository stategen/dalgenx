/**
 *  Do not remove this unless you get business authorization.
 *  Role
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import Role from "../beans/Role"
import UIColumns from "@utils/UIColumns";

namespace RoleColumns {

  /** 角色ID  */
  export const roleId = {
    key: 'roleId',
    dataIndex: 'roleId',
    title: '角色ID',
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
    render: (text: any, record: Role, index: number) =>{
      return roleId.renderColumn(record, null, text, index, roleId);
    },
  } as ColumnConfig<Role>;

  /** 角色名称  */
  export const roleName = {
    key: 'roleName',
    dataIndex: 'roleName',
    title: '角色名称',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          required: true,
          message: "不能为null",
        },
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Role, index: number) =>{
      return roleName.renderColumn(record, null, text, index, roleName);
    },
  } as ColumnConfig<Role>;

  /** 描述  */
  export const description = {
    key: 'description',
    dataIndex: 'description',
    title: '描述',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          required: true,
          message: "不能为null",
        },
        {
          max: 255,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Role, index: number) =>{
      return description.renderColumn(record, null, text, index, description);
    },
  } as ColumnConfig<Role>;

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
    render: (text: any, record: Role, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<Role>;

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
    render: (text: any, record: Role, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<Role>;

  /** 是否删除(0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除(0:正常',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: Role, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<Role>;

  /** 角色类型 enum  */
  export const roleType = {
    key: 'roleType',
    dataIndex: 'roleType',
    title: '角色类型',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Role, index: number) =>{
      return roleType.renderColumn(record, null, text, index, roleType);
    },
  } as ColumnConfig<Role>;

  /** 角色ID s  */
  export const roleIds = {
    key: 'roleIds',
    dataIndex: 'roleIds',
    title: '角色ID',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Role>;

  /** 角色名称Like  */
  export const roleNameLike = {
    key: 'roleNameLike',
    dataIndex: 'roleNameLike',
    title: '角色名称Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Role>;

  /** 描述Like  */
  export const descriptionLike = {
    key: 'descriptionLike',
    dataIndex: 'descriptionLike',
    title: '描述Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Role>;

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
  } as ColumnConfig<Role>;

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
  } as ColumnConfig<Role>;

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
  } as ColumnConfig<Role>;

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
  } as ColumnConfig<Role>;

  /** 角色类型 s  */
  export const roleTypes = {
    key: 'roleTypes',
    dataIndex: 'roleTypes',
    title: '角色类型',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Role>;


  export const renderColumns = {
    roleId,
    roleName,
    description,
    createTime,
    updateTime,
    roleType,
  }

}

export default RoleColumns;