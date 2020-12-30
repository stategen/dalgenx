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
package ${tableConfig.basepackage}.${controller_dir_name};${putJavaType('isController')}

/**
 * ${tableConfig.className}${controller_name_suffix}
 * <pre>
<#include '/java_description.include'/>
 * 新生成的类中的方法，只有在不同名的情况下才会被追加到该类下，因此该类可以修改任何部分
 * 在虚类中最好不要定义@RequestMapping，考虑到多个继承后不知道是哪端被调用了。
 * </pre>
 */

@ApiConfig(name = "${tableConfig.remarks!}")
public class ${tableConfig.className}${controller_name_suffix} extends ${tableConfig.className}${controller_name_suffix}${base_name_suffix} {
<#assign getPageList>getPageList</#assign>
<#assign insert>insert</#assign>
<#assign delete>delete</#assign>
<#assign update>update</#assign>
<#assign deleteByIds>deleteBy${table.pkColumn.columnName?cap_first}s</#assign>
<#list tableConfig.sqls as sql>
    <#assign doApi=false/>
    <#assign isPageList=false>
    <#assign isInsert=false>
    <#assign isDelete=false>
    <#assign isUpdate=false>
    <#assign isdeleteByIds=false>
    <#assign genForm =false>
    <#assign doArea =false>
    <#assign opt=''>
    <#if sql.operation=getPageList>
        <#assign doApi=true/>
        <#assign isPageList=true/>
        <#assign opt='FULL_REPLACE'>
        <#assign genForm=true>
    <#elseif sql.operation=insert>
        <#assign doApi=true/>
        <#assign isInsert=true/>
        <#assign genForm=true>
    <#elseif sql.operation=update>
        <#assign doApi=true/>
        <#assign isUpdate=true/>
        <#assign genForm=true>
    <#elseif sql.operation=delete>
        <#assign doApi=true/>
        <#assign isDelete=true/>
        <#assign doArea=true/>
        <#assign opt='DELETE_IF_EXIST'>
    <#elseif sql.operation=deleteByIds>
        <#assign doApi=true/>
        <#assign isdeleteByIds=true/>
        <#assign doArea=true/>
        <#assign opt='DELETE_IF_EXIST'>
    </#if>
    <#if doApi>

        <#assign isObject=(sql.paramType = 'object')/>
    @ApiRequestMappingAutoWithMethodName(name = "${sql.remarks!}")
    <#assign stateParams></#assign>
        <#if isPageList>
    <#assign stateParams>${appendParam(stateParams,'init = true')}</#assign>
        </#if>
        <#if opt?length gt 0>
    <#assign stateParams>${appendParam(stateParams,'dataOpt = DataOpt.'+opt)}</#assign>
        </#if>
    <#if doArea>
        <#assign stateParams>${appendParam(stateParams,"area="+className+".class")}</#assign>
    </#if>
    @State(${stateParams})
    <#if isPageList>
    @ExcludeBeanRule(NotNull.class)
    </#if>
    <#if genForm>
    @GenForm
    </#if>
	public <@generateResultClassName sql pojo_name_suffix/> ${sql.operation}(
        <#list sql.params as p>
        <#assign paramName =p.simple>
        <#assign column = p.column>
        <#if paramName?starts_with("List")>
            <#assign paramName ='Array'+ paramName>
        </#if>
        @ApiParam(<#if !isObject && column??></#if>)<#if p.listParam> @RequestParam(required =false,name="${p.paramName?uncap_first}")</#if> ${paramName} ${p.paramName?uncap_first}<#if p_has_next || isObject>,</#if>
    </#list>
        <#if isObject>
        @ApiParam(hidden = true) ${tableConfig.className} ${tableConfig.className?uncap_first}
        </#if>
        <#if sql.paging>
        ,Pagination pagination
        </#if>
    ){
        <#if isPageList>
        ${className?uncap_first}.setCreateTimeMax(DatetimeUtil.current());
        //技巧，api参数 .在dao中已自动化生成,从以下get${className}PageList 帮助文件中 点开See also直接复制过来，
        PageList<${className}> ${className?uncap_first}List = this.${className?uncap_first}Service.getPageList(${className?uncap_first}, pagination.getPageSize(), pagination.getPage());
        return ${className?uncap_first}List;
        <#elseif isInsert>
        this.${className?uncap_first}Service.insert(${className?uncap_first});
        return ${className?uncap_first};
        <#elseif isUpdate>
        ${className} org${className} = this.${className?uncap_first}Service.get${className}By${table.pkColumn.columnName?cap_first}(${table.pkColumn.columnName?uncap_first});
        BusinessAssert.mustNotNull(org${className}, "${tableConfig.remarks!}不存在");
        CopyUtil.merge(org${className}, ${className?uncap_first});
        this.${className?uncap_first}Service.update(org${className});
        return org${className};
        <#elseif isDelete>
        return this.${className?uncap_first}Service.delete(${table.pkColumn.columnName});
        <#elseif isdeleteByIds>
        return this.${className?uncap_first}Service.deleteBy${table.pkColumn.columnName?cap_first}s(${table.pkColumn.columnName?uncap_first}s);
        </#if>
    }

  </#if>
</#list>
}



