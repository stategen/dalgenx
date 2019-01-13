/**
 *  Do not remove this unless you get business authorization.
 *  User
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import User from "../beans/User"
import UIColumns from "@utils/UIColumns";
import {roleTypeOptions} from '../enums/RoleType';
import {statusEnumOptions} from '../enums/StatusEnum';

namespace UserColumns {

  /** 用户可访问的节点  */
  export const visitsIds = {
    key: 'visitsIds',
    dataIndex: 'visitsIds',
    title: '用户可访问的节点',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** province  */
  export const province = {
    key: 'province',
    dataIndex: 'province',
    title: 'province',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return province.renderColumn(record, null, text, index, province);
    },
  } as ColumnConfig<User>;

  /** city  */
  export const city = {
    key: 'city',
    dataIndex: 'city',
    title: 'city',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return city.renderColumn(record, null, text, index, city);
    },
  } as ColumnConfig<User>;

  /** cascaderPostAddresss  */
  export const cascaderPostAddresss = {
    key: 'cascaderPostAddresss',
    dataIndex: 'cascaderPostAddresss',
    title: 'cascaderPostAddresss',
    renderColumn: UIColumns.InputRender,
    isArray: true,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return cascaderPostAddresss.renderColumn(record, null, text, index, cascaderPostAddresss);
    },
  } as ColumnConfig<User>;

  /** hoppys  */
  export const hoppys = {
    key: 'hoppys',
    dataIndex: 'hoppys',
    title: 'hoppys',
    renderColumn: UIColumns.InputRender,
    isArray: true,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return hoppys.renderColumn(record, null, text, index, hoppys);
    },
  } as ColumnConfig<User>;

  /** 爱好 ids  */
  export const hoppyIds = {
    key: 'hoppyIds',
    dataIndex: 'hoppyIds',
    title: '爱好',
    renderColumn: UIColumns.CheckboxGroupRender,
    isArray: true,
    referConfig: {
      api: 'getHoppyOptions',
      referField: 'hoppys',
    },
    config: {
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return hoppyIds.renderColumn(record, null, text, index, hoppyIds);
    },
  } as ColumnConfig<User>;

  /** 头像  */
  export const avatarImg = {
    key: 'avatarImg',
    dataIndex: 'avatarImg',
    title: '头像',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 255,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: User, index: number) =>{
      return avatarImg.renderColumn(record, null, text, index, avatarImg);
    },
  } as ColumnConfig<User>;

  /** 用户ID  */
  export const userId = {
    key: 'userId',
    dataIndex: 'userId',
    title: '用户ID',
    renderColumn: UIColumns.HiddenRender,
    isId: true,
    typeIsHidden: true,
    config: {
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return userId.renderColumn(record, null, text, index, userId);
    },
  } as ColumnConfig<User>;

  /** 用户名  */
  export const username = {
    key: 'username',
    dataIndex: 'username',
    title: '用户名',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          required: true,
          message: "不能为null",
        },
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: User, index: number) =>{
      return username.renderColumn(record, null, text, index, username);
    },
  } as ColumnConfig<User>;

  /** 用户角色 ADMIN,DEFAULT,DEVELOPER  */
  export const roleType = {
    key: 'roleType',
    dataIndex: 'roleType',
    title: '用户角色',
    renderColumn: UIColumns.SelectRender,
    isEnum: true,
    referConfig: {
      options: roleTypeOptions,
    },
    config: {
      rules: [
        {
          max: 32,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: User, index: number) =>{
      return roleType.renderColumn(record, null, text, index, roleType);
    },
  } as ColumnConfig<User>;

  /** 姓名  */
  export const name = {
    key: 'name',
    dataIndex: 'name',
    title: '姓名',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: User, index: number) =>{
      return name.renderColumn(record, null, text, index, name);
    },
  } as ColumnConfig<User>;

  /** 别名  */
  export const nickName = {
    key: 'nickName',
    dataIndex: 'nickName',
    title: '别名',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 32,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: User, index: number) =>{
      return nickName.renderColumn(record, null, text, index, nickName);
    },
  } as ColumnConfig<User>;

  /** 年龄  */
  export const age = {
    key: 'age',
    dataIndex: 'age',
    title: '年龄',
    renderColumn: UIColumns.NumberRender,
    config: {
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return age.renderColumn(record, null, text, index, age);
    },
  } as ColumnConfig<User>;

  /** 详细地址  */
  export const address = {
    key: 'address',
    dataIndex: 'address',
    title: '详细地址',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 255,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: User, index: number) =>{
      return address.renderColumn(record, null, text, index, address);
    },
  } as ColumnConfig<User>;

  /** 头像 ID  */
  export const avatarImgId = {
    key: 'avatarImgId',
    dataIndex: 'avatarImgId',
    title: '头像',
    renderColumn: UIColumns.ImageRender,
    renderImage: true,
    referConfig: {
      api: 'getFileSummaryOptions',
      referField: 'avatarImg',
      optionConvertor: {
        value: 'fileId',
      },
    },
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return avatarImgId.renderColumn(record, null, text, index, avatarImgId);
    },
  } as ColumnConfig<User>;

  /** 邮箱  */
  export const email = {
    key: 'email',
    dataIndex: 'email',
    title: '邮箱',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          required: true,
          message: "不能为null",
        },
        {
          max: 128,
          message: "最大不能超过{max}",
        },
        {
          pattern: /.*/,
        },
      ],
    },
    render: (text: any, record: User, index: number) =>{
      return email.renderColumn(record, null, text, index, email);
    },
  } as ColumnConfig<User>;

  /** 认证时间  TIMESTAMP*/
  export const valiDatetime = {
    key: 'valiDatetime',
    dataIndex: 'valiDatetime',
    title: '认证时间',
    renderColumn: UIColumns.TimeStampRender,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return valiDatetime.renderColumn(record, null, text, index, valiDatetime);
    },
  } as ColumnConfig<User>;

  /** 出生日期  DATE*/
  export const birthdayDate = {
    key: 'birthdayDate',
    dataIndex: 'birthdayDate',
    title: '出生日期',
    renderColumn: UIColumns.DatePickerRender,
    temporalType: TemporalType.DATE,
    format: DATE_FORMAT,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return birthdayDate.renderColumn(record, null, text, index, birthdayDate);
    },
  } as ColumnConfig<User>;

  /** 工作时间  TIME*/
  export const workTime = {
    key: 'workTime',
    dataIndex: 'workTime',
    title: '工作时间',
    renderColumn: UIColumns.TimePickerRender,
    temporalType: TemporalType.TIME,
    format: TIME_FORMAT,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return workTime.renderColumn(record, null, text, index, workTime);
    },
  } as ColumnConfig<User>;

  /** 省份 ID  */
  export const provinceId = {
    key: 'provinceId',
    dataIndex: 'provinceId',
    title: '省份',
    renderColumn: UIColumns.SelectRender,
    referConfig: {
      api: 'getProvinceOptions',
      referField: 'province',
    },
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return provinceId.renderColumn(record, null, text, index, provinceId);
    },
  } as ColumnConfig<User>;

  /** 城市 ID  */
  export const cityId = {
    key: 'cityId',
    dataIndex: 'cityId',
    title: '城市',
    renderColumn: UIColumns.SelectRender,
    changeBy: 'provinceId',
    referConfig: {
      api: 'getCityOptions',
      referField: 'city',
    },
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return cityId.renderColumn(record, null, text, index, cityId);
    },
  } as ColumnConfig<User>;

  /** 状态 enum  */
  export const status = {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    renderColumn: UIColumns.RadioGroupRender,
    isEnum: true,
    referConfig: {
      options: statusEnumOptions,
    },
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return status.renderColumn(record, null, text, index, status);
    },
  } as ColumnConfig<User>;

  /** 级别  */
  export const grade = {
    key: 'grade',
    dataIndex: 'grade',
    title: '级别',
    renderColumn: UIColumns.RateRender,
    config: {
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return grade.renderColumn(record, null, text, index, grade);
    },
  } as ColumnConfig<User>;

  /** 性别  */
  export const sex = {
    key: 'sex',
    dataIndex: 'sex',
    title: '性别',
    renderColumn: UIColumns.SwitchRender,
    config: {
      valuePropName: 'checked',
    },
    falseTitle: '女',
    nullTitle: '请选择',
    trueTitle: '男',
    render: (text: any, record: User, index: number) =>{
      return sex.renderColumn(record, null, text, index, sex);
    },
  } as ColumnConfig<User>;

  /** 邮寄地址 ID  */
  export const postAddressId = {
    key: 'postAddressId',
    dataIndex: 'postAddressId',
    title: '邮寄地址',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    render: (text: any, record: User, index: number) =>{
      return postAddressId.renderColumn(record, null, text, index, postAddressId);
    },
  } as ColumnConfig<User>;

  /** remark  */
  export const remark = {
    key: 'remark',
    dataIndex: 'remark',
    title: 'remark',
    renderColumn: UIColumns.TextareaRender,
    config: {
      rules: [
        {
          max: 65535,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return remark.renderColumn(record, null, text, index, remark);
    },
  } as ColumnConfig<User>;

  /** 创建时间  TIMESTAMP*/
  export const createTime = {
    key: 'createTime',
    dataIndex: 'createTime',
    title: '创建时间',
    renderColumn: UIColumns.TimeStampRender,
    hidden: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return createTime.renderColumn(record, null, text, index, createTime);
    },
  } as ColumnConfig<User>;

  /** 更新时间  TIMESTAMP*/
  export const updateTime = {
    key: 'updateTime',
    dataIndex: 'updateTime',
    title: '更新时间',
    renderColumn: UIColumns.TimeStampRender,
    hidden: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return updateTime.renderColumn(record, null, text, index, updateTime);
    },
  } as ColumnConfig<User>;

  /** 是否删除 (0:正常，1删除)  */
  export const deleteFlag = {
    key: 'deleteFlag',
    dataIndex: 'deleteFlag',
    title: '是否删除',
    renderColumn: UIColumns.InputRender,
    hidden: true,
    config: {
    },
    render: (text: any, record: User, index: number) =>{
      return deleteFlag.renderColumn(record, null, text, index, deleteFlag);
    },
  } as ColumnConfig<User>;

  /** 用户ID s  */
  export const userIds = {
    key: 'userIds',
    dataIndex: 'userIds',
    title: '用户ID',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 用户名Like  */
  export const usernameLike = {
    key: 'usernameLike',
    dataIndex: 'usernameLike',
    title: '用户名Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 密码Like  */
  export const passwordLike = {
    key: 'passwordLike',
    dataIndex: 'passwordLike',
    title: '密码Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 用户角色 s  */
  export const roleTypes = {
    key: 'roleTypes',
    dataIndex: 'roleTypes',
    title: '用户角色',
    noJson: true,
    isEnum: true,
    isArray: true,
    referConfig: {
      options: roleTypeOptions,
    },
    config: {
    },
  } as ColumnConfig<User>;

  /** 用户名nameLike  */
  export const nameLike = {
    key: 'nameLike',
    dataIndex: 'nameLike',
    title: '用户名nameLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 别名Like  */
  export const nickNameLike = {
    key: 'nickNameLike',
    dataIndex: 'nickNameLike',
    title: '别名Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 年龄Min  */
  export const ageMin = {
    key: 'ageMin',
    dataIndex: 'ageMin',
    title: '年龄Min',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 年龄Max  */
  export const ageMax = {
    key: 'ageMax',
    dataIndex: 'ageMax',
    title: '年龄Max',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 详细地址Like  */
  export const addressLike = {
    key: 'addressLike',
    dataIndex: 'addressLike',
    title: '详细地址Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 头像 s  */
  export const avatarImgIds = {
    key: 'avatarImgIds',
    dataIndex: 'avatarImgIds',
    title: '头像',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 邮箱Like  */
  export const emailLike = {
    key: 'emailLike',
    dataIndex: 'emailLike',
    title: '邮箱Like',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 认证时间Min  TIMESTAMP*/
  export const valiDatetimeMin = {
    key: 'valiDatetimeMin',
    dataIndex: 'valiDatetimeMin',
    title: '认证时间Min',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 认证时间Max  TIMESTAMP*/
  export const valiDatetimeMax = {
    key: 'valiDatetimeMax',
    dataIndex: 'valiDatetimeMax',
    title: '认证时间Max',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 出生日期Min  DATE*/
  export const birthdayDateMin = {
    key: 'birthdayDateMin',
    dataIndex: 'birthdayDateMin',
    title: '出生日期Min',
    noJson: true,
    temporalType: TemporalType.DATE,
    format: DATE_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 出生日期Max  DATE*/
  export const birthdayDateMax = {
    key: 'birthdayDateMax',
    dataIndex: 'birthdayDateMax',
    title: '出生日期Max',
    noJson: true,
    temporalType: TemporalType.DATE,
    format: DATE_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 工作时间Min  TIME*/
  export const workTimeMin = {
    key: 'workTimeMin',
    dataIndex: 'workTimeMin',
    title: '工作时间Min',
    noJson: true,
    temporalType: TemporalType.TIME,
    format: TIME_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 工作时间Max  TIME*/
  export const workTimeMax = {
    key: 'workTimeMax',
    dataIndex: 'workTimeMax',
    title: '工作时间Max',
    noJson: true,
    temporalType: TemporalType.TIME,
    format: TIME_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 省份 s  */
  export const provinceIds = {
    key: 'provinceIds',
    dataIndex: 'provinceIds',
    title: '省份',
    noJson: true,
    isArray: true,
    referConfig: {
      api: 'getProvinceOptions',
      referField: 'provinces',
    },
    config: {
    },
    nullTitle: '请选择',
  } as ColumnConfig<User>;

  /** 城市 s  */
  export const cityIds = {
    key: 'cityIds',
    dataIndex: 'cityIds',
    title: '城市',
    noJson: true,
    isArray: true,
    changeBy: 'provinceId',
    referConfig: {
      api: 'getCityOptions',
      referField: 'citys',
    },
    config: {
    },
    nullTitle: '请选择',
  } as ColumnConfig<User>;

  /** 状态 s  */
  export const statuss = {
    key: 'statuss',
    dataIndex: 'statuss',
    title: '状态',
    noJson: true,
    isEnum: true,
    isArray: true,
    referConfig: {
      options: statusEnumOptions,
    },
    config: {
    },
    nullTitle: '请选择',
  } as ColumnConfig<User>;

  /** 级别Min  */
  export const gradeMin = {
    key: 'gradeMin',
    dataIndex: 'gradeMin',
    title: '级别Min',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 级别Max  */
  export const gradeMax = {
    key: 'gradeMax',
    dataIndex: 'gradeMax',
    title: '级别Max',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 邮寄地址 s  */
  export const postAddressIds = {
    key: 'postAddressIds',
    dataIndex: 'postAddressIds',
    title: '邮寄地址',
    noJson: true,
    isArray: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** remarkLike  */
  export const remarkLike = {
    key: 'remarkLike',
    dataIndex: 'remarkLike',
    title: 'remarkLike',
    noJson: true,
    config: {
    },
  } as ColumnConfig<User>;

  /** 创建时间Min  TIMESTAMP*/
  export const createTimeMin = {
    key: 'createTimeMin',
    dataIndex: 'createTimeMin',
    title: '创建时间Min',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 创建时间Max  TIMESTAMP*/
  export const createTimeMax = {
    key: 'createTimeMax',
    dataIndex: 'createTimeMax',
    title: '创建时间Max',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 更新时间Min  TIMESTAMP*/
  export const updateTimeMin = {
    key: 'updateTimeMin',
    dataIndex: 'updateTimeMin',
    title: '更新时间Min',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 更新时间Max  TIMESTAMP*/
  export const updateTimeMax = {
    key: 'updateTimeMax',
    dataIndex: 'updateTimeMax',
    title: '更新时间Max',
    noJson: true,
    temporalType: TemporalType.TIMESTAMP,
    format: TIMESTAMP_FORMAT,
    config: {
    },
  } as ColumnConfig<User>;

  /** 邮寄地址  */
  export const cascaderPostAddressIds = {
    key: 'cascaderPostAddressIds',
    dataIndex: 'cascaderPostAddressIds',
    title: '邮寄地址',
    renderColumn: UIColumns.CascaderRender,
    isArray: true,
    referConfig: {
      api: 'getRegionOptions',
      referField: 'cascaderPostAddresss',
      optionConvertor: {
        parentId: 'parentRegionId',
        label: 'name',
      },
    },
    config: {
    },
    nullTitle: '请选择',
    render: (text: any, record: User, index: number) =>{
      return cascaderPostAddressIds.renderColumn(record, null, text, index, cascaderPostAddressIds);
    },
  } as ColumnConfig<User>;


  export const userRenderColumns = {
    hoppyIds,
    userId,
    username,
    roleType,
    name,
    nickName,
    age,
    address,
    avatarImgId,
    email,
    valiDatetime,
    birthdayDate,
    workTime,
    provinceId,
    cityId,
    status,
    grade,
    sex,
    postAddressId,
    remark,
    createTime,
    updateTime,
    cascaderPostAddressIds,
  }

}

export default UserColumns;