package ${packageName}.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.enums.DataOpt;
import org.stategen.framework.lite.SimpleResponse;
import org.stategen.framework.lite.enums.MenuType;
import org.stategen.framework.util.StringUtil;
import org.stategen.framework.web.cookie.CookieGroup;

import ${packageName}.domain.Menu;
import ${packageName}.domain.User;
import ${packageName}.service.MenuService;
import ${packageName}.service.UserService;

@ApiConfig(menu = false)
@RequestMapping("/api/app")
public class AppController {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(UserController.class);
    final static String USER_ID = "userId";

    @Resource
    private CookieGroup baseCookieGroup;

    @Resource(name = "userService")
    private UserService userService;

    @Resource
    private MenuService menuService;

    @ApiRequestMappingAutoWithMethodName(name = "", method = RequestMethod.GET)
    public SimpleResponse logout(HttpServletResponse response) {
        baseCookieGroup.expireAllCookies();
        return new SimpleResponse(true, "退出成功");
    }

    @ApiRequestMappingAutoWithMethodName(name = "", method = RequestMethod.GET)
    @State(init = true, initCheck = false, operation = StateOperation.FULL_REPLACE)
    public User getCookieUser() {
        String userId = this.baseCookieGroup.getCookieValue(USER_ID);
        if (StringUtil.isEmpty(userId)) {
            return null;
        }

        User user = this.userService.getUserByUserId(userId);
        if (user == null) {
            return null;
        }

        List<Long> visitsIds = this.menuService.getMenusByUserId(user.getUserId(), VisitType.MENU);
        user.setVisitsIds(visitsIds);
        return user;
    }

    @ApiRequestMappingAutoWithMethodName(method = RequestMethod.GET, name = "获所所有菜单")
    @State(init = true, initCheck = false, operation = StateOperation.FULL_REPLACE)
    public List<Menu> getAllMenus() {
        return this.menuService.getAllMenus();
    }

}
