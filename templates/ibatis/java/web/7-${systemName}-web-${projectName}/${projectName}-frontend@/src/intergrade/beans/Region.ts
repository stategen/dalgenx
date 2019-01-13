/**
 *  Do not remove this unless you get business authorization.
 *  Region
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import RegionType from "../enums/RegionType";
import {Bean} from "@utils/DvaUtil";

/** regionId */
export const Region_ID: string = 'regionId';

export default interface Region extends Bean {

  /** isLeaf */
  isLeaf?: boolean;

  /** 主键 */
  regionId?: number;

  /** 父ID */
  parentRegionId?: number;

  /** 路径 */
  path?: string;

  /** 层级 */
  level?: number;

  /** regionType */
  regionType?: RegionType;

  /** 中文名称 */
  name?: string;

  /** 英文名称 */
  nameEn?: string;

  /** 中文拼音 */
  namePinyin?: string;

  /** 代码 */
  code?: string;

  /** 创建时间 */
  createTime?: Date;

  /** 更新时间 */
  updateTime?: Date;

  /** 是否删除 (0:正常，1删除) */
  deleteFlag?: number;

  /** 主键 s */
  regionIds?: number[];

  /** 父ID s */
  parentRegionIds?: number[];

  /** 路径Like */
  pathLike?: string;

  /** 层级Min */
  levelMin?: number;

  /** 层级Max */
  levelMax?: number;

  /** regionType s */
  regionTypes?: RegionType[];

  /** 中文名称Like */
  nameLike?: string;

  /** 英文名称Like */
  nameEnLike?: string;

  /** 中文拼音Like */
  namePinyinLike?: string;

  /** 代码Like */
  codeLike?: string;

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

