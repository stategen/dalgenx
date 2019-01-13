/**
 *  Do not remove this unless you get business authorization.
 *  Hoppy
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Bean} from "@utils/DvaUtil";

/** hoppyId */
export const Hoppy_ID: string = 'hoppyId';

export default interface Hoppy extends Bean {

  /** hoppyId */
  hoppyId?: number;

  /** hoppyName */
  hoppyName?: string;

  /** 创建时间 */
  createTime?: Date;

  /** 更新时间 */
  updateTime?: Date;

  /** 是否删除(0:正常，1删除) */
  deleteFlag?: number;

  /** hoppyId s */
  hoppyIds?: number[];

  /** hoppyNameLike */
  hoppyNameLike?: string;

  /** 创建时间Min */
  createTimeMin?: Date;

  /** 创建时间Max */
  createTimeMax?: Date;

  /** 更新时间Min */
  updateTimeMin?: Date;

  /** 更新时间Max */
  updateTimeMax?: Date;

  /** value */
  value?: string;

  /** title */
  title?: string;

}

