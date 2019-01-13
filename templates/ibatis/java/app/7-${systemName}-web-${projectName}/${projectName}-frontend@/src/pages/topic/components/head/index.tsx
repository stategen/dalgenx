import React from 'react';
import {connect} from 'dva';
import {SegmentedControl} from 'antd-mobile';

import styles from './index.css';
import StatesAlias from "@i/configs/tradeApp-statesAlias";
import TopicType, {topicTypeOptions} from "@i/enums/TopicType";
import {TopicDispatch, TopicProps, TopicState} from "@i/interfaces/TopicFaces";
import {ConnectionPros} from "@utils/DvaUtil";

// function mapTabNameToCode(topicType) {
//   switch (topicType) {
//     case '全部':
//       return 'all';
//     case '精华':
//       return 'good';
//     case '分享':
//       return 'share';
//     case '问答':
//       return 'ask';
//     case '招聘':
//       return 'job';
//     case '测试':
//       return 'dev';
//     default:
//       return 'all';
//   }
// }

const topicTypeOptionArray = Object.values(topicTypeOptions);
const labels = [];
const topicTypes = [];
const topicTypesIdx ={};

topicTypeOptionArray.forEach(function (value, index) {
  let topicType =value.value;
  labels[index] = value.title;    //结果为true
  topicTypes[index] = value.value;
  topicTypesIdx[topicType]=index;
});

function Head(props: TopicProps & ConnectionPros) {
  const onChange = (e) => {
    const headSelectedIndex = e.nativeEvent.selectedSegmentIndex;
    const topicType = topicTypes[headSelectedIndex];

    const newState: TopicState = {
      topicType,
      topicArea: {
        list: [],
        queryRule: null,
        pagination: {current: 0}
      }
    }
    let queryRule = props.topicState.topicArea.queryRule;
    props.dispatch(TopicDispatch.updateState_reducer(newState));
    props.dispatch(TopicDispatch.getTopicPageList_effect({...queryRule, page: 1, topicType,}));
  }

  const topicType = props.topicState.topicType;
  const selectedIndex =topicTypesIdx[topicType];
  return (
    <SegmentedControl
      selectedIndex={selectedIndex}
      className={styles.head}
      values={labels}
      onChange={onChange}
    />
  );
}

function mapStateToProp(states: StatesAlias) {
  return {topicState: states.topic};
}

export default connect(mapStateToProp)(Head);
