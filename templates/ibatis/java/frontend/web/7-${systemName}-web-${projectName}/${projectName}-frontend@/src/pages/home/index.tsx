import React from 'react'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { color } from '@utils/index'
import { NumberCard, Quote, Sales, Weather, RecentSales, Comments, Completed, Browser, Cpu, User } from './components'
import styles from './index.less'
import Page from "@components/Page/Page";
import {ConnectionPros} from "@utils/DvaUtil";
import StatesAlias from "@i/configs/${systemName?uncap_first}${projectName?cap_first}-statesAlias";
import {AppProps} from "@i/interfaces/AppFaces";
import {HomeProps} from "@i/interfaces/HomeFaces";

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}
type HomePageProps = AppProps & HomeProps;

function homePage ({ homeState, loading }:HomePageProps) {
  const {
    weather, sales, quote, numbers, recentSales, comments, completed, browser, cpu, user,
  } = homeState;

  const numberCards = numbers.map((item, key) => (<Col key={key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>))

  return (
    <Page loading={loading.models.home && sales.length === 0} className={styles.dashboard}>
      <Row gutter={24}>
        {numberCards}
        <Col lg={18} md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Sales data={sales} />
          </Card>
        </Col>
        <Col lg={6} md={24}>
          <Row gutter={24}>
            <Col lg={24} md={12}>
              <Card bordered={false}
                className={styles.weather}
                bodyStyle={{
                  padding: 0,
                  height: 204,
                  background: color.blue,
                }}
              >
                <Weather {...weather} loading={loading.effects['home/queryWeather']} />
              </Card>
            </Col>
            <Col lg={24} md={12}>
              <Card bordered={false}
                className={styles.quote}
                bodyStyle={{
                  padding: 0,
                  height: 204,
                  background: color.peach,
                }}
              >
                <Quote {...quote} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <RecentSales data={recentSales} />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <Comments data={comments} />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Completed data={completed} />
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <Browser data={browser} />
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <Cpu {...cpu} />
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}>
            <User {...user} />
          </Card>
        </Col>
      </Row>
    </Page>
  )
}




const mapStateToProps = (states: StatesAlias & ConnectionPros): HomePageProps => {
  const props: HomePageProps = {
    appState: states.app,
    homeState: states.home,
    loading: states.loading,
  }
  return props;
}

const HomePage = connect(mapStateToProps)(homePage);

export default HomePage;
