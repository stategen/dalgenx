import React, { Component } from 'react'
import classnames from 'classnames'
import Loader from '../Loader/Loader'
import styles from './Page.less'

export default class Page extends Component {
  render () {
    const {
      className, children, loading = false, inner = false,
    } = this.props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
    }
    return (
      <div
        className={classnames(className, {
          [styles.contentInner]: inner,
        })}
        style={loading ? loadingStyle : null}
      >
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    )
  }
}
