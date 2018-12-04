/** ---
 *
 *  created by progen ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 progen代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Subscriptions, Reducer, AreaState, mergeObjects} from '@utils/DvaUtil';
import Menu from "@i/beans/Menu";
import SimpleResponse from "@i/beans/SimpleResponse";
import User from "@i/beans/User";
import {AppState} from '@i/interfaces/AppFaces';
import config from "@utils/config";
import {number} from "prop-types";

const {prefix} = config;
export interface Permission {
  visit: number[];
}

export interface RouteOrders{
  [route:string]:number
}
export const appCustomState = {
  routeOrders:<RouteOrders>{},

  permission: <Permission>{
    visit: [],
  },
  dashboardMenu: <Menu>{},
  menuPopoverVisible: false,
  siderFold: JSON.parse(window.localStorage.getItem(`${'$'}{prefix}siderFold`)) === 'true',
  darkTheme: JSON.parse(window.localStorage.getItem(`${'$'}{prefix}darkTheme`)) === 'true',
  isNavbar: document.body.clientWidth < 769,
  navOpenKeys: JSON.parse(window.localStorage.getItem(`${'$'}{prefix}navOpenKeys`)) || [],
  locationPathname: '',
  locationQuery: {from:null},
}

export interface AppCustomSubscriptions extends Subscriptions {

}

export interface AppCustomEffects extends Effects {
  changeNavbar,
  appendRoute,
}

export interface AppCustomReducers extends Reducers<AppState> {
  switchMenuPopver,
  handleNavbar,
  switchSider,
  switchTheme,
  handleNavOpenKeys,
  removeRoute,
}


