import {mergeObjects, abstractModel} from "@utils/DvaUtil";
import {user$userIdInitModel, User$userIdModel} from "@i/interfaces/User$userIdFaces";
import {user$userIdEffects, user$userIdReducers} from "@i/interfaces/User$userIdFaces";
import User$userIdApis from "@i/apis/User$userIdApis";
import User from "@i/beans/User";
import pathToRegexp from "path-to-regexp";
import {user$userIdCustomState} from "@pages/user/$userId/User$userIdCustomFaces";

const user$userIdModel: User$userIdModel = <User$userIdModel>user$userIdInitModel;
user$userIdInitModel.state = mergeObjects(user$userIdInitModel.state, user$userIdCustomState);

user$userIdModel.reducers.querySuccess = (state, {payload}) => {
  const {user} = payload
  return {
    ...state,
    user,
  }
};

user$userIdModel.effects.getUserById = function* ({payload}, {call, put, select}) {
  const user: User = yield call(User$userIdApis.getUserById, payload);
  if (user) {
    yield put({
      type: user$userIdReducers.querySuccess,
      payload: {
        user,
      },
    })
  }
}


user$userIdModel.subscriptions.setup = ({dispatch, history}) => {
  history.listen(({pathname}) => {
    const match = pathToRegexp(user$userIdModel.pathname).exec(pathname)
    if (match) {
      dispatch({type: user$userIdEffects.getUserById, payload: {userId: match[1]}})
    }
  })
};


/*mergeObjects(abstractModel, user$userIdModel);*/

export default user$userIdModel;
