/**
 *  Do not remove this unless you get business authorization.
 *  Menu
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import MenuType from "../enums/MenuType";
import VisitCheckType from "../enums/VisitCheckType";
import {Bean} from "@utils/DvaUtil";

/** menuId */
export const Menu_ID: string = 'menuId';

export default interface Menu extends Bean {

  /** roleId */
  roleId?: string;

  /** checked */
  checked?: boolean;

  /** menuId */
  menuId?: number;

  /** morder */
  morder?: number;

  /** menuId与bpid组成树图 */
  bpid?: number;

  /** 大部分情况下与bpid相同，当为动态目录时，mpid=-1 */
  mpid?: number;

  /** 对应的项目id */
  projectName?: string;

  /** 对应后台系统controlle名称 */
  controllerName?: string;

  /** 对应后台系统method名称 */
  methodName?: string;

  /** 对应的api路径 */
  url?: string;

  /** icon */
  icon?: string;

  /** name */
  name?: string;

  /** route */
  route?: string;

  /** menuType */
  menuType?: MenuType;

  /** checkType */
  checkType?: VisitCheckType;

  /** 数据创建时间 */
  createTime?: Date;

  /** 数据更新时间 */
  updateTime?: Date;

  /** 是否删除(0:正常，1删除) */
  deleteFlag?: number;

  /** menuId s */
  menuIds?: number[];

  /** morderMin */
  morderMin?: number;

  /** morderMax */
  morderMax?: number;

  /** menuId与bpid组成树图 s */
  bpids?: number[];

  /** 大部分情况下与bpid相同 s */
  mpids?: number[];

  /** 对应的项目idLike */
  projectNameLike?: string;

  /** 对应后台系统controlle名称Like */
  controllerNameLike?: string;

  /** 对应后台系统method名称Like */
  methodNameLike?: string;

  /** 对应的项目idnameLike */
  nameLike?: string;

  /** routeLike */
  routeLike?: string;

  /** menuType s */
  menuTypes?: MenuType[];

  /** checkType s */
  checkTypes?: VisitCheckType[];

  /** 数据创建时间Min */
  createTimeMin?: Date;

  /** 数据创建时间Max */
  createTimeMax?: Date;

  /** 数据更新时间Min */
  updateTimeMin?: Date;

  /** 数据更新时间Max */
  updateTimeMax?: Date;

  /** id,和MenuId相同，为了生成树 */
  id?: number;

  /** menuChildren */
  menuChildren?: Menu[];

  /** 打开顺序，前端model存储用 */
  opendOrder?: number;

}

