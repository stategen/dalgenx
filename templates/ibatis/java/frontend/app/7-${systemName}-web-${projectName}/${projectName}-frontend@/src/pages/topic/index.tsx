import React from 'react';
import {connect} from 'dva';

import './index.css';
import Head from './components/head';
import TopicList from './components/topicList';
import Footer from "@components/tabs";

function topicListPage() {
  return (
    <>
      <Head/>
      <TopicList/>
      <Footer selectedIndex={1}/>
    </>
  );
}

export default connect()(topicListPage);
