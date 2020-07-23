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
<#assign className = table.className>
<#assign classNameLower = className?uncap_first>
 <#assign crt_dt_clmn="">
 <#assign upt_dt_clmn="">
 <#assign sft_dlt_clmn="">
 <#assign updated_date_fields=Setting.getUpdated_date_fields()>
 <#assign created_date_fields=Setting.getCreated_date_fields()>
 <#assign soft_delete_fields=Setting.getSoft_delete_fields()>
 <#assign is_create_time_long=false>
 <#assign is_update_time_long=false>
  <#list table.columns as column>
        <#assign clumn_u=column.sqlName?upper_case >
        <#if CollectionUtil.mapContainsKey(updated_date_fields,clumn_u)>
            <#assign upt_dt_clmn=column.sqlName>
            <#assign is_update_time_long=column.javaType?lower_case?contains('long')>
        <#elseif CollectionUtil.mapContainsKey(created_date_fields,clumn_u)>
           <#assign crt_dt_clmn=column.sqlName>
           <#assign is_create_time_long=column.javaType?lower_case?contains('long')>
        <#elseif CollectionUtil.mapContainsKey(soft_delete_fields,clumn_u)>
           <#assign sft_dlt_clmn=column.sqlName>
        </#if>
  </#list>
<#assign unSelectColumns =[crt_dt_clmn,upt_dt_clmn,sft_dlt_clmn]>
<#assign hasSftDel=false>
<#if sft_dlt_clmn!=""><#assign hasSftDel=true></#if>
<#assign pkColumn=table.pkColumn>
<#assign levelName=StringUtil.findByRex(table.remarks!,'(?<=(-level)\\()[^\\)]+')>
<#if StringUtil.isNotEmpty(levelName)>
   <#-- table命令中的tableConfigSet延时被动解析,调用时生效 -->
    <#assign levelTable=tableConfigSet.getBySqlName(levelName)>
    <#assign lpkColumn=levelTable.pkColumn>
</#if>
<#function currentColumnName column>
<#return "current${lpkColumn.columnName?cap_first}">
</#function>
<#macro levelLeftJoin>
    <#if lpkColumn??>
           <isNotNull property="${currentColumnName(lpkColumn)}">
           left join ${table.sqlName}_level_h h on (a.${pkColumn.sqlName} = h.${pkColumn.sqlName})
           </isNotNull>
    </#if>
</#macro>
<#macro levelSelectIn>
    <#if lpkColumn??>
             <isNotNull property="${currentColumnName(lpkColumn)}">
             and h.${lpkColumn.sqlName} in (select ${lpkColumn.sqlName} from ${levelTable.sqlName}_flat_h where parent_id = #${currentColumnName(lpkColumn)}# and delete_flag = 0)
             </isNotNull>
    </#if>
</#macro>
<#macro levelSelectExists>
    <#if lpkColumn??>
             <isNotNull property="${currentColumnName(lpkColumn)}">
             and exists (select null from ${levelTable.sqlName}_flat_h where ${lpkColumn.sqlName} = h.${lpkColumn.sqlName} and parent_id = #${currentColumnName(lpkColumn)}# and delete_flag = 0)
             </isNotNull>
    </#if>
</#macro>
<#macro levelParams>
    <#if lpkColumn??>
        <extraparams>
           <param name="${currentColumnName(lpkColumn)}" javaType="${lpkColumn.simpleJavaType}"/>
        </extraparams>
    </#if>
</#macro>
<#macro nullLevelIdsubfix column>
<#if column?? && StringUtil.isNotEmpty(column)>
Null${column.columnName?cap_first}
</#if>
</#macro>
