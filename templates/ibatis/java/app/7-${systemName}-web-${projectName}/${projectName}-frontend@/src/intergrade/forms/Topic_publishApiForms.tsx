/**
 *  Do not remove this unless you get business authorization.
 *  Topic_publish
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";
import UIEditors from "@utils/UIEditors";
import {
  FormItemConfig, FormItemConfigMap, TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ObjectMap,
  TemporalType, FormProps, confirmChanges, moment
} from "@utils/DvaUtil";
import UIColumns from "@utils/UIColumns";
import TopicColumns from '../columns/TopicColumns';
import {topicTypeOptions} from '../enums/TopicType';


namespace Topic_publishApiForms {
  /** 主题ID */
  const saveTopic_topicId = {
    ...TopicColumns.topicId,
    UIEditor__: UIEditors.BuildHiddenEditor,
    Editor: UIEditors.BuildHiddenEditor,
  };
  /** 主题类型 */
  const saveTopic_topicType = {
    ...TopicColumns.topicType,
    UIEditor__: UIEditors.BuildSelectEditor,
    Editor: UIEditors.BuildSelectEditor,
  };
  /** 内容 */
  const saveTopic_content = {
    ...TopicColumns.content,
    UIEditor__: UIEditors.BuildTextareaEditor,
    Editor: UIEditors.BuildTextareaEditor,
  };
  /** 标题 */
  const saveTopic_title = {
    ...TopicColumns.title,
    UIEditor__: UIEditors.BuildInputEditor,
    Editor: UIEditors.BuildInputEditor,
  };
  confirmChanges([
      saveTopic_topicId,
      saveTopic_topicType,
      saveTopic_content,
      saveTopic_title,
    ]
  );


  export interface ISaveTopicFormItemConfigMap extends FormItemConfigMap {
    /** 主题ID  */
    TopicId?: typeof saveTopic_topicId & Partial<FormItemConfig>,
    /** 主题类型  */
    TopicType?: typeof saveTopic_topicType & Partial<FormItemConfig>,
    /** 内容  */
    Content?: typeof saveTopic_content & Partial<FormItemConfig>,
    /** 标题  */
    Title?: typeof saveTopic_title & Partial<FormItemConfig>,
  }

  let SaveTopicFormItemConfigMap = null;
  export const removeSaveTopicFormItemConfigMapRef = ((ref) => ref ? null : SaveTopicFormItemConfigMap = null);
  saveTopic_topicId.Editor = ((props?: UIEditors.HiddenEditorProps) => {
    return UIEditors.rebuildEditor(props, SaveTopicFormItemConfigMap.TopicId, removeSaveTopicFormItemConfigMapRef);
  }) as any;
  saveTopic_topicType.Editor = ((props?: UIEditors.SelectEditorProps) => {
    return UIEditors.rebuildEditor(props, SaveTopicFormItemConfigMap.TopicType, removeSaveTopicFormItemConfigMapRef);
  }) as any;
  saveTopic_content.Editor = ((props?: UIEditors.TextareaEditorProps) => {
    return UIEditors.rebuildEditor(props, SaveTopicFormItemConfigMap.Content, removeSaveTopicFormItemConfigMapRef);
  }) as any;
  saveTopic_title.Editor = ((props?: UIEditors.InputEditorProps) => {
    return UIEditors.rebuildEditor(props, SaveTopicFormItemConfigMap.Title, removeSaveTopicFormItemConfigMapRef);
  }) as any;

  /**
   const TopicIdEditor = saveTopicFormItemConfigMap.TopicId.Editor;
   const TopicTypeEditor = saveTopicFormItemConfigMap.TopicType.Editor;
   const ContentEditor = saveTopicFormItemConfigMap.Content.Editor;
   const TitleEditor = saveTopicFormItemConfigMap.Title.Editor;
   <TopicIdEditor
   >
   </TopicIdEditor>
   <TopicTypeEditor
   >
   </TopicTypeEditor>
   <ContentEditor
   >
   </ContentEditor>
   <TitleEditor
   >
   </TitleEditor>
   */
  export const getSaveTopicFormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps): ISaveTopicFormItemConfigMap => {
    /** Hidden */
    const saveTopic_topicIdValue = queryRule.topicId;
    /** Select */
    const saveTopic_topicTypeValue = queryRule.topicType;
    /** Textarea */
    const saveTopic_contentValue = queryRule.content;
    /** Input */
    const saveTopic_titleValue = queryRule.title;
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    SaveTopicFormItemConfigMap = {
      TopicId: {
        ...saveTopic_topicId,
        config: {...saveTopic_topicId.config, initialValue: saveTopic_topicIdValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      TopicType: {
        ...saveTopic_topicType,
        config: {...saveTopic_topicType.config, initialValue: saveTopic_topicTypeValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Content: {
        ...saveTopic_content,
        config: {...saveTopic_content.config, initialValue: saveTopic_contentValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
      Title: {
        ...saveTopic_title,
        config: {...saveTopic_title.config, initialValue: saveTopic_titleValue},
        formProps,
        record: queryRule,
        componentMap,
        
      },
    }
    return SaveTopicFormItemConfigMap;
  }
}
export default Topic_publishApiForms;