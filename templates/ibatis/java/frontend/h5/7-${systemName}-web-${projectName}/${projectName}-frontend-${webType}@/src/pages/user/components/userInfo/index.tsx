import React from 'react';
import {Tabs} from 'antd-mobile';

// import { UserImage, List } from '../../components';
import {dateFormat} from '@utils/index';
import styles from './index.css';
import UserImage, {avatarImgIdRender} from "@components/userImage";
import List from "../listView";
import User from "@i/beans/User";
import UserColumns from "@i/columns/UserColumns";

const tabs = [
  {title: '主题'},
  {title: '回复'}
];

export interface UserInfoProps {
  user: User,
}

function UserInfo({user}: UserInfoProps) {
  if (!user) {
    return null;
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.up}>
        <div className={styles.up_wrap}>

          <UserImage imageUrl={avatarImgIdRender.renderColumn(user)} width={80} height={80}/>
          <span className={styles.userName}>{user.username}</span>
          <div className={styles.userInfo}>
            <span>{`积分：${'${'}user.score}`}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{`注册于：${'${'}dateFormat(user.createTime)}`}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{UserColumns.sex.renderColumn(user,'：')}</span>
          </div>
        </div>
      </div>
      <div>
        <Tabs tabs={tabs}
              initialPage={0}
        >
          <List data={user.recent_topics}></List>
          <List data={user.recent_replies}></List>
        </Tabs>
      </div>
    </div>
  );
}

export default UserInfo;
