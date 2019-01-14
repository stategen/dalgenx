import React from 'react'
import {Spin} from 'antd'
import styles from './weather.less'

interface WeatherPropTypes {
  city: string,
  icon: string,
  dateTime: string,
  temperature: string,
  name: string,
  loading: boolean,
}

function Weather({
                   city, icon, dateTime, temperature, name, loading,
                 }: WeatherPropTypes) {
  return (
    <Spin spinning={loading}>
      <div className={styles.weather}>
        <div className={styles.left}>
          <div className={styles.icon}
               style={{
                 backgroundImage: `url(${'${'}icon})`,
               }}
          />
          <p>{name}</p>
        </div>
        <div className={styles.right}>
          <h1 className={styles.temperature}>{`${'${'}temperature}°`}</h1>
          <p className={styles.description}>{city},{dateTime}</p>
        </div>
      </div>
    </Spin>)
}

export default Weather
