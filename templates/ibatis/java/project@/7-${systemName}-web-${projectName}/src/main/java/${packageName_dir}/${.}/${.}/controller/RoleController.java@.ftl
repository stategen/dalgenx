package ${packageName}.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.HideAreaEditorModal;
import org.stategen.framework.annotation.ShowEditorModal;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.StateExtraProp;
import org.stategen.framework.annotation.VisitCheck;
import org.stategen.framework.enums.StateOperation;
import org.stategen.framework.lite.AntdPageList;
import org.stategen.framework.lite.PageList;
import org.stategen.framework.lite.Pagination;
import org.stategen.framework.util.DatetimeUtil;

import ${packageName}.domain.Role;
import ${packageName}.enums.RoleType;

import io.swagger.annotations.ApiParam;

@ApiConfig(name = "角色设置", breadParent = DashboardController.class)
public class RoleController extends RoleControllerBase {


    @ApiRequestMappingAutoWithMethodName(name = "角色分页列表,多条件", method = RequestMethod.POST,genForm=true)
    @VisitCheck
    @State(init = true, operation = StateOperation.FULL_REPLACE)
    @HideAreaEditorModal
    public AntdPageList<Role> getRolePageListByDefaultQuery(@ApiParam()@RequestParam(required =false,name="roleIds") ArrayList<String> roleIds,
                                                            @ApiParam() String roleNameLike,
                                                            @ApiParam() String descriptionLike,
                                                            @ApiParam() Date createTimeMin,
                                                            @ApiParam() Date createTimeMax,
                                                            @ApiParam() Date updateTimeMin,
                                                            @ApiParam() Date updateTimeMax,
                                                            @ApiParam()@RequestParam(required =false,name="roleTypes") ArrayList<RoleType> roleTypes,
                                                            @ApiParam() Date showDateMin,
                                                            @ApiParam() Date showDateMax,
                                                            @ApiParam() Date showTimeMin,
                                                            @ApiParam() Date showTimeMax,
                                                            @ApiParam() Date showDateTimeMin,
                                                            @ApiParam() Date showDateTimeMax,
                                                            @ApiParam(hidden = true) Role role,
                                                            @ApiParam(hidden = true) Pagination pagination

) {
        if (createTimeMax==null){
            role.setCreateTimeMax(DatetimeUtil.current());
        }
        //技巧，api参数 .在dao中已自动化生成,从以下getRolePageListByDefaultQuery 帮助文件中 点开See also直接复制过来，
        PageList<Role> rolePageList = this.roleService.getRolePageListByDefaultQuery(role, pagination.getPageSize(), pagination.getPage());
        return AntdPageList.create(rolePageList);
    }

    @ApiRequestMappingAutoWithMethodName(name = "创建角色", method = RequestMethod.POST)
    @VisitCheck
    @HideAreaEditorModal
    @State()
    public Role insert(Role role) {
        this.roleService.insert(role);
        role = this.roleService.getRoleByRoleId(role.getRoleId());
        return role;
    }

    @ApiRequestMappingAutoWithMethodName(name = "更新角色", method = RequestMethod.POST)
    @VisitCheck
    @HideAreaEditorModal
    @State()
    public Role update(Role role) {
        this.roleService.update(role);
        role = this.roleService.getRoleByRoleId(role.getRoleId());
        return role;
    }

    @RequestMapping(value = "path", method = RequestMethod.GET)
    public String get(Role model) {

        // TODO Auto generated method stub
        return null;
    }

    //    @ApiRequestMappingAutoWithMethodName(name = "批量保存角色", method = RequestMethod.GET)
    //    @VisitCheck
    //    public List<Role> saveRoles(List<Role> roles){
    //        this.roleService.saveRoles(roles);
    //        return roles;
    //    }
    @ApiRequestMappingAutoWithMethodName(name = "删除角色", method = RequestMethod.POST)
    @VisitCheck
    @State(operation = StateOperation.DELETE_IF_EXIST, area = Role.class)
    public String delete(String roleId) {
        this.roleService.delete(roleId);
        return roleId;
    }

    @ApiRequestMappingAutoWithMethodName(name = "批量删除角色", method = RequestMethod.POST)
    @VisitCheck
    @State(operation = StateOperation.DELETE_IF_EXIST, area = Role.class)
    public List<String> deleteByRoleIds(@RequestParam("roleIds") ArrayList<String> roleIds) {
        this.roleService.deleteByRoleIds(roleIds);
        return roleIds;
    }

    @ApiRequestMappingAutoWithMethodName(name = "打开role对话框", method = RequestMethod.POST)
    @ShowEditorModal
    @State(genEffect = false, area = Role.class)
    public void showRoleModal() {

    }

    @ApiRequestMappingAutoWithMethodName(name = "关闭role对话框", method = RequestMethod.POST)
    @StateExtraProp(StateExtraProp.ALL_MODAL_VISIBLE_FALSE)
    @HideAreaEditorModal
    @State(genEffect = false, area = Role.class)
    public void hideRoleModal() {
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //    /***
    //     * 把controller以及controller中的method扫描到数据库
    //     * 
    //     * @return
    //     * @throws InstantiationException
    //     * @throws IllegalAccessException
    //     */
    //    @ApiRequestMappingAutoWithMethodName(name = "扫描系统菜单", method = RequestMethod.GET)
    //    @VisitCheck
    //    public List<Menu> scanMenus() throws InstantiationException, IllegalAccessException {
    //        List<Menu> allMenus = ControllerHelpers.genAllControllerMenus(Menu.class, requestMappingHandlerMapping);
    //        this.menuService.updateMenus(allMenus);
    //        return allMenus;
    //    }
    //
    //    
    //    /***
    //     * 根据角色id查询查询菜单，以及菜单上对应的权限
    //     * 
    //     * @param roleId
    //     * @return
    //     */
    //    @ApiRequestMappingAutoWithMethodName(name = "获取角色", method = RequestMethod.GET)
    //    @VisitCheck
    //    public List<Menu> getAllMenusWithRoleChecked(String roleId){
    //        return this.roleService.getAllMenusWithRoleChecked(roleId);
    //    }
    //    
    //    @ApiRequestMappingAutoWithMethodName(name = "保存角色", method = RequestMethod.POST)
    //    @VisitCheck
    //    public Role saveRole(Role role){
    //        return this.roleService.saveRole(role);
    //    }
    //    
    //    @ApiRequestMappingAutoWithMethodName(name = "保存角色和菜单对应关系", method = RequestMethod.POST)
    //    @VisitCheck
    //    public List<RoleMenu> saveRoleMenus(List<RoleMenu> roleMenus){
    //       return this.roleMenuService.saveRoleMenus(roleMenus);
    //    }

}
