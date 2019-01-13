import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';

import styles from './index.css';
import {ConnectionPros} from "@utils/DvaUtil";
import {Topic_detail_$topicIdDispatch} from "@i/interfaces/Topic_detail_$topicIdFaces";

export interface CommentPros extends ConnectionPros{
  topicId:string,
  parentReplyId?:string,
  commetTo: string,
}

class Comment extends React.PureComponent<CommentPros> {
  state = {
    content: ''
  };

  render() {
    const {content} = this.state;
    const {dispatch, topicId, parentReplyId, commetTo} = this.props;

    return (
      <div className={styles.comment}>
        <div className={styles.input}>
                  <textarea
                    placeholder={commetTo ? `@${commetTo}` : '回复支持Markdown语法,请注意标记代码'}
                    defaultValue={content}
                    onInput={(e) => {
                      this.setState({content: e.target.value});
                    }}
                  />
        </div>
        <div className={styles.btnWrap}>
          <button className={styles.btn} onClick={() => {
            let submitData = {
              topicId,
              content,
            };
            if (parentReplyId) {
              submitData.parentReplyId = parentReplyId;
              submitData.content = `[@${commetTo}](/user/${commetTo}) ${content}`;
            }
            submitData.content += '\n\rFrom [cnode-with-umi](https://github.com/layupbolon/cnode-with-umi)';
            dispatch(Topic_detail_$topicIdDispatch.PostReply_effect(submitData,{index:-1,flag:false}));
          }}>回复
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Comment);
