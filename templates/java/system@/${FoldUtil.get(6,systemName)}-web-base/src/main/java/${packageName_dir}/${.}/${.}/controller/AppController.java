package ${packageName}.controller;


import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.enums.DataOpt;
import org.stategen.framework.lite.SimpleResponse;
import org.stategen.framework.util.BusinessAssert;

import org.stategen.framework.util.StringUtil;
import org.stategen.framework.web.cookie.CookieGroup;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.baidu.fsg.uid.impl.CachedUidGenerator;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import ${packageName}.enums.CookieType.Login.LoginCookieNames;
import ${packageName}.stream.Receive${systemName?cap_first};
import ${packageName}.stream.Sender${systemName?cap_first};
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
	
    @Autowired
    private ObjectMapper jsonMapper;
    
    @PostConstruct
    public void mixin_to_specify_creator() throws Exception {
        jsonMapper.addMixIn(MimeType.class, MimeTypeMixin.class);
    }
    
    public static abstract class MimeTypeMixin {
        
        @JsonCreator
        public MimeTypeMixin(@JsonProperty("type") String type) {
        }
    }
    
    /*** curl -H "Content-Type: application/json" -X POST -d "{\"id\":\"receiveTrade-dest\",\"bill-pay\":\"150\"}" http://localhost:8080/tradeApp/api/app/sendmq */
    /*** curl -H "Content-Type: application/json" -X POST -d "{\"id\":\"receiveAuth-dest\",\"bill-pay\":\"150\"}" http://localhost:8080/tradeApp/api/app/sendmq */
    @SuppressWarnings("unchecked")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ApiRequestMappingAutoWithMethodName
    public String sendmq(@RequestBody String body, @RequestHeader(HttpHeaders.CONTENT_TYPE) Object contentType) throws Exception {
        Map<String, String> payload         = jsonMapper.readValue(body, Map.class);
        String              destinationName = payload.get("id");
        SenderTrade.sendMessage(destinationName, payload);  

//        com.mycompany.biz.stream.DemoBill payload         = jsonMapper.readValue(body, ${packageName}.stream.DemoBill.class);
//        SenderTrade.sendMessage(ReceiveTrade.class, payload);
        return "Ok";
    }
    
    
    //Following sink is used as test consumer. It logs the data received through the consumer.
    static class TestSink {
        final static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AppController.TestSink.class);
        
        @Bean
        public ReceiveTrade receiveTrade() {
            return new ReceiveTrade() {
                @Override
                public void accept(${packageName}.stream.DemoBill data) {
                    log.info("Data received from receiveTrade-dest..." + data);
                }
            };
            //return data -> log.info("Data received from receiveTrade-dest.." + data);
        }
        /*
        @Bean
        public ReceiveAuth receiveAuth() {
          return data -> log.info("Data received from receiveAuth-dest.." + data);
        }
		*/


    }  	
    
	
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
    public class User {
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
    
    /***测试限流降级分布式事务*/
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
