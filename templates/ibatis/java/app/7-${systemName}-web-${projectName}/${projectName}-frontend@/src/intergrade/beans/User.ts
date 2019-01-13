/**
 *  Do not remove this unless you get business authorization.
 *  User
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import City from "../beans/City";
import FileSummary from "../beans/FileSummary";
import Hoppy from "../beans/Hoppy";
import Province from "../beans/Province";
import Region from "../beans/Region";
import RoleType from "../enums/RoleType";
import StatusEnum from "../enums/StatusEnum";
import {Bean} from "@utils/DvaUtil";

/** userId */
export const User_ID: string = 'userId';

export default interface User extends Bean {

  /** 用户可访问的节点 */
  visitsIds?: number[];

  /** province */
  province?: Province;

  /** city */
  city?: City;

  /** cascaderPostAddresss */
  cascaderPostAddresss?: Region[];

  /** hoppys */
  hoppys?: Hoppy[];

  /** 爱好 ids */
  hoppyIds?: number[];

  /** 头像 */
  avatarImg?: FileSummary;

  /** 用户ID */
  userId?: string;

  /** 用户名 */
  username?: string;

  /** 用户角色 ADMIN,DEFAULT,DEVELOPER */
  roleType?: RoleType;

  /** 姓名 */
  name?: string;

  /** 别名 */
  nickName?: string;

  /** 年龄 */
  age?: number;

  /** 详细地址 */
  address?: string;

  /** 头像 ID */
  avatarImgId?: string;

  /** 邮箱 */
  email?: string;

  /** 认证时间 */
  valiDatetime?: Date;

  /** 出生日期 */
  birthdayDate?: Date;

  /** 工作时间 */
  workTime?: Date;

  /** 省份 ID */
  provinceId?: string;

  /** 城市 ID */
  cityId?: string;

  /** 状态 enum */
  status?: StatusEnum;

  /** 级别 */
  grade?: number;

  /** 性别 */
  sex?: boolean;

  /** 邮寄地址 ID */
  postAddressId?: number;

  /** remark */
  remark?: string;

  /** 创建时间 */
  createTime?: Date;

  /** 更新时间 */
  updateTime?: Date;

  /** 是否删除 (0:正常，1删除) */
  deleteFlag?: number;

  /** 用户ID s */
  userIds?: string[];

  /** 用户名Like */
  usernameLike?: string;

  /** 密码Like */
  passwordLike?: string;

  /** 用户角色 s */
  roleTypes?: RoleType[];

  /** 用户名nameLike */
  nameLike?: string;

  /** 别名Like */
  nickNameLike?: string;

  /** 年龄Min */
  ageMin?: number;

  /** 年龄Max */
  ageMax?: number;

  /** 详细地址Like */
  addressLike?: string;

  /** 头像 s */
  avatarImgIds?: string[];

  /** 邮箱Like */
  emailLike?: string;

  /** 认证时间Min */
  valiDatetimeMin?: Date;

  /** 认证时间Max */
  valiDatetimeMax?: Date;

  /** 出生日期Min */
  birthdayDateMin?: Date;

  /** 出生日期Max */
  birthdayDateMax?: Date;

  /** 工作时间Min */
  workTimeMin?: Date;

  /** 工作时间Max */
  workTimeMax?: Date;

  /** 省份 s */
  provinceIds?: string[];

  /** 城市 s */
  cityIds?: string[];

  /** 状态 s */
  statuss?: StatusEnum[];

  /** 级别Min */
  gradeMin?: number;

  /** 级别Max */
  gradeMax?: number;

  /** 邮寄地址 s */
  postAddressIds?: number[];

  /** remarkLike */
  remarkLike?: string;

  /** 创建时间Min */
  createTimeMin?: Date;

  /** 创建时间Max */
  createTimeMax?: Date;

  /** 更新时间Min */
  updateTimeMin?: Date;

  /** 更新时间Max */
  updateTimeMax?: Date;

  /** 邮寄地址 */
  cascaderPostAddressIds?: number[];

}

