import {routerRedux} from 'dva/router'
import {loginInitModel} from "@i/interfaces/LoginFaces";
import {LoginCommand, loginDefaultModel} from "@i/models/LoginDefaultModel";
import {DashboardDispatch} from "@i/interfaces/DashboardFaces";
import {RouterAction} from "react-router-redux";
import SimpleResponse from "@i/beans/SimpleResponse";
import LoginApis from "@i/apis/LoginApis";
import {appEffects} from "@i/interfaces/AppFaces";
// import { login } from './service'

const loginModel = loginDefaultModel;

//重写login effect
loginModel.effects.login = function* ({payload}, {put, call, select}) {
  yield LoginCommand.login_effect({payload}, {put, call, select});
  const locationQuery = yield select(_ => _.app.locationQuery);
  let from = null;
  if (locationQuery) {
    from = locationQuery.from;
  }
  yield put({type: appEffects.setup})
  if (from && from !== loginInitModel.pathname) {
    yield put(routerRedux.push(from))
  } else {
    yield put(DashboardDispatch.route())
  }
};

export default loginModel;


// export default {
//   namespace: 'login',
//
//   state: {},
//
//   effects: {
//     * login({payload,}: RouterAction, {put, call, select}: EffectsCommandMap) {
//       const simpleResponse: SimpleResponse = yield call(LoginApis.login, payload);
//       if (simpleResponse.success) {
//         const {locationQuery} = yield select(_ => _.app)
//         const {from} = locationQuery
//         yield put({type: appEffects.setup})
//         if (from && from !== loginInitModel.pathname) {
//           yield put(routerRedux.push(from))
//         } else {
//           yield put(routerRedux.push('/dashboard'))
//         }
//       } else {
//         throw simpleResponse.message;
//       }
//     },
//   },
//
// }
