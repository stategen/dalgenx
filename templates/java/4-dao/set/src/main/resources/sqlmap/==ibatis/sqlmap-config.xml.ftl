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
<!DOCTYPE sqlMapConfig PUBLIC "-//ibatis.apache.org//DTD SQL Map Config 2.0//EN" 
    "http://ibatis.apache.org/dtd/sql-map-config-2.dtd">
<!-- =========================================================== -->
<!-- sqlMapConfig for ibatis sqlmap mapping===================== -->
<!-- =========================================================== -->
<sqlMapConfig>
<!-- ============================================================= -->
<!-- 相关 typeHandler 请配置在gen_config.xml内，不要在此处修改======= -->
<!-- 本文件由dalgen生成，任何在本文件上的手工修改将会在下次生成时被覆盖 -->
<!-- ============================================================= -->
    <settings cacheModelsEnabled="true"
              enhancementEnabled="false"
              lazyLoadingEnabled="false"
              maxRequests="3000"
              maxSessions="3000"
              maxTransactions="3000"
              useStatementNamespaces="false" />

${ibatisTypeHandlers}

    <sqlMap resource="sqlmap/mapping/_common-sqlmap-mapping.xml" />
    <#list tableConfigSet.tableConfigs as tableConfig>
    <sqlMap resource="sqlmap/mapping/${tableConfig.className}-sqlmap-mapping.xml" />
    </#list>
</sqlMapConfig>
