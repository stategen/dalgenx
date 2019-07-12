import React from 'react';
import {connect} from 'dva';
import Link from 'umi/link';

import {dateFormat} from '@utils/index';
import styles from './topicDetail.css';
import Nav from "@components/nav";
import UserImage, {avatarImgIdRender} from "@components/userImage";
import Icon from "@components/icon";
import Comment from "./components/comment";
import StatesAlias from "@i/configs/${systemName?uncap_first}App-statesAlias";
import {AppProps} from "@i/interfaces/AppFaces";
import {ConnectionPros} from "@utils/DvaUtil";
import {Topic_detail_$topicIdProps} from "@i/interfaces/Topic_detail_$topicIdFaces";


type TopicDetailProps = AppProps & ConnectionPros & Topic_detail_$topicIdProps;

const TopicDetail = function (props: TopicDetailProps) {
  const state = props.topic_detail_$topicIdState;
  const topic = state.topicArea.list[0];
  const user =props.appState.userArea.list[0];
  if (topic == null || topic.topicId == null) {
    return null;
  }

  return (
    <>
      <Nav title={'详 情'}/>
      <div className={styles.topicDetail}>
        <div className={styles.topicTopInfo}>
          <div className={styles.topicTopInfoDetail}>
            <div className={styles.userImage}>
              <UserImage imageUrl={avatarImgIdRender.renderColumn(topic.author)}/>
            </div>
            <div className={styles.authorInfo}>
              <p className={styles.authorInfo_p} style={{paddingTop: '15px'}}>
                <Link to={`/user/${'${'}topic.author.username}`}
                      style={{color: '#80BD01'}}>{topic.author.username}</Link>&nbsp;&nbsp;
                <span>{dateFormat(topic.createTime)}</span>
              </p>
              <p className={styles.authorInfo_p} style={{paddingBottom: '8px'}}>
                阅读：{topic.visitCount} 回复：{topic.replyCount}
              </p>
            </div>
          </div>
          <div className={styles.logo}>
            <Icon
              iconType={topic.top ? 'top' : topic.good ? 'good' : topic.topicType}
              iconClassName="logo"
              fontSize={35}
            />
          </div>
        </div>
        <div className={styles.topicTitle}> {topic.title}</div>
        <div className="content markdown-body"
             dangerouslySetInnerHTML={{__html: topic.content}}
        />
        <div className={styles.topicReply}>共<span>{topic.replyCount}</span>条回复</div>
        {user && <Comment topicId={topic.topicId}  commetTo={topic.author.username}/>}
      </div>
    </>
  )
}

function mapStateToProps(states: StatesAlias & ConnectionPros) {
  let newState: TopicDetailProps = {
    topic_detail_$topicIdState: states.topic_detail_$topicId,
    appState: states.app,
    loading: states.loading
  };
  return newState;
}

export default connect(mapStateToProps)(TopicDetail);


