/**
 *  Do not remove this unless you get business authorization.
 *  Role
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Role from "../beans/Role";
import RoleType from "../enums/RoleType";
import UIEditors from "@utils/UIEditors";
import {
  FormItemConfig, FormItemConfigMap, TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ObjectMap,
  TemporalType, FormProps, confirmChanges, FormItemProps, moment
} from "@utils/DvaUtil";
import UIColumns from "@utils/UIColumns";
import AntdPageListColumns from '../columns/AntdPageListColumns';
import RoleColumns from '../columns/RoleColumns';
import {roleTypeOptions} from '../enums/RoleType';


namespace RoleApiForms {
  /** 角色ID s */
  const getRolePageList_roleIds = {
    ...RoleColumns.roleIds,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 角色名称Like */
  const getRolePageList_roleNameLike = {
    ...RoleColumns.roleNameLike,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 描述Like */
  const getRolePageList_descriptionLike = {
    ...RoleColumns.descriptionLike,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 创建时间Min TIMESTAMP*/
  const getRolePageList_createTimeMin = {
    ...RoleColumns.createTimeMin,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 创建时间Max TIMESTAMP*/
  const getRolePageList_createTimeMax = {
    ...RoleColumns.createTimeMax,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 更新时间Min TIMESTAMP*/
  const getRolePageList_updateTimeMin = {
    ...RoleColumns.updateTimeMin,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 更新时间Max TIMESTAMP*/
  const getRolePageList_updateTimeMax = {
    ...RoleColumns.updateTimeMax,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 角色类型 s */
  const getRolePageList_roleTypes = {
    key: 'roleTypes',
    dataIndex: 'roleTypes',
    title: '角色类型',
    noJson: true,
    isEnum: true,
    isArray: true,
    referConfig: {
      options: roleTypeOptions,
    },
    config: {
    },

    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** showDateMin */
  const getRolePageList_showDateMin = {
    key: 'showDateMin',
    dataIndex: 'showDateMin',
    title: 'showDateMin',
    renderColumn: UIColumns.InputRender,
    config: {
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** showDateMax */
  const getRolePageList_showDateMax = {
    key: 'showDateMax',
    dataIndex: 'showDateMax',
    title: 'showDateMax',
    renderColumn: UIColumns.InputRender,
    config: {
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** showTimeMin */
  const getRolePageList_showTimeMin = {
    key: 'showTimeMin',
    dataIndex: 'showTimeMin',
    title: 'showTimeMin',
    renderColumn: UIColumns.InputRender,
    config: {
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** showTimeMax */
  const getRolePageList_showTimeMax = {
    key: 'showTimeMax',
    dataIndex: 'showTimeMax',
    title: 'showTimeMax',
    renderColumn: UIColumns.InputRender,
    config: {
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** showDateTimeMin */
  const getRolePageList_showDateTimeMin = {
    key: 'showDateTimeMin',
    dataIndex: 'showDateTimeMin',
    title: 'showDateTimeMin',
    renderColumn: UIColumns.InputRender,
    config: {
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** showDateTimeMax */
  const getRolePageList_showDateTimeMax = {
    key: 'showDateTimeMax',
    dataIndex: 'showDateTimeMax',
    title: 'showDateTimeMax',
    renderColumn: UIColumns.InputRender,
    config: {
    },

    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  confirmChanges([
      getRolePageList_roleIds,
      getRolePageList_roleNameLike,
      getRolePageList_descriptionLike,
      getRolePageList_createTimeMin,
      getRolePageList_createTimeMax,
      getRolePageList_updateTimeMin,
      getRolePageList_updateTimeMax,
      getRolePageList_roleTypes,
      getRolePageList_showDateMin,
      getRolePageList_showDateMax,
      getRolePageList_showTimeMin,
      getRolePageList_showTimeMax,
      getRolePageList_showDateTimeMin,
      getRolePageList_showDateTimeMax,
    ]
  );
  /** 角色ID */
  const insert_roleId = {
    ...RoleColumns.roleId,
    UIEditor__: UIEditors.BuildHiddenEditor,
    Editor: UIEditors.BuildHiddenEditor,
  };
  /** 角色名称 */
  const insert_roleName = {
    ...RoleColumns.roleName,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 描述 */
  const insert_description = {
    ...RoleColumns.description,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 角色类型 enum */
  const insert_roleType = {
    ...RoleColumns.roleType,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  confirmChanges([
      insert_roleId,
      insert_roleName,
      insert_description,
      insert_roleType,
    ]
  );
  /** 角色名称 */
  const update_roleName = {
    ...RoleColumns.roleName,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 描述 */
  const update_description = {
    ...RoleColumns.description,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 角色类型 enum */
  const update_roleType = {
    ...RoleColumns.roleType,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 角色ID */
  const update_roleId = {
    ...RoleColumns.roleId,
    UIEditor__: UIEditors.BuildHiddenEditor,
    Editor: UIEditors.BuildHiddenEditor,
  };
  confirmChanges([
      update_roleName,
      update_description,
      update_roleType,
      update_roleId,
    ]
  );


  export interface IGetRolePageListFormItemConfigMap extends FormItemConfigMap {
    /** 角色ID s  */
    RoleIds?: typeof getRolePageList_roleIds & Partial<FormItemConfig>,
    /** 角色名称Like  */
    RoleNameLike?: typeof getRolePageList_roleNameLike & Partial<FormItemConfig>,
    /** 描述Like  */
    DescriptionLike?: typeof getRolePageList_descriptionLike & Partial<FormItemConfig>,
    /** 创建时间Min  TIMESTAMP*/
    CreateTimeMin?: typeof getRolePageList_createTimeMin & Partial<FormItemConfig>,
    /** 创建时间Max  TIMESTAMP*/
    CreateTimeMax?: typeof getRolePageList_createTimeMax & Partial<FormItemConfig>,
    /** 更新时间Min  TIMESTAMP*/
    UpdateTimeMin?: typeof getRolePageList_updateTimeMin & Partial<FormItemConfig>,
    /** 更新时间Max  TIMESTAMP*/
    UpdateTimeMax?: typeof getRolePageList_updateTimeMax & Partial<FormItemConfig>,
    /** 角色类型 s  */
    RoleTypes?: typeof getRolePageList_roleTypes & Partial<FormItemConfig>,
    /** showDateMin  */
    ShowDateMin?: typeof getRolePageList_showDateMin & Partial<FormItemConfig>,
    /** showDateMax  */
    ShowDateMax?: typeof getRolePageList_showDateMax & Partial<FormItemConfig>,
    /** showTimeMin  */
    ShowTimeMin?: typeof getRolePageList_showTimeMin & Partial<FormItemConfig>,
    /** showTimeMax  */
    ShowTimeMax?: typeof getRolePageList_showTimeMax & Partial<FormItemConfig>,
    /** showDateTimeMin  */
    ShowDateTimeMin?: typeof getRolePageList_showDateTimeMin & Partial<FormItemConfig>,
    /** showDateTimeMax  */
    ShowDateTimeMax?: typeof getRolePageList_showDateTimeMax & Partial<FormItemConfig>,
  }

  let RolePageListFormItemConfigMap = null;
  export const removeGetRolePageListFormItemConfigMapRef = ((ref) => ref ? null : RolePageListFormItemConfigMap = null);
  getRolePageList_roleIds.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.RoleIds, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_roleNameLike.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.RoleNameLike, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_descriptionLike.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.DescriptionLike, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_createTimeMin.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.CreateTimeMin, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_createTimeMax.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.CreateTimeMax, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_updateTimeMin.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.UpdateTimeMin, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_updateTimeMax.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.UpdateTimeMax, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_roleTypes.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.RoleTypes, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_showDateMin.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.ShowDateMin, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_showDateMax.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.ShowDateMax, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_showTimeMin.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.ShowTimeMin, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_showTimeMax.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.ShowTimeMax, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_showDateTimeMin.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.ShowDateTimeMin, removeGetRolePageListFormItemConfigMapRef);
  }) as any;
  getRolePageList_showDateTimeMax.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, RolePageListFormItemConfigMap.ShowDateTimeMax, removeGetRolePageListFormItemConfigMapRef);
  }) as any;

  /**
   const RoleIdsEditor = rolePageListFormItemConfigMap.RoleIds.Editor;
   const RoleNameLikeEditor = rolePageListFormItemConfigMap.RoleNameLike.Editor;
   const DescriptionLikeEditor = rolePageListFormItemConfigMap.DescriptionLike.Editor;
   const CreateTimeMinEditor = rolePageListFormItemConfigMap.CreateTimeMin.Editor;
   const CreateTimeMaxEditor = rolePageListFormItemConfigMap.CreateTimeMax.Editor;
   const UpdateTimeMinEditor = rolePageListFormItemConfigMap.UpdateTimeMin.Editor;
   const UpdateTimeMaxEditor = rolePageListFormItemConfigMap.UpdateTimeMax.Editor;
   const RoleTypesEditor = rolePageListFormItemConfigMap.RoleTypes.Editor;
   const ShowDateMinEditor = rolePageListFormItemConfigMap.ShowDateMin.Editor;
   const ShowDateMaxEditor = rolePageListFormItemConfigMap.ShowDateMax.Editor;
   const ShowTimeMinEditor = rolePageListFormItemConfigMap.ShowTimeMin.Editor;
   const ShowTimeMaxEditor = rolePageListFormItemConfigMap.ShowTimeMax.Editor;
   const ShowDateTimeMinEditor = rolePageListFormItemConfigMap.ShowDateTimeMin.Editor;
   const ShowDateTimeMaxEditor = rolePageListFormItemConfigMap.ShowDateTimeMax.Editor;
   <RoleIdsEditor
   >
   </RoleIdsEditor>
   <RoleNameLikeEditor
   >
   </RoleNameLikeEditor>
   <DescriptionLikeEditor
   >
   </DescriptionLikeEditor>
   <CreateTimeMinEditor
   >
   </CreateTimeMinEditor>
   <CreateTimeMaxEditor
   >
   </CreateTimeMaxEditor>
   <UpdateTimeMinEditor
   >
   </UpdateTimeMinEditor>
   <UpdateTimeMaxEditor
   >
   </UpdateTimeMaxEditor>
   <RoleTypesEditor
   >
   </RoleTypesEditor>
   <ShowDateMinEditor
   >
   </ShowDateMinEditor>
   <ShowDateMaxEditor
   >
   </ShowDateMaxEditor>
   <ShowTimeMinEditor
   >
   </ShowTimeMinEditor>
   <ShowTimeMaxEditor
   >
   </ShowTimeMaxEditor>
   <ShowDateTimeMinEditor
   >
   </ShowDateTimeMinEditor>
   <ShowDateTimeMaxEditor
   >
   </ShowDateTimeMaxEditor>
   */
  export const getRolePageListFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IGetRolePageListFormItemConfigMap => {
    /** Input */
    const getRolePageList_roleIdsValue = queryRule.roleIds;
    /** Input */
    const getRolePageList_roleNameLikeValue = queryRule.roleNameLike;
    /** Input */
    const getRolePageList_descriptionLikeValue = queryRule.descriptionLike;
    /** TimeStamp */
    const getRolePageList_createTimeMinValue = queryRule.createTimeMin ? moment(queryRule.createTimeMin) : null;
    /** TimeStamp */
    const getRolePageList_createTimeMaxValue = queryRule.createTimeMax ? moment(queryRule.createTimeMax) : null;
    /** TimeStamp */
    const getRolePageList_updateTimeMinValue = queryRule.updateTimeMin ? moment(queryRule.updateTimeMin) : null;
    /** TimeStamp */
    const getRolePageList_updateTimeMaxValue = queryRule.updateTimeMax ? moment(queryRule.updateTimeMax) : null;
    /** Select */
    const getRolePageList_roleTypesValue = queryRule.roleTypes;
    /** Input */
    const getRolePageList_showDateMinValue = queryRule.showDateMin;
    /** Input */
    const getRolePageList_showDateMaxValue = queryRule.showDateMax;
    /** Input */
    const getRolePageList_showTimeMinValue = queryRule.showTimeMin;
    /** Input */
    const getRolePageList_showTimeMaxValue = queryRule.showTimeMax;
    /** Input */
    const getRolePageList_showDateTimeMinValue = queryRule.showDateTimeMin;
    /** Input */
    const getRolePageList_showDateTimeMaxValue = queryRule.showDateTimeMax;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    RolePageListFormItemConfigMap = {
      RoleIds: {
        ...getRolePageList_roleIds,
        config: {...getRolePageList_roleIds.config, initialValue: getRolePageList_roleIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      RoleNameLike: {
        ...getRolePageList_roleNameLike,
        config: {...getRolePageList_roleNameLike.config, initialValue: getRolePageList_roleNameLikeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      DescriptionLike: {
        ...getRolePageList_descriptionLike,
        config: {...getRolePageList_descriptionLike.config, initialValue: getRolePageList_descriptionLikeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      CreateTimeMin: {
        ...getRolePageList_createTimeMin,
        config: {...getRolePageList_createTimeMin.config, initialValue: getRolePageList_createTimeMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      CreateTimeMax: {
        ...getRolePageList_createTimeMax,
        config: {...getRolePageList_createTimeMax.config, initialValue: getRolePageList_createTimeMaxValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      UpdateTimeMin: {
        ...getRolePageList_updateTimeMin,
        config: {...getRolePageList_updateTimeMin.config, initialValue: getRolePageList_updateTimeMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      UpdateTimeMax: {
        ...getRolePageList_updateTimeMax,
        config: {...getRolePageList_updateTimeMax.config, initialValue: getRolePageList_updateTimeMaxValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      RoleTypes: {
        ...getRolePageList_roleTypes,
        config: {...getRolePageList_roleTypes.config, initialValue: getRolePageList_roleTypesValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ShowDateMin: {
        ...getRolePageList_showDateMin,
        config: {...getRolePageList_showDateMin.config, initialValue: getRolePageList_showDateMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ShowDateMax: {
        ...getRolePageList_showDateMax,
        config: {...getRolePageList_showDateMax.config, initialValue: getRolePageList_showDateMaxValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ShowTimeMin: {
        ...getRolePageList_showTimeMin,
        config: {...getRolePageList_showTimeMin.config, initialValue: getRolePageList_showTimeMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ShowTimeMax: {
        ...getRolePageList_showTimeMax,
        config: {...getRolePageList_showTimeMax.config, initialValue: getRolePageList_showTimeMaxValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ShowDateTimeMin: {
        ...getRolePageList_showDateTimeMin,
        config: {...getRolePageList_showDateTimeMin.config, initialValue: getRolePageList_showDateTimeMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      ShowDateTimeMax: {
        ...getRolePageList_showDateTimeMax,
        config: {...getRolePageList_showDateTimeMax.config, initialValue: getRolePageList_showDateTimeMaxValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
    }
    return RolePageListFormItemConfigMap;
  }

  export interface IInsertFormItemConfigMap extends FormItemConfigMap {
    /** 角色ID  */
    RoleId?: typeof insert_roleId & Partial<FormItemConfig>,
    /** 角色名称  */
    RoleName?: typeof insert_roleName & Partial<FormItemConfig>,
    /** 描述  */
    Description?: typeof insert_description & Partial<FormItemConfig>,
    /** 角色类型 enum  */
    RoleType?: typeof insert_roleType & Partial<FormItemConfig>,
  }

  let InsertFormItemConfigMap = null;
  export const removeInsertFormItemConfigMapRef = ((ref) => ref ? null : InsertFormItemConfigMap = null);
  insert_roleId.Editor = ((props?: UIEditors.HiddenEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.RoleId, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_roleName.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.RoleName, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_description.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Description, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_roleType.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.RoleType, removeInsertFormItemConfigMapRef);
  }) as any;

  /**
   const RoleIdEditor = insertFormItemConfigMap.RoleId.Editor;
   const RoleNameEditor = insertFormItemConfigMap.RoleName.Editor;
   const DescriptionEditor = insertFormItemConfigMap.Description.Editor;
   const RoleTypeEditor = insertFormItemConfigMap.RoleType.Editor;
   <RoleIdEditor
   >
   </RoleIdEditor>
   <RoleNameEditor
   >
   </RoleNameEditor>
   <DescriptionEditor
   >
   </DescriptionEditor>
   <RoleTypeEditor
   >
   </RoleTypeEditor>
   */
  export const getInsertFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IInsertFormItemConfigMap => {
    /** Hidden */
    const insert_roleIdValue = queryRule.roleId;
    /** Input */
    const insert_roleNameValue = queryRule.roleName;
    /** Input */
    const insert_descriptionValue = queryRule.description;
    /** Input */
    const insert_roleTypeValue = queryRule.roleType;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    InsertFormItemConfigMap = {
      RoleId: {
        ...insert_roleId,
        config: {...insert_roleId.config, initialValue: insert_roleIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      RoleName: {
        ...insert_roleName,
        config: {...insert_roleName.config, initialValue: insert_roleNameValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Description: {
        ...insert_description,
        config: {...insert_description.config, initialValue: insert_descriptionValue},
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
    }
    return InsertFormItemConfigMap;
  }

  export interface IUpdateFormItemConfigMap extends FormItemConfigMap {
    /** 角色名称  */
    RoleName?: typeof update_roleName & Partial<FormItemConfig>,
    /** 描述  */
    Description?: typeof update_description & Partial<FormItemConfig>,
    /** 角色类型 enum  */
    RoleType?: typeof update_roleType & Partial<FormItemConfig>,
    /** 角色ID  */
    RoleId?: typeof update_roleId & Partial<FormItemConfig>,
  }

  let UpdateFormItemConfigMap = null;
  export const removeUpdateFormItemConfigMapRef = ((ref) => ref ? null : UpdateFormItemConfigMap = null);
  update_roleName.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.RoleName, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_description.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Description, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_roleType.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.RoleType, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_roleId.Editor = ((props?: UIEditors.HiddenEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.RoleId, removeUpdateFormItemConfigMapRef);
  }) as any;

  /**
   const RoleNameEditor = updateFormItemConfigMap.RoleName.Editor;
   const DescriptionEditor = updateFormItemConfigMap.Description.Editor;
   const RoleTypeEditor = updateFormItemConfigMap.RoleType.Editor;
   const RoleIdEditor = updateFormItemConfigMap.RoleId.Editor;
   <RoleNameEditor
   >
   </RoleNameEditor>
   <DescriptionEditor
   >
   </DescriptionEditor>
   <RoleTypeEditor
   >
   </RoleTypeEditor>
   <RoleIdEditor
   >
   </RoleIdEditor>
   */
  export const getUpdateFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IUpdateFormItemConfigMap => {
    /** Input */
    const update_roleNameValue = queryRule.roleName;
    /** Input */
    const update_descriptionValue = queryRule.description;
    /** Input */
    const update_roleTypeValue = queryRule.roleType;
    /** Hidden */
    const update_roleIdValue = queryRule.roleId;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    UpdateFormItemConfigMap = {
      RoleName: {
        ...update_roleName,
        config: {...update_roleName.config, initialValue: update_roleNameValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Description: {
        ...update_description,
        config: {...update_description.config, initialValue: update_descriptionValue},
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
      RoleId: {
        ...update_roleId,
        config: {...update_roleId.config, initialValue: update_roleIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
    }
    return UpdateFormItemConfigMap;
  }
}
export default RoleApiForms;