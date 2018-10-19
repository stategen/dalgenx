package ${packageName}.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.VisitCheck;
import org.stategen.framework.lite.AntdPageList;
import org.stategen.framework.lite.PageList;
import org.stategen.framework.lite.SimpleResponse;
import org.stategen.framework.util.BusinessAssert;
import org.stategen.framework.util.CollectionUtil;
import org.stategen.framework.util.CopyUtil;
import org.stategen.framework.util.DatetimeUtil;
import org.stategen.framework.web.cookie.CookieGroup;

import com.alibaba.fastjson.JSON;
import ${packageName}.domain.User;

@ApiConfig(name="用户",breadParent=DashboardController.class)
@VisitCheck
public class UserController extends UserControllerBase {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(UserController.class);

    @Resource
    private CookieGroup baseCookieGroup;

    @ApiRequestMappingAutoWithMethodName(name = "用户列表", method = RequestMethod.GET)
    @VisitCheck
    @State(init=true)
    public AntdPageList<User> getUsers(@RequestParam(required = true, defaultValue = "1") Integer page,
                                       @RequestParam(required = true, defaultValue = "10") Integer pageSize,
                                       @RequestParam(name = "address[]", required = false) String[] addresses,
                                       @RequestParam(name = "createTime[]", required = false) Date[] createTimes, HttpServletRequest request) {
        String address = CollectionUtil.isNotEmpty(addresses) ? addresses[0] : null;
        Date beginDate = null;
        Date endDate = null;
        if (CollectionUtil.isNotEmpty(createTimes) && createTimes.length > 1) {
            beginDate = createTimes[0];
            endDate = createTimes[1];
        }

        PageList<User> userList = this.userService.getUsers(address, beginDate, endDate, pageSize, page);
        return new AntdPageList<User>(userList);
    }

    @ApiRequestMappingAutoWithMethodName(name = "批量删除用户", method = RequestMethod.DELETE)
    @VisitCheck
    public SimpleResponse deleteUserByIds(@RequestParam(name = "userIds", required = false) ArrayList<String> userIds, HttpServletResponse response,
                                          HttpServletRequest httpServletRequest) {
        Map<String, String[]> parameterMap = httpServletRequest.getParameterMap();
        System.out.println("parameterMap<===========>:" + JSON.toJSONString(parameterMap));

        if (CollectionUtil.isNotEmpty(userIds)) {
            this.userService.deleteByIds(userIds);
            return SimpleResponse.success("删除成功");
        }
        return SimpleResponse.error("删除失败，参数ids为空");
    }

    @ApiRequestMappingAutoWithMethodName(name = "创建用户", method = RequestMethod.POST)
    @VisitCheck
    public User createUser(@RequestBody User user) {
        user.setCreateTime(DatetimeUtil.current());
        user.setAvatar("http://dummyimage.com/100x100/79e6f2/757575.png&text=" + user.getNickName().substring(0, 1));
        this.userService.insert(user);
        if (logger.isInfoEnabled()) {
            logger.info(new StringBuffer("输出info信息: user:").append(user).toString());
        }
        return user;
    }


    @ApiRequestMappingAutoWithMethodName(path = "/{userId}", name = "删除用户", method = RequestMethod.DELETE)
    @VisitCheck
    public SimpleResponse deleteUserById(@PathVariable String userId) {
        this.userService.deleteByUserId(userId);
        return SimpleResponse.success("删除成功");
    }

    @ApiRequestMappingAutoWithMethodName(path = "/{userId}", name = "修改用户", method = RequestMethod.PATCH)
    @VisitCheck
    public User patchUser(@PathVariable String userId, @RequestBody User user, HttpServletResponse response) {
        User orgUser = this.userService.getUserByUserId(userId);
        BusinessAssert.mustNotNull(orgUser, "用户不存在");
        user = CopyUtil.merge(orgUser, user);
        this.userService.update(orgUser);
        if (logger.isInfoEnabled()) {
            logger.info(new StringBuffer("输出info信息: orgUser:").append(orgUser).toString());
        }
        return orgUser;
    }

}
