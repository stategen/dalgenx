import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import {ListView} from 'antd-mobile';

import {ConnectionPros} from "@utils/DvaUtil";
import StatesAlias from "@i/configs/tradeApp-statesAlias";
import {TopicDispatch, TopicProps} from "@i/interfaces/TopicFaces";
import {topic_detail_$topicIdInitModel} from "@i/interfaces/Topic_detail_$topicIdFaces";
import RouteUtil from "@utils/RouteUtil";
import listItemStyles from './ListItem.css';
import {dateFormat} from "@/utils";
import Topic from "@i/beans/Topic";
import Link from "umi/link";
import UserImage, {avatarImgIdRender} from "@components/userImage";
import Icon from "@components/icon";
import UserColumns from "@i/columns/UserColumns";



interface TopicListState {
  dataSource?: any,
  isLoading?: boolean,
  height?: number,
}

function ListItem(topic: Topic) {
  const topicDetailPath = RouteUtil.compileRoute(topic_detail_$topicIdInitModel.pathname, {topicId: topic.topicId});
  return (
    <Link to={topicDetailPath}>
      <div className={listItemStyles.listitem_wrap}>
        <div className={listItemStyles.listitem_up}>
          <Icon
            iconType={topic.top ? 'top' : topic.good ? 'good' : topic.topicType}
            iconClassName="icon"
          />
          <h4 className={listItemStyles.listitem_up_h4}>{topic.title}</h4>
        </div>
        <div className={listItemStyles.listitem_down}>
          <div className={listItemStyles.left}>
            <UserImage imageUrl={avatarImgIdRender.renderColumn(topic.author)}/>
            <div className={listItemStyles.autherInfo}>
              <p>{topic.author.username}</p>
              <p>{dateFormat(topic.createTime)}</p>
            </div>
          </div>
          <div className={listItemStyles.right}>
            <p>{topic.replyCount}/{topic.visitCount}</p>
            <p>{dateFormat(topic.lastReplyAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}


class TopicList extends React.Component<TopicProps & ConnectionPros, TopicListState> {
  lv:any;

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.topicState.topicArea.list);

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }

  componentDidMount() {
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;

    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.topicState.topicArea.list),
        isLoading: false,
        height: hei,
      });
    }, 600);
  }

  UNSAFE_componentWillReceiveProps(nextProps: TopicProps) {
    if (nextProps.topicState.topicArea.list !== this.props.topicState.topicArea.list) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.topicState.topicArea.list),
      });
    }
  }

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }
    this.setState({isLoading: true});
    setTimeout(() => {
      this.props.dispatch(TopicDispatch.getTopicPageList_next_effect());
      this.setState({isLoading: false});
    }, 300);
  };



  render() {
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

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderRow={ListItem}
        renderSeparator={separator}
        pageSize={10}
        onScroll={() => {
          // console.log('scroll');
        }}
        style={{marginTop: '7vh', marginBottom: '8vh'}}
        useBodyScroll
        className="am-list"
        scrollRenderAheadDistance={300}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

function mapStateToProps(states: StatesAlias & ConnectionPros) {
  return {
    topicState: states.topic
  };
}

export default connect(mapStateToProps)(TopicList);
