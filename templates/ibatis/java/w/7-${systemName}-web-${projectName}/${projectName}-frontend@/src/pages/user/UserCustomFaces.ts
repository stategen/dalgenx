/** ---
 *  用户
 *  created by progen ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 progen代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, BaseProps, Subscriptions, Reducer, AreaState, mergeObjects} from '@utils/DvaUtil';
import AntdPageList from "@i/beans/AntdPageList";
import SimpleResponse from "@i/beans/SimpleResponse";
import User from "@i/beans/User";
import {UserState} from '@i/interfaces/UserFaces';
import config from "@utils/config";

const {prefix} = config;

export const userCustomState = {
  user: <User>{},
  users: [],
  modalVisible: false,
  modalType: "",
  selectedRowKeys: [],
  isMotion: window.localStorage.getItem(`${'$'}{prefix}userIsMotion`) === 'true',
}

export interface UserCustomSubscriptions extends Subscriptions {

}

export interface UserCustomEffects extends Effects {

}

export interface UserCustomReducers extends Reducers<UserState> {

}
