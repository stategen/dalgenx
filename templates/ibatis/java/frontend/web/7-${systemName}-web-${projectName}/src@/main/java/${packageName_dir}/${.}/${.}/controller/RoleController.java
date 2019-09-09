package ${packageName}.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.GenForm;
import org.stategen.framework.annotation.HideAreaEditorModal;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.VisitCheck;
import org.stategen.framework.enums.DataOpt;
import org.stategen.framework.lite.AntdPageList;
import org.stategen.framework.lite.PageList;
import org.stategen.framework.lite.Pagination;
import org.stategen.framework.util.DatetimeUtil;

import ${packageName}.domain.Role;
import ${packageName}.enums.RoleType;

import io.swagger.annotations.ApiParam;

@ApiConfig(name = "角色设置")
public class RoleController extends RoleControllerBase {
    


    @ApiRequestMappingAutoWithMethodName(name = "角色分页列表,多条件", method = RequestMethod.POST)
    @VisitCheck
    @State(init = true, dataOpt = DataOpt.FULL_REPLACE)
    @HideAreaEditorModal
    @GenForm
    public AntdPageList<Role> getRolePageList(@ApiParam() @RequestParam(required = false, name = "roleIds") ArrayList<String> roleIds,
                                                            @ApiParam() String roleNameLike, @ApiParam() String descriptionLike,
                                                            @ApiParam() Date createTimeMin, @ApiParam() Date createTimeMax,
                                                            @ApiParam() Date updateTimeMin, @ApiParam() Date updateTimeMax,
                                                            @ApiParam() @RequestParam(required = false, name = "roleTypes") ArrayList<RoleType> roleTypes,
                                                            @ApiParam() Date showDateMin, @ApiParam() Date showDateMax, @ApiParam() Date showTimeMin,
                                                            @ApiParam() Date showTimeMax, @ApiParam() Date showDateTimeMin,
                                                            @ApiParam() Date showDateTimeMax, @ApiParam(hidden = true) Role role,
                                                            Pagination pagination

    ) {
        if (createTimeMax == null) {
            role.setCreateTimeMax(DatetimeUtil.current());
        }
        //技巧，api参数 .在dao中已自动化生成,getRolePageList 帮助文件中 点开See also直接复制过来，
        PageList<Role> rolePageList = this.roleService.getPageList(role, pagination.getPageSize(), pagination.getPage());
        return AntdPageList.create(rolePageList);
    }

    @ApiRequestMappingAutoWithMethodName(name = "创建角色", method = RequestMethod.POST)
    @VisitCheck
    @HideAreaEditorModal
    @State()
    @GenForm
    public Role insert(@ApiParam() String roleId,
                       @ApiParam() String roleName,
                       @ApiParam() String description,
                       @ApiParam() String roleType
                       ,@ApiParam(hidden = true) Role role) {
        this.roleService.insert(role);
        role = this.roleService.getRoleByRoleId(role.getRoleId());
        return role;
    }

    @ApiRequestMappingAutoWithMethodName(name = "更新角色", method = RequestMethod.POST)
    @VisitCheck
    @HideAreaEditorModal
    @State()
    @GenForm
    public Role update(@ApiParam() String roleName,
                       @ApiParam() String description,
                       @ApiParam() String roleType,
                       @ApiParam() String roleId
                       ,@ApiParam(hidden = true) Role role) {
        this.roleService.update(role);
        role = this.roleService.getRoleByRoleId(role.getRoleId());
        return role;
    }

    @ApiRequestMappingAutoWithMethodName(name = "删除角色", method = RequestMethod.POST)
    @VisitCheck
    @State(dataOpt = DataOpt.DELETE_IF_EXIST, area = Role.class)
    public String delete(String roleId) {
        this.roleService.delete(roleId);
        return roleId;
    }

    @ApiRequestMappingAutoWithMethodName(name = "批量删除角色", method = RequestMethod.POST)
    @VisitCheck
    @State(dataOpt = DataOpt.DELETE_IF_EXIST, area = Role.class)
    public List<String> deleteByRoleIds(@RequestParam("roleIds") ArrayList<String> roleIds) {
        this.roleService.deleteByRoleIds(roleIds);
        return roleIds;
    }



}
