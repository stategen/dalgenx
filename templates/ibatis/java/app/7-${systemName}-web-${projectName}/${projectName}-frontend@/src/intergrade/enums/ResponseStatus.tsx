/**
 *  Do not remove this unless you get business authorization.
 *  ResponseStatus
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Options} from "@utils/DvaUtil"

enum ResponseStatus {
  /** OK */
  OK = "OK",
  /** ERROR */
  ERROR = "ERROR",
  /** MISSED */
  MISSED = "MISSED",
  /** PAY_NO_TOKEN */
  PAY_NO_TOKEN = "PAY_NO_TOKEN",
  /** NOT_LOGIN */
  NOT_LOGIN = "NOT_LOGIN"

}

export const responseStatusOptions = {
  /** OK */
  OK: {
    value: ResponseStatus.OK,
    title: 'OK',
  },

  /** ERROR */
  ERROR: {
    value: ResponseStatus.ERROR,
    title: 'ERROR',
  },

  /** MISSED */
  MISSED: {
    value: ResponseStatus.MISSED,
    title: 'MISSED',
  },

  /** PAY_NO_TOKEN */
  PAY_NO_TOKEN: {
    value: ResponseStatus.PAY_NO_TOKEN,
    title: 'PAY_NO_TOKEN',
  },

  /** NOT_LOGIN */
  NOT_LOGIN: {
    value: ResponseStatus.NOT_LOGIN,
    title: 'NOT_LOGIN',
  }

}

export default ResponseStatus;