/*
 * Copyright (c) 2016 - 2116 All Rights Reserved.
 * Powered By [rapid-generator]
 */
package ${packageName}.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.util.CollectionUtil;
import org.stategen.framework.util.TreeUtil;
import org.stategen.framework.web.cookie.CookieGroup;

import ${packageName}.domain.FileSummary;
import ${packageName}.domain.Hoppy;
import ${packageName}.domain.Region;
import ${packageName}.domain.User;
import ${packageName}.domain.UserHoppy;
import ${packageName}.enums.CookieType.LOGIN.LoginCookieNames;
import ${packageName}.service.CityService;
import ${packageName}.service.FileSummaryService;
import ${packageName}.service.HoppyService;
import ${packageName}.service.ProvinceService;
import ${packageName}.service.RegionService;
import ${packageName}.service.UserHoppyService;
import ${packageName}.service.UserService;

@RequestMapping("/api/user")
@Wrap
public abstract class UserControllerBase {

    static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(UserControllerBase.class);

    @Resource(name = "userService")
    protected UserService userService;

    @Resource
    private ProvinceService provinceService;

    @Resource
    private CityService cityService;

    @Resource
    private UserHoppyService userHoppyService;

    @Resource
    private FileSummaryService fileSummaryService;

    @Resource
    private RegionService regionService;

    @Resource
    private HoppyService hoppyService;

    @Resource
    protected CookieGroup<LoginCookieNames> loginCookieGroup;

    protected void assignBeans(List<User> users) {
        provinceService.assignBeanTo(users, User::getProvinceId, User::setProvince);
        cityService.assignBeanTo(users, User::getCityId, User::setCity);
        fileSummaryService.assignBeanTo(users, User::getAvatarImgId, User::setAvatarImg);
        Set<Long> postAddressIdSet = CollectionUtil.toSet(users, User::getPostAddressId);
        Map<Long, Region> regionMapIfHasParent = regionService.getRegionMapIfHasParent(new ArrayList<Long>(postAddressIdSet));
        for (User user : users) {
            FileSummary avatarImg = user.getAvatarImg();
            if (avatarImg != null) {
                String url = avatarImg.getUrl();
                if (url != null && !(url.startsWith("http://") || url.startsWith("https://"))) {
                    avatarImg.setUrl(fileSummaryService.getProjectName() + url);
                }
            }
            Long postAddressId = user.getPostAddressId();
            List<Region> withParent = TreeUtil.getWithParent(regionMapIfHasParent, postAddressId, Region::getParentRegionId);
            user.setCascaderPostAddresss(withParent);
        }
        List<Hoppy> hoppys = hoppyService.getHoppyOptions();
        List<UserHoppy> userHoppys = userHoppyService.getUserHoppysByUserIds(CollectionUtil.toList(users, User::getUserId));
        CollectionUtil.setListByList(users, userHoppys, User::getUserId, User::setHoppyIds, UserHoppy::getUserId, UserHoppy::getHoppyId);
        CollectionUtil.setListByValues(users, hoppys, User::getHoppyIds, User::setHoppys, Hoppy::getHoppyId);
    }

    protected void saveUserHoppys(ArrayList<Long> hoppyIds, String userId, User user) {
        List<UserHoppy> userHoppys = userHoppyService.getUserHoppysByUserIds(Arrays.asList(user.getUserId()));
        Map<Long, UserHoppy> hoppyIdUserHoppyMap = CollectionUtil.toMap(userHoppys, UserHoppy::getHoppyId);
        if (CollectionUtil.isNotEmpty(hoppyIds)) {
            for (Long hoppyId : hoppyIds) {
                UserHoppy userHoppy = hoppyIdUserHoppyMap.get(hoppyId);
                if (userHoppy == null) {
                    userHoppy = new UserHoppy();
                    userHoppy.setUserId(userId);
                    userHoppy.setHoppyId(hoppyId);
                    userHoppyService.insert(userHoppy);
                } else {
                    hoppyIdUserHoppyMap.remove(hoppyId);
                }
            }
        }
        for (UserHoppy userHoppy : hoppyIdUserHoppyMap.values()) {
            userHoppyService.delete(userHoppy.getId());
        }
    }
}
