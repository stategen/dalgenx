import {routerRedux} from 'dva/router'
import {loginInitModel} from "@i/interfaces/LoginFaces";
import {LoginCommand, loginModel} from "@i/models/LoginModel";
import {appEffects} from "@i/interfaces/AppFaces";
import {HomeDispatch} from "@i/interfaces/HomeFaces";


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
    yield put(HomeDispatch.route())
  }
};

export default loginModel;
