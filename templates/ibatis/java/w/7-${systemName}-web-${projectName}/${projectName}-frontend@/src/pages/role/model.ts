/**
 *  Do not remove this unless you get business authorization.
 *  Role
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import {mergeObjects} from "@utils/DvaUtil";
import {roleDefaultModel} from "@i/models/RoleDefaultModel";
import {RoleModel} from "@i/interfaces/RoleFaces";
import RoleApis from "@i/apis/RoleApis";
import {roleCustomState} from './RoleCustomFaces';
import AntdPageList from "@i/beans/AntdPageList";
import Role from "@i/beans/Role";
import RoleType from "@i/enums/RoleType";
import SimpleResponse from "@i/beans/SimpleResponse";

const roleModel: RoleModel = roleDefaultModel;
roleModel.state=mergeObjects(roleModel.state,roleCustomState);

export default roleModel;