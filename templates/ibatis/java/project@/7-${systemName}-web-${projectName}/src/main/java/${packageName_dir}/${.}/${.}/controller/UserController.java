package ${packageName}.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.GenForm;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.VisitCheck;
import org.stategen.framework.enums.DataOpt;
import org.stategen.framework.lite.AntdPageList;
import org.stategen.framework.lite.PageList;
import org.stategen.framework.lite.Pagination;
import org.stategen.framework.util.BusinessAssert;
import org.stategen.framework.util.CopyUtil;
import org.stategen.framework.util.DatetimeUtil;
import org.stategen.framework.web.cookie.CookieGroup;

import ${packageName}.domain.User;
import ${packageName}.enums.RoleType;

import io.swagger.annotations.ApiParam;

@ApiConfig(name = "用户", breadParent = DashboardController.class)
@VisitCheck
public class UserController extends UserControllerBase {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(UserController.class);

    @Resource
    private CookieGroup baseCookieGroup;

    @ApiRequestMappingAutoWithMethodName(name = "用户列表", method = RequestMethod.GET)
    @VisitCheck
    @State(init = true)
    @GenForm
    public AntdPageList<User> getUserPageListByDefaultQuery(@ApiParam() @RequestParam(required = false, name = "userIds") ArrayList<String> userIds,
                                                            @ApiParam() String usernameLike, @ApiParam() String passwordLike,
                                                            @ApiParam() @RequestParam(required = false, name = "roleTypes") ArrayList<RoleType> roleTypes,
                                                            @ApiParam() String nameLike, @ApiParam() String nickNameLike, @ApiParam() Integer ageMin,
                                                            @ApiParam() Integer ageMax, @ApiParam() String addressLike, @ApiParam() String avatarLike,
                                                            @ApiParam() String emailLike, @ApiParam() Date createTimeMin,
                                                            @ApiParam() Date createTimeMax, @ApiParam() Date updateTimeMin,
                                                            @ApiParam() Date updateTimeMax, @ApiParam(hidden = true) User user, 
                                                            @ApiParam(hidden = true) Pagination pagination

    ) {
        if (createTimeMax == null) {
            user.setCreateTimeMax(DatetimeUtil.current());
        }
        //技巧，api参数 .在dao中已自动化生成,从以下getUserPageListByDefaultQuery 帮助文件中 点开See also直接复制过来，
        PageList<User> userList = this.userService.getUserPageListByDefaultQuery(user, pagination.getPageSize(), pagination.getPage());
        return new AntdPageList<User>(userList);
    }

    @ApiRequestMappingAutoWithMethodName(name = "批量删除用户", method = RequestMethod.DELETE)
    @VisitCheck
    public List<String> deleteByUserIds(@RequestParam(name = "userIds", required = false) ArrayList<String> userIds, HttpServletResponse response) {
        return this.userService.deleteByUserIds(userIds);
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
    @State(operation = StateOperation.DELETE_IF_EXIST)
    public String delete(@PathVariable String userId) {
        return userService.delete(userId);
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
