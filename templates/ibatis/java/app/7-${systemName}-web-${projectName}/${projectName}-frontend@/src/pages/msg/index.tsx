import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

// import { Nav, Footer, UserImage } from '../../components';
import { dateFormat } from '../../utils';
import styles from './msg.css';
import Nav from "@components/nav";
import Footer from "@components/tabs";
import UserImage, {avatarImgIdRender} from "@components/userImage";
import StatesAlias from "@i/configs/${systemName?uncap_first}App-statesAlias";
import {AppProps} from "@i/interfaces/AppFaces";
import {ConnectionPros} from "@utils/DvaUtil";
import {MsgProps} from "@i/interfaces/MsgFaces";
interface CustomMsgProps extends MsgProps{
  has_read_messages,
  hasnot_read_messages,
}
class Msg extends React.PureComponent<CustomMsgProps & AppProps & ConnectionPros > {
    componentDidMount() {
        let user=this.props.appState.userArea.list[0]
        if (user) {
            const { dispatch } = this.props;
            dispatch({ type: 'msg/GetMsg'});
        }
    }

    render() {
        if (!localStorage.getItem('User')) {
            return (
                <div>
                    <Nav title={'消息'} showBackIcon={false} />
                    <div className={styles.notLogin}>
            您还未登录，请先<a className={styles.loginText} href={'/login'}>登录</a>
                    </div>
                    <Footer selectedIndex={3} />
                </div>
            );
        }

        let { has_read_messages, hasnot_read_messages } = this.props;
        if ((!has_read_messages && !hasnot_read_messages)
      || (has_read_messages.length < 1 && hasnot_read_messages.length < 1)) return null;

        Array.prototype.push.apply(hasnot_read_messages, has_read_messages);

        return (
            <>
                <Nav title={'消息'} showBackIcon={false} />
                <div style={{ marginTop: '7vh' }}>
                    {
                        hasnot_read_messages.map((item, index) => {
                            let content = null;
                            if (item.type === 'at') {
                                content = <div>在话题 <Link to={`/topic/${'${'}item.topic.topicId}`}
                                    style={{ color: '#108ee9' }}>{item.topic.title}</Link> 中 @了你</div>;
                            } else {
                                content = <div>回复你了的话题 <Link to={`/topic/${'${'}item.topic.topicId}`}
                                    style={{ color: '#108ee9' }}>{item.topic.title}</Link></div>;
                            }

                            return (
                                <div key={index} className={styles.msgItemWrap}>
                                    <div className={styles.msgItemUserImage}>
                                        <UserImage imageUrl={avatarImgIdRender.renderColumn(item.author)} />
                                    </div>
                                    <div className={styles.msgItemRight}>
                                        <div className={styles.msgItemUp}>
                                            <span className={styles.msgItemUserName}>{item.author.username}</span>
                                            <span className={styles.msgItemDate}>{dateFormat(item.createTime)}</span>
                                        </div>
                                        <div>
                                            {content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <Footer selectedIndex={3} />
            </>
        );
    }
}

function mapStateToProps({ msg,app }:StatesAlias) {
    return {
        has_read_messages: msg.has_read_messages,
        hasnot_read_messages: msg.hasnot_read_messages,
        appState:app,
    };
}

export default connect(mapStateToProps)(Msg);
