import React, {Component} from 'react'
import {connect} from 'dva';
import {InputItem, Button, WhiteSpace, WingBlank, NoticeBar} from 'antd-mobile'
import Carousel from './components/Carousel'
import Card from '@/components/Card'
import img from '@/images/moon.png'
import {AppProps} from "@i/interfaces/AppFaces";
import {HomeProps} from "@i/interfaces/HomeFaces";
import StatesAlias from "@i/configs/tradeApp-statesAlias";
import {ConnectionPros} from "@utils/DvaUtil";
import Footer from "@components/tabs";

type HomePageProps = AppProps & HomeProps;

const homePage = (props: HomePageProps) => {
  const dispatch = props.dispatch;
  const pathname = props.location;

  const
    title = '欢迎来到StateGen'
  const cardList = [
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
    {title: '团员中秋', src: img},
  ]
  return (
    <>
      <div className="page">
        <NoticeBar marqueeProps={{loop: true, text: title, style: {padding: '0 7.5px'}}}>
        </NoticeBar>
        <Carousel/>
        <Card list={cardList}/>
      </div>
      <Footer selectedIndex={0}/>
    </>
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
