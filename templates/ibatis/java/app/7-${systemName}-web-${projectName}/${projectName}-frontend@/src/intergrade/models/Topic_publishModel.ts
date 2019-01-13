/**
 *  Do not remove this unless you get business authorization.
 *  Topic_publish
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {topic_publishInitModel, Topic_publishModel, Topic_publishState} from "../interfaces/Topic_publishFaces";
import Topic_publishApis from "../apis/Topic_publishApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
import Topic from "../beans/Topic";
import TopicType from "../enums/TopicType";


export class Topic_publishCommand extends BaseCommand {

  /**  */
  static * saveTopic_effect({payload}, {call, put, select}) {
    const topic: Topic = yield call(Topic_publishApis.saveTopic, payload);

    const newPayload: Topic_publishState = {
      topicArea: {
        list: topic ? [topic] : [],
        ...payload ? payload.areaExtraProps__ : null,
      },
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  static saveTopic_success_type(payload) {
    return {type: "saveTopic_success", payload: payload};
  }

  /**   成功后 更新状态*/
  static saveTopic_success_reducer = (state: Topic_publishState, payload): Topic_publishState => {
    return mergeObjects(
      state,
      payload,
    );
  };
}

export const topic_publishModel: Topic_publishModel = topic_publishInitModel;

/**  */
topic_publishModel.effects.saveTopic = function* ({payload}, {call, put, select}) {
  const newPayload = yield Topic_publishCommand.saveTopic_effect({payload}, {call, put, select});
  yield put(Topic_publishCommand.saveTopic_success_type(newPayload));
};

topic_publishModel.reducers.saveTopic_success = (state: Topic_publishState, {payload}): Topic_publishState => {
  return Topic_publishCommand.saveTopic_success_reducer(state, payload);
};
