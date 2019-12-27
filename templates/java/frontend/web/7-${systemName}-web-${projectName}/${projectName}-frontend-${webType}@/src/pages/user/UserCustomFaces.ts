/**
 *  Do not remove this unless you get business authorization.
 *  User
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {Effect, Effects, Reducers, Subscriptions} from '@utils/DvaUtil';
import AntdPageList from "@i/beans/AntdPageList";
import {PaginationProps} from 'antd/es/pagination';
import StatusEnum from "@i/enums/StatusEnum";
import User from "@i/beans/User";
import {UserState} from '@i/interfaces/UserFaces';

/*** keep this export */
export const userCustomState = {

}

/*** keep this export */
export interface UserCustomSubscriptions extends Subscriptions {

}

/*** keep this export */
export interface UserCustomEffects extends Effects {

}

/*** keep this export */
export interface UserCustomReducers extends Reducers<UserState> {

}
