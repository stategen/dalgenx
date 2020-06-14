<#--
    Copyright (C) 2018  niaoge<78493244@qq.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:osgi="http://www.springframework.org/schema/osgi"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
         http://www.springframework.org/schema/osgi http://www.springframework.org/schema/osgi/spring-osgi.xsd"
	default-autowire="byName">
    <!-- ======================================================================== -->
    <!--  DAO configs: auto generate by dalgenx                                   -->
    <!-- ======================================================================== -->

<#list tableConfigSet.tableConfigs as tableConfig>
    <bean id="${tableConfig.className?uncap_first}DAO" class="${tableConfig.basepackage}.ibatis.Ibatis${tableConfig.className}DAO" parent="<#if (tableConfig.autoSwitchDataSrc)>autoSwitchDataSrcBaseSqlMapClientDAO<#else>${systemName}SqlMapClientDAO</#if>"/>
</#list>
	
</beans>