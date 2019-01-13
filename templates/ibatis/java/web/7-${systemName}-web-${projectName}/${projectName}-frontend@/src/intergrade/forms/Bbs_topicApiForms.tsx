/**
 *  Do not remove this unless you get business authorization.
 *  Bbs_topic
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import AntdPageList from "../beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";
import UIEditors from "@utils/UIEditors";
import {
  FormItemConfig, FormItemConfigMap, TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ObjectMap,
  TemporalType, FormProps, confirmChanges, FormItemProps, moment
} from "@utils/DvaUtil";
import UIColumns from "@utils/UIColumns";
import AntdPageListColumns from '../columns/AntdPageListColumns';
import TopicColumns from '../columns/TopicColumns';
import {topicTypeOptions} from '../enums/TopicType';


namespace Bbs_topicApiForms {
  /** 主题ID s */
  const getTopicPageList_topicIds = {
    ...TopicColumns.topicIds,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 作者ID s */
  const getTopicPageList_authorIds = {
    ...TopicColumns.authorIds,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 主题类型 */
  const getTopicPageList_topicType = {
    ...TopicColumns.topicType,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 主题类型 s */
  const getTopicPageList_topicTypes = {
    ...TopicColumns.topicTypes,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 标题 */
  const getTopicPageList_title = {
    ...TopicColumns.title,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 标题Like */
  const getTopicPageList_titleLike = {
    ...TopicColumns.titleLike,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 浏览次数Min */
  const getTopicPageList_visitCountMin = {
    ...TopicColumns.visitCountMin,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 浏览次数Max */
  const getTopicPageList_visitCountMax = {
    ...TopicColumns.visitCountMax,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  confirmChanges([
      getTopicPageList_topicIds,
      getTopicPageList_authorIds,
      getTopicPageList_topicType,
      getTopicPageList_topicTypes,
      getTopicPageList_title,
      getTopicPageList_titleLike,
      getTopicPageList_visitCountMin,
      getTopicPageList_visitCountMax,
    ]
  );
  /** 主题ID */
  const insert_topicId = {
    ...TopicColumns.topicId,
    UIEditor__: UIEditors.BuildHiddenEditor,
    Editor: UIEditors.BuildHiddenEditor,
  };
  /** 作者ID */
  const insert_authorId = {
    ...TopicColumns.authorId,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 主题类型 */
  const insert_topicType = {
    ...TopicColumns.topicType,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 内容 */
  const insert_content = {
    ...TopicColumns.content,
    UIEditor__: UIEditors.BuildTextareaEditor,
    Editor: UIEditors.BuildTextareaEditor,
  };
  /** 标题 */
  const insert_title = {
    ...TopicColumns.title,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 最后回复 TIMESTAMP*/
  const insert_lastReplyAt = {
    ...TopicColumns.lastReplyAt,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 精华 */
  const insert_good = {
    ...TopicColumns.good,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 置顶 */
  const insert_top = {
    ...TopicColumns.top,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 浏览次数 */
  const insert_visitCount = {
    ...TopicColumns.visitCount,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  confirmChanges([
      insert_topicId,
      insert_authorId,
      insert_topicType,
      insert_content,
      insert_title,
      insert_lastReplyAt,
      insert_good,
      insert_top,
      insert_visitCount,
    ]
  );
  /** 作者ID */
  const update_authorId = {
    ...TopicColumns.authorId,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 主题类型 */
  const update_topicType = {
    ...TopicColumns.topicType,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 内容 */
  const update_content = {
    ...TopicColumns.content,
    UIEditor__: UIEditors.BuildTextareaEditor,
    Editor: UIEditors.BuildTextareaEditor,
  };
  /** 标题 */
  const update_title = {
    ...TopicColumns.title,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 最后回复 TIMESTAMP*/
  const update_lastReplyAt = {
    ...TopicColumns.lastReplyAt,
    UIEditor__: UIEditors.BuildTimeStampEditor,
    Editor: UIEditors.BuildTimeStampEditor,
  };
  /** 精华 */
  const update_good = {
    ...TopicColumns.good,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 置顶 */
  const update_top = {
    key: 'top',
    dataIndex: 'top',
    title: '置顶',
    renderColumn: UIColumns.SelectRender,
    isEnum: true,
    referConfig: {
      options: topicTypeOptions,
    },
    config: {
    },

    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 浏览次数 */
  const update_visitCount = {
    ...TopicColumns.visitCount,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  /** 主题ID */
  const update_topicId = {
    ...TopicColumns.topicId,
    UIEditor__: UIEditors.BuildHiddenEditor,
    Editor: UIEditors.BuildHiddenEditor,
  };
  confirmChanges([
      update_authorId,
      update_topicType,
      update_content,
      update_title,
      update_lastReplyAt,
      update_good,
      update_top,
      update_visitCount,
      update_topicId,
    ]
  );


  export interface IGetTopicPageListFormItemConfigMap extends FormItemConfigMap {
    /** 主题ID s  */
    TopicIds?: typeof getTopicPageList_topicIds & Partial<FormItemConfig>,
    /** 作者ID s  */
    AuthorIds?: typeof getTopicPageList_authorIds & Partial<FormItemConfig>,
    /** 主题类型  */
    TopicType?: typeof getTopicPageList_topicType & Partial<FormItemConfig>,
    /** 主题类型 s  */
    TopicTypes?: typeof getTopicPageList_topicTypes & Partial<FormItemConfig>,
    /** 标题  */
    Title?: typeof getTopicPageList_title & Partial<FormItemConfig>,
    /** 标题Like  */
    TitleLike?: typeof getTopicPageList_titleLike & Partial<FormItemConfig>,
    /** 浏览次数Min  */
    VisitCountMin?: typeof getTopicPageList_visitCountMin & Partial<FormItemConfig>,
    /** 浏览次数Max  */
    VisitCountMax?: typeof getTopicPageList_visitCountMax & Partial<FormItemConfig>,
  }

  let TopicPageListFormItemConfigMap = null;
  export const removeGetTopicPageListFormItemConfigMapRef = ((ref) => ref ? null : TopicPageListFormItemConfigMap = null);
  getTopicPageList_topicIds.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, TopicPageListFormItemConfigMap.TopicIds, removeGetTopicPageListFormItemConfigMapRef);
  }) as any;
  getTopicPageList_authorIds.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, TopicPageListFormItemConfigMap.AuthorIds, removeGetTopicPageListFormItemConfigMapRef);
  }) as any;
  getTopicPageList_topicType.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, TopicPageListFormItemConfigMap.TopicType, removeGetTopicPageListFormItemConfigMapRef);
  }) as any;
  getTopicPageList_topicTypes.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, TopicPageListFormItemConfigMap.TopicTypes, removeGetTopicPageListFormItemConfigMapRef);
  }) as any;
  getTopicPageList_title.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, TopicPageListFormItemConfigMap.Title, removeGetTopicPageListFormItemConfigMapRef);
  }) as any;
  getTopicPageList_titleLike.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, TopicPageListFormItemConfigMap.TitleLike, removeGetTopicPageListFormItemConfigMapRef);
  }) as any;
  getTopicPageList_visitCountMin.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, TopicPageListFormItemConfigMap.VisitCountMin, removeGetTopicPageListFormItemConfigMapRef);
  }) as any;
  getTopicPageList_visitCountMax.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, TopicPageListFormItemConfigMap.VisitCountMax, removeGetTopicPageListFormItemConfigMapRef);
  }) as any;

  /**
   const TopicIdsEditor = topicPageListFormItemConfigMap.TopicIds.Editor;
   const AuthorIdsEditor = topicPageListFormItemConfigMap.AuthorIds.Editor;
   const TopicTypeEditor = topicPageListFormItemConfigMap.TopicType.Editor;
   const TopicTypesEditor = topicPageListFormItemConfigMap.TopicTypes.Editor;
   const TitleEditor = topicPageListFormItemConfigMap.Title.Editor;
   const TitleLikeEditor = topicPageListFormItemConfigMap.TitleLike.Editor;
   const VisitCountMinEditor = topicPageListFormItemConfigMap.VisitCountMin.Editor;
   const VisitCountMaxEditor = topicPageListFormItemConfigMap.VisitCountMax.Editor;
   <TopicIdsEditor
   >
   </TopicIdsEditor>
   <AuthorIdsEditor
   >
   </AuthorIdsEditor>
   <TopicTypeEditor
   >
   </TopicTypeEditor>
   <TopicTypesEditor
   >
   </TopicTypesEditor>
   <TitleEditor
   >
   </TitleEditor>
   <TitleLikeEditor
   >
   </TitleLikeEditor>
   <VisitCountMinEditor
   >
   </VisitCountMinEditor>
   <VisitCountMaxEditor
   >
   </VisitCountMaxEditor>
   */
  export const getTopicPageListFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IGetTopicPageListFormItemConfigMap => {
    /** Input */
    const getTopicPageList_topicIdsValue = queryRule.topicIds;
    /** Input */
    const getTopicPageList_authorIdsValue = queryRule.authorIds;
    /** Select */
    const getTopicPageList_topicTypeValue = queryRule.topicType;
    /** Select */
    const getTopicPageList_topicTypesValue = queryRule.topicTypes;
    /** Input */
    const getTopicPageList_titleValue = queryRule.title;
    /** Input */
    const getTopicPageList_titleLikeValue = queryRule.titleLike;
    /** Input */
    const getTopicPageList_visitCountMinValue = queryRule.visitCountMin;
    /** Input */
    const getTopicPageList_visitCountMaxValue = queryRule.visitCountMax;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    TopicPageListFormItemConfigMap = {
      TopicIds: {
        ...getTopicPageList_topicIds,
        config: {...getTopicPageList_topicIds.config, initialValue: getTopicPageList_topicIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      AuthorIds: {
        ...getTopicPageList_authorIds,
        config: {...getTopicPageList_authorIds.config, initialValue: getTopicPageList_authorIdsValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      TopicType: {
        ...getTopicPageList_topicType,
        config: {...getTopicPageList_topicType.config, initialValue: getTopicPageList_topicTypeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      TopicTypes: {
        ...getTopicPageList_topicTypes,
        config: {...getTopicPageList_topicTypes.config, initialValue: getTopicPageList_topicTypesValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Title: {
        ...getTopicPageList_title,
        config: {...getTopicPageList_title.config, initialValue: getTopicPageList_titleValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      TitleLike: {
        ...getTopicPageList_titleLike,
        config: {...getTopicPageList_titleLike.config, initialValue: getTopicPageList_titleLikeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      VisitCountMin: {
        ...getTopicPageList_visitCountMin,
        config: {...getTopicPageList_visitCountMin.config, initialValue: getTopicPageList_visitCountMinValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      VisitCountMax: {
        ...getTopicPageList_visitCountMax,
        config: {...getTopicPageList_visitCountMax.config, initialValue: getTopicPageList_visitCountMaxValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
    }
    return TopicPageListFormItemConfigMap;
  }

  export interface IInsertFormItemConfigMap extends FormItemConfigMap {
    /** 主题ID  */
    TopicId?: typeof insert_topicId & Partial<FormItemConfig>,
    /** 作者ID  */
    AuthorId?: typeof insert_authorId & Partial<FormItemConfig>,
    /** 主题类型  */
    TopicType?: typeof insert_topicType & Partial<FormItemConfig>,
    /** 内容  */
    Content?: typeof insert_content & Partial<FormItemConfig>,
    /** 标题  */
    Title?: typeof insert_title & Partial<FormItemConfig>,
    /** 最后回复  TIMESTAMP*/
    LastReplyAt?: typeof insert_lastReplyAt & Partial<FormItemConfig>,
    /** 精华  */
    Good?: typeof insert_good & Partial<FormItemConfig>,
    /** 置顶  */
    Top?: typeof insert_top & Partial<FormItemConfig>,
    /** 浏览次数  */
    VisitCount?: typeof insert_visitCount & Partial<FormItemConfig>,
  }

  let InsertFormItemConfigMap = null;
  export const removeInsertFormItemConfigMapRef = ((ref) => ref ? null : InsertFormItemConfigMap = null);
  insert_topicId.Editor = ((props?: UIEditors.HiddenEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.TopicId, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_authorId.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.AuthorId, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_topicType.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.TopicType, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_content.Editor = ((props?: UIEditors.TextareaEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Content, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_title.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Title, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_lastReplyAt.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.LastReplyAt, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_good.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Good, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_top.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.Top, removeInsertFormItemConfigMapRef);
  }) as any;
  insert_visitCount.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, InsertFormItemConfigMap.VisitCount, removeInsertFormItemConfigMapRef);
  }) as any;

  /**
   const TopicIdEditor = insertFormItemConfigMap.TopicId.Editor;
   const AuthorIdEditor = insertFormItemConfigMap.AuthorId.Editor;
   const TopicTypeEditor = insertFormItemConfigMap.TopicType.Editor;
   const ContentEditor = insertFormItemConfigMap.Content.Editor;
   const TitleEditor = insertFormItemConfigMap.Title.Editor;
   const LastReplyAtEditor = insertFormItemConfigMap.LastReplyAt.Editor;
   const GoodEditor = insertFormItemConfigMap.Good.Editor;
   const TopEditor = insertFormItemConfigMap.Top.Editor;
   const VisitCountEditor = insertFormItemConfigMap.VisitCount.Editor;
   <TopicIdEditor
   >
   </TopicIdEditor>
   <AuthorIdEditor
   >
   </AuthorIdEditor>
   <TopicTypeEditor
   >
   </TopicTypeEditor>
   <ContentEditor
   >
   </ContentEditor>
   <TitleEditor
   >
   </TitleEditor>
   <LastReplyAtEditor
   >
   </LastReplyAtEditor>
   <GoodEditor
   >
   </GoodEditor>
   <TopEditor
   >
   </TopEditor>
   <VisitCountEditor
   >
   </VisitCountEditor>
   */
  export const getInsertFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IInsertFormItemConfigMap => {
    /** Hidden */
    const insert_topicIdValue = queryRule.topicId;
    /** Input */
    const insert_authorIdValue = queryRule.authorId;
    /** Select */
    const insert_topicTypeValue = queryRule.topicType;
    /** Textarea */
    const insert_contentValue = queryRule.content;
    /** Input */
    const insert_titleValue = queryRule.title;
    /** TimeStamp */
    const insert_lastReplyAtValue = queryRule.lastReplyAt ? moment(queryRule.lastReplyAt) : null;
    /** Input */
    const insert_goodValue = queryRule.good;
    /** Input */
    const insert_topValue = queryRule.top;
    /** Input */
    const insert_visitCountValue = queryRule.visitCount;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    InsertFormItemConfigMap = {
      TopicId: {
        ...insert_topicId,
        config: {...insert_topicId.config, initialValue: insert_topicIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      AuthorId: {
        ...insert_authorId,
        config: {...insert_authorId.config, initialValue: insert_authorIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      TopicType: {
        ...insert_topicType,
        config: {...insert_topicType.config, initialValue: insert_topicTypeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Content: {
        ...insert_content,
        config: {...insert_content.config, initialValue: insert_contentValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Title: {
        ...insert_title,
        config: {...insert_title.config, initialValue: insert_titleValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      LastReplyAt: {
        ...insert_lastReplyAt,
        config: {...insert_lastReplyAt.config, initialValue: insert_lastReplyAtValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Good: {
        ...insert_good,
        config: {...insert_good.config, initialValue: insert_goodValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Top: {
        ...insert_top,
        config: {...insert_top.config, initialValue: insert_topValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      VisitCount: {
        ...insert_visitCount,
        config: {...insert_visitCount.config, initialValue: insert_visitCountValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
    }
    return InsertFormItemConfigMap;
  }

  export interface IUpdateFormItemConfigMap extends FormItemConfigMap {
    /** 作者ID  */
    AuthorId?: typeof update_authorId & Partial<FormItemConfig>,
    /** 主题类型  */
    TopicType?: typeof update_topicType & Partial<FormItemConfig>,
    /** 内容  */
    Content?: typeof update_content & Partial<FormItemConfig>,
    /** 标题  */
    Title?: typeof update_title & Partial<FormItemConfig>,
    /** 最后回复  TIMESTAMP*/
    LastReplyAt?: typeof update_lastReplyAt & Partial<FormItemConfig>,
    /** 精华  */
    Good?: typeof update_good & Partial<FormItemConfig>,
    /** 置顶  */
    Top?: typeof update_top & Partial<FormItemConfig>,
    /** 浏览次数  */
    VisitCount?: typeof update_visitCount & Partial<FormItemConfig>,
    /** 主题ID  */
    TopicId?: typeof update_topicId & Partial<FormItemConfig>,
  }

  let UpdateFormItemConfigMap = null;
  export const removeUpdateFormItemConfigMapRef = ((ref) => ref ? null : UpdateFormItemConfigMap = null);
  update_authorId.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.AuthorId, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_topicType.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.TopicType, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_content.Editor = ((props?: UIEditors.TextareaEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Content, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_title.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Title, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_lastReplyAt.Editor = ((props?: UIEditors.TimeStampEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.LastReplyAt, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_good.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Good, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_top.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.Top, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_visitCount.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.VisitCount, removeUpdateFormItemConfigMapRef);
  }) as any;
  update_topicId.Editor = ((props?: UIEditors.HiddenEditorProps) => {
    return UIEditors.rebuildEditor(props, UpdateFormItemConfigMap.TopicId, removeUpdateFormItemConfigMapRef);
  }) as any;

  /**
   const AuthorIdEditor = updateFormItemConfigMap.AuthorId.Editor;
   const TopicTypeEditor = updateFormItemConfigMap.TopicType.Editor;
   const ContentEditor = updateFormItemConfigMap.Content.Editor;
   const TitleEditor = updateFormItemConfigMap.Title.Editor;
   const LastReplyAtEditor = updateFormItemConfigMap.LastReplyAt.Editor;
   const GoodEditor = updateFormItemConfigMap.Good.Editor;
   const TopEditor = updateFormItemConfigMap.Top.Editor;
   const VisitCountEditor = updateFormItemConfigMap.VisitCount.Editor;
   const TopicIdEditor = updateFormItemConfigMap.TopicId.Editor;
   <AuthorIdEditor
   >
   </AuthorIdEditor>
   <TopicTypeEditor
   >
   </TopicTypeEditor>
   <ContentEditor
   >
   </ContentEditor>
   <TitleEditor
   >
   </TitleEditor>
   <LastReplyAtEditor
   >
   </LastReplyAtEditor>
   <GoodEditor
   >
   </GoodEditor>
   <TopEditor
   >
   </TopEditor>
   <VisitCountEditor
   >
   </VisitCountEditor>
   <TopicIdEditor
   >
   </TopicIdEditor>
   */
  export const getUpdateFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps, formItemProps?: FormItemProps): IUpdateFormItemConfigMap => {
    /** Input */
    const update_authorIdValue = queryRule.authorId;
    /** Select */
    const update_topicTypeValue = queryRule.topicType;
    /** Textarea */
    const update_contentValue = queryRule.content;
    /** Input */
    const update_titleValue = queryRule.title;
    /** TimeStamp */
    const update_lastReplyAtValue = queryRule.lastReplyAt ? moment(queryRule.lastReplyAt) : null;
    /** Input */
    const update_goodValue = queryRule.good;
    /** Select */
    const update_topValue = queryRule.top;
    /** Input */
    const update_visitCountValue = queryRule.visitCount;
    /** Hidden */
    const update_topicIdValue = queryRule.topicId;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    UpdateFormItemConfigMap = {
      AuthorId: {
        ...update_authorId,
        config: {...update_authorId.config, initialValue: update_authorIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      TopicType: {
        ...update_topicType,
        config: {...update_topicType.config, initialValue: update_topicTypeValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Content: {
        ...update_content,
        config: {...update_content.config, initialValue: update_contentValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Title: {
        ...update_title,
        config: {...update_title.config, initialValue: update_titleValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      LastReplyAt: {
        ...update_lastReplyAt,
        config: {...update_lastReplyAt.config, initialValue: update_lastReplyAtValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Good: {
        ...update_good,
        config: {...update_good.config, initialValue: update_goodValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      Top: {
        ...update_top,
        config: {...update_top.config, initialValue: update_topValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      VisitCount: {
        ...update_visitCount,
        config: {...update_visitCount.config, initialValue: update_visitCountValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
      TopicId: {
        ...update_topicId,
        config: {...update_topicId.config, initialValue: update_topicIdValue},
        formProps,
        record: queryRule,
        componentMap,
        formItemProps,
      },
    }
    return UpdateFormItemConfigMap;
  }
}
export default Bbs_topicApiForms;