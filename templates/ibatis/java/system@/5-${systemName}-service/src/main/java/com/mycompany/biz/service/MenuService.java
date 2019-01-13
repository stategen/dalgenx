/*
 * Copyright (c) 2016 - 2116 All Rights Reserved.
 * Powered By [rapid-generator]
 */
package com.mycompany.biz.service;

import java.util.List;

import org.stategen.framework.lite.PageList;
import org.stategen.framework.util.AssignSerice;

import com.mycompany.biz.domain.Menu;

/**
 * MenuServiceFacade
 * <pre>
 * database table: visit
 * database table comments: IMenu
 * This file is generated by <tt>dalgen</tt>, a DAL (Data Access Layer)
 *
 * 新生成的类中的方法，只有在不同名的情况下才会被追加到该类下，
 * 因此该类可以修改任何部分
 * </pre>
 */
public interface MenuService extends AssignSerice<Menu, Long>, MenuServiceTrade {

    String getProjectName();

    public List<Menu> updateMenus(List<Menu> allControllerMenus);

    public List<Menu> getAllMenus();

    //<#--
    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#insert
     */
    public Menu insert(Menu menu);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#update
     */
    public Menu update(Menu menu);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#getMenuByMenuId
     */
    public Menu getMenuByMenuId(Long menuId);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#getMenusByMenuIds
     */
    public List<Menu> getMenusByMenuIds(java.util.List<Long> menuIds);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#deleteByMenuIds
     */
    public List<Long> deleteByMenuIds(java.util.List<Long> menuIds);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#getMenusByUserId
     */
    public List<Long> getMenusByUserId(String userId, org.stategen.framework.lite.enums.MenuType menuType);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#forceUpdateById
     */
    public Long forceUpdateById(Menu menu);

    /*** 保存menu,有id时更新，没有id时插入,并带回新的id，返回 menu*/
    public Menu saveMenu(Menu menu);

    /*** 批量保存menus,有id时更新，没有id时插入,并带回新的id，返回 menus*/
    public List<Menu> saveMenus(List<Menu> menus);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#delete
     */
    public Long delete(Long menuId);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#getMenuPageList
     */
    public PageList<Menu> getMenuPageList(Menu menu, int pageSize, int pageNum);

    /**
     * 
     * @see com.mycompany.biz.dao.MenuDao#getMenusByProjectName
     */
    public List<Menu> getMenusByProjectName(String projectName, org.stategen.framework.lite.enums.MenuType menuType);
    //-->
    //
}
