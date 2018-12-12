import {routerRedux} from 'dva/router'
import {connect} from 'dva';
import React from 'react'
import styles from './index.less'
import {user$userIdEffects, user$userIdReducers, User$userIdProps
} from '@i/interfaces/User$userIdFaces';
import User from "@i/beans/User";

/*dva限定死了user$userId，必须与model中的namespace一致*/
const user$userIdPage = ({location, dispatch, user$userId: user$userIdState, loading}: User$userIdProps) => {
  const {pathname} = location;
  const {user} = user$userIdState;
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

/*dva限定死了user$userId，必须与model中的namespace一致*/
export default connect(({user$userId: user$userIdState, loading}) => ({user$userId: user$userIdState, loading: loading.models.user$userId}))(user$userIdPage)
// export default connect(({ user$userId, loading }) => ({ user$userId, loading: loading.models.user$userId }))($UserId)
