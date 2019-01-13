/**
 *  Do not remove this unless you get business authorization.
 *  RoleMenu
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import RoleMenu from "../beans/RoleMenu"
import UIColumns from "@utils/UIColumns";

namespace RoleMenuColumns {

  /** id  */
  export const id = {
    key: 'id',
    dataIndex: 'id',
    title: 'id',
    renderColumn: UIColumns.InputRender,
    isId: true,
    config: {
    },
    render: (text: any, record: RoleMenu, index: number) =>{
      return id.renderColumn(record, null, text, index, id);
    },
  } as ColumnConfig<RoleMenu>;

  /** roleId  */
  export const roleId = {
    key: 'roleId',
    dataIndex: 'roleId',
    title: 'roleId',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 32,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: RoleMenu, index: number) =>{
      return roleId.renderColumn(record, null, text, index, roleId);
    },
  } as ColumnConfig<RoleMenu>;

  /** menuId  */
  export const menuId = {
    key: 'menuId',
    dataIndex: 'menuId',
    title: 'menuId',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: RoleMenu, index: number) =>{
      return menuId.renderColumn(record, null, text, index, menuId);
    },
  } as ColumnConfig<RoleMenu>;

  /** 数据创建时间  TIMESTAMP*/
  export const createTime = {
    key: 'createTime',
    dataIndex: 'createTime',
    title: '数据创建时间',
    renderColumn: UIColumns.TimeStampRender,
    hidden: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
    render: (text: any, record: RoleMenu, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<RoleMenu>;

  /** 数据更新时间  TIMESTAMP*/
  export const updateTime = {
    key: 'updateTime',
    dataIndex: 'updateTime',
    title: '数据更新时间',
    renderColumn: UIColumns.TimeStampRender,
    hidden: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
    render: (text: any, record: RoleMenu, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<RoleMenu>;

  /** 是否删除(0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除(0:正常',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: RoleMenu, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<RoleMenu>;

  /** id s  */
  export const ids = {
    key: 'ids',
    dataIndex: 'ids',
    title: 'id',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<RoleMenu>;

  /** roleId s  */
  export const roleIds = {
    key: 'roleIds',
    dataIndex: 'roleIds',
    title: 'roleId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<RoleMenu>;

  /** menuId s  */
  export const menuIds = {
    key: 'menuIds',
    dataIndex: 'menuIds',
    title: 'menuId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<RoleMenu>;

  /** 数据创建时间Min  TIMESTAMP*/
  export const createTimeMin = {
    key: 'createTimeMin',
    dataIndex: 'createTimeMin',
    title: '数据创建时间Min',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<RoleMenu>;

  /** 数据创建时间Max  TIMESTAMP*/
  export const createTimeMax = {
    key: 'createTimeMax',
    dataIndex: 'createTimeMax',
    title: '数据创建时间Max',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<RoleMenu>;

  /** 数据更新时间Min  TIMESTAMP*/
  export const updateTimeMin = {
    key: 'updateTimeMin',
    dataIndex: 'updateTimeMin',
    title: '数据更新时间Min',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<RoleMenu>;

  /** 数据更新时间Max  TIMESTAMP*/
  export const updateTimeMax = {
    key: 'updateTimeMax',
    dataIndex: 'updateTimeMax',
    title: '数据更新时间Max',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<RoleMenu>;


  export const renderColumns = {
    id,
    roleId,
    menuId,
    createTime,
    updateTime,
  }

}

export default RoleMenuColumns;