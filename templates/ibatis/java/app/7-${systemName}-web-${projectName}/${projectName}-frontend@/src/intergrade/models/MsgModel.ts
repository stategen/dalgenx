/**
 *  Do not remove this unless you get business authorization.
 *  Msg
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {msgInitModel, MsgModel, MsgState} from "../interfaces/MsgFaces";
import MsgApis from "../apis/MsgApis";
import {updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";


export class MsgCommand extends BaseCommand {
}

export const msgModel: MsgModel = msgInitModel;
