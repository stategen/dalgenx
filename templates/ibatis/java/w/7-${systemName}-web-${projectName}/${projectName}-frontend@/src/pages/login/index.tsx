import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from '@utils/index'
import styles from './index.less'
import {ConnectionPros, FormItemConfigs} from "@utils/DvaUtil";
import {FormComponentProps} from "antd/lib/form/Form";
import {LoginDispatch} from "@i/interfaces/LoginFaces";
import FormItem from "antd/lib/form/FormItem";
import UIUtil from "@utils/UIUtil";
import {LoginApiForms} from "@i/forms/LoginApiForms";

// const FormItem = Form.Item

const loginPage = ({ loading,  dispatch,  form} : ConnectionPros & FormComponentProps) => {
  function handleOk () {
    form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch(LoginDispatch.login_effect(values));
      // dispatch({ type: 'login/login', payload: values })
    })
  }
  const loginFormConfigs = LoginApiForms.loginFormConfigs();
  loginFormConfigs.password.editor =UIUtil.buildInputEditor(null,{type:'password'});
  const formItems = UIUtil.buildFormItems(form,loginFormConfigs,null);

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        {formItems}
        {/*<FormItem hasFeedback>
          {form.getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {form.getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>*/}
        <Row>
          <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
            Sign in
          </Button>
          <p>
            <span>Username：guest</span>
            <span>Password：guest</span>
          </p>
        </Row>

      </form>
    </div>
  )
}


export default connect(({ loading }:ConnectionPros) => ({ loading }))(Form.create()(loginPage))
