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

package ${tableConfig.basepackage}.${dao_dir_name};
<#list tableConfig.sqls as sql>
    <#if sql.multiplicity = 'many'>

import java.util.List;

        <#break>
    </#if>
</#list>
import ${tableConfig.basepackage}.${pojo_dir_name}.${className}${pojo_name_suffix};
import org.springframework.dao.DataAccessException;
<#list tableConfig.sqls as sql>
<#if sql.paging>
import org.stategen.framework.lite.PageList;
<#break>
</#if>
</#list>

/**
 * ${tableConfig.className}${dao_name_suffix}
<#include '/java_description.include'/>
<#include 'table.include.ftl'>

 * 该类仅可以修改引用
 * </pre>
 */
public interface ${tableConfig.className}${dao_name_suffix} {

<@levelColumnNames/>
<#assign levelVars =[levelPkName!,onwerPkName!,inclLevelPkName!]>
<#list tableConfig.sqls as sql>
    <#assign isObject=(sql.paramType = 'object')/>
	/**
    <pre>
    <#assign appended=false>
    <#list sql.params as param>
    <#if levelVars?seq_contains(param.paramName)>
        <#continue>
    </#if>
    <#assign paramName =StringHelper.toXML(param.simple)>
    <#assign column = param.column>
    <#if paramName?starts_with("List")>
        <#assign paramName ='Array'+ paramName>
    </#if>
    <#if appended>
    ,<#lt>
    </#if>
    &#64;ApiParam(<#if !isObject && column??>"${column.title}"</#if>) &#64;RequestParam(required = false<#if param.listParam>, name="${param.paramName?uncap_first}"</#if>) ${paramName} ${param.paramName?uncap_first}<#rt>
    <#assign appended=true>
    </#list>
    <#if isObject>

    ,&#64;ApiParam(hidden = true) ${tableConfig.className} ${tableConfig.className?uncap_first}
    </#if>
    <#if sql.paging>,Pagination pagination</#if>
    </pre>
	 * ${sql.remarks!}
	 * sql:<#compress>${StringHelper.removeCrlf(sql.executeSql)?trim}</#compress>
	 */
	public <@generateResultClassName sql pojo_name_suffix/> ${sql.operation}(<@generateOperationArguments sql/>) throws DataAccessException;
	
	<#if sql.paging && sql.countService>
	public Long ${sql.operation}Count(<@generateOperationArguments sql/>) throws DataAccessException;
	</#if>
</#list>

}



