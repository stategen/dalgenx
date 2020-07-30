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

package ${tb.basepackage}.${service_dir_name}.${impl_dir_name};
<#list tb.sqls as sql>
    <#if sql.multiplicity = 'many'>

import java.util.List;

        <#break>
    </#if>
</#list>
import java.util.List;
import java.util.Collection;
import java.util.function.BiConsumer;
import java.util.function.Function;

import javax.annotation.Resource;


<#list tb.sqls as sql>
<#if sql.paging>

import org.stategen.framework.lite.PageList;
<#break>
</#if>
</#list>
<#if isLevelAuth()>
import org.springframework.beans.factory.annotation.Autowired;
import org.stategen.framework.cache.BaseCacheTaker;
import org.stategen.framework.util.AfterInsertService;
import org.stategen.framework.util.BusinessAssert;
</#if>
import org.stategen.framework.lite.IdGenerateService;
import org.stategen.framework.lite.IIdGenerator;
<#if levelPkColumn??>
import ${tb.basepackage}.${pojo_dir_name}.${tb.className}${levelSubfixClz};
import ${tb.basepackage}.${service_dir_name}.${tb.className}${levelSubfixClz}${service_name_suffix};
</#if>
<#if ownerPkColumn??>
import ${tb.basepackage}.${pojo_dir_name}.${tb.className}${ownerSubfixClz};
import ${tb.basepackage}.${service_dir_name}.${tb.className}${ownerSubfixClz}${service_name_suffix};
</#if>

import org.stategen.framework.util.ServiceUtil;

<#if tb.pkColumn.simpleJavaType=="String">
import org.stategen.framework.util.StringUtil;
</#if>

import ${tb.basepackage}.${pojo_dir_name}.${className}${pojo_name_suffix};
import ${tb.basepackage}.${service_dir_name}.${tb.className}${service_name_suffix}${internal_service_suffix};
import ${tb.basepackage}.${dao_dir_name}.${tb.className}${dao_name_suffix};

/**
 * ${tb.className}${service_name_suffix}${impl_name_suffix}
<#include '/java_description.include'/>
 * 新生成的类中的方法，只有在不同名的情况下才会被追加到该类下，
 * 因此该类可以修改任何部分
 * </pre>
 */
public class ${tb.className}${service_name_suffix}${impl_name_suffix}  implements ${tb.className}${service_name_suffix}${internal_service_suffix}<#if isLevelAuth()>, AfterInsertService<${tb.className}></#if>, IdGenerateService<${tb.pkColumn.simpleJavaType}> {

    @Resource(name="${tb.className?uncap_first}${dao_name_suffix}")
    private ${tb.className}${dao_name_suffix} ${tb.className?uncap_first}${dao_name_suffix};

    @Resource
    private IIdGenerator idGenerator;
<#if levelPkColumn??>

    @Resource()
    private ${tb.className}${levelSubfixClz}${service_name_suffix} ${tb.className?uncap_first}${levelSubfixClz}${service_name_suffix};
</#if>
<#if ownerPkColumn??>

    @Resource()
    private ${tb.className}${ownerSubfixClz}${service_name_suffix} ${tb.className?uncap_first}${ownerSubfixClz}${service_name_suffix};
</#if>

    @Override
    public <T> ${tb.pkColumn.simpleJavaType} generateId(Class<T> bizTagClz){
       return this.idGenerator.generateId(${tb.pkColumn.simpleJavaType}.class, bizTagClz);
    }
<#if isLevelAuth()>

    @Autowired
    private BaseCacheTaker<LoginCookieNames> baseCacheTaker;

    <#macro insertLevelToLevelTable pkCol subfix>
        ${pkCol.simpleJavaType} ${getCurName(pkCol)} = baseCacheTaker.get(LoginCookieNames.${getCurName(pkCol)}, ${pkCol.simpleJavaType}.class);
        BusinessAssert.mustNotNull(${getCurName(pkCol)}, "${getCurName(pkCol)} connot be null");
        <#assign levelClass>${tb.className}${subfix}</#assign>
        ${levelClass} ${levelClass?uncap_first} = new ${tb.className}${subfix}();
        ${levelClass?uncap_first}.set${tb.pkColumn.columnName?cap_first}(${tb.pkColumn.columnName});
        ${levelClass?uncap_first}.set${pkCol.columnName?cap_first}(${getCurName(pkCol)});
        this.${levelClass?uncap_first}${service_name_suffix}.insert(${levelClass?uncap_first});
    </#macro>
    @Override
    public void afterInsert(${tb.className} ${tb.className?uncap_first}){
    <#assign pk></#assign>
    ${tb.pkColumn.simpleJavaType} ${tb.pkColumn.columnName} = ${tb.className?uncap_first}.get${tb.pkColumn.columnName?cap_first}();

    <#if levelPkColumn??>
        //--${tb.sqlName}${levelSubfix}
        <@insertLevelToLevelTable levelPkColumn levelSubfixClz/>
    </#if>


    <#if ownerPkColumn??>
        //--${tb.sqlName}${ownerSubfix}
        <@insertLevelToLevelTable ownerPkColumn ownerSubfixClz/>
    </#if>
    }
</#if>

<#list tb.sqls as sql>
    /**
     * ${sql.remarks!}
     * @see ${tb.basepackage}.${dao_dir_name}.${tb.className}${dao_name_suffix}#${sql.operation}
    <#if sql.facade>
     * @see ${tb.basepackage}.${service_dir_name}.${tb.className}${service_name_suffix}#${sql.operation}
     </#if>
     * @see ${tb.basepackage}.${service_dir_name}.${tb.className}${service_name_suffix}${internal_service_suffix}#${sql.operation}
     */
    <#assign returnClazzName><@generateResultClassName sql pojo_name_suffix/></#assign>
    @Override
    public ${returnClazzName} ${sql.operation}(<@generateOperationArguments sql/>) {
        return ${tb.className?uncap_first}Dao.${sql.operation}(<@generateOperationParams sql/><#if sql.operation='insert'>, this</#if><#if isInsertAndLevelAuth(sql)>, this</#if>);
    }

    <#if levelPkColumn?? && "${sql.operation}"=="get${tb.className}sBy${pkColumn.columnName?cap_first}s">

    /**
     * @see ${tb.basepackage}.${service_dir_name}.${tb.className}${service_name_suffix}#${sql.operation}
     */
    <@levelColumnNames/>
    @Override
    public <@generateResultClassName sql pojo_name_suffix/> ${sql.operation}<@nullLevelIdsubfix (levelPkColumn?? || ownerPkColumn??)/>(<@generateOperationArgumentsExclude sql levelPkName inclLevelPkName onwerPkName/>) {
        return ${sql.operation}(<@generateOperationParamsExclude sql levelPkName inclLevelPkName, onwerPkName/>);
    }
    </#if>

    <#if sql.paging && sql.countService>
    @Override
    public Long ${sql.operation}Count(<@generateOperationArguments sql/>) {
        return ${tb.className?uncap_first}Dao.${sql.operation}Count(<@generateOperationParams sql/>);
    }    
    </#if>
</#list>

    <#assign pojoName>${tb.className?uncap_first}</#assign>
    /*** 保存${pojoName},有id时更新，没有id时插入,并带回新的id，返回 ${pojoName}*/
    @Override
    public ${tb.className} save${tb.className}(${tb.className} ${pojoName}){
        if (${pojoName} != null) {
            <#assign pkName =pkColumn.columnName?uncap_first>
            ${pkColumn.javaType} ${pkName} = ${pojoName}.get${pkName?cap_first}();
            if (<#if pkColumn.javaType=="java.lang.String">StringUtil.isBlank(${pkName})<#else>${pkName} != null</#if>) {
                insert(${pojoName});
            } else {
                update(${pojoName});
            }
        }
        return ${pojoName};
    }

    /*** 批量保存${pojoName}s,有id时更新，没有id时插入,并带回新的id，返回 ${pojoName}s*/
    @Override
    public List<${tb.className}> save${tb.className}s(List<${tb.className}> ${pojoName}s) {
        for (${tb.className} ${pojoName} : ${pojoName}s) {
            this.save${tb.className}(${pojoName});
        }
        return ${pojoName}s;
    }

    <#if !tb.isSimple>
    <#assign bean>${tb.className}</#assign>
    <#assign type>${tb.pkColumn.shortJavaType}</#assign>
    <#assign id>${tb.pkColumn.columnName}</#assign>
    @Override
    public <D> void assignBeanTo(Collection<D> dests, Function<? super D, ${type}> destGetMethod, BiConsumer<D, ${tb.className}> destSetMethod) {
        ServiceUtil.interalAssignBeanTo(dests, destGetMethod, destSetMethod, this, ${bean}ServiceImpl::get${bean}sBy${id?cap_first}s<@nullLevelIdsubfix (levelPkColumn?? || ownerPkColumn??)/>, ${bean}::get${id?cap_first});
    }

    @Override
    public <D, G> void assignBeansTo(Collection<D> dests,Function<? super D, G> destGetMethod,BiConsumer<D, List<${bean}>> destSetMethod, BiConsumer<${bean},List<G>> resultSetQueryIdsFun, Function<? super ${bean}, G> resultGetGoupIdFun) {
        ServiceUtil.interalAssignBeansTo(dests, destGetMethod, destSetMethod, this, new ${bean}(), resultSetQueryIdsFun, resultGetGoupIdFun, 100);
    }

    @Override
    public <D> void mergeBeanTo(Collection<D> dests, Function<? super D, ${type}> destGetMethod) {
        ServiceUtil.interalMergeBeanTo(dests, destGetMethod, this, ${bean}ServiceImpl::get${bean}sBy${id?cap_first}s<@nullLevelIdsubfix (levelPkColumn?? || ownerPkColumn??)/>, ${bean}::get${id?cap_first});
    }
    </#if>

}