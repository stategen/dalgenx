/*
 * Do not remove this unless you get business authorization.
 * Copyright (c) 2016 - 2018 All Rights Reserved.
 * Powered By [stategen.dalgen]
 */
package com.mycompany.biz.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.web.cookie.CookieGroup;

import com.mycompany.biz.enums.CookieType.LOGIN.LoginCookieNames;
import com.mycompany.biz.service.CityService;
import com.mycompany.biz.service.ProvinceService;
import com.mycompany.biz.service.TopicService;

@RequestMapping("/api/topic")
@Wrap
public abstract class TopicControllerBase {

    @Resource
    protected TopicService topicService;

    @Resource
    protected CookieGroup<LoginCookieNames> loginCookieGroup;

    @Resource
    private ProvinceService provinceService;

    @Resource
    private CityService cityService;
}
