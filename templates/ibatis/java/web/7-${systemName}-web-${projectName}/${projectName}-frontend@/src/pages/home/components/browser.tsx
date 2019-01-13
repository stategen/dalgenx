import React from 'react'
import { Table, Tag } from 'antd'
import { color } from '@utils/index'
import styles from './browser.less'
import ArrayDataProps from "@pages/home/components/ArrayDataProps";

const status = {
  1: {
    color: color.green,
  },
  2: {
    color: color.red,
  },
  3: {
    color: color.blue,
  },
  4: {
    color: color.yellow,
  },
}

function Browser ({ data }:ArrayDataProps) {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      className: styles.name,
    }, {
      title: 'percent',
      dataIndex: 'percent',
      className: styles.percent,
      render: (text, it) => <Tag color={status[it.status].color}>{text}%</Tag>,
    },
  ]
  return <Table pagination={false} showHeader={false} columns={columns} rowKey={(record, key) => key} dataSource={data} />
}


export default Browser
