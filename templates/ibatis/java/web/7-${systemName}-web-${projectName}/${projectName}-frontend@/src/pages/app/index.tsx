/* global window */
/* global document */
import React from 'react'
import NProgress from 'nprogress'
import pathToRegexp from 'path-to-regexp'
import {connect} from 'dva'
import {Loader, MyLayout} from '@components/index'
import {BackTop, Layout} from 'antd'
import {classnames, config} from '@utils/index'
import {Helmet} from 'react-helmet'
import {withRouter} from 'dva/router'
import Error from '@pages/404'
import 'themes/index.less'
import './index.less'
import {AppDispatch, appEffects, appInitModel, AppProps, appReducers, AppState} from "@i/interfaces/AppFaces";
import {Tabs, Icon} from 'antd';
import {ConnectionPros, DvaTabPaneProps, makeMap} from "@utils/DvaUtil";
import Menu, {MenuFields} from "@i/beans/Menu";
import {TabsProps} from "antd/lib/tabs";
import Link from "umi/link";
import {routerRedux} from 'dva/router'
import {ForkOptions} from "child_process";
import * as queryString from "querystring";
import {loginInitModel} from "@i/interfaces/LoginFaces";
import User from "@i/beans/User";
import RouteUtil from "@utils/RouteUtil";
import UIUtil from "@utils/UIUtil";

const {Content, Footer, Sider} = Layout;
const {Header, styles} = MyLayout;
const {prefix, openPages} = config;
const TabPane = Tabs.TabPane;


let lastHref

const App = ({children, dispatch, appState, loading, location}: AppProps & ConnectionPros) => {

  const {siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, dashboardMenu, permission}:AppState = appState;
  const user: User = appState.userArea.list[0] || {};
  const menus = appState.menuArea.list;

  let {pathname} = location;

  const {iconFontJS, iconFontCSS, logo} = config;

  const current = RouteUtil.filterMenuByPathname(pathname, menus);

  const hasPermission = current ? permission.visit.includes(current.menuId) : false;
  const {href} = window.location;

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menus,
    user,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({type: appReducers.switchMenuPopver})
    },
    logout() {
      dispatch(AppDispatch.logout_effect())
    },
    switchSider() {
      dispatch({type: appReducers.switchSider})
    },
    changeOpenKeys(openKeys) {
      dispatch({type: appReducers.handleNavOpenKeys, payload: {navOpenKeys: openKeys}})
    },
  }

  const siderProps = {
    menus,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme() {
      dispatch({type: appReducers.switchTheme})
    },
    changeOpenKeys(openKeys) {
      window.localStorage.setItem(`${'$'}{prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({type: appReducers.handleNavOpenKeys, payload: {navOpenKeys: openKeys}})
    },
  }

  const breadProps = {
    menus,
    location,
  }

  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader fullScreen spinning={loading.effects[appEffects.setup.toString()]}/>
      {children}
    </div>)
  }

  const activeRoute = current ? current.route : dashboardMenu.route;
  const opendOrders = appState.routeOrders;
  const hasOpenedMenus = menus.filter((menu) => menu.route && opendOrders[menu.route]);
  let TabsPage = null;
  if (hasOpenedMenus) {
    hasOpenedMenus.sort((a: Menu, b: Menu) => {
      const order1 = opendOrders[a.route];
      const order2 = opendOrders[b.route];
      return order1 - order2;
    });

    const tabPanes = hasOpenedMenus.map((menu: Menu) => {
      const panelPros: DvaTabPaneProps = {
        tab: UIUtil.buildLink(menu),
        key: menu.route,
        closable: menu.menuId != dashboardMenu.menuId,
      };
      return <TabPane {...panelPros}></TabPane>;
    });


    const onEdit = (targetKey, action) => {
      if (action === 'remove') {
        const preMaxRoute = RouteUtil.checkAndGetPreOrder(appState.routeOrders, targetKey);
        const menuRouteMap = makeMap(menus, MenuFields.route);
        const preMenu: Menu = menuRouteMap[preMaxRoute];
        const theMenu =preMenu|| dashboardMenu;
        dispatch(routerRedux.push({
          pathname: theMenu.route,
        }));

        dispatch({
          type: appReducers.removeRoute,
          payload: targetKey,
        })
      }
    }

    if (tabPanes.length) {
      const tabsProps: TabsProps = {
        hideAdd: true,
        type: "editable-card",
        activeKey: activeRoute,
        onEdit,
      }

      TabsPage = () => (<Tabs
        {...tabsProps}
      >
        {tabPanes}
      </Tabs>)
    }
  }
  return (
    <div>
      <Loader fullScreen spinning={loading.effects[appEffects.setup.toString()]}/>
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href={logo} type="image/x-icon"/>
        {iconFontJS && <script src={iconFontJS}/>}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS}/>}
      </Helmet>

      <Layout className={classnames({[styles.dark]: darkTheme, [styles.light]: !darkTheme})}>
        {!isNavbar && <Sider
          trigger={null}
          collapsible
          collapsed={siderFold}
        >
          {siderProps.menus.length === 0 ? null : <MyLayout.Sider {...siderProps} />}
        </Sider>}
        <Layout style={{height: '100vh', overflow: 'scroll'}} id="mainContainer">
          <BackTop target={() => document.getElementById('mainContainer')}/>
          <Header {...headerProps} />
          <Content>
            {/*<Bread {...breadProps} />*/}
            {TabsPage && <TabsPage/>}
            {hasPermission ? children : <Error/>}
          </Content>
          <Footer>
            {config.footerText}
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}


export default withRouter(connect(({app: appState, loading}) => ({appState, loading}))(App))
