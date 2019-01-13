/**
 *  Do not remove this unless you get business authorization.
 *  User
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";
import UIEditors from "@utils/UIEditors";
import {
  FormItemConfig, FormItemConfigMap, TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ObjectMap,
  TemporalType, FormProps, confirmChanges, FormItemProps, moment
} from "@utils/DvaUtil";
import UIColumns from "@utils/UIColumns";
import AntdPageListColumns from '../columns/AntdPageListColumns';
import {statusEnumOptions} from '../enums/StatusEnum';
import UserColumns from '../columns/UserColumns';


namespace UserApiForms {
  /** 用户ID */
  const getUserPageList_userId = {
    ...UserColumns.userId,
    UIEditor__: UIEditors.BuildHiddenEditor,
    Editor: UIEditors.BuildHiddenEditor,
  };
  /** 用户ID s */
  const getUserPageList_userIds = {
    ...UserColumns.userIds,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 用户名Like */
  const getUserPageList_usernameLike = {
    ...UserColumns.usernameLike,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 用户角色 s */
  const getUserPageList_roleTypes = {
    key: 'roleTypes',
    dataIndex: 'roleTypes',
    title: '用户角色',
    noJson: true,
    isArray: true,
    config: {
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 年龄Min */
  const getUserPageList_ageMin = {
    ...UserColumns.ageMin,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 年龄Max */
  const getUserPageList_ageMax = {
    ...UserColumns.ageMax,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 认证时间Min TIMESTAMP*/
  const getUserPageList_valiDatetimeMin = {
    ...UserColumns.valiDatetimeMin,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 出生日期Min DATE*/
  const getUserPageList_birthdayDateMin = {
    ...UserColumns.birthdayDateMin,
    UIEditor__: UIEditors.BuildDatePickerEditor,
    Editor: UIEditors.BuildDatePickerEditor,
  };
  /** 工作时间Min TIME*/
  const getUserPageList_workTimeMin = {
    ...UserColumns.workTimeMin,
    UIEditor__: UIEditors.BuildTimePickerEditor,
    Editor: UIEditors.BuildTimePickerEditor,
  };
  /** 省份 ID */
  const getUserPageList_provinceId = {
    ...UserColumns.provinceId,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 城市 s */
  const getUserPageList_cityIds = {
    ...UserColumns.cityIds,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 状态 s */
  const getUserPageList_statuss = {
    ...UserColumns.statuss,
    UIEditor__: UIEditors.BuildCheckboxGroupEditor,
    Editor: UIEditors.BuildCheckboxGroupEditor,
  };
  /** 级别Min */
  const getUserPageList_gradeMin = {
    ...UserColumns.gradeMin,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 邮寄地址 ID */
  const getUserPageList_postAddressId = {
    ...UserColumns.postAddressId,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  confirmChanges([
      getUserPageList_userId,
      getUserPageList_userIds,
      getUserPageList_usernameLike,
      getUserPageList_roleTypes,
      getUserPageList_ageMin,
      getUserPageList_ageMax,
      getUserPageList_valiDatetimeMin,
      getUserPageList_birthdayDateMin,
      getUserPageList_workTimeMin,
      getUserPageList_provinceId,
      getUserPageList_cityIds,
      getUserPageList_statuss,
      getUserPageList_gradeMin,
      getUserPageList_postAddressId,
    ]
  );
  /** 爱好 ids */
  const insert_hoppyIds = {
    ...UserColumns.hoppyIds,
    UIEditor__: UIEditors.BuildCheckboxGroupEditor,
    Editor: UIEditors.BuildCheckboxGroupEditor,
  };
  /** 邮寄地址 */
  const insert_cascaderPostAddressIds = {
    ...UserColumns.cascaderPostAddressIds,
    UIEditor__: UIEditors.BuildCascaderEditor,
    Editor: UIEditors.BuildCascaderEditor,
  };
  /** 用户名 */
  const insert_username = {
    ...UserColumns.username,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 密码，测试，明文 */
  const insert_password = {
    key: 'password',
    dataIndex: 'password',
    title: '密码',
    noJson: true,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',

    UIEditor__: UIEditors.BuildPasswordEditor,
    Editor: UIEditors.BuildPasswordEditor,
  };
  /** 用户角色 ADMIN,DEFAULT,DEVELOPER */
  const insert_roleType = {
    key: 'roleType',
    dataIndex: 'roleType',
    title: '用户角色',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 32,
          message: "最大不能超过{max}",
        },
      ],
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 姓名 */
  const insert_name = {
    ...UserColumns.name,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 别名 */
  const insert_nickName = {
    ...UserColumns.nickName,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 年龄 */
  const insert_age = {
    ...UserColumns.age,
    UIEditor__: UIEditors.BuildNumberEditor,
    Editor: UIEditors.BuildNumberEditor,
  };
  /** 详细地址 */
  const insert_address = {
    ...UserColumns.address,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 头像 ID */
  const insert_avatarImgId = {
    ...UserColumns.avatarImgId,
    UIEditor__: UIEditors.BuildImageEditor,
    Editor: UIEditors.BuildImageEditor,
  };
  /** 邮箱 */
  const insert_email = {
    ...UserColumns.email,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 认证时间 TIMESTAMP*/
  const insert_valiDatetime = {
    ...UserColumns.valiDatetime,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 出生日期 DATE*/
  const insert_birthdayDate = {
    ...UserColumns.birthdayDate,
    UIEditor__: UIEditors.BuildDatePickerEditor,
    Editor: UIEditors.BuildDatePickerEditor,
  };
  /** 工作时间 TIME*/
  const insert_workTime = {
    ...UserColumns.workTime,
    UIEditor__: UIEditors.BuildTimePickerEditor,
    Editor: UIEditors.BuildTimePickerEditor,
  };
  /** 省份 ID */
  const insert_provinceId = {
    ...UserColumns.provinceId,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 城市 ID */
  const insert_cityId = {
    ...UserColumns.cityId,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 状态 enum */
  const insert_status = {
    ...UserColumns.status,
    UIEditor__: UIEditors.BuildRadioGroupEditor,
    Editor: UIEditors.BuildRadioGroupEditor,
  };
  /** 级别 */
  const insert_grade = {
    ...UserColumns.grade,
    UIEditor__: UIEditors.BuildRateEditor,
    Editor: UIEditors.BuildRateEditor,
  };
  /** 性别 */
  const insert_sex = {
    ...UserColumns.sex,
    UIEditor__: UIEditors.BuildSwitchEditor,
    Editor: UIEditors.BuildSwitchEditor,
  };
  /** 邮寄地址 ID */
  const insert_postAddressId = {
    ...UserColumns.postAddressId,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 用户ID */
  const insert_userId = {
    ...UserColumns.userId,
    UIEditor__: UIEditors.BuildHiddenEditor,
    Editor: UIEditors.BuildHiddenEditor,
  };
  confirmChanges([
      insert_hoppyIds,
      insert_cascaderPostAddressIds,
      insert_username,
      insert_password,
      insert_roleType,
      insert_name,
      insert_nickName,
      insert_age,
      insert_address,
      insert_avatarImgId,
      insert_email,
      insert_valiDatetime,
      insert_birthdayDate,
      insert_workTime,
      insert_provinceId,
      insert_cityId,
      insert_status,
      insert_grade,
      insert_sex,
      insert_postAddressId,
      insert_userId,
    ]
  );
  /** 爱好 ids */
  const update_hoppyIds = {
    ...UserColumns.hoppyIds,
    UIEditor__: UIEditors.BuildCheckboxGroupEditor,
    Editor: UIEditors.BuildCheckboxGroupEditor,
  };
  /** 邮寄地址 */
  const update_cascaderPostAddressIds = {
    ...UserColumns.cascaderPostAddressIds,
    UIEditor__: UIEditors.BuildCascaderEditor,
    Editor: UIEditors.BuildCascaderEditor,
  };
  /** 用户名 */
  const update_username = {
    ...UserColumns.username,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 密码，测试，明文 */
  const update_password = {
    key: 'password',
    dataIndex: 'password',
    title: '密码',
    noJson: true,
    config: {
      rules: [
        {
          max: 64,
          message: "最大不能超过{max}",
        },
      ],
    },
    nullTitle: '请选择',

    UIEditor__: UIEditors.BuildPasswordEditor,
    Editor: UIEditors.BuildPasswordEditor,
  };
  /** 用户角色 ADMIN,DEFAULT,DEVELOPER */
  const update_roleType = {
    key: 'roleType',
    dataIndex: 'roleType',
    title: '用户角色',
    renderColumn: UIColumns.InputRender,
    config: {
      rules: [
        {
          max: 32,
          message: "最大不能超过{max}",
        },
      ],
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 姓名 */
  const update_name = {
    ...UserColumns.name,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 别名 */
  const update_nickName = {
    ...UserColumns.nickName,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 年龄 */
  const update_age = {
    ...UserColumns.age,
    UIEditor__: UIEditors.BuildNumberEditor,
    Editor: UIEditors.BuildNumberEditor,
  };
  /** 详细地址 */
  const update_address = {
    ...UserColumns.address,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 头像 ID */
  const update_avatarImgId = {
    ...UserColumns.avatarImgId,
    UIEditor__: UIEditors.BuildImageEditor,
    Editor: UIEditors.BuildImageEditor,
  };
  /** 邮箱 */
  const update_email = {
    ...UserColumns.email,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 认证时间 TIMESTAMP*/
  const update_valiDatetime = {
    ...UserColumns.valiDatetime,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 出生日期 DATE*/
  const update_birthdayDate = {
    ...UserColumns.birthdayDate,
    UIEditor__: UIEditors.BuildDatePickerEditor,
    Editor: UIEditors.BuildDatePickerEditor,
  };
  /** 工作时间 TIME*/
  const update_workTime = {
    ...UserColumns.workTime,
    UIEditor__: UIEditors.BuildTimePickerEditor,
    Editor: UIEditors.BuildTimePickerEditor,
  };
  /** 省份 ID */
  const update_provinceId = {
    ...UserColumns.provinceId,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 城市 ID */
  const update_cityId = {
    ...UserColumns.cityId,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 状态 enum */
  const update_status = {
    ...UserColumns.status,
    UIEditor__: UIEditors.BuildRadioGroupEditor,
    Editor: UIEditors.BuildRadioGroupEditor,
  };
  /** 级别 */
  const update_grade = {
    ...UserColumns.grade,
    UIEditor__: UIEditors.BuildRateEditor,
    Editor: UIEditors.BuildRateEditor,
  };
  /** 性别 */
  const update_sex = {
    ...UserColumns.sex,
    UIEditor__: UIEditors.BuildSwitchEditor,
    Editor: UIEditors.BuildSwitchEditor,
  };
  /** 邮寄地址 ID */
  const update_postAddressId = {
    ...UserColumns.postAddressId,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 用户ID */
  const update_userId = {
    ...UserColumns.userId,
    UIEditor__: UIEditors.BuildHiddenEditor,
    Editor: UIEditors.BuildHiddenEditor,
  };
  confirmChanges([
      update_hoppyIds,
      update_cascaderPostAddressIds,
      update_username,
      update_password,
      update_roleType,
      update_name,
      update_nickName,
      update_age,
      update_address,
      update_avatarImgId,
      update_email,
      update_valiDatetime,
      update_birthdayDate,
      update_workTime,
      update_provinceId,
      update_cityId,
      update_status,
      update_grade,
      update_sex,
      update_postAddressId,
      update_userId,
    ]
  );


  export interface IGetUserPageListFormItemConfigMap extends FormItemConfigMap {
    /** 用户ID  */
    UserId?: typeof getUserPageList_userId & Partial<FormItemConfig>,
    /** 用户ID s  */
    UserIds?: typeof getUserPageList_userIds & Partial<FormItemConfig>,
    /** 用户名Like  */
    UsernameLike?: typeof getUserPageList_usernameLike & Partial<FormItemConfig>,
    /** 用户角色 s  */
    RoleTypes?: typeof getUserPageList_roleTypes & Partial<FormItemConfig>,
    /** 年龄Min  */
    AgeMin?: typeof getUserPageList_ageMin & Partial<FormItemConfig>,
    /** 年龄Max  */
    AgeMax?: typeof getUserPageList_ageMax & Partial<FormItemConfig>,
    /** 认证时间Min  TIMESTAMP*/
    ValiDatetimeMin?: typeof getUserPageList_valiDatetimeMin & Partial<FormItemConfig>,
    /** 出生日期Min  DATE*/
    BirthdayDateMin?: typeof getUserPageList_birthdayDateMin & Partial<FormItemConfig>,
    /** 工作时间Min  TIME*/
    WorkTimeMin?: typeof getUserPageList_workTimeMin & Partial<FormItemConfig>,
    /** 省份 ID  */
    ProvinceId?: typeof getUserPageList_provinceId & Partial<FormItemConfig>,
    /** 城市 s  */
    CityIds?: typeof getUserPageList_cityIds & Partial<FormItemConfig>,
    /** 状态 s  */
    Statuss?: typeof getUserPageList_statuss & Partial<FormItemConfig>,
    /** 级别Min  */
    GradeMin?: typeof getUserPageList_gradeMin & Partial<FormItemConfig>,
    /** 邮寄地址 ID  */
    PostAddressId?: typeof getUserPageList_postAddressId & Partial<FormItemConfig>,
  }

  let UserPageListFormItemConfigMap = null;
  export const removeGetUserPageListFormItemConfigMapRef = ((ref) => ref ? null : UserPageListFormItemConfigMap = null);
  getUserPageList_userId.Editor = ((props?: UIEditors.HiddenEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.UserId, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_userIds.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.UserIds, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_usernameLike.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.UsernameLike, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_roleTypes.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.RoleTypes, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_ageMin.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.AgeMin, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_ageMax.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.AgeMax, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_valiDatetimeMin.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.ValiDatetimeMin, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_birthdayDateMin.Editor = ((props?: UIEditors.DatePickerEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.BirthdayDateMin, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_workTimeMin.Editor = ((props?: UIEditors.TimePickerEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.WorkTimeMin, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_provinceId.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.ProvinceId, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_cityIds.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.CityIds, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_statuss.Editor = ((props?: UIEditors.CheckboxGroupEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.Statuss, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_gradeMin.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.GradeMin, removeGetUserPageListFormItemConfigMapRef);
  }) as any;
  getUserPageList_postAddressId.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UserPageListFormItemConfigMap.PostAddressId, removeGetUserPageListFormItemConfigMapRef);
  }) as any;

  /**
   const UserIdEditor = userPageListFormItemConfigMap.UserId.Editor;
   const UserIdsEditor = userPageListFormItemConfigMap.UserIds.Editor;
   const UsernameLikeEditor = userPageListFormItemConfigMap.UsernameLike.Editor;
   const RoleTypesEditor = userPageListFormItemConfigMap.RoleTypes.Editor;
   const AgeMinEditor = userPageListFormItemConfigMap.AgeMin.Editor;
   const AgeMaxEditor = userPageListFormItemConfigMap.AgeMax.Editor;
   const ValiDatetimeMinEditor = userPageListFormItemConfigMap.ValiDatetimeMin.Editor;
   const BirthdayDateMinEditor = userPageListFormItemConfigMap.BirthdayDateMin.Editor;
   const WorkTimeMinEditor = userPageListFormItemConfigMap.WorkTimeMin.Editor;
   const ProvinceIdEditor = userPageListFormItemConfigMap.ProvinceId.Editor;
   const CityIdsEditor = userPageListFormItemConfigMap.CityIds.Editor;
   const StatussEditor = userPageListFormItemConfigMap.Statuss.Editor;
   const GradeMinEditor = userPageListFormItemConfigMap.GradeMin.Editor;
   const PostAddressIdEditor = userPageListFormItemConfigMap.PostAddressId.Editor;
   <UserIdEditor
   >
   </UserIdEditor>
   <UserIdsEditor
   >
   </UserIdsEditor>
   <UsernameLikeEditor
   >
   </UsernameLikeEditor>
   <RoleTypesEditor
   >
   </RoleTypesEditor>
   <AgeMinEditor
   >
   </AgeMinEditor>
   <AgeMaxEditor
   >
   </AgeMaxEditor>
   <ValiDatetimeMinEditor
   >
   </ValiDatetimeMinEditor>
   <BirthdayDateMinEditor
   >
   </BirthdayDateMinEditor>
   <WorkTimeMinEditor
   >
   </WorkTimeMinEditor>
   <ProvinceIdEditor
   >
   </ProvinceIdEditor>
   <CityIdsEditor
   >
   </CityIdsEditor>
   <StatussEditor
   >
   </StatussEditor>
   <GradeMinEditor
   >
   </GradeMinEditor>
   <PostAddressIdEditor
   >
   </PostAddressIdEditor>
   */
  export const getUserPageListFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IGetUserPageListFormItemConfigMap => {
    /** Hidden */
    const getUserPageList_userIdValue = queryRule.userId;
    /** Input */
    const getUserPageList_userIdsValue = queryRule.userIds;
    /** Input */
    const getUserPageList_usernameLikeValue = queryRule.usernameLike;
    /** Input */
    const getUserPageList_roleTypesValue = queryRule.roleTypes;
    /** Input */
    const getUserPageList_ageMinValue = queryRule.ageMin;
    /** Input */
    const getUserPageList_ageMaxValue = queryRule.ageMax;
    /** TimeStamp */
    const getUserPageList_valiDatetimeMinValue = queryRule.valiDatetimeMin ? moment(queryRule.valiDatetimeMin) : null;
    /** DatePicker */
    const getUserPageList_birthdayDateMinValue = queryRule.birthdayDateMin ? moment(queryRule.birthdayDateMin) : null;
    /** TimePicker */
    const getUserPageList_workTimeMinValue = queryRule.workTimeMin ? moment(queryRule.workTimeMin) : null;
    /** Select */
    const getUserPageList_provinceIdValue = queryRule.provinceId;
    /** Select */
    const getUserPageList_cityIdsValue = queryRule.cityIds;
    /** CheckboxGroup */
    const getUserPageList_statussValue = queryRule.statuss;
    /** Input */
    const getUserPageList_gradeMinValue = queryRule.gradeMin;
    /** Input */
    const getUserPageList_postAddressIdValue = queryRule.postAddressId;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    UserPageListFormItemConfigMap = {
      UserId: {
        ...getUserPageList_userId,
        config: {...getUserPageList_userId.config, initialValue: getUserPageList_userIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      UserIds: {
        ...getUserPageList_userIds,
        config: {...getUserPageList_userIds.config, initialValue: getUserPageList_userIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      UsernameLike: {
        ...getUserPageList_usernameLike,
        config: {...getUserPageList_usernameLike.config, initialValue: getUserPageList_usernameLikeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      RoleTypes: {
        ...getUserPageList_roleTypes,
        config: {...getUserPageList_roleTypes.config, initialValue: getUserPageList_roleTypesValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      AgeMin: {
        ...getUserPageList_ageMin,
        config: {...getUserPageList_ageMin.config, initialValue: getUserPageList_ageMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      AgeMax: {
        ...getUserPageList_ageMax,
        config: {...getUserPageList_ageMax.config, initialValue: getUserPageList_ageMaxValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ValiDatetimeMin: {
        ...getUserPageList_valiDatetimeMin,
        config: {...getUserPageList_valiDatetimeMin.config, initialValue: getUserPageList_valiDatetimeMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      BirthdayDateMin: {
        ...getUserPageList_birthdayDateMin,
        config: {...getUserPageList_birthdayDateMin.config, initialValue: getUserPageList_birthdayDateMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      WorkTimeMin: {
        ...getUserPageList_workTimeMin,
        config: {...getUserPageList_workTimeMin.config, initialValue: getUserPageList_workTimeMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ProvinceId: {
        ...getUserPageList_provinceId,
        config: {...getUserPageList_provinceId.config, initialValue: getUserPageList_provinceIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      CityIds: {
        ...getUserPageList_cityIds,
        config: {...getUserPageList_cityIds.config, initialValue: getUserPageList_cityIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Statuss: {
        ...getUserPageList_statuss,
        config: {...getUserPageList_statuss.config, initialValue: getUserPageList_statussValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      GradeMin: {
        ...getUserPageList_gradeMin,
        config: {...getUserPageList_gradeMin.config, initialValue: getUserPageList_gradeMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      PostAddressId: {
        ...getUserPageList_postAddressId,
        config: {...getUserPageList_postAddressId.config, initialValue: getUserPageList_postAddressIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
    }
    return UserPageListFormItemConfigMap;
  }

  export interface IInsertFormItemConfigMap extends FormItemConfigMap {
    /** 爱好 ids  */
    HoppyIds?: typeof insert_hoppyIds & Partial<FormItemConfig>,
    /** 邮寄地址  */
    CascaderPostAddressIds?: typeof insert_cascaderPostAddressIds & Partial<FormItemConfig>,
    /** 用户名  */
    Username?: typeof insert_username & Partial<FormItemConfig>,
    /** 密码，测试，明文  */
    Password?: typeof insert_password & Partial<FormItemConfig>,
    /** 用户角色 ADMIN,DEFAULT,DEVELOPER  */
    RoleType?: typeof insert_roleType & Partial<FormItemConfig>,
    /** 姓名  */
    Name?: typeof insert_name & Partial<FormItemConfig>,
    /** 别名  */
    NickName?: typeof insert_nickName & Partial<FormItemConfig>,
    /** 年龄  */
    Age?: typeof insert_age & Partial<FormItemConfig>,
    /** 详细地址  */
    Address?: typeof insert_address & Partial<FormItemConfig>,
    /** 头像 ID  */
    AvatarImgId?: typeof insert_avatarImgId & Partial<FormItemConfig>,
    /** 邮箱  */
    Email?: typeof insert_email & Partial<FormItemConfig>,
    /** 认证时间  TIMESTAMP*/
    ValiDatetime?: typeof insert_valiDatetime & Partial<FormItemConfig>,
    /** 出生日期  DATE*/
    BirthdayDate?: typeof insert_birthdayDate & Partial<FormItemConfig>,
    /** 工作时间  TIME*/
    WorkTime?: typeof insert_workTime & Partial<FormItemConfig>,
    /** 省份 ID  */
    ProvinceId?: typeof insert_provinceId & Partial<FormItemConfig>,
    /** 城市 ID  */
    CityId?: typeof insert_cityId & Partial<FormItemConfig>,
    /** 状态 enum  */
    Status?: typeof insert_status & Partial<FormItemConfig>,
    /** 级别  */
    Grade?: typeof insert_grade & Partial<FormItemConfig>,
    /** 性别  */
    Sex?: typeof insert_sex & Partial<FormItemConfig>,
    /** 邮寄地址 ID  */
    PostAddressId?: typeof insert_postAddressId & Partial<FormItemConfig>,
    /** 用户ID  */
    UserId?: typeof insert_userId & Partial<FormItemConfig>,
  }

  let InsertFormItemConfigMap = null;
  export const removeInsertFormItemConfigMapRef = ((ref) => ref ? null : InsertFormItemConfigMap = null);
  insert_hoppyIds.Editor = ((props?: UIEditors.CheckboxGroupEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.HoppyIds, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_cascaderPostAddressIds.Editor = ((props?: UIEditors.CascaderEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.CascaderPostAddressIds, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_username.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Username, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_password.Editor = ((props?: UIEditors.PasswordEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Password, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_roleType.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.RoleType, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_name.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Name, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_nickName.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.NickName, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_age.Editor = ((props?: UIEditors.NumberEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Age, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_address.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Address, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_avatarImgId.Editor = ((props?: UIEditors.ImageEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.AvatarImgId, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_email.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Email, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_valiDatetime.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.ValiDatetime, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_birthdayDate.Editor = ((props?: UIEditors.DatePickerEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.BirthdayDate, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_workTime.Editor = ((props?: UIEditors.TimePickerEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.WorkTime, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_provinceId.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.ProvinceId, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_cityId.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.CityId, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_status.Editor = ((props?: UIEditors.RadioGroupEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Status, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_grade.Editor = ((props?: UIEditors.RateEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Grade, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_sex.Editor = ((props?: UIEditors.SwitchEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Sex, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_postAddressId.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.PostAddressId, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_userId.Editor = ((props?: UIEditors.HiddenEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.UserId, removeInsertFormItemConfigMapRef);
  }) as any;

  /**
   const HoppyIdsEditor = insertFormItemConfigMap.HoppyIds.Editor;
   const CascaderPostAddressIdsEditor = insertFormItemConfigMap.CascaderPostAddressIds.Editor;
   const UsernameEditor = insertFormItemConfigMap.Username.Editor;
   const PasswordEditor = insertFormItemConfigMap.Password.Editor;
   const RoleTypeEditor = insertFormItemConfigMap.RoleType.Editor;
   const NameEditor = insertFormItemConfigMap.Name.Editor;
   const NickNameEditor = insertFormItemConfigMap.NickName.Editor;
   const AgeEditor = insertFormItemConfigMap.Age.Editor;
   const AddressEditor = insertFormItemConfigMap.Address.Editor;
   const AvatarImgIdEditor = insertFormItemConfigMap.AvatarImgId.Editor;
   const EmailEditor = insertFormItemConfigMap.Email.Editor;
   const ValiDatetimeEditor = insertFormItemConfigMap.ValiDatetime.Editor;
   const BirthdayDateEditor = insertFormItemConfigMap.BirthdayDate.Editor;
   const WorkTimeEditor = insertFormItemConfigMap.WorkTime.Editor;
   const ProvinceIdEditor = insertFormItemConfigMap.ProvinceId.Editor;
   const CityIdEditor = insertFormItemConfigMap.CityId.Editor;
   const StatusEditor = insertFormItemConfigMap.Status.Editor;
   const GradeEditor = insertFormItemConfigMap.Grade.Editor;
   const SexEditor = insertFormItemConfigMap.Sex.Editor;
   const PostAddressIdEditor = insertFormItemConfigMap.PostAddressId.Editor;
   const UserIdEditor = insertFormItemConfigMap.UserId.Editor;
   <HoppyIdsEditor
   >
   </HoppyIdsEditor>
   <CascaderPostAddressIdsEditor
   >
   </CascaderPostAddressIdsEditor>
   <UsernameEditor
   >
   </UsernameEditor>
   <PasswordEditor
   >
   </PasswordEditor>
   <RoleTypeEditor
   >
   </RoleTypeEditor>
   <NameEditor
   >
   </NameEditor>
   <NickNameEditor
   >
   </NickNameEditor>
   <AgeEditor
   >
   </AgeEditor>
   <AddressEditor
   >
   </AddressEditor>
   <AvatarImgIdEditor
   >
   </AvatarImgIdEditor>
   <EmailEditor
   >
   </EmailEditor>
   <ValiDatetimeEditor
   >
   </ValiDatetimeEditor>
   <BirthdayDateEditor
   >
   </BirthdayDateEditor>
   <WorkTimeEditor
   >
   </WorkTimeEditor>
   <ProvinceIdEditor
   >
   </ProvinceIdEditor>
   <CityIdEditor
   >
   </CityIdEditor>
   <StatusEditor
   >
   </StatusEditor>
   <GradeEditor
   >
   </GradeEditor>
   <SexEditor
   >
   </SexEditor>
   <PostAddressIdEditor
   >
   </PostAddressIdEditor>
   <UserIdEditor
   >
   </UserIdEditor>
   */
  export const getInsertFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IInsertFormItemConfigMap => {
    /** CheckboxGroup */
    const insert_hoppyIdsValue = queryRule.hoppyIds;
    /** Cascader */
    const insert_cascaderPostAddressIdsValue = queryRule.cascaderPostAddressIds;
    /** Input */
    const insert_usernameValue = queryRule.username;
    /** Password */
    const insert_passwordValue = queryRule.password;
    /** Input */
    const insert_roleTypeValue = queryRule.roleType;
    /** Input */
    const insert_nameValue = queryRule.name;
    /** Input */
    const insert_nickNameValue = queryRule.nickName;
    /** Number */
    const insert_ageValue = queryRule.age;
    /** Input */
    const insert_addressValue = queryRule.address;
    /** Image */
    const insert_avatarImgIdValue = queryRule.avatarImgId;
    /** Input */
    const insert_emailValue = queryRule.email;
    /** TimeStamp */
    const insert_valiDatetimeValue = queryRule.valiDatetime ? moment(queryRule.valiDatetime) : null;
    /** DatePicker */
    const insert_birthdayDateValue = queryRule.birthdayDate ? moment(queryRule.birthdayDate) : null;
    /** TimePicker */
    const insert_workTimeValue = queryRule.workTime ? moment(queryRule.workTime) : null;
    /** Select */
    const insert_provinceIdValue = queryRule.provinceId;
    /** Select */
    const insert_cityIdValue = queryRule.cityId;
    /** RadioGroup */
    const insert_statusValue = queryRule.status;
    /** Rate */
    const insert_gradeValue = queryRule.grade;
    /** Switch */
    const insert_sexValue = queryRule.sex;
    /** Input */
    const insert_postAddressIdValue = queryRule.postAddressId;
    /** Hidden */
    const insert_userIdValue = queryRule.userId;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    InsertFormItemConfigMap = {
      HoppyIds: {
        ...insert_hoppyIds,
        config: {...insert_hoppyIds.config, initialValue: insert_hoppyIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      CascaderPostAddressIds: {
        ...insert_cascaderPostAddressIds,
        config: {...insert_cascaderPostAddressIds.config, initialValue: insert_cascaderPostAddressIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Username: {
        ...insert_username,
        config: {...insert_username.config, initialValue: insert_usernameValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Password: {
        ...insert_password,
        config: {...insert_password.config, initialValue: insert_passwordValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      RoleType: {
        ...insert_roleType,
        config: {...insert_roleType.config, initialValue: insert_roleTypeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Name: {
        ...insert_name,
        config: {...insert_name.config, initialValue: insert_nameValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      NickName: {
        ...insert_nickName,
        config: {...insert_nickName.config, initialValue: insert_nickNameValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Age: {
        ...insert_age,
        config: {...insert_age.config, initialValue: insert_ageValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Address: {
        ...insert_address,
        config: {...insert_address.config, initialValue: insert_addressValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      AvatarImgId: {
        ...insert_avatarImgId,
        config: {...insert_avatarImgId.config, initialValue: insert_avatarImgIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Email: {
        ...insert_email,
        config: {...insert_email.config, initialValue: insert_emailValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ValiDatetime: {
        ...insert_valiDatetime,
        config: {...insert_valiDatetime.config, initialValue: insert_valiDatetimeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      BirthdayDate: {
        ...insert_birthdayDate,
        config: {...insert_birthdayDate.config, initialValue: insert_birthdayDateValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      WorkTime: {
        ...insert_workTime,
        config: {...insert_workTime.config, initialValue: insert_workTimeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ProvinceId: {
        ...insert_provinceId,
        config: {...insert_provinceId.config, initialValue: insert_provinceIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      CityId: {
        ...insert_cityId,
        config: {...insert_cityId.config, initialValue: insert_cityIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Status: {
        ...insert_status,
        config: {...insert_status.config, initialValue: insert_statusValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Grade: {
        ...insert_grade,
        config: {...insert_grade.config, initialValue: insert_gradeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Sex: {
        ...insert_sex,
        config: {...insert_sex.config, initialValue: insert_sexValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      PostAddressId: {
        ...insert_postAddressId,
        config: {...insert_postAddressId.config, initialValue: insert_postAddressIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      UserId: {
        ...insert_userId,
        config: {...insert_userId.config, initialValue: insert_userIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
    }
    return InsertFormItemConfigMap;
  }

  export interface IUpdateFormItemConfigMap extends FormItemConfigMap {
    /** 爱好 ids  */
    HoppyIds?: typeof update_hoppyIds & Partial<FormItemConfig>,
    /** 邮寄地址  */
    CascaderPostAddressIds?: typeof update_cascaderPostAddressIds & Partial<FormItemConfig>,
    /** 用户名  */
    Username?: typeof update_username & Partial<FormItemConfig>,
    /** 密码，测试，明文  */
    Password?: typeof update_password & Partial<FormItemConfig>,
    /** 用户角色 ADMIN,DEFAULT,DEVELOPER  */
    RoleType?: typeof update_roleType & Partial<FormItemConfig>,
    /** 姓名  */
    Name?: typeof update_name & Partial<FormItemConfig>,
    /** 别名  */
    NickName?: typeof update_nickName & Partial<FormItemConfig>,
    /** 年龄  */
    Age?: typeof update_age & Partial<FormItemConfig>,
    /** 详细地址  */
    Address?: typeof update_address & Partial<FormItemConfig>,
    /** 头像 ID  */
    AvatarImgId?: typeof update_avatarImgId & Partial<FormItemConfig>,
    /** 邮箱  */
    Email?: typeof update_email & Partial<FormItemConfig>,
    /** 认证时间  TIMESTAMP*/
    ValiDatetime?: typeof update_valiDatetime & Partial<FormItemConfig>,
    /** 出生日期  DATE*/
    BirthdayDate?: typeof update_birthdayDate & Partial<FormItemConfig>,
    /** 工作时间  TIME*/
    WorkTime?: typeof update_workTime & Partial<FormItemConfig>,
    /** 省份 ID  */
    ProvinceId?: typeof update_provinceId & Partial<FormItemConfig>,
    /** 城市 ID  */
    CityId?: typeof update_cityId & Partial<FormItemConfig>,
    /** 状态 enum  */
    Status?: typeof update_status & Partial<FormItemConfig>,
    /** 级别  */
    Grade?: typeof update_grade & Partial<FormItemConfig>,
    /** 性别  */
    Sex?: typeof update_sex & Partial<FormItemConfig>,
    /** 邮寄地址 ID  */
    PostAddressId?: typeof update_postAddressId & Partial<FormItemConfig>,
    /** 用户ID  */
    UserId?: typeof update_userId & Partial<FormItemConfig>,
  }

  let UpdateFormItemConfigMap = null;
  export const removeUpdateFormItemConfigMapRef = ((ref) => ref ? null : UpdateFormItemConfigMap = null);
  update_hoppyIds.Editor = ((props?: UIEditors.CheckboxGroupEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.HoppyIds, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_cascaderPostAddressIds.Editor = ((props?: UIEditors.CascaderEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.CascaderPostAddressIds, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_username.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Username, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_password.Editor = ((props?: UIEditors.PasswordEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Password, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_roleType.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.RoleType, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_name.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Name, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_nickName.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.NickName, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_age.Editor = ((props?: UIEditors.NumberEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Age, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_address.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Address, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_avatarImgId.Editor = ((props?: UIEditors.ImageEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.AvatarImgId, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_email.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Email, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_valiDatetime.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.ValiDatetime, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_birthdayDate.Editor = ((props?: UIEditors.DatePickerEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.BirthdayDate, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_workTime.Editor = ((props?: UIEditors.TimePickerEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.WorkTime, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_provinceId.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.ProvinceId, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_cityId.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.CityId, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_status.Editor = ((props?: UIEditors.RadioGroupEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Status, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_grade.Editor = ((props?: UIEditors.RateEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Grade, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_sex.Editor = ((props?: UIEditors.SwitchEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Sex, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_postAddressId.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.PostAddressId, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_userId.Editor = ((props?: UIEditors.HiddenEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.UserId, removeUpdateFormItemConfigMapRef);
  }) as any;

  /**
   const HoppyIdsEditor = updateFormItemConfigMap.HoppyIds.Editor;
   const CascaderPostAddressIdsEditor = updateFormItemConfigMap.CascaderPostAddressIds.Editor;
   const UsernameEditor = updateFormItemConfigMap.Username.Editor;
   const PasswordEditor = updateFormItemConfigMap.Password.Editor;
   const RoleTypeEditor = updateFormItemConfigMap.RoleType.Editor;
   const NameEditor = updateFormItemConfigMap.Name.Editor;
   const NickNameEditor = updateFormItemConfigMap.NickName.Editor;
   const AgeEditor = updateFormItemConfigMap.Age.Editor;
   const AddressEditor = updateFormItemConfigMap.Address.Editor;
   const AvatarImgIdEditor = updateFormItemConfigMap.AvatarImgId.Editor;
   const EmailEditor = updateFormItemConfigMap.Email.Editor;
   const ValiDatetimeEditor = updateFormItemConfigMap.ValiDatetime.Editor;
   const BirthdayDateEditor = updateFormItemConfigMap.BirthdayDate.Editor;
   const WorkTimeEditor = updateFormItemConfigMap.WorkTime.Editor;
   const ProvinceIdEditor = updateFormItemConfigMap.ProvinceId.Editor;
   const CityIdEditor = updateFormItemConfigMap.CityId.Editor;
   const StatusEditor = updateFormItemConfigMap.Status.Editor;
   const GradeEditor = updateFormItemConfigMap.Grade.Editor;
   const SexEditor = updateFormItemConfigMap.Sex.Editor;
   const PostAddressIdEditor = updateFormItemConfigMap.PostAddressId.Editor;
   const UserIdEditor = updateFormItemConfigMap.UserId.Editor;
   <HoppyIdsEditor
   >
   </HoppyIdsEditor>
   <CascaderPostAddressIdsEditor
   >
   </CascaderPostAddressIdsEditor>
   <UsernameEditor
   >
   </UsernameEditor>
   <PasswordEditor
   >
   </PasswordEditor>
   <RoleTypeEditor
   >
   </RoleTypeEditor>
   <NameEditor
   >
   </NameEditor>
   <NickNameEditor
   >
   </NickNameEditor>
   <AgeEditor
   >
   </AgeEditor>
   <AddressEditor
   >
   </AddressEditor>
   <AvatarImgIdEditor
   >
   </AvatarImgIdEditor>
   <EmailEditor
   >
   </EmailEditor>
   <ValiDatetimeEditor
   >
   </ValiDatetimeEditor>
   <BirthdayDateEditor
   >
   </BirthdayDateEditor>
   <WorkTimeEditor
   >
   </WorkTimeEditor>
   <ProvinceIdEditor
   >
   </ProvinceIdEditor>
   <CityIdEditor
   >
   </CityIdEditor>
   <StatusEditor
   >
   </StatusEditor>
   <GradeEditor
   >
   </GradeEditor>
   <SexEditor
   >
   </SexEditor>
   <PostAddressIdEditor
   >
   </PostAddressIdEditor>
   <UserIdEditor
   >
   </UserIdEditor>
   */
  export const getUpdateFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IUpdateFormItemConfigMap => {
    /** CheckboxGroup */
    const update_hoppyIdsValue = queryRule.hoppyIds;
    /** Cascader */
    const update_cascaderPostAddressIdsValue = queryRule.cascaderPostAddressIds;
    /** Input */
    const update_usernameValue = queryRule.username;
    /** Password */
    const update_passwordValue = queryRule.password;
    /** Input */
    const update_roleTypeValue = queryRule.roleType;
    /** Input */
    const update_nameValue = queryRule.name;
    /** Input */
    const update_nickNameValue = queryRule.nickName;
    /** Number */
    const update_ageValue = queryRule.age;
    /** Input */
    const update_addressValue = queryRule.address;
    /** Image */
    const update_avatarImgIdValue = queryRule.avatarImgId;
    /** Input */
    const update_emailValue = queryRule.email;
    /** TimeStamp */
    const update_valiDatetimeValue = queryRule.valiDatetime ? moment(queryRule.valiDatetime) : null;
    /** DatePicker */
    const update_birthdayDateValue = queryRule.birthdayDate ? moment(queryRule.birthdayDate) : null;
    /** TimePicker */
    const update_workTimeValue = queryRule.workTime ? moment(queryRule.workTime) : null;
    /** Select */
    const update_provinceIdValue = queryRule.provinceId;
    /** Select */
    const update_cityIdValue = queryRule.cityId;
    /** RadioGroup */
    const update_statusValue = queryRule.status;
    /** Rate */
    const update_gradeValue = queryRule.grade;
    /** Switch */
    const update_sexValue = queryRule.sex;
    /** Input */
    const update_postAddressIdValue = queryRule.postAddressId;
    /** Hidden */
    const update_userIdValue = queryRule.userId;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    UpdateFormItemConfigMap = {
      HoppyIds: {
        ...update_hoppyIds,
        config: {...update_hoppyIds.config, initialValue: update_hoppyIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      CascaderPostAddressIds: {
        ...update_cascaderPostAddressIds,
        config: {...update_cascaderPostAddressIds.config, initialValue: update_cascaderPostAddressIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Username: {
        ...update_username,
        config: {...update_username.config, initialValue: update_usernameValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Password: {
        ...update_password,
        config: {...update_password.config, initialValue: update_passwordValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      RoleType: {
        ...update_roleType,
        config: {...update_roleType.config, initialValue: update_roleTypeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Name: {
        ...update_name,
        config: {...update_name.config, initialValue: update_nameValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      NickName: {
        ...update_nickName,
        config: {...update_nickName.config, initialValue: update_nickNameValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Age: {
        ...update_age,
        config: {...update_age.config, initialValue: update_ageValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Address: {
        ...update_address,
        config: {...update_address.config, initialValue: update_addressValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      AvatarImgId: {
        ...update_avatarImgId,
        config: {...update_avatarImgId.config, initialValue: update_avatarImgIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Email: {
        ...update_email,
        config: {...update_email.config, initialValue: update_emailValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ValiDatetime: {
        ...update_valiDatetime,
        config: {...update_valiDatetime.config, initialValue: update_valiDatetimeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      BirthdayDate: {
        ...update_birthdayDate,
        config: {...update_birthdayDate.config, initialValue: update_birthdayDateValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      WorkTime: {
        ...update_workTime,
        config: {...update_workTime.config, initialValue: update_workTimeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ProvinceId: {
        ...update_provinceId,
        config: {...update_provinceId.config, initialValue: update_provinceIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      CityId: {
        ...update_cityId,
        config: {...update_cityId.config, initialValue: update_cityIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Status: {
        ...update_status,
        config: {...update_status.config, initialValue: update_statusValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Grade: {
        ...update_grade,
        config: {...update_grade.config, initialValue: update_gradeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Sex: {
        ...update_sex,
        config: {...update_sex.config, initialValue: update_sexValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      PostAddressId: {
        ...update_postAddressId,
        config: {...update_postAddressId.config, initialValue: update_postAddressIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      UserId: {
        ...update_userId,
        config: {...update_userId.config, initialValue: update_userIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
    }
    return UpdateFormItemConfigMap;
  }
}
export default UserApiForms;