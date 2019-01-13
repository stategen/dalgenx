/*
 * Copyright (c) 2016 - 2116 All Rights Reserved.
 * Powered By [rapid-generator]
 */
package com.mycompany.biz.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.Wrap;

import com.mycompany.biz.domain.Role;
import com.mycompany.biz.service.MenuService;
import com.mycompany.biz.service.RoleMenuService;
import com.mycompany.biz.service.RoleService;

@RequestMapping("/api/role")
@Wrap
public abstract class RoleControllerBase {

    @Resource
    protected RoleService roleService;

    @Resource
    protected RoleMenuService roleMenuService;

    @Resource
    protected MenuService menuService;
}
