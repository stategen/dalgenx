/**
 *  Do not remove this unless you get business authorization.
 *  tradeCms states alias
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {RoleState} from "../interfaces/RoleFaces";
import {UserState} from "../interfaces/UserFaces";
import {HomeState} from "../interfaces/HomeFaces";
import {LoginState} from "../interfaces/LoginFaces";
import {Bbs_topicState} from "../interfaces/Bbs_topicFaces";
import {AppState} from "../interfaces/AppFaces";
import {User_$userIdState} from "../interfaces/User_$userIdFaces";

export default interface StatesAlias {
  role: RoleState;
  user: UserState;
  home: HomeState;
  login: LoginState;
  bbs_topic: Bbs_topicState;
  app: AppState;
  user_$userId: User_$userIdState;
}