/**
 *  Do not remove this unless you get business authorization.
 *  App
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {
  Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, ConnectionPros, Subscriptions, Reducer, AreaState,
  mergeObjects, RouteOrders
} from '@utils/DvaUtil';
import Menu from "@i/beans/Menu";
import SimpleResponse from "@i/beans/SimpleResponse";
import User from "@i/beans/User";
import {AppState} from '@i/interfaces/AppFaces';

/*** keep this export */
export const appCustomState = {
  routeOrders:<RouteOrders>{},
  locationPathname:null,
}

/*** keep this export */
export interface AppCustomSubscriptions extends Subscriptions {
  setupHistory,
}

/*** keep this export */
export interface AppCustomEffects extends Effects {
  appendRoute,

}

/*** keep this export */
export interface AppCustomReducers extends Reducers<AppState> {
  removeRoute,
}

