/* global window */
import config from '@utils/config';
import UserApis from "@i/apis/UserApis"
import SimpleResponse from "@i/beans/SimpleResponse";
import User from "@i/beans/User";
import AntdPageList from "@i/beans/AntdPageList";
import {userInitModel, UserModel, UserState} from "@i/interfaces/UserFaces";
import {abstractModel, Action, mergeObjects} from "@utils/DvaUtil";
import {userReducers, userEffects} from "@i/interfaces/UserFaces"
import {userDefaultModel} from "@i/models/UserDefaultModel";
import {userCustomState} from "@pages/user/UserCustomFaces";

const {prefix} = config;
const userModel: UserModel = userDefaultModel;
userInitModel.state = mergeObjects(userInitModel.state, userCustomState);

userModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen((location) => {
    if (location.pathname === userModel.pathname) {
      const payload = location.query || {page: 1, pageSize: 10};
      dispatch({
        type: userEffects.getUsers,
        payload,
      })
    }
  })
};

/*拓展一次，不然下面找不到 querySuccess*/
userModel.reducers.showModal = (state, {payload}) => {
  return {...state, ...payload, modalVisible: true}
};

userModel.reducers.hideModal = (state) => {
  return {...state, modalVisible: false}
};

userModel.reducers.switchIsMotion = (state) => {
  window.localStorage.setItem(`${'$'}{prefix}userIsMotion`, `${'$'}{!state.isMotion}`);
  return {...state, isMotion: !state.isMotion};
};

userModel.effects.getUsers = function* (action, {call, put, select}) {
  const antdPageList: AntdPageList<User> = yield call(UserApis.getUsers, action.payload);
  if (antdPageList) {
    yield put({
        type: userReducers.querySuccess,
        payload: antdPageList,
      }
    )
  }
}
;

userModel.effects.deleteUserById = function* ({payload}, {call, put, select}) {
  const simpleResponse: SimpleResponse = yield call(UserApis.deleteUserById, {userId: payload});
  if (simpleResponse.success) {
    const {selectedRowKeys} = yield select((_: UserState) => _.user);
    yield put({
      type: userModel.reducers.updateState,
      payload: {selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload)}
    })
  } else {
    throw simpleResponse.message
  }

}

userModel.effects.deleteUserByIds = function* ({payload}, {call, put}) {
  const simpleResponse: SimpleResponse = yield call(UserApis.deleteUserByIds, payload);
  if (simpleResponse.success) {
    yield put({type: userModel.reducers.updateState, payload: {selectedRowKeys: []}})
  } else {
    throw simpleResponse.message
  }
}

userModel.effects.createUser = function* ({payload}, {call, put}) {
  yield call(UserApis.createUser, payload)
  yield put({type: userModel.reducers.hideModal})

}

userModel.effects.patchUser = function* ({payload}, {select, call, put}) {
  const userId = yield select(({user: userState}) => userState.user.userId);
  const newUser = {...payload, userId}
  yield call(UserApis.patchUser, newUser)
  yield put({type: userModel.reducers.hideModal})
}

mergeObjects(abstractModel, userModel);

export default userModel;
