/*
 * Do not remove this unless you get business authorization.
 * Copyright (c) 2016 - 2018 All Rights Reserved.
 * Powered By [stategen.dalgen]
 */
package ${packageName}.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.stategen.framework.ibatis.util.PageQueryUtils;
import org.stategen.framework.lite.PageList;

import ${packageName}.dao.MenuDao;
import ${packageName}.domain.Menu;

/**
 * MenuDao
 * <pre>
 * database table: menu
 * database table comments: Menu
 * This file is generated by <tt>dalgen</tt>, a DAL (Data Access Layer)
 *
 * 该类仅可以修改引用
 * </pre>
 */
public class MenuDaoImpl extends SqlMapClientDaoSupport implements MenuDao {

    /**
	 * 
	 * sql:insert into menu ( create_time , update_time , delete_flag , menu_id , bpid , mpid , project_name , controller_name , method_name , url , icon , name , route , visit_type , check_type ) VALUES (CURRENT_TIMESTAMP(6),CURRENT_TIMESTAMP(6),0,?,?,?,?,?,?,?,?,?,?,?,?)
	 */
    public Menu insert(Menu menu) throws DataAccessException {
        if (menu == null) {
            throw new IllegalArgumentException("Can't insert a null data object into db.");
        }
        getSqlMapClientTemplate().insert("insert.Menu.${systemName}", menu);
        return menu;
    }

    /**
	 * 
	 * sql:UPDATE menu SET delete_flag = 1 , update_time = CURRENT_TIMESTAMP(6) where delete_flag = 0 and menu_id = ?
	 */
    public Long delete(Long menuId) throws DataAccessException {
        Map<String, Object> params = new HashMap<String, Object>(1);
        params.put("menuId", menuId);
        getSqlMapClientTemplate().update("delete.Menu.${systemName}", params);
        return menuId;
    }

    /**
	 * 
	 * sql:UPDATE menu SET update_time= CURRENT_TIMESTAMP(6) , bpid = ? , mpid = ? , project_name = ? , controller_name = ? , method_name = ? , url = ? , icon = ? , name = ? , route = ? , visit_type = ? , check_type = ? where delete_flag = 0 and menu_id = ?
	 */
    public Menu update(Menu menu) throws DataAccessException {
        if (menu == null) {
            throw new IllegalArgumentException("Can't update by a null data object.");
        }
        getSqlMapClientTemplate().update("update.Menu.${systemName}", menu);
        return menu;
    }

    /**
	 * 
	 * sql:select a.menu_id, a.bpid, a.mpid, a.project_name, a.controller_name, a.method_name, a.url, a.icon, a.name, a.route, a.visit_type, a.check_type, a.create_time, a.update_time, a.delete_flag from menu a where a.delete_flag = 0 and a.menu_id = ?
	 */
    public Menu getMenuByMenuId(Long menuId) throws DataAccessException {
        Map<String, Object> params = new HashMap<String, Object>(1);
        params.put("menuId", menuId);
        return (Menu) getSqlMapClientTemplate().queryForObject("getMenuByMenuId.Menu.${systemName}", params);
    }

    /**
	 * 
	 * sql:select a.menu_id, a.bpid, a.mpid, a.project_name, a.controller_name, a.method_name, a.url, a.icon, a.name, a.route, a.visit_type, a.check_type, a.create_time, a.update_time, a.delete_flag from menu a where a.delete_flag = 0 and a.menu_id in ( ? ) and a.bpid in ( ? ) and a.mpid in ( ? ) and a.project_name like CONCAT('%',?,'%') and a.controller_name like CONCAT('%',?,'%') and a.method_name like CONCAT('%',?,'%') and a.url like CONCAT('%',?,'%') and a.name like CONCAT('%',?,'%') and a.route like CONCAT('%',?,'%') and a.visit_type in ( ? ) and a.check_type in ( ? ) and a.create_time >=? and a.create_time <? and a.update_time >=? and a.update_time <? and 0 = 1
	 */
    @SuppressWarnings("unchecked")
    public PageList<Menu> getMenuPageListByDefaultQuery(Menu menu, int pageSize, int pageNum) throws DataAccessException {
        return (PageList<Menu>) PageQueryUtils.pageQuery(getSqlMapClientTemplate(), "getMenuPageListByDefaultQuery.Menu.${systemName}", menu, pageNum, pageSize);
    }

    /**
	 * 
	 * sql:select a.menu_id, a.bpid, a.mpid, a.project_name, a.controller_name, a.method_name, a.url, a.icon, a.name, a.route, a.visit_type, a.check_type, a.create_time, a.update_time, a.delete_flag from menu a where a.delete_flag = 0 and a.menu_id in ( ? )
	 */
    @SuppressWarnings("unchecked")
    public List<Menu> getMenusByMenuIds(java.util.List<Long> menuIds) throws DataAccessException {
        Map<String, Object> params = new HashMap<String, Object>(1);
        params.put("menuIds", menuIds);
        return (List<Menu>) getSqlMapClientTemplate().queryForList("getMenusByMenuIds.Menu.${systemName}", params);
    }

    /**
	 * 
	 * sql:UPDATE menu SET delete_flag = 1 , update_time = CURRENT_TIMESTAMP(6) where delete_flag = 0 and menu_id in ( ? )
	 */
    public java.util.List<Long> deleteByMenuIds(java.util.List<Long> menuIds) throws DataAccessException {
        Map<String, Object> params = new HashMap<String, Object>(1);
        params.put("menuIds", menuIds);
        getSqlMapClientTemplate().update("deleteByMenuIds.Menu.${systemName}", params);
        return menuIds;
    }

    /**
	 * 
	 * sql:select a.menu_id, a.mpid, a.bpid, a.project_name, a.controller_name, a.method_name, a.url, a.icon, a.name, a.route, a.visit_type, a.check_type, a.create_time, a.update_time, a.delete_flag from menu a where a.visit_type=? and a.project_name=? and a.delete_flag = 0
	 */
    @SuppressWarnings("unchecked")
    public List<Menu> getMenusByVisitType(org.stategen.framework.lite.enums.VisitType visitType, String projectName) throws DataAccessException {
        Map<String, Object> params = new HashMap<String, Object>(2);
        params.put("visitType", visitType);
        params.put("projectName", projectName);
        return (List<Menu>) getSqlMapClientTemplate().queryForList("getMenusByVisitType.Menu.${systemName}", params);
    }

    /**
	 * 
	 * sql:select a.menu_id, a.mpid, a.bpid, a.project_name, a.controller_name, a.method_name, a.url, a.icon, a.name, a.route, a.visit_type, a.check_type, a.create_time, a.update_time, a.delete_flag from menu a where a.project_name=?
	 */
    @SuppressWarnings("unchecked")
    public List<Menu> getMenusByProjectName(String projectName) throws DataAccessException {
        Map<String, Object> params = new HashMap<String, Object>(1);
        params.put("projectName", projectName);
        return (List<Menu>) getSqlMapClientTemplate().queryForList("getMenusByProjectName.Menu.${systemName}", params);
    }

    /**
	 * 
	 * sql:select a.menu_id from menu a left join role_menu rm on rm.menu_id=a.menu_id left JOIN role r on r.role_id=rm.role_id left JOIN user_role ur on ur.role_id =r.role_id where a.delete_flag = 0 and rm.delete_flag=0 and r.delete_flag=0 and ur.delete_flag=0 and ur.user_id=? and a.visit_type=?
	 */
    @SuppressWarnings("unchecked")
    public List<Long> getMenusByUserId(String userId, org.stategen.framework.lite.enums.VisitType visitType) throws DataAccessException {
        Map<String, Object> params = new HashMap<String, Object>(2);
        params.put("userId", userId);
        params.put("visitType", visitType);
        return (List<Long>) getSqlMapClientTemplate().queryForList("getMenusByUserId.Menu.${systemName}", params);
    }

    /**
	 * 
	 * sql:UPDATE menu SET update_time= CURRENT_TIMESTAMP(6) ,mpid = ? ,bpid = ? ,project_name = ? ,controller_name = ? ,method_name = ? ,url = ? ,icon = ? ,name = ? ,route = ? ,visit_type = ? ,check_type = ? ,delete_flag = ? where menu_id = ?
	 */
    public Long forceUpdateById(Menu menu) throws DataAccessException {
        if (menu == null) {
            throw new IllegalArgumentException("Can't update by a null data object.");
        }
        return (long) getSqlMapClientTemplate().update("forceUpdateById.Menu.${systemName}", menu);
    }
}
