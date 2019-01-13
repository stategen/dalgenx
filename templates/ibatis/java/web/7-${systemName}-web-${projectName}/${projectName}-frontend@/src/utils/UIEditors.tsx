import React from 'react'
import {
  Input, DatePicker, TimePicker, Select, InputNumber, Radio, Checkbox, Switch, Rate, Upload, Modal,
  Cascader, Form
} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {FormItemConfig, FormItemEditorProps} from "./DvaUtil";
import Menu from "@i/beans/Menu";
import Icon from "antd/lib/icon";
import Link from "umi/link";
import {InputProps} from "antd/lib/input";
import {DatePickerProps} from "antd/lib/date-picker/interface";
import {SelectProps} from "antd/lib/select";
import {LinkProps} from "react-router-dom";
import {
  filterOptions, FormPropsUtils, makerArray, ReferConfig, Option,
  URL_REG, DATA_URL_REG, updateArray, convertToOptions, cloneDeep, mapToTree, valueField, makeOptionMap,
  makeTreeOptions, convertImageUrl,
} from "@utils/DvaUtil";
import {TextAreaProps} from 'antd/es/input/TextArea';
import {TimePickerProps} from 'antd/es/time-picker';
import {InputNumberProps} from 'antd/es/input-number';
import {RadioGroupProps} from 'antd/es/radio';
import {CheckboxGroupProps} from 'antd/es/checkbox';
import {SwitchProps} from 'antd/es/switch';
import {RateProps} from 'antd/es/rate';
import {UploadProps} from 'antd/es/upload';
import {CascaderProps, CascaderOptionType} from 'antd/es/cascader';
import {UploadFile, UploadChangeParam} from 'antd/es/upload/interface';
import config from "@utils/config";


namespace UIEditors {
  const FormItem = Form.Item;
  const {TextArea} = Input;
  const RadioGroup = Radio.Group;
  const CheckboxGroup = Checkbox.Group;

  export function rebuildEditor<P extends FormItemEditorProps>(props: P, formItemConfig: FormItemConfig, revRef) {
    const UIEditor__ = formItemConfig.UIEditor__;
    props = {ref: revRef, formItemConfig, ...props};
    const form = formItemConfig.formProps.form;
    const formItemProps = {...formItemConfig.formItemProps, ...props.formItemProps} as FormItemConfig;
    if (!formItemConfig.typeIsHidden) {
      return (
        <FormItem
          key={formItemConfig.key}
          label={formItemConfig.title as string}
          {...formItemProps}
        >
          {form.getFieldDecorator(formItemConfig.key, formItemConfig.config)
          (<UIEditor__
            {...props}
          />)
          }
        </FormItem>
      )
    } else {
      return (
        form.getFieldDecorator(formItemConfig.key, formItemConfig.config)
        (<UIEditor__
          {...props}
        />)
      )
    }
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
  export type ImageEditorProps = Partial<UploadProps> & FormItemEditorProps;

  export class BuildImageEditor extends HasReferEditor<ImageEditorProps, ImageEditorState> {
    componentWillMount() {

      this.setState({...cloneDeep(imageEditorState), ... cloneDeep(hasReferEditorState)})
    }

    getFileList(): UploadFile[] {
      const fileList = this.getOptions() as UploadFile[];
      fileList.forEach((uploadFile) => {
        convertImageUrl(uploadFile);
      });
      return fileList;
    }

    onCancelModal() {
      this.setState({previewVisible: false});
    }

    onPreview(file: UploadFile) {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }

    onChangeSelfValue(info: UploadChangeParam, formItemConfig: FormItemConfig) {
      const referField = formItemConfig.referConfig.referField;
      formItemConfig.record[referField] = info.fileList;
      const result = info.fileList.map((value) => {
        return value.uid;
      });
      return result;
    }

    render() {
      const formItemConfig = this.props.formItemConfig;
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
          <Upload
            action={config.uploadApi}
            key={formItemConfig.key}
            listType="picture-card"
            onPreview={this.onPreview.bind(this)}
            onChange={this.onChangeValue.bind(this)}
            fileList={fileList}
            // getValueFromEvent={this.normFile.bind(this)}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.onCancelModal.bind(this)}>
            <img alt={previewImage} style={{width: '100%'}} src={previewImage}/>
          </Modal>
        </>
      )
    }
  }

  export type SelectEditorProps = FormItemEditorProps & Partial<SelectProps>;

  export class BuildSelectEditor extends HasReferEditor<SelectEditorProps, HasReferEditorState> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      const muti = formItemConfig.isArray ? {mode: "multiple"} : null;
      const options = this.getOptions();

      return (
        <Select
          loading={this.state.loading}
          key={formItemConfig.key}
          allowClear
          showSearch
          {...formItemConfig.props}
          style={{width: 120}}
          {...muti}
          {...customs}

          onDropdownVisibleChange={this.fechOptions.bind(this)}
          onChange={this.onChangeValue.bind(this)}
        >
          {this.props.children || buildOptions(options, OptionType.SelectOption)}
        </Select>
      )
    }
  }

  export type CascaderEditorProps = FormItemEditorProps & Partial<CascaderProps>;

  export class BuildCascaderEditor extends HasReferEditor<CascaderEditorProps, HasReferEditorState> {
    _isTreeOptions = true;

    async loadData(selectedOptions?: CascaderOptionType[]) {
      //必须有这个函数，不然点击即退出
    }

    async onPopupVisible(visible: boolean) {
      if (visible) {
        const formItemConfig = this.props.formItemConfig;
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
        <Cascader
          options={options}
          key={formItemConfig.key}
          loadData={this.loadData.bind(this)}
          // allowClear
          changeOnSelect

          //
          {...formItemConfig.props}
          style={{width: 200}}
          {...customs}
          onPopupVisibleChange={this.onPopupVisible.bind(this)}
          onChange={this.onChangeValue.bind(this)}
        >
        </Cascader>
      )
    }
  }


  export type RadioGroupEditorProps = Partial<RadioGroupProps> & FormItemEditorProps

  export class BuildRadioGroupEditor extends HasReferEditor<RadioGroupEditorProps> {
    _putNullTitle = true;

    render() {
      const {formItemConfig = {}, ...customs} = this.props as RadioGroupEditorProps;
      const options = this.getOptions();
      return (
        <RadioGroup
          key={formItemConfig.key}
          {...formItemConfig.props}
          onChange={this.onChangeValue.bind(this)}
          {...customs}
        >
          {this.props.children || buildOptions(options, OptionType.Radio)}
        </RadioGroup>
      )
    }
  }

  export type CheckboxGroupEditorProps = Partial<CheckboxGroupProps> & FormItemEditorProps

  export class BuildCheckboxGroupEditor extends HasReferEditor<CheckboxGroupEditorProps> {
    async componentDidMount() {
      this._isMounted = true;
      await this.fechOptions(true);
    }

    render() {
      const {formItemConfig = {}, ...customs} = this.props as CheckboxGroupEditorProps;
      const options = this.getOptions();
      return (
        <CheckboxGroup
          key={formItemConfig.key}
          onChange={this.onChangeValue.bind(this)}
          {...formItemConfig.props}
          {...customs}
        >
          {this.props.children || buildOptions(options, OptionType.Checkbox)}
        </CheckboxGroup>
      )
    }
  }

  export type InputEditorProps = Partial<InputProps> & FormItemEditorProps

  export class BuildInputEditor extends OnChangeEditor<InputEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <Input
          key={formItemConfig.key}
          onChange={this.onChangeValue.bind(this)}
          {...formItemConfig.props}
          {...customs}
        >
        </Input>
      )
    }
  }

  export type PasswordEditorProps = InputEditorProps;

  export class BuildPasswordEditor extends OnChangeEditor<PasswordEditorProps> {
    render() {
      const props = this.props;
      return <BuildInputEditor
        type={'password'}
        onChange={this.onChangeValue.bind(this)}
        {...props}
      />
    }
  }

  export type HiddenEditorProps = InputEditorProps;

  export class BuildHiddenEditor extends OnChangeEditor<HiddenEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <Input
          type="hidden"
          key={formItemConfig.key}
          {...formItemConfig.props}
          onChange={this.onChangeValue.bind(this)}
          {...customs}
        >
        </Input>
      )
    }
  }

  export type TextareaEditorProps = Partial<TextAreaProps> & FormItemEditorProps;

  export class BuildTextareaEditor extends OnChangeEditor<TextareaEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <TextArea
          title={formItemConfig.title as string}
          key={formItemConfig.key}
          {...formItemConfig.props}
          onChange={this.onChangeValue.bind(this)}
          {...customs}
        >
      </TextArea>
      )
    }
  }

  export type TimeStampEditorProps = Partial<DatePickerProps> & FormItemEditorProps;

  export class BuildTimeStampEditor extends OnChangeEditor<TimeStampEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <DatePicker
          allowClear
          format={formItemConfig.format}
          key={formItemConfig.key}
          locale={locale}
          {...formItemConfig.props}
          onChange={this.onChangeValue.bind(this)}
          {...customs}
        >
          {this.props.children}
        </DatePicker>
      )
    }
  }

  export type DatePickerEditorProps = Partial<DatePickerProps> & FormItemEditorProps;

  export class BuildDatePickerEditor extends OnChangeEditor<DatePickerEditorProps> {
    render() {
      return (
        <BuildTimeStampEditor
          {...this.props}
        >
        </BuildTimeStampEditor>
      )
    }
  }

  export type TimePickerEditorProps = Partial<TimePickerProps> & FormItemEditorProps

  export class BuildTimePickerEditor extends OnChangeEditor<TimePickerEditorProps> {
    render() {
      const {formItemConfig, ...customs} = this.props;
      return (
        <TimePicker
          key={formItemConfig.key}
          format={formItemConfig.format}
          {...formItemConfig.props}
          onChange={this.onChangeValue.bind(this)}
          {...customs}
        >
        </TimePicker>
      )
    }
  }


  export type RateEditorProps = Partial<RateProps> & FormItemEditorProps

  export class BuildRateEditor extends OnChangeEditor<RateEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <Rate
          key={formItemConfig.key}
          onChange={this.onChangeValue.bind(this)}
          {...formItemConfig.props}
          {...customs}
        >
        </Rate>
      )
    }
  }

  export type NumberEditorProps = Partial<InputNumberProps> & FormItemEditorProps

  export class BuildNumberEditor extends OnChangeEditor<NumberEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <InputNumber
          step={1}
          key={formItemConfig.key}
          onChange={this.onChangeValue.bind(this)}
          {...formItemConfig.props}
          {...customs}
        >
        </InputNumber>
      )
    }
  }

  export type SwitchEditorProps = Partial<SwitchProps> & FormItemEditorProps

  export class BuildSwitchEditor extends OnChangeEditor<SwitchEditorProps> {
    render() {
      const {formItemConfig = {}, ...customs} = this.props;
      return (
        <Switch
          key={formItemConfig.key}
          onChange={this.onChangeValue.bind(this)}
          checkedChildren={formItemConfig.trueTitle}
          unCheckedChildren={formItemConfig.falseTitle}
          {...formItemConfig.props}
          {...customs}
        >
        </Switch>
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

  export function buildOptions(options: Option[] | Option, optionType: OptionType) {
    let theOptions: Option[] = makerArray(options);
    let NodeName ;
    if (optionType == OptionType.SelectOption) {
      NodeName = Select.Option
    } else if (optionType == OptionType.Radio) {
      NodeName = Radio;
    } else {
      NodeName = Checkbox;
    }

    const result = theOptions.map((option: Option) => {
      const props = {
        value: `${option.value}`,
        key: `${option.value}`,
        children: option.title || option.value,
      };

      return (
        <NodeName
          {...props}
        />
      )
    });
    return result;
  }

}

export default UIEditors;

