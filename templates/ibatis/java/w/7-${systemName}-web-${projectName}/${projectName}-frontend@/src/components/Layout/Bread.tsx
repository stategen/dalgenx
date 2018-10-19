import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import pathToRegexp from 'path-to-regexp'
import { queryArray } from '@utils/index'
import styles from './Layout.less'
import Menu from "@i/beans/Menu";

const Bread = ({ menus, location }) => {
  // 匹配当前路由
  let pathArray = [];
  let current:Menu;
  for (let index in menus) {
    let menu:Menu =menus[index];
    if (menu.route && pathToRegexp(menu.route).exec(location.pathname)) {
      current = menus[index];
      break
    }
  }

  const getPathArray = (menuItem:Menu) => {
    if (menuItem) {
      pathArray.unshift(menuItem)
      if (menuItem.bpid) {
        let menus =queryArray(menus, menuItem.bpid, 'id');
        getPathArray(menus);
      }
    }
  }


  let paramMap = {}
  if (!current) {
    pathArray.push(menus[0] || {
      id: 1,
      icon: 'laptop',
      name: 'Dashboard',
    })
    pathArray.push({
      id: 404,
      name: 'Not Found',
    })
  } else {
    getPathArray(current)

    let keys = []
    let values = pathToRegexp(current.route, keys).exec(location.pathname.replace('#', ''))
    if (keys.length) {
      keys.forEach((currentValue, index) => {
        if (typeof currentValue.name !== 'string') {
          return
        }
        paramMap[currentValue.name] = values[index + 1]
      })
    }
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.icon
        ? <Icon type={item.icon} style={{ marginRight: 4 }} />
        : ''}{item.name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key)
          ? <Link to={pathToRegexp.compile(item.route || '')(paramMap) || '#'}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  )
}


export default Bread
