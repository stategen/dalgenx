package com.mycompany.biz.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.VisitCheck;
import org.stategen.framework.enums.DataOpt;

import com.mycompany.biz.domain.User;

/***
 * route ="user/$userId"
 * 
 */
@ApiConfig(name="用户详情")
@VisitCheck
public class User_$userIdController extends UserControllerBase {
    
    @ApiRequestMappingAutoWithMethodName(path = "/{userId}", name = "获取用户详情")
    @VisitCheck
    @State(init=true,dataOpt=DataOpt.FULL_REPLACE)
    public User getUserById(@PathVariable String userId) {
        User user = this.userService.getUserByUserId(userId);
        return user;
    }
}
