/*
 * Copyright (c) 2016 - 2116 All Rights Reserved.
 * Powered By [rapid-generator]
 */
package ${packageName}.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.Wrap;

import ${packageName}.domain.UserRole;
import ${packageName}.service.UserRoleService;

@RequestMapping("/api/userRole")
@Wrap
public abstract class UserRoleControllerBase {

    @Resource
    protected UserRoleService userRoleService;
}
