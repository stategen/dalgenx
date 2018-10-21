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
<#include '/java_copyright.include'/>

package ${tableConfig.basepackage}.${dao_dir_name}.${impl_dir_name};
<#list tableConfig.sqls as sql>
    <#if sql.multiplicity = 'many'>

import java.util.List;

        <#break>
    </#if>
</#list>
import ${tableConfig.basepackage}.${pojo_dir_name}.${className}${pojo_name_suffix};
import ${tableConfig.basepackage}.${dao_dir_name}.${tableConfig.className}${dao_name_suffix};
<#list tableConfig.sqls as sql>
<#if sql.paging>
import org.stategen.framework.ibatis.util.PageQueryUtils;
import org.stategen.framework.lite.PageList;
<#break>
</#if>
</#list>

import org.springframework.dao.DataAccessException;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

<#assign table=tableConfig.table>
/**
 * ${tableConfig.className}${dao_name_suffix}
<#include '/java_description.include'/>
 * 该类仅可以修改引用
 * </pre>
 */
public class ${tableConfig.className}${dao_name_suffix}${impl_name_suffix}  extends <#if (tableConfig.autoSwitchDataSrc)>com.iwallet.biz.dal.common.AutoSwitchDataSrcSqlMapClientDaoSupport<#else>SqlMapClientDaoSupport</#if> implements ${tableConfig.className}${dao_name_suffix} {

<#list tableConfig.sqls as sql>
	/**
	 * ${sql.remarks!}
	 * sql:<#compress>${StringHelper.removeCrlf(sql.executeSql)?trim}</#compress>
	 */
<#if sql.paging || sql.multiplicity = 'many'>
    @SuppressWarnings("unchecked")
</#if>
	public <@generateResultClassName sql pojo_name_suffix/> ${sql.operation}(<@generateOperationArguments sql/>) throws DataAccessException {
		<#if sql.paramType != "object"  && !isUseParamObject(sql)>
		    <#if sql.paramType =='primitive' || sql.paramType ==''>
			  <#if (sql.params?size > 0)>
		Map<String,Object> params = new HashMap<String,Object>(${sql.params?size});
				<#list sql.params as param>
		params.put("${param.paramName}",${param.paramName?uncap_first});
				</#list>
              </#if>
			</#if>
		</#if>
		<@generateOperationMethodBody sql/>
	}

	<#if sql.paging && sql.countService>
    public Long ${sql.operation}Count(<@generateOperationArguments sql/>) throws DataAccessException {
		<#if sql.paramType != "object"  && !isUseParamObject(sql)>
			<#if sql.paramType =='primitive' || sql.paramType ==''>
				<#if (sql.params?size > 0)>
                Map<String,Object> params = new HashMap<String,Object>(${sql.params?size});
					<#list sql.params as param>
                    params.put("${param.paramName}",${param.paramName?uncap_first});
					</#list>
				</#if>
			</#if>
		</#if>
		<@generateOperationMethodCountBody sql/>
    }
	</#if>
</#list>
}

<#macro generateOperationMethodBody sql>
	<#local ibatisNamespace =tableConfig.className+'.'+systemName>
	<#if sql.params?size == 0>
		<#local paramName = 'null'>
	<#elseif sql.paramType = 'object'>
		<#local paramName = table.classNameFirstLower>
	<#elseif !(sql.paramType =='primitive' || sql.paramType =='')>
		<#local paramName>${sql.paramType?uncap_first}</#local>
	<#else>
		<#local paramName = "params">
	</#if>
	<#if sql.selectSql>
		<#if sql.paging>
			<#if isUseParamObject(sql)>
		return (<@generateResultClassName sql pojo_name_suffix/>)PageQueryUtils.pageQuery(getSqlMapClientTemplate(),"${sql.operation}.${ibatisNamespace}",${paramName});
			<#else>
		return (<@generateResultClassName sql pojo_name_suffix/>)PageQueryUtils.pageQuery(getSqlMapClientTemplate(),"${sql.operation}.${ibatisNamespace}",${paramName},pageNum,pageSize);
			</#if>
		<#elseif sql.multiplicity = 'one'>
			<#local resultClassName><@generateResultClassName sql pojo_name_suffix/></#local>
			<#if resultClassName=='short' || resultClassName=='byte' || resultClassName == 'int' || resultClassName == 'long' || resultClassName == 'float' || resultClassName == 'double' >
		Number returnObject = (Number)getSqlMapClientTemplate().queryForObject("${sql.operation}.${ibatisNamespace}",${paramName});
		if(returnObject == null)
			return (${resultClassName})0;
		else
			return returnObject.${resultClassName}Value();
			<#else>
		return (<@generateResultClassName sql pojo_name_suffix/>)getSqlMapClientTemplate().queryForObject("${sql.operation}.${ibatisNamespace}",${paramName});
			</#if>
		<#else>
		return (<@generateResultClassName sql pojo_name_suffix/>)getSqlMapClientTemplate().queryForList("${sql.operation}.${ibatisNamespace}",${paramName});
		</#if>
	</#if>
	<#if sql.deleteSql>
		<#if sql.paramType = 'object'>
		if(${paramName} == null) {
			throw new IllegalArgumentException("Can't delete by a null data object.");
		}
		</#if>
    <#if (sql.operation='delete' || sql.operation='deleteBy${sql.table.pkColumn.columnName?cap_first}s') && sql.params?size==1>
        getSqlMapClientTemplate().delete("${sql.operation}.${ibatisNamespace}", ${paramName});
        return <#list sql.params as param>${param.paramName}</#list>;
    <#else>
       return (long)getSqlMapClientTemplate().delete("${sql.operation}.${ibatisNamespace}", ${paramName});
    </#if>

	</#if>
	<#if sql.insertSql>
	  <#if sql.paramType = 'object'>
		if(${paramName} == null) {
			throw new IllegalArgumentException("Can't insert a null data object into db.");
		}
        getSqlMapClientTemplate().insert("${sql.operation}.${ibatisNamespace}", ${paramName});
		<#if sql.operation='insert'>
		return ${paramName};
		<#else>
		return ${paramName}.get${table.pkColumn.columnName?cap_first}();
		</#if>
	  <#else>
		return (Long)getSqlMapClientTemplate().insert("${sql.operation}.${ibatisNamespace}", ${paramName});
	  </#if>
	</#if>
	<#if sql.updateSql>
	   <#if sql.paramType = 'object'>
		if(${paramName} == null) {
			throw new IllegalArgumentException("Can't update by a null data object.");
		}
		</#if>
	    <#if sql.operation='update'>
        getSqlMapClientTemplate().update("${sql.operation}.${ibatisNamespace}", ${paramName});
		return ${paramName};
        <#elseif (sql.operation='delete' || sql.operation='deleteBy${sql.table.pkColumn.columnName?cap_first}s') && sql.params?size==1>
        getSqlMapClientTemplate().update("${sql.operation}.${ibatisNamespace}", ${paramName});
        return <#list sql.params as param>${param.paramName}</#list>;
        <#else>
		return (long)getSqlMapClientTemplate().update("${sql.operation}.${ibatisNamespace}", ${paramName});
	   </#if>
	</#if>
</#macro>

<#macro generateOperationMethodCountBody sql>
	<#local ibatisNamespace =tableConfig.className+'.'+systemName>
	<#if sql.params?size == 0>
		<#local paramName = 'null'>
	<#elseif sql.paramType = 'object'>
		<#local paramName = table.classNameFirstLower>
	<#elseif !(sql.paramType =='primitive' || sql.paramType =='')>
		<#local paramName>${sql.paramType?uncap_first}</#local>
	<#else>
		<#local paramName = "params">
	</#if>
		return (Long)getSqlMapClientTemplate().queryForObject("${sql.operation}.${ibatisNamespace}.count",${paramName});
</#macro>