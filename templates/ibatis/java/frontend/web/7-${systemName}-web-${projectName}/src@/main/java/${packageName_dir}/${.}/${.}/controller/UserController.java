package ${packageName}.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
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
import org.stategen.framework.util.CollectionUtil;
import org.stategen.framework.util.CopyUtil;
import org.stategen.framework.util.DatetimeUtil;

import ${packageName}.annotion.ExcludeBeanNotNull;
import ${packageName}.checker.LoginCheck;
import ${packageName}.domain.User;
import ${packageName}.enums.StatusEnum;

import io.swagger.annotations.ApiParam;

@ApiConfig(name = "用户")
@VisitCheck
@LoginCheck
public class UserController extends UserControllerBase {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(UserController.class);


    @ApiRequestMappingAutoWithMethodName(name = "用户列表")
    @State(init = true, dataOpt = DataOpt.FULL_REPLACE,genForm=true)
    @ExcludeBeanNotNull
    public AntdPageList<User> getUserPageList(
                                              @ApiParam() String userId,
                                              @ApiParam() @RequestParam(required = false, name = "userIds") ArrayList<String> userIds,
                                              @ApiParam() String usernameLike,
                                              @ApiParam() @RequestParam(required = false, name = "roleTypes") ArrayList<String> roleTypes,
                                              @ApiParam() Integer ageMin, 
                                              @ApiParam() Integer ageMax, 
                                              @ApiParam() Date valiDatetimeMin,
                                              @ApiParam() Date birthdayDateMin, 
                                              @ApiParam() Date workTimeMin, 
                                              @ApiParam() String provinceId,
                                              @ApiParam() @RequestParam(required = false, name = "cityIds") ArrayList<String> cityIds,
                                              @ApiParam() @RequestParam(required = false, name = "statuss") ArrayList<StatusEnum> statuss,
                                              @ApiParam() Long gradeMin, 
                                              @ApiParam() String postAddressId,
                                              @ApiParam(hidden = true) User user, Pagination pagination

    ) {
        user.setCreateTimeMax(DatetimeUtil.current());
        //技巧，api参数 .在dao中已自动化生成,从以下getUserPageList 帮助文件中 点开See also直接复制过来，
        PageList<User> userList = this.userService.getUserPageList(user, pagination.getPageSize(), pagination.getPage());
        assignBeans(userList.getItems());
        return new AntdPageList<User>(userList);
    }



    @ApiRequestMappingAutoWithMethodName(name = "批量删除用户")
    @VisitCheck
    @State(dataOpt = DataOpt.DELETE_IF_EXIST, area = User.class)
    public List<String> deleteByUserIds(@RequestParam(name = "userIds", required = false) ArrayList<String> userIds, HttpServletResponse response) {
        return this.userService.deleteByUserIds(userIds);
    }

    @ApiRequestMappingAutoWithMethodName(name = "创建用户")
    @VisitCheck
    @State
    @GenForm
    public User insert(@ApiParam()@RequestParam(required =false,name="hoppyIds") ArrayList<Long> hoppyIds,
                       @ApiParam() @RequestParam(required = false, name = "cascaderPostAddressIds") ArrayList<Long> cascaderPostAddressIds,
                       @ApiParam() String username,
                       @ApiParam() String password,
                       @ApiParam() String roleType,
                       @ApiParam() String name,
                       @ApiParam() String nickName,
                       @ApiParam() Integer age,
                       @ApiParam() String address,
                       @ApiParam() String avatarImgId,
                       @ApiParam() String email,
                       @ApiParam() Date valiDatetime,
                       @ApiParam() Date birthdayDate,
                       @ApiParam() Date workTime,
                       @ApiParam() String provinceId,
                       @ApiParam() String cityId,
                       @ApiParam() StatusEnum status,
                       @ApiParam() Long grade,
                       @ApiParam() Boolean sex,
                       @ApiParam() String postAddressId,
                       @ApiParam() String userId
                       ,@ApiParam(hidden = true) User user) {
        user.setCreateTime(DatetimeUtil.current());
        this.userService.insert(user);
        saveUserHoppys(hoppyIds, userId, user);
        List<User> users = Arrays.asList(user);
        assignBeans(users);
        return user;
    }

    @ApiRequestMappingAutoWithMethodName(name = "删除用户")
    @VisitCheck
    @State(area=User.class,dataOpt = DataOpt.DELETE_IF_EXIST)
    public String delete(@PathVariable String userId) {
        return userService.delete(userId);
    }

    @ApiRequestMappingAutoWithMethodName(name = "修改用户")
    @VisitCheck
    @GenForm
    @State()
    public User update(
                       @ApiParam()@RequestParam(required =false,name="hoppyIds") ArrayList<Long> hoppyIds,
                       @ApiParam() @RequestParam(required = false, name = "cascaderPostAddressIds") ArrayList<Long> cascaderPostAddressIds,
                       @ApiParam() String username,
                       @ApiParam() String password,
                       @ApiParam() String roleType,
                       @ApiParam() String name,
                       @ApiParam() String nickName,
                       @ApiParam() Integer age,
                       @ApiParam() String address,
                       @ApiParam() String avatarImgId,
                       @ApiParam() String email,
                       @ApiParam() Date valiDatetime,
                       @ApiParam() Date birthdayDate,
                       @ApiParam() Date workTime,
                       @ApiParam() String provinceId,
                       @ApiParam() String cityId,
                       @ApiParam() StatusEnum status,
                       @ApiParam() Long grade,
                       @ApiParam() Boolean sex,
                       @ApiParam() String postAddressId,
                       @ApiParam() String userId
                       ,@ApiParam(hidden = true) User user

    ) {
        user.setPostAddressId(CollectionUtil.getLast(cascaderPostAddressIds));
        
        User orgUser = this.userService.getUserByUserId(userId);
        BusinessAssert.mustNotNull(orgUser, "用户不存在");
        CopyUtil.merge(orgUser, user);
        this.userService.update(orgUser);
        
        saveUserHoppys(hoppyIds, userId, orgUser);
        assignBeans(Arrays.asList(orgUser));
        return orgUser;
    }



}
