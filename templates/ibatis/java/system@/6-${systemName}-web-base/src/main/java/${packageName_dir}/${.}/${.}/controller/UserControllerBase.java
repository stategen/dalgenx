/*
 * Copyright (c) 2016 - 2116 All Rights Reserved.
 * Powered By [rapid-generator]
 */
package ${packageName}.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.Wrap;

import ${packageName}.service.UserService;

@RequestMapping("/api/user")
@Wrap
public abstract class UserControllerBase {

    @Resource(name = "userService")
    protected UserService userService;
}
