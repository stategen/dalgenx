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
<!DOCTYPE sqlMap PUBLIC "-//ibatis.apache.org//DTD SQL Map 2.0//EN" 
    "http://ibatis.apache.org/dtd/sql-map-2.dtd">
<#assign className=tableConfig.className/>    
<#assign classNameLowerCase=tableConfig.className?lower_case/>    
<#assign nameSpace>${tableConfig.className}.${systemName}</#assign>
<!-- 本文件由dalgen生成，任何在本文件上的手工修改将会在下次生成时被覆盖 -->
<sqlMap>

	<#-- add jdbcType for resultMap -->
	<#assign pojo_package_name =tableConfig.basepackage+'.'+pojo_dir_name>
	<#assign commonBeanClass>${tableConfig.basepackage}.${pojo_dir_name}.${tableConfig.className}${pojo_name_suffix}</#assign>  
    <#list tableConfig.resultMaps as resultMap>
    <resultMap id="${resultMap.name}" class="${commonBeanClass}">
    <#list resultMap.columns as column>
    	<#if column.javaType?ends_with('Money')>
        <result property="${column.name}.cent" column="${column.name}" javaType="long" nullValue="0" />
    	<#else>
        <result property="${column.name}" column="${column.name}" javaType="${column.javaType}"  <#if column.hasNullValue> nullValue="${column.nullValue}" </#if> />
    	</#if>
	</#list>
    </resultMap>
	</#list>

    <#assign commonResultMap=tableConfig.className+'.'+systemName+'.RM'>
    <resultMap id="${commonResultMap}" class="${commonBeanClass}">
        <#list tableConfig.table.columns as column>
    	<#if column.javaType?ends_with('Money')>
        <result property="${column.columnName}.cent" column="${column.sqlName}" javaType="long" jdbcType="${column.jdbcSqlTypeName}" nullValue="0" />
    	<#else>
        <result property="${column.columnName}" column="${column.sqlName}" javaType=<#if column.javaType=='byte[]'>"[B"<#else>"${column.javaType}"</#if> jdbcType="${column.jdbcSqlTypeName}" <#if column.hasNullValue> nullValue="${column.nullValue}" </#if> />
    	</#if>
		</#list>
    </resultMap>
    
<#list tableConfig.includeSqls as item>
	<sql id="${item.id}">
		${item.sql?trim}
	</sql>
		
</#list>

<#list tableConfig.sqls as sql>	
<#if sql.selectSql>
    <#assign customResultMap=commonResultMap>
    <#assign resultClass=sql.resultClass>
	<#if (sql.columnsCount > 1) && !sql.fullColumns>
	    <#assign customResultMap=sql.operation+'.'+sql.resultClassName+'.'+systemName+'.RM'>
        <#assign resultClass=generateSelectResultClass(sql,pojo_package_name)>
    <resultMap id="${customResultMap}" class="${resultClass}">
    	<#list sql.columns as column>
    	<#if column.javaType?ends_with('Money')>
        <result property="${column.columnName}.cent" column="${column.sqlName}" javaType="long" jdbcType="${column.jdbcSqlTypeName}" nullValue="0" />
    	<#else>
        <result property="${column.columnName}" column="${column.sqlName}" javaType="${column.javaType}" jdbcType="${column.jdbcSqlTypeName}" <#if column.hasNullValue> nullValue="${column.nullValue}" </#if> />
    	</#if>
    	</#list>
    </resultMap>
	</#if>
	
	<#assign selectSqlId>${sql.operation}.${nameSpace}</#assign>
	<select id="${selectSqlId}" <@genResultMapOrResultClassForSelectSql sql/> >
    	<#if sql.hasSqlMap>
    	${StringHelper.insertTokenIntoSelectSql(CompatibleHelper.replaceColumnCase(sql.sqlmap),(' /* '+selectSqlId+' */ '))}
    	<#if sql.paging>limit #offset#,#limit#</#if>
    	<#else>
    	<@genPageQueryStart sql/>
    	${StringHelper.insertTokenIntoSelectSql(CompatibleHelper.replaceColumnCase(sql.ibatisSql)?trim,(' /* '+selectSqlId+' */ '))}
    	<@genPageQueryEnd sql/>    	
    	</#if>
	</select>	

	<#assign selectSqlIdForPaging>${sql.operation}.${nameSpace}.count</#assign>
	<#if sql.paging>
	<select id="${selectSqlIdForPaging}" resultClass="long" >
		<#if sql.hasSqlMap>
    	${StringHelper.insertTokenIntoSelectSql(StringHelper.removeIbatisOrderBy(CompatibleHelper.replaceColumnCase(sql.sqlmapCountSql)?trim),(' /* '+selectSqlIdForPaging+' */ '))}
    	<#else>
    	${StringHelper.insertTokenIntoSelectSql(StringHelper.removeIbatisOrderBy(CompatibleHelper.replaceColumnCase(sql.ibatisCountSql)?trim),(' /* '+selectSqlIdForPaging+' */ '))}
    	</#if>
	</select>
	</#if>
	    
</#if>
	
<#if sql.updateSql>
	<update id="${sql.operation}.${nameSpace}">
		<#if sql.hasSqlMap>
		${CompatibleHelper.replaceColumnCase(sql.sqlmap)}
		<#else>
		${CompatibleHelper.replaceColumnCase(sql.ibatisSql)?trim}
		</#if>
	</update>
</#if>
	
<#if sql.deleteSql>
	<delete id="${sql.operation}.${nameSpace}">
		<#if sql.hasSqlMap>
		${CompatibleHelper.replaceColumnCase(sql.sqlmap)}
		<#else>
		${CompatibleHelper.replaceColumnCase(sql.ibatisSql)?trim}
		</#if>
    </delete>
</#if>
    
<#if sql.insertSql>
	<insert id="${sql.operation}.${nameSpace}">
		<#if sql.hasSqlMap>
		${CompatibleHelper.replaceColumnCase(sql.sqlmap)}
        <#else>             
		${CompatibleHelper.replaceColumnCase(sql.ibatisSql)?trim}
        </#if>
	</insert>
</#if>
</#list>

</sqlMap>

<#macro genResultMapOrResultClassForSelectSql sql>
	<#compress>
	<#if sql.hasResultMap>
		resultMap="${sql.resultMap}"
	<#elseif sql.columnsCount == 1>
		resultClass="${sql.resultClass}"
	<#else>
		resultMap="${customResultMap}"
	</#if>
	</#compress>
</#macro>

<#macro genSelectKeyForInsertSql sql>
	<#if !sql.insertSql>
		<#return>
    </#if>
    <#if (sql.hasSqlMap && sql.sqlmap?contains("</selectKey>")) || sql.ibatisSql?contains("</selectKey>")>
    	<#return>
    </#if>  
    <#if databaseType == 'oracle'>
        <#if tableConfig.sequence??>
		<selectKey resultClass="${tableConfig.pkColumn.javaType}" type="pre" keyProperty="${tableConfig.pkColumn.columnNameLower}" >
            SELECT ${tableConfig.sequence}.nextval FROM DUAL
        </selectKey>
        </#if>         
    </#if>
    <#if databaseType == 'mysql'>
		<selectKey resultClass="${tableConfig.pkColumn.javaType}" type="post" keyProperty="${tableConfig.pkColumn.columnNameLower}" >
            select last_insert_id()
    	</selectKey>        
    </#if> 
    <#if databaseType == 'sqlserver'>
		<selectKey resultClass="${tableConfig.pkColumn.javaType}" type="post" keyProperty="${tableConfig.pkColumn.columnNameLower}" >
            SELECT  @@identity  AS  ID
        </selectKey>        
    </#if>                     
</#macro>

<#-- for generate page query -->
<#macro genPageQueryStart sql>
	<#if !sql.paging>
		<#return>
	</#if>
	<#if databaseType == 'oracle'>
			select * from (select T1.*, rownum linenum from (
	</#if>
</#macro>
<#macro genPageQueryEnd sql>
	<#if !sql.paging>
		<#return>
	</#if>
	<#if databaseType == 'oracle'>
			) T1 where rownum &lt;= #endRow# ) T2 where linenum &gt;= #startRow#
	</#if>
	<#if databaseType == 'mysql'>
			limit #offset#,#limit#
	</#if>
	<#if databaseType == 'postgresql'>
			offset #offset# limit #limit#
	</#if>		
</#macro>
