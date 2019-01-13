/**
 *  Do not remove this unless you get business authorization.
 *  Login
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {loginInitModel, LoginModel, LoginState} from "../interfaces/LoginFaces";
import LoginApis from "../apis/LoginApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import SimpleResponse from "../beans/SimpleResponse";


export class LoginCommand extends BaseCommand {

  /**  */
  static * login_effect({payload}, {call, put, select}) {
    const simpleResponse: SimpleResponse = yield call(LoginApis.login, payload);
    if (simpleResponse && !simpleResponse.success) {
      throw simpleResponse.message;
    }

    const newPayload: LoginState = {
      ...payload,
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static login_success_type(payload) {
    return {type: "login_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static login_success_reducer = (state: LoginState, payload): LoginState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const loginModel: LoginModel = loginInitModel;

/**  */
loginModel.effects.login = function* ({payload}, {call, put, select}) {
  const newPayload = yield LoginCommand.login_effect({payload}, {call, put, select});
  yield put(LoginCommand.login_success_type(newPayload));
};

loginModel.reducers.login_success = (state: LoginState, {payload}): LoginState => {
  return LoginCommand.login_success_reducer(state, payload);
};
