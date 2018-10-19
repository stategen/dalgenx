import {Table, Form, Modal, Col, Button, Popconfirm,} from "antd";
import {
  BaseState, Bean, optimizeFieldPostValues, Dispatch, FormConfigs,
  AreaState, Payload, FormItemConfigs
} from "@utils/DvaUtil";
import {ModalFuncProps} from "antd/lib/modal";
import {FormItemProps} from "antd/lib/form/FormItem";
import {FormComponentProps} from "antd/lib/form/Form";
import {FormProps} from "antd/lib/form";
import UIUtil from "@utils/UIUtil";

const FormItem =Form.Item;
const {confirm} = Modal;

const formItemLayout: FormItemProps = {
  labelCol: {
    xs: {span: 48},
    sm: {span: 12},
  },

  wrapperCol: {
    xs: {span: 48},
    sm: {span: 12},
  },
};

export const createModelPage = <T extends Bean, F extends FormConfigs>
(isEditor: boolean, title: string, areaState: AreaState<T>, formConfigs: F, idkey: String | any, dispatch: Dispatch) => {
  const modalPage = (formComponentProps: FormComponentProps) => {
    let formItems=UIUtil.buildFormItems(formComponentProps.form,formConfigs,formItemLayout)
    // let formItems = Object.keys(formConfigs).map((fieldName:string) => {
    //   const formItemConfigs:FormItemConfigs = formConfigs[fieldName];
    //   if (formItemConfigs.isId || formItemConfigs.hidden) {
    //     return;
    //   }
    //
    //   return (
    //     <FormItem {...formItemLayout} key={fieldName} label={formItemConfigs.label}>
    //       {formComponentProps.form.getFieldDecorator(formItemConfigs.name, formItemConfigs.config)(formItemConfigs.editor)}
    //     </FormItem>
    //   )
    // });

    const modalProps: ModalFuncProps = {
      width: 800,
      visible: isEditor ? areaState.doEdit : areaState.doQuery,
      title,
      maskClosable: false,
      /*confirmLoading: loading.effects[`${'$'}{roleArea.modalType}`],*/
      /*wrapClassName: 'vertical-center-modal',*/
      onOk: (e) => {
        e.preventDefault();
        formComponentProps.form.validateFields((errors, fieldsValue) => {
          if (errors) {
            return;
          }
          const dest = formComponentProps.form.getFieldsValue();
          const areaExtraProps: AreaState<T> = {}
          optimizeFieldPostValues(dest);
          if (isEditor) {
            areaState.item[idkey] ? dest[idkey] = areaState.item[idkey] : null;
            areaExtraProps.doEdit = false;
          } else {
            areaExtraProps.queryRule = dest;
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
        <Form {...formProps}>
          {formItems}
        </Form>
      </Modal>
    )
  }

  return Form.create()(modalPage);
}
