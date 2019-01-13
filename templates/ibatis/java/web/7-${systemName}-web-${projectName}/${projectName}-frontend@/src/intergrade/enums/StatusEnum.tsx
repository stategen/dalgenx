/**
 *  Do not remove this unless you get business authorization.
 *  StatusEnum
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Options} from "@utils/DvaUtil"

enum StatusEnum {
  /** 有效 */
  ACTIVE = "ACTIVE",
  /** 禁用 */
  FORBIDDEN = "FORBIDDEN",
  /** 待审核 */
  PENDING = "PENDING"

}

export const statusEnumOptions = {
  /** 有效 */
  ACTIVE: {
    value: StatusEnum.ACTIVE,
    title: '有效',
  },

  /** 禁用 */
  FORBIDDEN: {
    value: StatusEnum.FORBIDDEN,
    title: '禁用',
  },

  /** 待审核 */
  PENDING: {
    value: StatusEnum.PENDING,
    title: '待审核',
  }

}

export default StatusEnum;