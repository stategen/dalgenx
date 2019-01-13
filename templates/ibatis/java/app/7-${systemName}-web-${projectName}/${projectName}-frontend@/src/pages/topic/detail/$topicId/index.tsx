import React from 'react';
import {connect} from 'dva';
import TopicReplyListView from "@pages/topic/detail/$topicId/TopicReplyListView";
import TopicDetail from "@pages/topic/detail/$topicId/TopicDetail";


function topicDetailPage() {

  return (
    <>
      <TopicDetail/>
      <TopicReplyListView/>
    </>
  );
}

export default connect()(topicDetailPage);
