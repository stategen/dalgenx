/**
 *  Do not remove this unless you get business authorization.
 *  RoleType
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Options} from "@utils/DvaUtil"

enum RoleType {
  /** 管理员 */
  ADMIN = "ADMIN",
  /** 默认角色 */
  DEFAULT = "DEFAULT",
  /** 开发人员 */
  DEVELOPER = "DEVELOPER"

}

export const roleTypeOptions = {
  /** 管理员 */
  ADMIN: {
    value: RoleType.ADMIN,
    title: '管理员',
  },

  /** 默认角色 */
  DEFAULT: {
    value: RoleType.DEFAULT,
    title: '默认角色',
  },

  /** 开发人员 */
  DEVELOPER: {
    value: RoleType.DEVELOPER,
    title: '开发人员',
  }

}

export default RoleType;