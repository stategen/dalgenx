import {routerRedux} from 'dva/router'
import {connect} from 'dva';
import React from 'react'
import styles from './index.less'
import {user_$userIdEffects, user_$userIdReducers, User_$userIdProps
} from '@i/interfaces/User_$userIdFaces';
import User from "@i/beans/User";
import {ConnectionPros} from "@utils/DvaUtil";
import {AppProps} from "@i/interfaces/AppFaces";
import StatesAlias from "@i/configs/tradeCms-statesAlias";

type User_$userIdPageProps = AppProps & User_$userIdProps;
/*dva限定死了user$userId，必须与model中的namespace一致*/
const user_$userIdPage = ({location, dispatch, user_$userIdState, loading}: User_$userIdProps & ConnectionPros) => {
  const {pathname} = location;
  const user = user_$userIdState.userArea.list[0];
  const content = []
  for (let key in user) {
    if ({}.hasOwnProperty.call(user, key)) {
      content.push(<div key={key} className={styles.item}>
        <div>{key}</div>
        <div>{String(user[key])}</div>
      </div>)
    }
  }
  return (<div className="content-inner">
    <div className={styles.content}>
      {content}
    </div>
  </div>)
}

const mapStateToProps = (states: StatesAlias & ConnectionPros): User_$userIdPageProps => {
  const props: User_$userIdPageProps = {
    appState: states.app,
    user_$userIdState: states.user_$userId,
    loading: states.loading,
  }
  return props;
}

const User_$userIdPage = connect(mapStateToProps)(user_$userIdPage);

export default User_$userIdPage;

