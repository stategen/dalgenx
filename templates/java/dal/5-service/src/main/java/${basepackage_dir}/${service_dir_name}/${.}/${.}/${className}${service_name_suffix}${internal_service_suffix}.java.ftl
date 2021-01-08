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
<#include 'table.include.ftl'>

<#assign tb=tableConfig>
package ${tb.basepackage}.${service_dir_name};${putJavaType('isServiceInternal')}
<#list tb.sqls as sql>
    <#if sql.multiplicity = 'many'>

import java.util.List;

        <#break>
    </#if>
</#list>
import ${tb.basepackage}.${pojo_dir_name}.${className}${pojo_name_suffix};

<#list tb.sqls as sql>
<#if sql.paging>
import org.stategen.framework.lite.PageList;
<#if !tb.isSimple>
import org.stategen.framework.util.AssignService;
</#if>
import org.stategen.framework.util.BaseService;
<#break>
</#if>
</#list>

/**
 * ${tb.className}${service_name_suffix}
 * @author StageGen.org 
 * <pre>
<#include '/java_description.include'/>
 * 新生成的类中的方法，只有在不同名的情况下才会被追加到该类下，
 * 因此该类可以修改任何部分
 * </pre>
 */
public interface ${tb.className}${service_name_suffix}${internal_service_suffix} extends ${tb.className}${service_name_suffix}${systemName?cap_first}<#if !tb.isSimple>, AssignService<${tb.className}, ${tb.pkColumn.shortJavaType}></#if>, BaseService<${tb.className}> {

<#list tb.sqls as sql>
    /**
     ** ${sql.remarks!}
     * @see ${tb.basepackage}.${dao_dir_name}.${tb.className}${dao_name_suffix}#${sql.operation}
    <#if sql.facade>
     * @see ${tb.basepackage}.${service_dir_name}.${tb.className}${service_name_suffix}#${sql.operation}
    </#if>
     */
    public <@generateResultClassName sql pojo_name_suffix/> ${sql.operation}(<@generateOperationArguments sql/>);
    <#if levelPkColumn?? && "${sql.operation}"=="get${tb.className}sBy${pkColumn.columnName?cap_first}s">

    /**
     * @see ${tb.basepackage}.${service_dir_name}.${tb.className}${service_name_suffix}#${sql.operation}
     */
    <@levelColumnNames/>
    public <@generateResultClassName sql pojo_name_suffix/> ${sql.operation}<@nullLevelIdsubfix (levelPkColumn?? || ownerPkColumn??)/>(<@generateOperationArgumentsExclude sql levelPkName inclLevelPkName onwerPkName/>);
    </#if>

    <#if sql.paging && sql.countService>
    public Long ${sql.operation}Count(<@generateOperationArguments sql/>);     
    </#if>
</#list>

   <#assign pojoName>${tb.className?uncap_first}</#assign>
    /*** 保存${pojoName},有id时更新，没有id时插入,并带回新的id，返回 ${pojoName}
     * @see ${tb.basepackage}.${dao_dir_name}.${tb.className}${dao_name_suffix}#insert
     */
    public ${tb.className} save${tb.className}(${tb.className} ${pojoName});

    /** 批量保存${pojoName}s,有id时更新，没有id时插入,并带回新的id，返回 ${pojoName}s
     * @see ${tb.basepackage}.${dao_dir_name}.${tb.className}${dao_name_suffix}#insert
     */
    public List<${tb.className}> save${tb.className}s(List<${tb.className}> ${pojoName}s);
}



