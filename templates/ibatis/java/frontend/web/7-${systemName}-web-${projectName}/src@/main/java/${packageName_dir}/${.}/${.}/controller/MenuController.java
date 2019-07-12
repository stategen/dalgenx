package ${packageName}.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.VisitCheck;
import org.stategen.framework.generator.util.ControllerHelpers;

import ${packageName}.domain.Menu;
import ${packageName}.domain.RoleMenu;
import ${packageName}.service.RoleMenuService;
import ${packageName}.service.RoleService;

@Controller
public class MenuController extends MenuControllerBase {
    
    @Resource
    private RoleService roleService;    
    
    @Resource
    private RoleMenuService roleMenuService;
    
    @Resource
    RequestMappingHandlerMapping requestMappingHandlerMapping;
    
    /***
     * 把controller以及controller中的method扫描到数据库
     * 
     * @return
     * @throws InstantiationException
     * @throws IllegalAccessException
     */
    @ApiRequestMappingAutoWithMethodName(name = "扫描系统菜单",method=RequestMethod.GET)
    @VisitCheck
    public List<Menu> scanMenus() throws InstantiationException, IllegalAccessException {
        List<Menu> allMenus = ControllerHelpers.genAllControllerMenus(Menu.class, requestMappingHandlerMapping);
        this.menuService.updateMenus(allMenus);
        return allMenus;
    }

    
    /***
     * 根据角色id查询查询菜单，以及菜单上对应的权限
     * 
     * @param roleId
     * @return
     */
    @ApiRequestMappingAutoWithMethodName(name = "获取角色")
    @VisitCheck
    public List<Menu> getAllMenusWithRoleChecked(String roleId){
        return this.roleService.getAllMenusWithRoleChecked(roleId);
    }

    
    @ApiRequestMappingAutoWithMethodName(name = "保存角色和菜单对应关系")
    @VisitCheck
    public List<RoleMenu> saveRoleMenus(List<RoleMenu> roleMenus){
       return this.roleMenuService.saveRoleMenus(roleMenus);
    }

}
