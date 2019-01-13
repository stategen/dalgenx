/**
 *  Do not remove this unless you get business authorization.
 *  User_me
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import RoleType from "../enums/RoleType";
import StatusEnum from "../enums/StatusEnum";
import User from "../beans/User";
import UIEditors from "@utils/UIEditors";
import {
  FormItemConfig, FormItemConfigMap, TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ObjectMap,
  TemporalType, FormProps, confirmChanges, moment
} from "@utils/DvaUtil";
import UIColumns from "@utils/UIColumns";
import {roleTypeOptions} from '../enums/RoleType';
import {statusEnumOptions} from '../enums/StatusEnum';
import UserColumns from '../columns/UserColumns';


namespace User_meApiForms {
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
    ...UserColumns.roleType,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
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
  update_roleType.Editor = ((props?: UIEditors.SelectEditorProps) => {
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
  export const getUpdateFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps): IUpdateFormItemConfigMap => {
    /** CheckboxGroup */
    const update_hoppyIdsValue = queryRule.hoppyIds;
    /** Cascader */
    const update_cascaderPostAddressIdsValue = queryRule.cascaderPostAddressIds;
    /** Input */
    const update_usernameValue = queryRule.username;
    /** Password */
    const update_passwordValue = queryRule.password;
    /** Select */
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
        
      },
      CascaderPostAddressIds: {
        ...update_cascaderPostAddressIds,
        config: {...update_cascaderPostAddressIds.config, initialValue: update_cascaderPostAddressIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Username: {
        ...update_username,
        config: {...update_username.config, initialValue: update_usernameValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Password: {
        ...update_password,
        config: {...update_password.config, initialValue: update_passwordValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      RoleType: {
        ...update_roleType,
        config: {...update_roleType.config, initialValue: update_roleTypeValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Name: {
        ...update_name,
        config: {...update_name.config, initialValue: update_nameValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      NickName: {
        ...update_nickName,
        config: {...update_nickName.config, initialValue: update_nickNameValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Age: {
        ...update_age,
        config: {...update_age.config, initialValue: update_ageValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Address: {
        ...update_address,
        config: {...update_address.config, initialValue: update_addressValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      AvatarImgId: {
        ...update_avatarImgId,
        config: {...update_avatarImgId.config, initialValue: update_avatarImgIdValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Email: {
        ...update_email,
        config: {...update_email.config, initialValue: update_emailValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      ValiDatetime: {
        ...update_valiDatetime,
        config: {...update_valiDatetime.config, initialValue: update_valiDatetimeValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      BirthdayDate: {
        ...update_birthdayDate,
        config: {...update_birthdayDate.config, initialValue: update_birthdayDateValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      WorkTime: {
        ...update_workTime,
        config: {...update_workTime.config, initialValue: update_workTimeValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      ProvinceId: {
        ...update_provinceId,
        config: {...update_provinceId.config, initialValue: update_provinceIdValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      CityId: {
        ...update_cityId,
        config: {...update_cityId.config, initialValue: update_cityIdValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Status: {
        ...update_status,
        config: {...update_status.config, initialValue: update_statusValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Grade: {
        ...update_grade,
        config: {...update_grade.config, initialValue: update_gradeValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Sex: {
        ...update_sex,
        config: {...update_sex.config, initialValue: update_sexValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      PostAddressId: {
        ...update_postAddressId,
        config: {...update_postAddressId.config, initialValue: update_postAddressIdValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      UserId: {
        ...update_userId,
        config: {...update_userId.config, initialValue: update_userIdValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
    }
    return UpdateFormItemConfigMap;
  }
}
export default User_meApiForms;