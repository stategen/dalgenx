/*
 * Copyright (c) 2016 - 2116 All Rights Reserved.
 * Powered By [rapid-generator]
 */
package ${packageName}.service.impl;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.LinkedCaseInsensitiveMap;
import org.stategen.framework.lite.PageList;
import org.stategen.framework.lite.enums.VisitType;
import org.stategen.framework.util.CollectionUtil;
import org.stategen.framework.util.StringUtil;

import ${packageName}.dao.MenuDao;
import ${packageName}.domain.Menu;
import ${packageName}.service.MenuService;

/**
 * MenuServiceImpl
 * <pre>
 * database table: visit
 * database table comments: IMenu
 * This file is generated by <tt>dalgen</tt>, a DAL (Data Access Layer)
 *
 * 新生成的类中的方法，只有在不同名的情况下才会被追加到该类下，
 * 因此该类可以修改任何部分
 * </pre>
 */
public class MenuServiceImpl implements MenuService {

    @Resource(name = "menuDao")
    MenuDao menuDao;

    @Value("${'$'}{project.name}")
    private String projectName;

    private class VisitKeyCalculator implements CollectionUtil.KeyCalculator<String, Menu> {

        @Override
        public String calculateKey(Menu menu) {
            String result = new StringBuffer().append(menu.getControllerName()).append('.').append(menu.getMethodName()).toString();
            return result;
        }
    }

    @Override
    public boolean updateMenus(List<Menu> allControllerMenus) {
        //更新visitId
        VisitKeyCalculator visitKeyCalculator = new VisitKeyCalculator();
        Map<String, Menu> allControllerVisitMap = CollectionUtil.toMap(new LinkedCaseInsensitiveMap<Menu>(), allControllerMenus, visitKeyCalculator);
        List<Menu> oldVisits = this.getMenusByProjectName(getProjectName());
        for (Menu oldVisit : oldVisits) {
            String oldVisitKey = visitKeyCalculator.calculateKey(oldVisit);
            Menu menu = allControllerVisitMap.get(oldVisitKey);
            if (menu != null) {
                menu.setMenuId(oldVisit.getMenuId());
            }
        }
        //新的全部插入
        for (Menu menu : allControllerMenus) {
            menu.setDeleteFlag(0);
            menu.setProjectName(projectName);
            Long menuId = menu.getMenuId();
            if (menuId == null) {
                //插入后，即可获取menuId
                this.insert(menu);
            }
        }
        //更新mpid
        for (Menu menu : allControllerMenus) {
            Menu menuParent = menu.getParent();
            if (menuParent != null) {
                Long menuParentMenuId = menuParent.getMenuId();
                String route = menu.getRoute();
                Long mpid = (StringUtil.isNotEmpty(route) && route.indexOf(StringUtil.COLON) > 0) ? -1L : menuParentMenuId;
                menu.setMpid(mpid);
            }
            Menu breadParent = menu.getBreadParent();
            if (breadParent != null) {
                Long breadParentMenuId = breadParent.getMenuId();
                menu.setBpid(breadParentMenuId);
            }
            this.forceUpdateById(menu);
        }
        return true;
    }

    @Override
    public List<Menu> getAllMenus() {
        return this.getMenusByVisitType(VisitType.MENU, getProjectName());
    }

    @Override
    public String getProjectName() {
        return projectName;
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#insert
     * @see ${packageName}.service.MenuService#insert
     */
    @Override
    public Menu insert(Menu menu) {
        return menuDao.insert(menu);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#deleteByMenuId
     * @see ${packageName}.service.MenuService#deleteByMenuId
     */
    @Override
    public Long deleteByMenuId(Long menuId) {
        return menuDao.deleteByMenuId(menuId);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#update
     * @see ${packageName}.service.MenuService#update
     */
    @Override
    public Menu update(Menu menu) {
        return menuDao.update(menu);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#getMenuByMenuId
     * @see ${packageName}.service.MenuService#getMenuByMenuId
     */
    @Override
    public Menu getMenuByMenuId(Long menuId) {
        return menuDao.getMenuByMenuId(menuId);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#getMenuPageListByDefaultQuery
     * @see ${packageName}.service.MenuService#getMenuPageListByDefaultQuery
     */
    @Override
    public PageList<Menu> getMenuPageListByDefaultQuery(Menu menu, int pageSize, int pageNum) {
        return menuDao.getMenuPageListByDefaultQuery(menu, pageSize, pageNum);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#getMenusByMenuIds
     * @see ${packageName}.service.MenuService#getMenusByMenuIds
     */
    @Override
    public List<Menu> getMenusByMenuIds(java.util.List<Long> menuIds) {
        return menuDao.getMenusByMenuIds(menuIds);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#deleteByMenuIds
     * @see ${packageName}.service.MenuService#deleteByMenuIds
     */
    @Override
    public Long deleteByMenuIds(java.util.List<Long> menuIds) {
        return menuDao.deleteByMenuIds(menuIds);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#getMenusByVisitType
     * @see ${packageName}.service.MenuService#getMenusByVisitType
     */
    @Override
    public List<Menu> getMenusByVisitType(org.stategen.framework.lite.enums.VisitType visitType, String projectName) {
        return menuDao.getMenusByVisitType(visitType, projectName);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#getMenusByProjectName
     * @see ${packageName}.service.MenuService#getMenusByProjectName
     */
    @Override
    public List<Menu> getMenusByProjectName(String projectName) {
        return menuDao.getMenusByProjectName(projectName);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#getMenusByUserId
     * @see ${packageName}.service.MenuService#getMenusByUserId
     */
    @Override
    public List<Long> getMenusByUserId(String userId, org.stategen.framework.lite.enums.VisitType visitType) {
        return menuDao.getMenusByUserId(userId, visitType);
    }

    /**
     * 
     * @see ${packageName}.dao.MenuDao#forceUpdateById
     * @see ${packageName}.service.MenuService#forceUpdateById
     */
    @Override
    public Long forceUpdateById(Menu menu) {
        return menuDao.forceUpdateById(menu);
    }

    /*** 保存menu,有id时更新，没有id时插入,并带回新的id，返回 menu*/
    @Override
    public Menu saveMenu(Menu menu) {
        if (menu != null) {
            java.lang.Long menuId = menu.getMenuId();
            if (menuId != null) {
                insert(menu);
            } else {
                update(menu);
            }
        }
        return menu;
    }

    /*** 批量保存menus,有id时更新，没有id时插入,并带回新的id，返回 menus*/
    @Override
    public List<Menu> saveMenus(List<Menu> menus) {
        for (Menu menu : menus) {
            this.saveMenu(menu);
        }
        return menus;
    }
}