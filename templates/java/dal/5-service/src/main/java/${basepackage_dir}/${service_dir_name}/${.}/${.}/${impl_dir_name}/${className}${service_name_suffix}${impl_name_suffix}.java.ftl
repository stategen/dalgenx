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

package ${tableConfig.basepackage}.${service_dir_name}.${impl_dir_name};
<#list tableConfig.sqls as sql>
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


<#list tableConfig.sqls as sql>
<#if sql.paging>

import org.stategen.framework.lite.PageList;
<#break>
</#if>
</#list>

import org.stategen.framework.util.ServiceUtil;
<#list tableConfig.table.pkColumns as clm>
    <#assign pkColumn=clm>
</#list>
<#if pkColumn.javaType=="java.lang.String">
import org.stategen.framework.util.StringUtil;
</#if>

import ${tableConfig.basepackage}.${pojo_dir_name}.${className}${pojo_name_suffix};
import ${tableConfig.basepackage}.${service_dir_name}.${tableConfig.className}${service_name_suffix}${internal_service_suffix};
import ${tableConfig.basepackage}.${dao_dir_name}.${tableConfig.className}${dao_name_suffix};

/**
 * ${tableConfig.className}${service_name_suffix}${impl_name_suffix}
<#include '/java_description.include'/>
 * 新生成的类中的方法，只有在不同名的情况下才会被追加到该类下，
 * 因此该类可以修改任何部分
 * </pre>
 */
<#include '/table.include.ftl'>
public class ${tableConfig.className}${service_name_suffix}${impl_name_suffix}  implements ${tableConfig.className}${service_name_suffix}${internal_service_suffix} {

    @Resource(name="${tableConfig.className?uncap_first}${dao_name_suffix}")
    ${tableConfig.className}${dao_name_suffix} ${tableConfig.className?uncap_first}${dao_name_suffix};

<#list tableConfig.sqls as sql>
    /**
     * ${sql.remarks!}
     * @see ${tableConfig.basepackage}.${dao_dir_name}.${tableConfig.className}${dao_name_suffix}#${sql.operation}
    <#if sql.facade>
     * @see ${tableConfig.basepackage}.${service_dir_name}.${tableConfig.className}${service_name_suffix}#${sql.operation}
     </#if>
     * @see ${tableConfig.basepackage}.${service_dir_name}.${tableConfig.className}${service_name_suffix}${internal_service_suffix}#${sql.operation}
     */
    <#assign returnClazzName><@generateResultClassName sql pojo_name_suffix/></#assign>
    @Override
    public ${returnClazzName} ${sql.operation}(<@generateOperationArguments sql/>) {
        return ${tableConfig.className?uncap_first}Dao.${sql.operation}(<@generateOperationParams sql/>);
    }

    <#if lpkColumn?? && "${sql.operation}"=="get${table.className}sBy${pkColumn.columnName?cap_first}s">

    /**
     * @see ${tableConfig.basepackage}.${service_dir_name}.${tableConfig.className}${service_name_suffix}#${sql.operation}
     */
    <#assign currLpk>${getCurName(lpkColumn)}</#assign>
    <#assign currOpk>${getCurName(opkColumn)}</#assign>
    <#assign inclLpk>${getIncludeSelfCurName(lpkColumn)}</#assign>
    @Override
    public <@generateResultClassName sql pojo_name_suffix/> ${sql.operation}<@nullLevelIdsubfix (lpkColumn?? || opkColumn??)/>(<@generateOperationArgumentsExclude sql currLpk inclLpk currOpk/>) {
        return ${sql.operation}(<@generateOperationParamsExclude sql currLpk inclLpk, currOpk/>);
    }
    </#if>

    <#if sql.paging && sql.countService>
    @Override
    public Long ${sql.operation}Count(<@generateOperationArguments sql/>) {
        return ${tableConfig.className?uncap_first}Dao.${sql.operation}Count(<@generateOperationParams sql/>);
    }    
    </#if>
</#list>

    <#assign pojoName>${tableConfig.className?uncap_first}</#assign>
    /*** 保存${pojoName},有id时更新，没有id时插入,并带回新的id，返回 ${pojoName}*/
    @Override
    public ${tableConfig.className} save${tableConfig.className}(${tableConfig.className} ${pojoName}){
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
    public List<${tableConfig.className}> save${tableConfig.className}s(List<${tableConfig.className}> ${pojoName}s) {
        for (${tableConfig.className} ${pojoName} : ${pojoName}s) {
            this.save${tableConfig.className}(${pojoName});
        }
        return ${pojoName}s;
    }

    <#assign bean>${tableConfig.className}</#assign>
    <#assign type>${tableConfig.pkColumn.shortJavaType}</#assign>
    <#assign id>${tableConfig.pkColumn.columnName}</#assign>
    @Override
    public <D> void assignBeanTo(Collection<D> dests, Function<? super D, ${type}> destGetMethod, BiConsumer<D, ${tableConfig.className}> destSetMethod) {
        ServiceUtil.interalAssignBeanTo(dests, destGetMethod, destSetMethod, this, ${bean}ServiceImpl::get${bean}sBy${id?cap_first}s<@nullLevelIdsubfix (lpkColumn?? || opkColumn??)/>, ${bean}::get${id?cap_first});
    }

    @Override
    public <D, G> void assignBeansTo(Collection<D> dests,Function<? super D, G> destGetMethod,BiConsumer<D, List<${bean}>> destSetMethod, BiConsumer<${bean},List<G>> resultSetQueryIdsFun, Function<? super ${bean}, G> resultGetGoupIdFun) {
        ServiceUtil.interalAssignBeansTo(dests, destGetMethod, destSetMethod, this, new ${bean}(), resultSetQueryIdsFun, resultGetGoupIdFun, 100);
    }

    @Override
    public <D> void mergeBeanTo(Collection<D> dests, Function<? super D, ${type}> destGetMethod) {
        ServiceUtil.interalMergeBeanTo(dests, destGetMethod, this, ${bean}ServiceImpl::get${bean}sBy${id?cap_first}s<@nullLevelIdsubfix (lpkColumn?? || opkColumn??)/>, ${bean}::get${id?cap_first});
    }

}