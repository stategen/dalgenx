import {Form, Input, InputNumber, Radio, Modal, Cascader, DatePicker, TimePicker, Select} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {Options, FormItemConfigs} from "./DvaUtil";
import Menu from "@i/beans/Menu";
import Icon from "antd/lib/icon";
import Link from "umi/link";
import {InputProps} from "antd/lib/input";
import {DatePickerProps} from "antd/lib/date-picker/interface";
import {TimePickerProps} from "antd/lib/time-picker";
import {SelectProps} from "antd/lib/select";
import {LinkProps} from "react-router-dom";
import {FormConfigs} from "@utils/DvaUtil";
import {default as FormItem, FormItemProps} from "antd/lib/form/FormItem";
import {FormComponentProps} from "antd/lib/form";
import {WrappedFormUtils} from "antd/lib/form/Form";

export default class UIUtil {
  static makeSelectOptions(options: Options={}) {
    const result = Object.values(options).map((option, key) => {
      return (
        <Select.Option value={option.value} key={key}>{option.title || option.value}
        </Select.Option>
      )
    });
    return result;
  }


  static buildInputEditor(formItemConfigs: FormItemConfigs=null,props:InputProps=null) {
    return (<Input {...props}/>)
  }

  static buildTimeStampEditor(formItemConfigs: FormItemConfigs=null, format: string,props:DatePickerProps=null) {
    return (<DatePicker showTime locale={locale} format={format} {...props}/>)
  }

  static buildTimePickerEditor(formItemConfigs: FormItemConfigs=null, format: string,props:TimePickerProps=null) {
    return (<TimePicker format={format} {...props}/>)
  }

  static buildDatePickerEditor(formItemConfigs: FormItemConfigs=null, format: string,props:DatePickerProps=null) {

    return (<DatePicker locale={locale} format={format} {...props}/>)
  }

  static buildEnumEditor(formItemConfigs: FormItemConfigs={}, options: Options,props:SelectProps=null) {
    const muti = formItemConfigs.isArray ? {mode: "multiple"} : null;

    return (
      <Select {...muti} style={{width: 150}} {...props}>
        {UIUtil.makeSelectOptions(options)}
      </Select>
    )
  }

  static buildImageEditor(formItemConfigs: FormItemConfigs={},props:InputProps=null) {
    return (<Input {...props}/>)
  }

  static buildFormItems(wrappedForm:WrappedFormUtils,formConfigs:FormConfigs,formItemProps:FormItemProps){
    let formItems = Object.keys(formConfigs).map((fieldName:string) => {
      const formItemConfigs:FormItemConfigs = formConfigs[fieldName];
      if (formItemConfigs.isId || formItemConfigs.hidden) {
        return;
      }

      return (
        <FormItem {...formItemProps} key={fieldName} label={formItemConfigs.label}>
          {wrappedForm.getFieldDecorator(formItemConfigs.name, formItemConfigs.config)(formItemConfigs.editor)}
        </FormItem>
      )
    });
    return formItems;
  }

  static buildLink(menu: Menu ={}, props:LinkProps = null) {
    const route = (menu.route || '#');
    // props =props || {to:route};

    return <Link to={route} style={{width: 10}} key={menu.route},{...props} >
      <Icon type={menu.icon}/>
      {menu.name}
    </Link>
  }
}
