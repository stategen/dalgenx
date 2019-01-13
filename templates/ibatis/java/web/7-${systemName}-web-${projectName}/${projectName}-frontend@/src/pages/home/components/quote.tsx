import React from 'react'
import styles from './quote.less'

interface  QuotePropTypes  {
  name: string,
  content: string,
  title: string,
  avatar: string,
}


function Quote ({
  name, content, title, avatar,
}:QuotePropTypes) {
  return (
    <div className={styles.quote}>
      <div className={styles.inner}>
        {content}
      </div>
      <div className={styles.footer}>
        <div className={styles.description}>
          <p>-{name}-</p>
          <p>{title}</p>
        </div>
        <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />
      </div>
    </div>
  )
}


export default Quote
