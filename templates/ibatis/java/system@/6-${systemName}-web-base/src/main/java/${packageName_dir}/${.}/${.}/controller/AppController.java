package ${packageName}.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.enums.DataOpt;
import org.stategen.framework.lite.SimpleResponse;
import org.stategen.framework.lite.enums.MenuType;
import org.stategen.framework.util.CollectionUtil;
import org.stategen.framework.util.StringUtil;
import org.stategen.framework.web.cookie.CookieGroup;

import ${packageName}.domain.City;
import ${packageName}.domain.Hoppy;
import ${packageName}.domain.Menu;
import ${packageName}.domain.Province;
import ${packageName}.domain.Region;
import ${packageName}.domain.User;
import ${packageName}.enums.CookieType.LOGIN.LoginCookieNames;
import ${packageName}.service.CityService;
import ${packageName}.service.HoppyService;
import ${packageName}.service.MenuService;
import ${packageName}.service.ProvinceService;
import ${packageName}.service.RegionService;
import ${packageName}.service.UserService;

import io.swagger.annotations.ApiParam;

@ApiConfig(menu = false)
@RequestMapping("/api/app")
public class AppController {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(AppController.class);

    @Resource
    private CookieGroup<LoginCookieNames> loginCookieGroup;

    @Resource(name = "userService")
    private UserService userService;

    @Resource
    private MenuService menuService;

    @Resource
    private ProvinceService provinceService;

    @Resource
    private CityService cityService;

    @Resource
    private HoppyService hoppyService;

    @Resource
    private RegionService regionService;

    @ApiRequestMappingAutoWithMethodName(name = "")
    @State(area = User.class)
    public SimpleResponse logout(HttpServletResponse response) {
        loginCookieGroup.expireAllCookies();
        return new SimpleResponse(true, "退出成功");
    }

    @ApiRequestMappingAutoWithMethodName(name = "")
    @State(init = true, initCheck = false, dataOpt = DataOpt.FULL_REPLACE)
    public User getCookieUser() {
        String userId = this.loginCookieGroup.getCookieValue(LoginCookieNames.userId);
        if (StringUtil.isEmpty(userId)) {
            return null;
        }

        User user = this.userService.getUserByUserId(userId);
        if (user == null) {
            return null;
        }

        List<Long> visitsIds = this.menuService.getMenusByUserId(user.getUserId(), MenuType.MENU);
        user.setVisitsIds(visitsIds);
        return user;
    }

    @ApiRequestMappingAutoWithMethodName(name = "获所所有菜单")
    @State(init = true, initCheck = false, dataOpt = DataOpt.FULL_REPLACE)
    public List<Menu> getAllMenus() {
        return this.menuService.getAllMenus();
    }

    @ApiRequestMappingAutoWithMethodName(name = "省份")
    public List<Province> getProvinceOptions() {
        List<Province> provinceOptions = this.provinceService.getProvinceOptions();
        return provinceOptions;
    }

    @ApiRequestMappingAutoWithMethodName(name = "城市")
    public List<City> getCityOptions(@ApiParam("provinceId") String provinceId) {
        return this.cityService.getCityOptions(provinceId);
    }

    @ApiRequestMappingAutoWithMethodName(name = "爱好")
    public List<Hoppy> getHoppyOptions() {
        return this.hoppyService.getHoppyOptions();
    }

    @ApiRequestMappingAutoWithMethodName(name = "获取地区")
    public List<Region> getRegionOptions(@ApiParam("父ID") @RequestParam(required = false, name = "parentRegionIds") ArrayList<Long> parentRegionIds) {
        if (CollectionUtil.isNotEmpty(parentRegionIds)) {
            //客户端不必知道根值或处理根值的问题，直接传null上来
            if (parentRegionIds.get(0) == null) {
                parentRegionIds.set(0, 0L);
            }
        }
        
        List<Region> regionOptions = this.regionService.getRegionOptions(parentRegionIds);
        Map<Long, List<Region>> regionMap = CollectionUtil.toGroup(regionOptions, Region::getParentRegionId);
        Long lastParentRegionId = CollectionUtil.getLast(parentRegionIds);
        if (lastParentRegionId != null) {
            List<Region> children = regionMap.get(lastParentRegionId);
            while (CollectionUtil.isNotEmpty(children)) {
                Region first = CollectionUtil.getFirst(children);
                if (first != null && !first.getIsLeaf()) {
                    children = this.regionService.getRegionOptions(Arrays.asList(first.getRegionId()));
                    regionOptions.addAll(children);
                } else {
                    children = null;
                }

            }
        }
        return regionOptions;
    }
    
    @ApiRequestMappingAutoWithMethodName(name = "获取用户")
    public List<User> getUserOptions(@RequestParam(required = false, name = "userIds") ArrayList<String> userIds){
        return null;
    }

}
