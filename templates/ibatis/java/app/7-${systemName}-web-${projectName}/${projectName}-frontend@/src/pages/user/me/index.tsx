import React from 'react';
import {connect} from 'dva';
import {Modal,WhiteSpace} from 'antd-mobile';

import styles from '@pages/msg/msg.css';
import Link from "umi/link";
import Nav from "@components/nav";
import Footer from "@components/tabs";
import UserInfo from "../components/userInfo";
import StatesAlias from "@i/configs/${systemName?uncap_first}App-statesAlias";
import {AppDispatch, AppProps} from "@i/interfaces/AppFaces";
import {ConnectionPros, FormProps} from "@utils/DvaUtil";
import {User_meDispatch, user_meEffects, User_meProps} from "@i/interfaces/User_meFaces";
import User_meApiForms from "@i/forms/User_meApiForms";
import {createForm} from 'rc-form'

const Alert = Modal.alert;
type User_mePageProps = AppProps & User_meProps & FormProps;

class user_mePage extends React.Component<User_mePageProps> {
  render() {

    const user = this.props.user_meState.userArea.list[0];
    if (!user) {
      return (
        <div>
          <Nav title={'消息'} showBackIcon={false}/>
          <div className={styles.notLogin}>
            您还未登录，请先<Link to={"login"} className={styles.loginText} title="登录"/>
          </div>
          <Footer selectedIndex={4}/>
        </div>
      );
    }

    const dispatch = this.props.dispatch;
    const formItemConfigMap = User_meApiForms.getUpdateFormItemConfigMap(user, this.props);
    const HoppyIdsEditor = formItemConfigMap.HoppyIds.Editor;
    const CascaderPostAddressIdsEditor = formItemConfigMap.CascaderPostAddressIds.Editor;
    const UsernameEditor = formItemConfigMap.Username.Editor;
    const PasswordEditor = formItemConfigMap.Password.Editor;
    const RoleTypeEditor = formItemConfigMap.RoleType.Editor;
    const NameEditor = formItemConfigMap.Name.Editor;
    const NickNameEditor = formItemConfigMap.NickName.Editor;
    const AgeEditor = formItemConfigMap.Age.Editor;
    const AddressEditor = formItemConfigMap.Address.Editor;
    const AvatarImgIdEditor = formItemConfigMap.AvatarImgId.Editor;
    const EmailEditor = formItemConfigMap.Email.Editor;
    const ValiDatetimeEditor = formItemConfigMap.ValiDatetime.Editor;
    const BirthdayDateEditor = formItemConfigMap.BirthdayDate.Editor;
    const WorkTimeEditor = formItemConfigMap.WorkTime.Editor;
    const ProvinceIdEditor = formItemConfigMap.ProvinceId.Editor;
    const CityIdEditor = formItemConfigMap.CityId.Editor;
    const StatusEditor = formItemConfigMap.Status.Editor;
    const GradeEditor = formItemConfigMap.Grade.Editor;
    const SexEditor = formItemConfigMap.Sex.Editor;
    const PostAddressIdEditor = formItemConfigMap.PostAddressId.Editor;
    const UserIdEditor = formItemConfigMap.UserId.Editor;


    return (
      <>
        <Nav title={'个人中心'} showBackIcon={false} showSignOutIcon={true} rightIconFunc={() => {
          Alert('退出', '确定退出登录？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
              text: '确定', onPress: () => dispatch(AppDispatch.logout_effect())
            },
          ]);
        }}
        />
        <UserInfo user={user}/>
        <StatusEditor
        >
        </StatusEditor>
        <CascaderPostAddressIdsEditor
        >
        </CascaderPostAddressIdsEditor>
        <HoppyIdsEditor
        >
        </HoppyIdsEditor>
        <UsernameEditor
        >
        </UsernameEditor>
        <PasswordEditor
        >
        </PasswordEditor>
        <RoleTypeEditor
        >
        </RoleTypeEditor>
        <NameEditor
        >
        </NameEditor>
        {/*<NickNameEditor*/}
        {/*>*/}
        {/*</NickNameEditor>*/}
        <AgeEditor
        >
        </AgeEditor>
        <AddressEditor
        >
        </AddressEditor>
        <AvatarImgIdEditor
        >
        </AvatarImgIdEditor>
        {/*<EmailEditor*/}
        {/*>*/}
        {/*</EmailEditor>*/}
        <ValiDatetimeEditor
        >
        </ValiDatetimeEditor>
        <BirthdayDateEditor
        >
        </BirthdayDateEditor>
        <WorkTimeEditor
        >
        </WorkTimeEditor>
        <ProvinceIdEditor
        >
        </ProvinceIdEditor>
        <CityIdEditor
        >
        </CityIdEditor>

        {/*<GradeEditor*/}
        {/*>*/}
        {/*</GradeEditor>*/}
        <SexEditor
        >
        </SexEditor>
        {/*<PostAddressIdEditor*/}
        {/*>*/}
        {/*</PostAddressIdEditor>*/}
        {/*<UserIdEditor*/}
        {/*>*/}
        {/*</UserIdEditor>*/}
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <WhiteSpace/>
        <Footer selectedIndex={4}/>
      </>
    );

  }
}

const mapStateToProps = (states: StatesAlias & ConnectionPros): User_mePageProps => {
  const props: User_mePageProps = {
    appState: states.app,
    user_meState: states.user_me,
    loading: states.loading,
  }
  return props;
}

const User_mePage = connect(mapStateToProps)(createForm()(user_mePage));

export default User_mePage;

