import React from 'react';
import { List } from 'antd-mobile';
import router from 'umi/router';

import { dateFormat } from '@utils/index';
import Topic from "@i/beans/Topic";

const Item = List.Item;

function ListView({ data }) {
    if (!data || data.length < 1) return null;
    return (
        <List>
            {data.map((topic:Topic, index) => {
                return (
                    <Item key={`${topic.topicId}-${index}`}
                        extra={dateFormat(topic.lastReplyAt)}
                        onClick={() => router.push(`/topicDetail/${topic.topicId}`)}
                    >
                        {topic.title}
                    </Item>
                );
            })}
        </List>
    );
}

export default ListView;
