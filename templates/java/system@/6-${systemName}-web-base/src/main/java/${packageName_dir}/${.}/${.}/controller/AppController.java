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
import org.stategen.framework.util.AssertUtil;
import org.stategen.framework.util.BusinessAssert;
import org.stategen.framework.util.CollectionUtil;
import org.stategen.framework.util.StringUtil;
import org.stategen.framework.web.cookie.CookieGroup;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.baidu.fsg.uid.impl.CachedUidGenerator;
import ${packageName}.enums.CookieType.Login.LoginCookieNames;
<#if role>
import ${packageName}.domain.Menu;
import ${packageName}.domain.User;

import ${packageName}.service.MenuService;
import ${packageName}.service.UserService;
<#else>
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
</#if>
import io.seata.spring.annotation.GlobalTransactional;
import io.swagger.annotations.ApiParam;

@ApiConfig(menu = false)
@RequestMapping("/api/app")
@Wrap
public class AppController {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(AppController.class);

    @Resource
    private CookieGroup<LoginCookieNames> loginCookieGroup;
	
    @Resource
    private CachedUidGenerator cachedUidGenerator;
	
<#if role>
    @Resource(name = "userService")
    private UserService userService;

    @Resource
    private MenuService menuService;
	
</#if>
<#if !role>
    @Getter
    @Setter
    @AllArgsConstructor
    public class User implements java.io.Serializable {
	    String userId;
        String username;
        String password;
    }
</#if>
    
    @ApiRequestMappingAutoWithMethodName(method = RequestMethod.GET)
    @SentinelResource
    @Wrap(false)
    public String test() {
	    //MockUtil只能用于测试，不能打包，执行 mvn package 由 插件 forbiddenapis 检测
        //MockUtil.slow(1000L);
        return "test张三中文";
    }
    
    /***测试seata分布式事务*/
    @ApiRequestMappingAutoWithMethodName(method = RequestMethod.GET)
    @GlobalTransactional
    public User testSeata() {
        User user = <#if role>this.userService.appendUserAge("1")<#else> new User("1","张三","123456")</#if>;
        return user;
    }
    
    /***测试seata分布式事务*/
    @ApiRequestMappingAutoWithMethodName(method = RequestMethod.GET)
    @SentinelResource(/* blockHandler = "orderBlockHandler",fallback = "orderFallback", */ )
    public User testSentinel() {
        //MockUtil只能用于测试，不能打包，执行 mvn package 由 插件 forbiddenapis 检测
        //MockUtil.throwRandomException(2);
        User user = <#if role>this.userService.appendUserAge("1")<#else> new User("1","张三","123456")</#if>;
        return user;
    }
    
    /***测试百度分步式id*/
    @ApiRequestMappingAutoWithMethodName(method = RequestMethod.GET)
    public String testUid() {
        long uid = this.cachedUidGenerator.getUID();
        if (logger.isInfoEnabled()) {
            logger.info(new StringBuilder("输出info信息: uid:").append(uid).toString());
        }
        String parseUID = cachedUidGenerator.parseUID(uid);
        return parseUID;
    }
    
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
        if (StringUtil.isEmpty(userId)<#if !role> || !"1".equals(userId)</#if>) {
            return null;
        }

        User user = <#if role>this.userService.getUserByUserId("1")<#else> new User("1","张三","123456")</#if>;
<#if role>		
        if (user == null) {
            return null;
        }

        List<Long> visitsIds = this.menuService.getMenusByUserId(user.getUserId(), MenuType.MENU);
        user.setVisitsIds(visitsIds);
</#if>		
        return user;
    }
    
    @ApiRequestMappingAutoWithMethodName(name = "", method = RequestMethod.POST)
    public SimpleResponse login(
            @ApiParam("用户名") @RequestParam() String username,
            @ApiParam("密码") @RequestParam() String password,
            @ApiParam(hidden = true) User user) {
        BusinessAssert.mustNotNull(user, "用户数据不能为空");
<#if role>		
        User loginUser = this.userService.getUserByUsername(username);
        if (loginUser != null) {
            String userPassword = loginUser.getPassword();
            BusinessAssert.mustEqual(String.class, userPassword, password, "密码不正确");
            loginCookieGroup.addCookie(LoginCookieNames.userId, loginUser.getUserId());
            return new SimpleResponse(true, "登录成功");
        }
        return new SimpleResponse(false, "用户不存在");
<#else>
        loginCookieGroup.addCookie(LoginCookieNames.userId, "1");
	    return new SimpleResponse(true, "登录成功");		
</#if>		
    }
        
<#if role>
    
    @ApiRequestMappingAutoWithMethodName(name = "获所所有菜单", method = RequestMethod.GET)
    @State(init = true, initCheck = false, dataOpt = DataOpt.FULL_REPLACE)
    public List<Menu> getAllMenus() {
        return this.menuService.getAllMenus();
    }
    
    @ApiRequestMappingAutoWithMethodName(name = "获取用户")
    public List<User> getUserOptions(@RequestParam(required = false, name = "userIds") ArrayList<String> userIds) {
        return null;
    }
	 

</#if>



}
