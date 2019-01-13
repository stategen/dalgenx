/**
 *  Do not remove this unless you get business authorization.
 *  Home
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {mergeObjects} from "@utils/DvaUtil";
import {homeModel} from "@i/models/HomeModel";
import {HomeModel} from "@i/interfaces/HomeFaces";
import HomeApis from "@i/apis/HomeApis";
import {homeCustomState} from './HomeCustomFaces';

homeModel.state=mergeObjects(homeModel.state,homeCustomState);

export default homeModel;
