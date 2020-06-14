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
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd"
>

    <!-- ================================================================== -->
    <!--  dubbo provider configs: auto generate by dalgenx  不要手动修改本文件 -->
    <!-- 本文件由dalgen生成，任何在本文件上的手工修改将会在下次生成时被覆盖=========== -->
    <!-- ================================================================== -->
    
<#list tableConfigSet.tableConfigs as tableConfig>
    <dubbo:service timeout="10000" retries="0" registry="${systemName}-reg-addr" ref="${tableConfig.className?uncap_first}${service_name_suffix}" interface="${tableConfig.basepackage}.${service_dir_name}.${tableConfig.className}${service_name_suffix}${systemName?cap_first}"/>
</#list>
	
</beans>