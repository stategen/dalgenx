/**
 *  Do not remove this unless you get business authorization.
 *  VisitCheckType
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Options} from "@utils/DvaUtil"

enum VisitCheckType {
  /** VISIT_CHECK */
  VISIT_CHECK = "VISIT_CHECK",
  /** NONE */
  NONE = "NONE"

}

export const visitCheckTypeOptions = {
  /** VISIT_CHECK */
  VISIT_CHECK: {
    value: VisitCheckType.VISIT_CHECK,
    title: 'VISIT_CHECK',
  },

  /** NONE */
  NONE: {
    value: VisitCheckType.NONE,
    title: 'NONE',
  }

}

export default VisitCheckType;