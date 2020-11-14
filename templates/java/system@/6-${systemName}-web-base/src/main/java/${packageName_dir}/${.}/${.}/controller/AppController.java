package ${packageName}.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.enums.DataOpt;
import org.stategen.framework.lite.SimpleResponse;
import org.stategen.framework.lite.enums.MenuType;
import org.stategen.framework.util.CollectionUtil;
import org.stategen.framework.util.StringUtil;
import org.stategen.framework.web.cookie.CookieGroup;
import ${packageName}.enums.CookieType.Login.LoginCookieNames;
<#if role>
import ${packageName}.domain.Menu;
import ${packageName}.domain.User;

import ${packageName}.service.MenuService;
import ${packageName}.service.UserService;
</#if>

import io.swagger.annotations.ApiParam;

@ApiConfig(menu = false)
@RequestMapping("/api/app")
@Wrap
public class AppController {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(AppController.class);

    @Resource
    private CookieGroup<LoginCookieNames> loginCookieGroup;
<#if role>
    @Resource(name = "userService")
    private UserService userService;

    @Resource
    private MenuService menuService;



    @ApiRequestMappingAutoWithMethodName(name = "")
    @State(area = User.class)
    public SimpleResponse logout(HttpServletResponse response) {
        loginCookieGroup.expireAllCookies();
        return new SimpleResponse(true, "退出成功");
    }

    @ApiRequestMappingAutoWithMethodName(name = "")
    @State(init = true, initCheck = false, dataOpt = DataOpt.FULL_REPLACE)
    public User getCookieUser() {
        String userId = this.loginCookieGroup.getCookieValue(LoginCookieNames.userId);
        if (StringUtil.isEmpty(userId)) {
            return null;
        }

        User user = this.userService.getUserByUserId(userId);
        if (user == null) {
            return null;
        }

        List<Long> visitsIds = this.menuService.getMenusByUserId(user.getUserId(), MenuType.MENU);
        user.setVisitsIds(visitsIds);
        return user;
    }

    @ApiRequestMappingAutoWithMethodName(name = "获所所有菜单",method=RequestMethod.GET)
    @State(init = true, initCheck = false, dataOpt = DataOpt.FULL_REPLACE)
    public List<Menu> getAllMenus() {
        return this.menuService.getAllMenus();
    }



    @ApiRequestMappingAutoWithMethodName(name = "获取用户")
    public List<User> getUserOptions(@RequestParam(required = false, name = "userIds") ArrayList<String> userIds){
        return null;
    }
</#if>

}
