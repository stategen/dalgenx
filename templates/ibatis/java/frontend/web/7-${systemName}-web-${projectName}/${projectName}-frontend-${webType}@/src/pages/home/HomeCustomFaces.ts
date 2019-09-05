/**
 *  Do not remove this unless you get business authorization.
 *  Home
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, BaseProps, Subscriptions, Reducer, AreaState, mergeObjects} from '@utils/DvaUtil';
import {HomeState} from '@i/interfaces/HomeFaces';

/*** keep this export */
export const homeCustomState = {
    weather: {
      city: '深圳',
      temperature: '30',
      name: '晴',
      icon: '//s5.sencdn.com/web/icons/3d_50/2.png',
    },
    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
}

/*** keep this export */
export interface HomeCustomSubscriptions extends Subscriptions {

}

/*** keep this export */
export interface HomeCustomEffects extends Effects {

}

/*** keep this export */
export interface HomeCustomReducers extends Reducers<HomeState> {

}
