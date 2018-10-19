package ${packageName}.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.VisitCheck;

import ${packageName}.domain.User;

/***
 * route ="user/$userId"
 * 
 */
@ApiConfig(name="用户详情")
@VisitCheck
public class User_$userIdController extends UserControllerBase {
    
    @ApiRequestMappingAutoWithMethodName(path = "/{userId}", name = "获取用户详情", method = RequestMethod.GET)
    @VisitCheck
    public User getUserById(@PathVariable String userId) {
        User user = this.userService.getUserByUserId(userId);
        return user;
    }
}
