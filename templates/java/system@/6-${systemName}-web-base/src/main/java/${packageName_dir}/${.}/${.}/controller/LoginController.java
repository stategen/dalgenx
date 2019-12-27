package ${packageName}.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.lite.SimpleResponse;
import org.stategen.framework.util.BusinessAssert;
import org.stategen.framework.web.cookie.CookieGroup;

import ${packageName}.domain.User;
import ${packageName}.enums.CookieType.Login.LoginCookieNames;
import ${packageName}.service.UserService;

import io.swagger.annotations.ApiParam;

@ApiConfig(menu=false)
@RequestMapping("/api/login")
@Wrap
public class LoginController {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(LoginController.class);
    
    @Resource
    private CookieGroup<LoginCookieNames> loginCookieGroup;

    @Resource(name = "userService")
    private UserService userService;
    

    
    @ApiRequestMappingAutoWithMethodName(name = "", method = RequestMethod.POST)
    @ResponseBody
    @State(genForm=true)
    public SimpleResponse login(@ApiParam("用户名") @RequestParam() String username,
                                @ApiParam("密码") @RequestParam() String password, @ApiParam(hidden = true) User user) {
        BusinessAssert.mustNotNull(user, "用户数据不能为空");
        User loginUser = this.userService.getUserByUsername(username);
        if (loginUser != null) {
            String userPassword = loginUser.getPassword();
            BusinessAssert.mustEqual(String.class, userPassword, password,"密码不正确");
            loginCookieGroup.addCookie(LoginCookieNames.userId, loginUser.getUserId());
            return new SimpleResponse(true, "登录成功");
        }
        return new SimpleResponse(false, "用户不存在");
    }
    
    @ApiRequestMappingAutoWithMethodName(name = "", method = RequestMethod.POST)
    @ResponseBody
    @State(genForm=true)
    public User loginByMobile(@ApiParam("国际区号") @RequestParam() String interCode,
                            @ApiParam("手机号") @RequestParam() String mobile,@ApiParam("密码") @RequestParam() String password) {
        User loginUser =this.userService.getUserByMobile(interCode, mobile);
        User theUser =null;
        if (loginUser != null) {
            String userPassword = loginUser.getPassword();
            BusinessAssert.mustEqual(String.class, userPassword, password,"密码不正确");
            loginCookieGroup.addCookie(LoginCookieNames.userId, loginUser.getUserId());
            loginUser.setPassword(null);
            theUser =loginUser;
        }
        BusinessAssert.mustNotNull(theUser, "用户不存在");
        return theUser;
    }
}
