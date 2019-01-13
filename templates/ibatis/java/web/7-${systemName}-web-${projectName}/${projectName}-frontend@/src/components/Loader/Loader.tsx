import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Loader.less'

interface LoaderProps {
  spinning?: boolean,
  fullScreen?: boolean,
}

const Loader = ({spinning, fullScreen}: LoaderProps) => {
  return (<div className={classNames(styles.loader, {
    [styles.hidden]: !spinning,
    [styles.fullScreen]: fullScreen,
  })}
  >
    <div className={styles.warpper}>
      <div className={styles.inner}/>
      <div className={styles.text}>LOADING</div>
    </div>
  </div>)
}

export default Loader
