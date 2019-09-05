import React from 'react'
import {
  List, Picker, InputItem, DatePicker, TextareaItem, ImagePicker, Modal, Checkbox, Radio,
  Switch
} from 'antd-mobile'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {FormItemConfig} from "./DvaUtil";
import Menu from "@i/beans/Menu";
import Icon from "antd/lib/icon";
import Link from "umi/link";
import {LinkProps} from "react-router-dom";
import {
  filterOptions, FormItemEditorProps, FormPropsUtils, getMomentDate, makerArray, Option, ReferConfig,
  URL_REG, DATA_URL_REG, makeArrayMap, convertToOptions, updateArray, cloneDeep, mapToTree,
  valueField, makeOptionMap, makeTreeOptions, convertImageUrl,
} from "@utils/DvaUtil";
import {AbstractPickerProps} from "antd-mobile/es/picker/AbstractPicker";
import {InputItemProps} from "antd-mobile/es/input-item";
import {TextareaItemProps} from "antd-mobile/es/textarea-item";
import {PropsType as DatePickerProps} from "antd-mobile/es/date-picker";
import {ImagePickerPropTypes} from "antd-mobile/es/image-picker";
import {CheckboxProps} from "antd-mobile/es/checkbox/checkbox";
import {SwitchProps} from "antd-mobile/es/switch";

import config from "@utils/config";

namespace UIUtil {
  const ListItem = List.Item;
  const CheckboxItem = Checkbox.CheckboxItem;
  const RadioItem = Radio.RadioItem;


  export interface UploadFile {
    uid?: string,
    id?: string,
    url?: string,
  }

  export function rebuildEditor(props, formItemConfig: FormItemConfig, revRef) {
    const UIEditor__ = formItemConfig.UIEditor__;
    props = {ref: revRef, formItemConfig, ...props};
    return (
      <UIEditor__
        {...props}
      />
    )
  }

  abstract class OnChangeEditor<P extends FormItemEditorProps={}, S={}> extends React.Component<P, S> {
    _isMounted = true;
    _isTreeOptions = false;

    constructor(props) {
      super(props);
      props.formItemConfig.componentMap[props.formItemConfig.name] = this;
    }

    onChangeSelfValue(value, formItemConfig: FormItemConfig): any {

    }

    onChangeChildValue(childName: string, formItemConfig: FormItemConfig): any {

    }

    onChangeValue(value) {
      const formItemConfig = this.props.formItemConfig;
      const key = formItemConfig.key;
      const form = formItemConfig.formProps.form;
      //把查询的Optoins存入queryRule中，以便打打还没有拉入options时，展示到select中

      const fieldWithValue = {};
      let customValue = this.onChangeSelfValue(value, formItemConfig);
      customValue = customValue != undefined ? customValue : value;
      (Array.isArray(customValue) && customValue.length == 1 && !this._isTreeOptions) && (customValue = customValue[0]);

      fieldWithValue[key] = customValue;
      form.setFieldsValue(fieldWithValue);

      const changes: any = formItemConfig.changes;
      if (changes && changes.length) {
        const changeClearnValues = {};
        changes.forEach((childName) => {
          const customValue = this.onChangeChildValue(childName, formItemConfig);
          changeClearnValues[childName] = customValue != undefined ? customValue : undefined;
        });
        form.setFieldsValue(changeClearnValues);
      }
    }
  }

  const hasReferEditorState = {
    fetched: false,
    options: null as Option[],
    optionMap: null as Option[],
    treeOptions: null as Option[],
    lastChangeBy: null as any,
    loading: false,
    fetchedKeys: {},
    maxCol: 1,
  };

  type  HasReferEditorState = Partial<typeof hasReferEditorState>;

  abstract class HasReferEditor<P extends FormItemEditorProps={}, S extends HasReferEditorState={}> extends OnChangeEditor<P, S> {
    _isTreeOptions = false;
    _putNullTitle = false;
    _treeLastValue = [];
    _treeFetchRoot = false;


    componentWillMount() {
      this.setState(cloneDeep(hasReferEditorState));
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    async fechOptions(visible: boolean) {
      if (!visible || !this._isMounted) {
        return;
      }


      const formItemConfig = this.props.formItemConfig;
      const form: FormPropsUtils = formItemConfig.formProps.form;


      const referConfig = formItemConfig.referConfig;
      if (referConfig.options) {
        //这个是枚举
        return;
      }

      if (this.state.loading) {
        return;
      }


      let lastChangeBy;

      (formItemConfig.changeBy) && (lastChangeBy = form.getFieldValue(formItemConfig.changeBy));
      if (this.state.fetched && (this.state.lastChangeBy == lastChangeBy) && !this._isTreeOptions) {
        return;
      }

      const needFetchParentIds = [];
      const fetchedKeys = this.state.fetchedKeys;
      if (this._isTreeOptions) {
        let treeLastValue = [...this._treeLastValue];
        if (this._treeFetchRoot) {
          treeLastValue.unshift(null);
          this._treeFetchRoot = false;
        }

        let optionMap = this.state.optionMap;
        treeLastValue.forEach(parentId => {
          if (!fetchedKeys[parentId]) {
            let option;
            (optionMap && (option = optionMap[parentId]));
            if (!option || !option.isLeaf) {
              fetchedKeys[parentId] = true;
              needFetchParentIds.push(parentId)
            }
          }
        });

        if (!needFetchParentIds.length) {
          return;
        }
      }


      this.setState({loading: true, fetched: false});

      const apiName = referConfig.api;
      const optionsApi = config.optionsApis[apiName];
      if (!optionsApi) {
        const message = apiName + " no in in app";
        throw message;
      }

      let param;
      (formItemConfig.changeBy && !this._isTreeOptions) && (param = lastChangeBy);
      (this._isTreeOptions) && (param = needFetchParentIds);

      let options = await optionsApi(param);
      (referConfig.optionConvertor) && (options = convertToOptions(options, referConfig.optionConvertor));

      let treeOptions;
      let maxCol;
      let optionMap;
      if (this._isTreeOptions) {
        //树不要之前的从field中带来的option
        const oldOptions = this.getOptions(false, false);
        let parentId;
        (referConfig.optionConvertor && referConfig.optionConvertor.parentId) && (parentId = referConfig.optionConvertor.parentId);
        if (parentId) {
          options = updateArray(oldOptions, options, valueField);
          optionMap = makeOptionMap(options);
          let treeConfig = mapToTree(options, optionMap, parentId);
          treeOptions = treeConfig.tree;
          maxCol = treeConfig.maxCol;
        }
      }
      this.setState({
        options,
        treeOptions,
        optionMap,
        maxCol,
        fetchedKeys,
        fetched: true,
        loading: false,
        lastChangeBy
      });
    }

    onChangeSelfValue(value, formItemConfig: FormItemConfig) {
      //把查询的Optoins存入queryRule中，以便打打还没有拉入options时，展示到select中
      const lastOptions__ = formItemConfig.record.lastOptions__;
      if (lastOptions__) {
        const options = this.state.options;
        let lessOptions;
        (options) && (lessOptions = filterOptions(options, value));
        lastOptions__[formItemConfig.key] = lessOptions;
      }
    }

    onChangeChildValue(childName: string, formItemConfig: FormItemConfig) {
      const lastOptions__ = formItemConfig.record.lastOptions__;
      (lastOptions__) && (delete lastOptions__[childName]);
    }


    getOptions(makeTree = false, includeFieldOptions = true): Option[] & any {
      const formItemConfig = this.props.formItemConfig;
      let referConfig = formItemConfig.referConfig || {} as ReferConfig;
      if (referConfig.options) {
        //这个是枚举
        return Object.values(referConfig.options);
      }

      let options: Option[] = makeTree ? this.state.treeOptions : this.state.options;
      if (!options) {
        const referField = referConfig.referField;
        if (referField && includeFieldOptions) {
          options = formItemConfig.record[referField];
          (options && !Array.isArray(options)) && (options = [options]);
          options = cloneDeep(options);
          if (referConfig.optionConvertor) {
            options = convertToOptions(options, referConfig.optionConvertor);
          }

          //从字段中拿出来的，根据makeTree设置
          options = makeTreeOptions(makeTree, options, referConfig);
        }

        (!options && formItemConfig.isImage) && (options = []);
      }

      //查询后存起来放在相应area中queryRule中
      if (!options && formItemConfig.record.lastOptions__) {
        options = formItemConfig.record.lastOptions__[formItemConfig.key];
        options = makeTreeOptions(makeTree, options, referConfig);
      }
      (!options) && (options = []);

      (this._putNullTitle) && (options.unshift({[formItemConfig.nullTitle]: null}));
      return options;
    }
  }

  const imageEditorState = {
    previewVisible: false,
    previewImage: '',
  };

  type ImageEditorState = Partial<typeof imageEditorState> & HasReferEditorState;
  export type ImageEditorProps = Partial<ImagePickerPropTypes> & FormItemEditorProps;


  export class BuildImageEditor extends HasReferEditor<ImageEditorProps, ImageEditorState> {
    componentWillMount() {

      this.setState({...cloneDeep(imageEditorState), ... cloneDeep(hasReferEditorState)})
    }

    getFileList(): UploadFile[] {
      const fileList = this.getOptions(false) as UploadFile[];
      fileList.forEach((uploadFile) => {
        convertImageUrl(uploadFile);
        if (!uploadFile.id) {
          uploadFile.id = uploadFile.uid
        }
      })
      return fileList;
    }


    onCancelModal() {
      this.setState({previewVisible: false})
    }

    onPreview(file: UploadFile) {
      this.setState({
        previewImage: file.url,
        previewVisible: true,
      });
    }

    onChangeSelfValue(files: UploadFile[], formItemConfig: FormItemConfig) {
      const referField = formItemConfig.referConfig.referField;
      formItemConfig.record[referField] = files;
      const result = files.map((value) => {
        const uid = value.uid;
        //上传文件
        if (!uid) {
          value.uid = "stg-" + Math.random().toString(36).substring(2);
          const file: File = value["file"];
          file["uid"] = value.uid;
          config.uploadApi(file);
        }
        return value.uid;
      });


      return result;
    }

    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      const {previewVisible, previewImage} = this.state;
      const fileList = this.getFileList();

      const uploadButton = (
        <div>
          <Icon type="plus"/>
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <>
          <ListItem arrow="">{formItemConfig.title}</ListItem>
          <ImagePicker
            files={fileList}
            selectable={fileList.length == 0}
            onChange={this.onChangeValue.bind(this)}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </ImagePicker>
          {/*          <Modal visible={previewVisible} footer={null} onCancel={this.onCancelModal.bind(this)}>
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal>*/}
        </>
      )
    }
  }


  export type SelectEditorProps = FormItemEditorProps & Partial<AbstractPickerProps>;

  export class BuildSelectEditor extends HasReferEditor<SelectEditorProps, HasReferEditorState> {

    render() {
      const {formItemConfig = {}, ...customs} = this.props as SelectEditorProps;
      const muti = formItemConfig.isArray ? {mode: "multiple"} : null;
      const options = convertOptions(this.getOptions(true));
      return (
        <Picker
          data={options}
          key={formItemConfig.key}
          title={formItemConfig.title}
          cols={1}
          {...customs}
          {...createFieldProps(formItemConfig, true)}
          onVisibleChange={this.fechOptions.bind(this)}
          onChange={this.onChangeValue.bind(this)}
        >
          {this.props.children || <List.Item arrow="down">{formItemConfig.title}</List.Item>}
        </Picker>
      )
    }
  }

  export type CascaderEditorProps = FormItemEditorProps & Partial<AbstractPickerProps>;

  export class BuildCascaderEditor extends HasReferEditor<CascaderEditorProps, HasReferEditorState> {
    _isTreeOptions = true;

    onChangeChildValue(childName: string, formItemConfig: FormItemConfig) {
      console.log(formItemConfig.key, formItemConfig.formProps.form.getFieldValue(formItemConfig.key))
    }

    async onPickerChange(values: any[]) {
      if (values && Array.isArray(values)) {
        this._treeLastValue = values;
        await this.fechOptions(true);
        const newValues = [...values];
        const {formItemConfig = {}, ...customs} = this.props;
        const optionMap = this.state.optionMap;
        if (optionMap) {
          const last = newValues[newValues.length - 1];
          let lastOption = optionMap[last];
          while (lastOption && !lastOption.isLeaf) {
            const children = lastOption.children;
            if (children && children.length) {
              lastOption = children[0];
              newValues.push(lastOption.value);
            } else {
              lastOption = null;
            }
          }

        }
        formItemConfig.formProps.form.setFieldsValue({[formItemConfig.key]: newValues});
      }
    }

    async onPopupVisible(visible: boolean) {
      if (visible) {
        const {formItemConfig = {}, ...customs} = this.props;
        let values = formItemConfig.formProps.form.getFieldValue(formItemConfig.key);
        //如果有null,则取根目录
        values = values ? [...values] : [];
        this._treeLastValue = values;
        this._treeFetchRoot = true;
        await this.fechOptions(visible);
      }
    }

    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      const options = this.getOptions(this._isTreeOptions);

      return (
        <Picker
          key={formItemConfig.key}
          data={options}
          {...formItemConfig.props}
          {...customs}
          cols={this.state.maxCol}
          {...createFieldProps(formItemConfig, true)}
          onVisibleChange={this.onPopupVisible.bind(this)}
          onPickerChange={this.onPickerChange.bind(this)}
          onChange={this.onChangeValue.bind(this)}
        >
          {this.props.children || <List.Item arrow="down">{formItemConfig.title}</List.Item>}
        </Picker>
      )
    }
  }


  export type RadioGroupEditorProps = Partial<CheckboxProps> & FormItemEditorProps

  export class BuildRadioGroupEditor extends HasReferEditor<RadioGroupEditorProps> {
    _putNullTitle = true;

    componentDidMount() {
      this._isMounted = true;
      this.fechOptions(true);
    }

    onCheckboxItemChange(e, value) {
      const {formItemConfig = {}, ...customs} = this.props as CheckboxGroupEditorProps;
      const checked = e.target.checked;
      const {value: valueArr} = createFieldProps(formItemConfig, true);
      const valueMap = makeArrayMap(valueArr);
      if (valueMap[value]) {
        return;
      }
      this.onChangeValue([value])
    }

    render() {
      const {formItemConfig = {}, ...customs} = this.props as CheckboxGroupEditorProps;
      const options = this.getOptions(true);
      const {value: valueArr} = createFieldProps(formItemConfig, true);
      const valueMap = makeArrayMap(valueArr);
      return (
        <>
          <List.Item
            key={formItemConfig.key}
          >
            {formItemConfig.title}
          </List.Item>
          {
            options.map((optoin) => {
              return (
                <CheckboxItem
                  key={optoin.value}
                  data-seed={optoin.value}
                  onChange={(e) => this.onCheckboxItemChange(e, optoin.value)}
                  checked={valueMap[optoin.value]}>
                  {optoin.title}
                </CheckboxItem>
              )
            })}
        </>
      )
    }
  }


  export type CheckboxGroupEditorProps = Partial<CheckboxProps> & FormItemEditorProps

  export class BuildCheckboxGroupEditor extends HasReferEditor<CheckboxGroupEditorProps> {
    componentDidMount() {
      this._isMounted = true;
      this.fechOptions(true);
    }

    onCheckboxItemChange(e, value) {
      const {formItemConfig = {}, ...customs} = this.props as CheckboxGroupEditorProps;
      const checked = e.target.checked;
      const {value: valueArr} = createFieldProps(formItemConfig, true);
      const valueMap = makeArrayMap(valueArr);
      checked ? valueMap[value] = true : delete valueMap[value];
      const newValue = Object.keys(valueMap);
      this.onChangeValue(newValue)
    }

    render() {
      const {formItemConfig = {}, ...customs} = this.props as CheckboxGroupEditorProps;
      const options = this.getOptions(false);
      const {value: valueArr} = createFieldProps(formItemConfig, true);
      const valueMap = makeArrayMap(valueArr);
      return (
        <>
          <List.Item
            key={formItemConfig.key}
          >
            {formItemConfig.title}
          </List.Item>
          {
            options.map((optoin) => {
              return <CheckboxItem key={optoin.value} data-seed={optoin.value}
                                   onChange={(e) => this.onCheckboxItemChange(e, optoin.value)}
                                   checked={valueMap[optoin.value]}>
                {optoin.title}
              </CheckboxItem>
            })}
        </>
      )
    }
  }

  export type InputEditorProps = Partial<InputItemProps> & FormItemEditorProps

  export class BuildInputEditor extends OnChangeEditor<InputEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <InputItem
          key={formItemConfig.key}
          {...customs}
          {...createFieldProps(formItemConfig)}
        >
          {this.props.children || formItemConfig.title}
        </InputItem>
      )
    }
  }

  export type PasswordEditorProps = InputEditorProps;

  export class BuildPasswordEditor extends OnChangeEditor<PasswordEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <InputItem
          type={"password"}
          key={formItemConfig.key}
          {...customs}
          {...createFieldProps(formItemConfig)}
        >
          {this.props.children || formItemConfig.title}
        </InputItem>
      )
    }
  }

  export type HiddenEditorProps = InputEditorProps;

  export class BuildHiddenEditor extends OnChangeEditor<HiddenEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <input
          type="hidden"
          key={formItemConfig.key}
          {...customs}
          {...createFieldProps(formItemConfig)}
        >
        </input>
      )
    }
  }

  export type TextareaEditorProps = Partial<TextareaItemProps> & FormItemEditorProps

  export class BuildTextareaEditor extends OnChangeEditor<TextareaEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <TextareaItem
          title={formItemConfig.title}
          key={formItemConfig.key}
          autoHeight
          {...customs}
          {...createFieldProps(formItemConfig)}
        >
          {this.props.children || formItemConfig.title}
        </TextareaItem>
      )
    }
  }

  export type TimeStampEditorProps = Partial<DatePickerProps> & FormItemEditorProps;

  export class BuildTimeStampEditor extends OnChangeEditor<TimeStampEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;

      let initialValue = formItemConfig.config.initialValue;
      if (initialValue != null) {
        initialValue = getMomentDate(initialValue);
        formItemConfig.config.initialValue = initialValue;
      }

      return (
        <DatePicker
          clear
          title={formItemConfig.title}
          mode="datetime"
          /*format={formItemConfig.format}*/
          locale={locale}
          {...customs}
          {...createFieldProps(formItemConfig)}
        >
          {this.props.children || <List.Item arrow="down">{formItemConfig.title}</List.Item>}
        </DatePicker>
      )
    }
  }

  export type DatePickerEditorProps = Partial<DatePickerProps> & FormItemEditorProps;

  export class BuildDatePickerEditor extends OnChangeEditor<DatePickerEditorProps> {
    render() {
      return (
        <BuildTimeStampEditor
          mode="date"
          {...this.props}
        >
        </BuildTimeStampEditor>
      )
    }
  }

  export type TimePickerEditorProps = FormItemEditorProps;

  export class BuildTimePickerEditor extends OnChangeEditor<TimePickerEditorProps> {
    render() {
      const {formItemConfig, ...customs} = this.props;
      return (
        <BuildTimeStampEditor
          mode="time"
          {...this.props}
        >
        </BuildTimeStampEditor>
      )
    }
  }


  export type RateEditorProps = Partial<InputItemProps> & FormItemEditorProps

  export class BuildRateEditor extends OnChangeEditor<RateEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <InputItem
          {...createFieldProps(formItemConfig)}
          type="digit"
          key={formItemConfig.key}
          {...customs}
        >
          {this.props.children || formItemConfig.title}
        </InputItem>
      )
    }
  }

  export type NumberEditorProps = Partial<InputItemProps> & FormItemEditorProps

  export class BuildNumberEditor extends OnChangeEditor<NumberEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <InputItem
          {...createFieldProps(formItemConfig)}
          type="digit"
          key={formItemConfig.key}
          {...customs}
        >
          {this.props.children || formItemConfig.title}
        </InputItem>
      )
    }
  }

  export type SwitchEditorProps = Partial<SwitchProps> & FormItemEditorProps

  export class BuildSwitchEditor extends OnChangeEditor<SwitchEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <ListItem
          extra={<Switch
            key={formItemConfig.key}
            checkedChildren={formItemConfig.trueTitle}
            unCheckedChildren={formItemConfig.falseTitle}
            // onChange={this.onChangeValue.bind(this)}
            {...createFieldProps(formItemConfig)}
            {...customs}
          >
          </Switch>
          }
        >
          {formItemConfig.title}
        </ListItem>
      )
    }
  }


  export interface LinkPropsFixed
    extends Partial<LinkProps> {
    to ?: string;
  }

  export function buildLink(menu: Menu = {}, props?: LinkPropsFixed) {
    let route = (menu.route || '#');
    // props =props || {to:route};
    const width = {style: {width: 10}};

    return (
      <Link
        to={route}
        key={menu.route}
        {...width}
        {...props}
      >
        <Icon type={menu.icon}/>
        {menu.name}
      </Link>
    )
  }

  enum OptionType {
    SelectOption,
    Radio,
    Checkbox
  }


  export function createFieldProps(formItemConfig: FormItemConfig, convertToArray = false) {
    const result = formItemConfig.formProps.form.getFieldProps(formItemConfig.key, formItemConfig.config);
    convertToArray ? result.value = makerArray(result.value) : null;
    return result;
  }

  export function convertOptions(options: Option[]) {
    const result = Object.values(options).map(
      (option, key) => {
        return {label: option.title, value: option.value};
      }
    )
    return result;
  };
}

export default UIUtil;

