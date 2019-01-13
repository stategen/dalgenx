import React from 'react';
import {connect} from 'dva';
import Nav from "@components/nav";
import UserInfo from "../../components/userInfo";
import StatesAlias from "@i/configs/tradeApp-statesAlias";
import {AppProps} from "@i/interfaces/AppFaces";
import {User_detail_$usernameProps} from "@i/interfaces/User_detail_$usernameFaces";
import {ConnectionPros} from "@utils/DvaUtil";


type User_detail_$usernamePageProps = AppProps & User_detail_$usernameProps;

const user_detail_$usernamePage = (props: User_detail_$usernamePageProps) => {
  const user = props.user_detail_$usernameState.userArea.list[0] || {};
  return (
    <>
      <Nav title={`${user.username}的个人中心`}/>
      <UserInfo user={user}></UserInfo>
    </>
  );
}

const mapStateToProps = (states: StatesAlias & ConnectionPros): User_detail_$usernamePageProps => {
  const props: User_detail_$usernamePageProps = {
    appState: states.app,
    user_detail_$usernameState: states.user_detail_$username,
    loading: states.loading,
  }
  return props;
}

const User_detail_$usernamePage = connect(mapStateToProps)(user_detail_$usernamePage);

export default User_detail_$usernamePage;
