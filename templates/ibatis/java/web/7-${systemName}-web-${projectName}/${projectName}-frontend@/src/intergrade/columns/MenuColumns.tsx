/**
 *  Do not remove this unless you get business authorization.
 *  Menu
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import Menu from "../beans/Menu"
import UIColumns from "@utils/UIColumns";
import {menuTypeOptions} from '../enums/MenuType';
import {visitCheckTypeOptions} from '../enums/VisitCheckType';

namespace MenuColumns {

  /** roleId  */
  export const roleId = {
    key: 'roleId',
    dataIndex: 'roleId',
    title: 'roleId',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return roleId.renderColumn(record, null, text, index, roleId);
    },
  } as ColumnConfig<Menu>;

  /** checked  */
  export const checked = {
    key: 'checked',
    dataIndex: 'checked',
    title: 'checked',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return checked.renderColumn(record, null, text, index, checked);
    },
  } as ColumnConfig<Menu>;

  /** menuId  */
  export const menuId = {
    key: 'menuId',
    dataIndex: 'menuId',
    title: 'menuId',
    renderColumn: UIColumns.InputRender,
    isId: true,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return menuId.renderColumn(record, null, text, index, menuId);
    },
  } as ColumnConfig<Menu>;

  /** morder  */
  export const morder = {
    key: 'morder',
    dataIndex: 'morder',
    title: 'morder',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return morder.renderColumn(record, null, text, index, morder);
    },
  } as ColumnConfig<Menu>;

  /** menuId与bpid组成树图  */
  export const bpid = {
    key: 'bpid',
    dataIndex: 'bpid',
    title: 'menuId与bpid组成树图',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return bpid.renderColumn(record, null, text, index, bpid);
    },
  } as ColumnConfig<Menu>;

  /** 大部分情况下与bpid相同，当为动态目录时，mpid=-1  */
  export const mpid = {
    key: 'mpid',
    dataIndex: 'mpid',
    title: '大部分情况下与bpid相同',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return mpid.renderColumn(record, null, text, index, mpid);
    },
  } as ColumnConfig<Menu>;

  /** 对应的项目id  */
  export const projectName = {
    key: 'projectName',
    dataIndex: 'projectName',
    title: '对应的项目id',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Menu, index: number) =>{
      return projectName.renderColumn(record, null, text, index, projectName);
    },
  } as ColumnConfig<Menu>;

  /** 对应后台系统controlle名称  */
  export const controllerName = {
    key: 'controllerName',
    dataIndex: 'controllerName',
    title: '对应后台系统controlle名称',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Menu, index: number) =>{
      return controllerName.renderColumn(record, null, text, index, controllerName);
    },
  } as ColumnConfig<Menu>;

  /** 对应后台系统method名称  */
  export const methodName = {
    key: 'methodName',
    dataIndex: 'methodName',
    title: '对应后台系统method名称',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Menu, index: number) =>{
      return methodName.renderColumn(record, null, text, index, methodName);
    },
  } as ColumnConfig<Menu>;

  /** 对应的api路径  */
  export const url = {
    key: 'url',
    dataIndex: 'url',
    title: '对应的api路径',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Menu, index: number) =>{
      return url.renderColumn(record, null, text, index, url);
    },
  } as ColumnConfig<Menu>;

  /** icon  */
  export const icon = {
    key: 'icon',
    dataIndex: 'icon',
    title: 'icon',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Menu, index: number) =>{
      return icon.renderColumn(record, null, text, index, icon);
    },
  } as ColumnConfig<Menu>;

  /** name  */
  export const name = {
    key: 'name',
    dataIndex: 'name',
    title: 'name',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Menu, index: number) =>{
      return name.renderColumn(record, null, text, index, name);
    },
  } as ColumnConfig<Menu>;

  /** route  */
  export const route = {
    key: 'route',
    dataIndex: 'route',
    title: 'route',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: Menu, index: number) =>{
      return route.renderColumn(record, null, text, index, route);
    },
  } as ColumnConfig<Menu>;

  /** menuType  */
  export const menuType = {
    key: 'menuType',
    dataIndex: 'menuType',
    title: 'menuType',
    renderColumn: UIColumns.SelectRender,
    isEnum: true,
    referConfig: {
      options: menuTypeOptions,
    },
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return menuType.renderColumn(record, null, text, index, menuType);
    },
  } as ColumnConfig<Menu>;

  /** checkType  */
  export const checkType = {
    key: 'checkType',
    dataIndex: 'checkType',
    title: 'checkType',
    renderColumn: UIColumns.SelectRender,
    isEnum: true,
    referConfig: {
      options: visitCheckTypeOptions,
    },
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return checkType.renderColumn(record, null, text, index, checkType);
    },
  } as ColumnConfig<Menu>;

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
    render: (text: any, record: Menu, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<Menu>;

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
    render: (text: any, record: Menu, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<Menu>;

  /** 是否删除(0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除(0:正常',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<Menu>;

  /** menuId s  */
  export const menuIds = {
    key: 'menuIds',
    dataIndex: 'menuIds',
    title: 'menuId',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** morderMin  */
  export const morderMin = {
    key: 'morderMin',
    dataIndex: 'morderMin',
    title: 'morderMin',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** morderMax  */
  export const morderMax = {
    key: 'morderMax',
    dataIndex: 'morderMax',
    title: 'morderMax',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** menuId与bpid组成树图 s  */
  export const bpids = {
    key: 'bpids',
    dataIndex: 'bpids',
    title: 'menuId与bpid组成树图',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** 大部分情况下与bpid相同 s  */
  export const mpids = {
    key: 'mpids',
    dataIndex: 'mpids',
    title: '大部分情况下与bpid相同',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** 对应的项目idLike  */
  export const projectNameLike = {
    key: 'projectNameLike',
    dataIndex: 'projectNameLike',
    title: '对应的项目idLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** 对应后台系统controlle名称Like  */
  export const controllerNameLike = {
    key: 'controllerNameLike',
    dataIndex: 'controllerNameLike',
    title: '对应后台系统controlle名称Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** 对应后台系统method名称Like  */
  export const methodNameLike = {
    key: 'methodNameLike',
    dataIndex: 'methodNameLike',
    title: '对应后台系统method名称Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** 对应的项目idnameLike  */
  export const nameLike = {
    key: 'nameLike',
    dataIndex: 'nameLike',
    title: '对应的项目idnameLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** routeLike  */
  export const routeLike = {
    key: 'routeLike',
    dataIndex: 'routeLike',
    title: 'routeLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<Menu>;

  /** menuType s  */
  export const menuTypes = {
    key: 'menuTypes',
    dataIndex: 'menuTypes',
    title: 'menuType',
    noJson: true,
    isEnum: true,
    isArray: true,
    referConfig: {
      options: menuTypeOptions,
    },
    config: {
    },
  } as ColumnConfig<Menu>;

  /** checkType s  */
  export const checkTypes = {
    key: 'checkTypes',
    dataIndex: 'checkTypes',
    title: 'checkType',
    noJson: true,
    isEnum: true,
    isArray: true,
    referConfig: {
      options: visitCheckTypeOptions,
    },
    config: {
    },
  } as ColumnConfig<Menu>;

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
  } as ColumnConfig<Menu>;

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
  } as ColumnConfig<Menu>;

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
  } as ColumnConfig<Menu>;

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
  } as ColumnConfig<Menu>;

  /** id,和MenuId相同，为了生成树  */
  export const id = {
    key: 'id',
    dataIndex: 'id',
    title: 'id',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return id.renderColumn(record, null, text, index, id);
    },
  } as ColumnConfig<Menu>;

  /** menuChildren  */
  export const menuChildren = {
    key: 'menuChildren',
    dataIndex: 'menuChildren',
    title: 'menuChildren',
    renderColumn: UIColumns.InputRender,
    isArray: true,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return menuChildren.renderColumn(record, null, text, index, menuChildren);
    },
  } as ColumnConfig<Menu>;

  /** 打开顺序，前端model存储用  */
  export const opendOrder = {
    key: 'opendOrder',
    dataIndex: 'opendOrder',
    title: '打开顺序',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: Menu, index: number) =>{
      return opendOrder.renderColumn(record, null, text, index, opendOrder);
    },
  } as ColumnConfig<Menu>;


  export const renderColumns = {
    roleId,
    checked,
    menuId,
    morder,
    bpid,
    mpid,
    projectName,
    controllerName,
    methodName,
    url,
    icon,
    name,
    route,
    menuType,
    checkType,
    createTime,
    updateTime,
    id,
    opendOrder,
  }

}

export default MenuColumns;