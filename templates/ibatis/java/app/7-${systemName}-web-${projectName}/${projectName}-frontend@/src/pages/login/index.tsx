import React from 'react'
import {Button, WhiteSpace, Toast} from 'antd-mobile'
import {createForm} from 'rc-form'
import {connect} from 'dva'
import style from './login.less'
import avataSrc from '@/images/icon/avatar.png'
import loginUserSrc from '@/images/icon/login_user.png'
import loginPassSrc from '@/images/icon/login_pass.png'
import {ConnectionPros, FormProps} from "@utils/DvaUtil";
import {LoginDispatch, LoginProps} from "@i/interfaces/LoginFaces";
import LoginApiForms from "@i/forms/LoginApiForms";

type  LoginFormProps = LoginProps & ConnectionPros & FormProps;


@createForm()
@connect(({login, loading}) => ({
  loginState: login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends React.PureComponent<LoginFormProps> {

  handleOk = () => {
    const props = this.props;
    props.form.validateFields((error, values) => {
      if (error) {
        const msg = `请输入${props.form.getFieldError('username') || ''}${props.form.getFieldError('password') || ''}`
        Toast.info(msg, 1);
        return;
      }
      props.dispatch(LoginDispatch.login_effect(values));
    })
  }

  render() {
    const props = this.props;
    const loginApiForms = LoginApiForms.getLoginFormItemConfigMap({}, props);
    const UsernameEditor = loginApiForms.Username.Editor;
    const PasswordEditor = loginApiForms.Password.Editor;
    return (
      <div className={`page ${style.login}`}>
        <div className={`${style["page-header"]}`}>
          <label>进入Stategen moble demo</label><img src={avataSrc} alt=""/>
        </div>
        <UsernameEditor
          placeholder={"账号:admin"}
        >
          <img src={loginUserSrc} className='icon'/> {' ' + loginApiForms.Username.title}
        </UsernameEditor>
        <PasswordEditor
          placeholder={"密码:admin"}
        >
          <img src={loginPassSrc} className='icon'/> {' ' + loginApiForms.Password.title}
        </PasswordEditor>

        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <Button type="primary" onClick={this.handleOk}>确定</Button>
        <WhiteSpace/>
      </div>
    )
  }
}

export default LoginPage
