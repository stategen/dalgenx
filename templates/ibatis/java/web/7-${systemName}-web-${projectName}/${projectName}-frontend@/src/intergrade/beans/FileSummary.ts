/**
 *  Do not remove this unless you get business authorization.
 *  FileSummary
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Bean} from "@utils/DvaUtil";

/** fileId */
export const FileSummary_ID: string = 'fileId';

export default interface FileSummary extends Bean {

  /** fileId */
  fileId?: string;

  /** url */
  url?: string;

  /** size */
  size?: number;

  /** name */
  name?: string;

  /** type */
  type?: string;

  /** userId */
  userId?: string;

  /** 创建时间 */
  createTime?: Date;

  /** 更新时间 */
  updateTime?: Date;

  /** 是否删除 (0:正常，1删除) */
  deleteFlag?: number;

  /** fileId s */
  fileIds?: string[];

  /** sizeMin */
  sizeMin?: number;

  /** sizeMax */
  sizeMax?: number;

  /** nameLike */
  nameLike?: string;

  /** type s */
  types?: string[];

  /** userId s */
  userIds?: string[];

  /** 创建时间Min */
  createTimeMin?: Date;

  /** 创建时间Max */
  createTimeMax?: Date;

  /** 更新时间Min */
  updateTimeMin?: Date;

  /** 更新时间Max */
  updateTimeMax?: Date;

  /** uid */
  uid?: string;

}

