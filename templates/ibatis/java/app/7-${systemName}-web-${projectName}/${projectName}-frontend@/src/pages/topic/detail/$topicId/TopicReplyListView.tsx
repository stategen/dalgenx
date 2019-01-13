import React from 'react';
import {connect} from 'dva';
import Link from 'umi/link';
import {Toast} from 'antd-mobile';

import {dateFormat} from '@utils/index';
import styles from './topicDetail.css';
import UserImage, {avatarImgIdRender} from "@components/userImage";
import Comment from "./components/comment";
import StatesAlias from "@i/configs/tradeApp-statesAlias";
import {AppProps} from "@i/interfaces/AppFaces";
import {ConnectionPros} from "@utils/DvaUtil";
import TopicReply from "@i/beans/TopicReply";
import {ListView} from 'antd-mobile';
import {Topic_detail_$topicIdDispatch, Topic_detail_$topicIdProps} from "@i/interfaces/Topic_detail_$topicIdFaces";
import ReactDOM from "react-dom";
import {user_detail_$usernameInitModel} from "@i/interfaces/User_detail_$usernameFaces";
import RouteUtil from "@utils/RouteUtil";

interface TopicDetailState {
  dataSource?: any,
  isLoading?: boolean,
  height?: number,
}

type TopicDetailProps = AppProps & ConnectionPros & Topic_detail_$topicIdProps;
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

class TopicDetail extends React.Component <TopicDetailProps, TopicDetailState> {
  lv:any;

  constructor(props) {
    super(props);

    let state = props.topic_detail_$topicIdState;
    const replies = state.topicReplyArea.list || [];


    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(replies);

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Topic_detail_$topicIdProps) {
    if (nextProps.topic_detail_$topicIdState.topicReplyArea.list !== this.props.topic_detail_$topicIdState.topicReplyArea.list) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.topic_detail_$topicIdState.topicReplyArea.list),
      });
    }
  }

  componentDidMount() {
    let state = this.props.topic_detail_$topicIdState;
    const replies = state.topicReplyArea.list;
    if (!replies || !replies.length) {
      return;
    }

    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;

    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(replies),
        isLoading: false,
        height: hei,
      });
    }, 600);
  }


  render() {
    const props = this.props;
    const state = props.topic_detail_$topicIdState;
    const topic = state.topicArea.list[0];
    const user = props.appState.userArea.list[0];
    let index = state.topicReplyArea.index;

    if (topic == null || topic.topicId == null) {
      return null;
    }

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 3,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    const onEndReached = (event) => {
      if (this.state.isLoading) {
        return;
      }
      this.setState({isLoading: true});
      let state = this.props.topic_detail_$topicIdState;
      setTimeout(() => {
        this.props.dispatch(Topic_detail_$topicIdDispatch.getTopicReplyPageList_next_effect());
        this.setState({isLoading: false});
      }, 300);
    };



    const getRepliesRow = (topicReply: TopicReply, sectionID, idx, highlightRow) => {
      return (
        <div key={idx}>
          <div className={styles.replyTop}>

            <div className={styles.replyAuthorImage}>
              <UserImage style={{margin: '10px'}} imageUrl={avatarImgIdRender.renderColumn(topicReply.author)}/>
            </div>

            <div className={styles.replyInfo}>
              <div>
                <div className={styles.replyInfo_left}>
                  <Link className={styles.replyInfo_left_name}
                        to={ RouteUtil.compileRoute(user_detail_$usernameInitModel.pathname,{username:topicReply.author.username})}>{topicReply.author.username}</Link>
                       {dateFormat(topicReply.createTime)}
                </div>
                <div className={styles.replyInfo_floor}>#{idx + 1}</div>
              </div>
              <div className="replyContent content markdown-body"
                   dangerouslySetInnerHTML={{__html: topicReply.content}}
              />
            </div>

          </div>
          <div className={styles.replyDown}>
            <div className={styles.replyDownDetail}>
              <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <i className="iconfont icon-dianzan"
                   onClick={() => {
                     if (user) {
                       if (user.username === topicReply.author.username) {
                         Toast.fail('不能为自己点赞哦', 2);
                         return;
                       }
                       props.dispatch(Topic_detail_$topicIdDispatch.replyUp_effect({replyId: topicReply.replyId}));
                     }
                   }}
                   style={topicReply.isUped ? {color: 'green'} : {color: 'black'}}
                />
                <em className={styles.replyUps}
                    style={topicReply.isUped ? {color: 'green'} : {color: 'black'}}>
                  {topicReply.upCount || ''}
                </em>
              </div>
              <i className="iconfont icon-huifu" style={{color: 'black'}} onClick={() => {
                if (user) {
                  props.dispatch(Topic_detail_$topicIdDispatch.updateState_reducer({topicReplyArea: {index: (idx===index?-1:idx)}}));
                }
              }}
              />
            </div>
          </div>
          {
            index != null && index === idx && user &&
            <Comment topicId={topic.topicId} parentReplyId={topicReply.id} commetTo={topicReply.author.username}/>
          }
        </div>
      );

    }

    return (
      <>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderRow={getRepliesRow}
          renderSeparator={separator}
          pageSize={10}
          onScroll={() => {
            // console.log('scroll');
          }}
          // style={{marginTop: '7vh', marginBottom: '8vh'}}
          // useBodyScroll
          className="am-list"
          scrollRenderAheadDistance={50}
          onEndReached={onEndReached}
          onEndReachedThreshold={30}

          renderBodyComponent={() => <MyBody />}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
        />
      </>

    )
  };
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


