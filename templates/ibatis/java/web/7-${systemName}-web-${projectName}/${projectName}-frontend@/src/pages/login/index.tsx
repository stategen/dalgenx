import React from 'react'
import { connect } from 'dva'
import { Button, Row, Form } from 'antd'
import { config } from '@utils/index'
import styles from './index.less'
import {ConnectionPros, FormProps} from "@utils/DvaUtil";
import {FormComponentProps} from "antd/lib/form/Form";
import {LoginDispatch, LoginProps} from "@i/interfaces/LoginFaces";
import UIEditors from "@utils/UIEditors";
import LoginApiForms from "@i/forms/LoginApiForms";
import {AppProps} from "@i/interfaces/AppFaces";
import StatesAlias from "@i/configs/tradeCms-statesAlias";

// const FormItem = Form.Item

type LoginPageProps =AppProps & LoginProps & FormProps;

const loginPage = (props: LoginPageProps) => {
  const form = props.form;
  const dispatch = props.dispatch;
  function handleOk () {
    form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch(LoginDispatch.login_effect(values));
      // dispatch({ type: 'login/login', payload: values })
    })
  }
  const loginFormItemConfigMap = LoginApiForms.getLoginFormItemConfigMap({},props);
   const UsernameEditor = loginFormItemConfigMap.Username.Editor;
   const PasswordEditor = loginFormItemConfigMap.Password.Editor;
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        <UsernameEditor
          placeholder={"用户名 admin"}
        >
        </UsernameEditor>
        <PasswordEditor
          placeholder={"密码为 admin"}
        >
        </PasswordEditor>
        <Row>
          <Button type="primary" onClick={handleOk} loading={props.loading.effects.login}>
            Sign in
          </Button>
        </Row>

      </form>
    </div>
  )
}



const mapStateToProps = (states: StatesAlias & ConnectionPros) : LoginPageProps =>{
  const result: LoginPageProps = {
    appState: states.app,
    loginState: states.login,
    loading: states.loading,
  }
  return result;
}

const LoginPage = connect(mapStateToProps)(Form.create()(loginPage));

export default LoginPage;
