import React from 'react';
import {connect} from 'dva';
import {Toast, List} from 'antd-mobile';
import {createForm} from 'rc-form'

import styles from './publish.css';
// import { Nav, Footer } from '../../components';
import Link from "umi/link";
import Nav from "@components/nav";
import Footer from "@components/tabs";
import StatesAlias from "@i/configs/tradeApp-statesAlias";
import {ConnectionPros, FormProps} from "@utils/DvaUtil";
import {AppProps} from "@i/interfaces/AppFaces";
import {Topic_publishDispatch, Topic_publishProps} from "@i/interfaces/Topic_publishFaces";
import Topic_publishApiForms from "@i/forms/Topic_publishApiForms";


const Item = List.Item;
type topicPublishPageProps = AppProps & Topic_publishProps & ConnectionPros & FormProps;

const PublishPage = (props: topicPublishPageProps) => {
  const handleOk = () => {
    props.form.validateFields((error, values) => {
      if (error) {
        Toast.info(error.toString(), 1);
        return;
      }
      console.log(values)
      props.dispatch(Topic_publishDispatch.saveTopic_effect(values));
    })
  }

  const topic = props.topic_publishState.topicArea.list[0] || {};
  const saveTopicFormItemConfigMap = Topic_publishApiForms.getSaveTopicFormItemConfigMap(topic, props);
  const TopicIdEditor = saveTopicFormItemConfigMap.TopicId.Editor;
  const TopicTypeEditor = saveTopicFormItemConfigMap.TopicType.Editor;
  const ContentEditor = saveTopicFormItemConfigMap.Content.Editor;
  const TitleEditor = saveTopicFormItemConfigMap.Title.Editor;

  return (
    <>
      <Nav title={'发表主题'} showBackIcon={false} showPublishIcon={true} rightIconFunc={handleOk}
      />

      <div className={styles.publish}>
        <div className={styles.item}>
        </div>

        <div className={styles.item}>
          <TopicIdEditor
          >
          </TopicIdEditor>

          <TopicTypeEditor
          >
          </TopicTypeEditor>
        </div>
        <div className={styles.item}>
          <TitleEditor
          >
          </TitleEditor>
        </div>
        <div className={styles.item}>
          <ContentEditor
          >
          </ContentEditor>
        </div>
      </div>

      {/*      <div className={styles.publish}>
        <div className={styles.item}>
          <TopicType>
          </TopicType>
          <select name="topicType"
                  defaultValue={this.state.topicType}
                  onInput={(e) => {
                    this.setState({topicType: e.target.value});
                  }}>
            <option value>请选择发表类型</option>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
          </select>
        </div>
        <div className={styles.item}>
          <input className={styles.input}
                 type="text"
                 placeholder="标题字数 10 字以上"
                 defaultValue={this.state.title}
          />
        </div>
        <div className={styles.item}>
                      <textarea className={styles.textarea}
                                placeholder="内容字数 30 字以上"
                                defaultValue={this.state.content}
                      />
        </div>
      </div>*/}
      <Footer selectedIndex={2}/>
    </>
  );
}

function mapStateToProps(states: StatesAlias) {
  const result: topicPublishPageProps = {
    appState: states.app,
    topic_publishState: states.topic_publish,
  }
  return result;
}

export default connect(mapStateToProps)(createForm()(PublishPage));
