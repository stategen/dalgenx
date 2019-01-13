/**
 *  Do not remove this unless you get business authorization.
 *  RoleMenu
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Bean} from "@utils/DvaUtil";

/** id */
export const RoleMenu_ID: string = 'id';

export default interface RoleMenu extends Bean {

  /** id */
  id?: number;

  /** roleId */
  roleId?: string;

  /** menuId */
  menuId?: number;

  /** 数据创建时间 */
  createTime?: Date;

  /** 数据更新时间 */
  updateTime?: Date;

  /** 是否删除(0:正常，1删除) */
  deleteFlag?: number;

  /** id s */
  ids?: number[];

  /** roleId s */
  roleIds?: string[];

  /** menuId s */
  menuIds?: number[];

  /** 数据创建时间Min */
  createTimeMin?: Date;

  /** 数据创建时间Max */
  createTimeMax?: Date;

  /** 数据更新时间Min */
  updateTimeMin?: Date;

  /** 数据更新时间Max */
  updateTimeMax?: Date;

}

