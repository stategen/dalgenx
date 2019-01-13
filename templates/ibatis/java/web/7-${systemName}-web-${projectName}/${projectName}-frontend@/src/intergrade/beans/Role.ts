/**
 *  Do not remove this unless you get business authorization.
 *  Role
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Bean} from "@utils/DvaUtil";

/** roleId */
export const Role_ID: string = 'roleId';

export default interface Role extends Bean {

  /** 角色ID */
  roleId?: string;

  /** 角色名称 */
  roleName?: string;

  /** 描述 */
  description?: string;

  /** 创建时间 */
  createTime?: Date;

  /** 更新时间 */
  updateTime?: Date;

  /** 是否删除(0:正常，1删除) */
  deleteFlag?: number;

  /** 角色类型 enum */
  roleType?: string;

  /** 角色ID s */
  roleIds?: string[];

  /** 角色名称Like */
  roleNameLike?: string;

  /** 描述Like */
  descriptionLike?: string;

  /** 创建时间Min */
  createTimeMin?: Date;

  /** 创建时间Max */
  createTimeMax?: Date;

  /** 更新时间Min */
  updateTimeMin?: Date;

  /** 更新时间Max */
  updateTimeMax?: Date;

  /** 角色类型 s */
  roleTypes?: string[];

}

