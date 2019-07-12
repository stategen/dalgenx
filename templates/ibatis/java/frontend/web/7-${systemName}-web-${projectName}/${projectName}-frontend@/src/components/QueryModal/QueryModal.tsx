import React from 'react';
import {Table, Form, Modal, Col, Button, Popconfirm,} from "antd";
import {
  BaseState, Bean, optimizeFieldPostValues, Dispatch, FormItemConfigMap,
  AreaState, Payload, FormItemConfig, commonFormItemLayout, KeyValue, FormPropsUtils, setFormItemConfigFormProps,
  setFormItemConfigMapFormProps, FormItemConfigFixed
} from "@utils/DvaUtil";
import {ModalFuncProps} from "antd/lib/modal";
import {FormItemProps} from "antd/es/form/FormItem";
import {FormComponentProps} from "antd/es/form/Form";
import {FormProps} from "antd/es/form";
import UIEditors from "@utils/UIEditors";

const FormItem = Form.Item;
const {confirm} = Modal;


export interface ModelPageProps<T> {
  record,
  isEditor: boolean,
  title: string,
  areaState: AreaState<T>,
  dispatch: Dispatch,
  formItemConfigs: FormItemConfigFixed[],
  getEditors?:()=>any,
}

const modelPage = (props: ModelPageProps<any> & FormComponentProps) => {
  const {form, record, isEditor, title, areaState, dispatch, formItemConfigs,getEditors} = props;
  //后生成的，没有form属性，form属性加进去，也可以生成直接加进来
  setFormItemConfigFormProps(formItemConfigs, props);
  let editors
  if (!getEditors) {
    editors = formItemConfigs.map(formItemConfig => {
      const Editor = formItemConfig.Editor;
      return (<Editor/>);
    })
  } else {
    editors =getEditors();
  }


  const modalProps: ModalFuncProps = {
    width: 800,
    visible: isEditor ? areaState.doEdit : areaState.doQuery,
    title,
    maskClosable: false,
    /*confirmLoading: loading.effects[roleArea.modalType.toString()],*/
    /*wrapClassName: 'vertical-center-modal',*/
    onOk: (e) => {
      e.preventDefault();
      props.form.validateFieldsAndScroll((errors, fieldsValue) => {
        if (errors) {
          return;
        }

        const dest = props.form.getFieldsValue();
        const areaExtraProps: AreaState<any> = {}
        if (isEditor) {
          areaExtraProps.doEdit = false;
        } else {
          areaExtraProps.doQuery = false;
        }

        const payload = {...dest, areaExtraProps__: areaExtraProps};
        dispatch({
          type: areaState.type,
          payload: payload,
        })
      })
    },

    onCancel: () => {
      const areaName = areaState.areaName;
      const dispatchState: BaseState = {
        [areaName]: areaState.cancelState,
      }
      dispatch({
        type: areaState.cancelState.type,
        payload: dispatchState,
      })
    },
  }

  const formProps: FormProps = {
    layout: "inline",
  }


  return (
    <Modal {...modalProps}>
      <Form
        {...formProps}
      >
        {editors}
      </Form>
    </Modal>
  )
}

export const ModelPage = Form.create()(modelPage);
