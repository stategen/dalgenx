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
<#assign ownerName=StringUtil.findByRex(table.remarks!,'(?<=(-owner)\\()[^\\)]+')>
<#if StringUtil.isNotEmpty(levelName)>
   <#-- table命令中的tableConfigSet延时被动解析,调用时生效 -->
    <#assign levelTable=tableConfigSet.getBySqlName(levelName)>
    <#assign levelPkColumn=levelTable.pkColumn>
</#if>
<#if StringUtil.isNotEmpty(ownerName)>
    <#-- table命令中的tableConfigSet延时被动解析,调用时生效 -->
    <#assign ownerTable=tableConfigSet.getBySqlName(ownerName)>
    <#assign ownerPkColumn=ownerTable.pkColumn>
</#if>
<#function isLevelAuth>
    <#if levelPkColumn?? || ownerPkColumn??>
        <#return true>
    </#if>
    <#return false>
</#function>
<#function delFlgEqualZero prefix>
<#if sft_dlt_clmn!="">
    <#return "${prefix}${sft_dlt_clmn} = 0">
<#else>
    <#return ''>
</#if>
</#function>
<#function getCurName column>
<#return "curr${column.columnName?cap_first}">
</#function>
<#function getIncludeSelfCurName column>
    <#return "inclCurr${column.columnName?cap_first}">
</#function>
<#assign levelSubfix="_level_h">
<#assign levelSubfixClz="LevelH">
<#assign flatFix="_flat_h">
<#assign ownerSubfix="_owner_h">
<#assign ownerSubfixClz="OwnerH">
<#macro levelParams>
<#if isLevelAuth()>
        <extraparams>
        <#if levelPkColumn??>
           <param name="${getCurName(levelPkColumn)}" javaType="${levelPkColumn.simpleJavaType}"/>
           <param name="${getIncludeSelfCurName(levelPkColumn)}" javaType="Boolean"/>
        </#if>
        <#if ownerPkColumn??>
           <param name="${getCurName(ownerPkColumn)}" javaType="${ownerPkColumn.simpleJavaType}"/>
        </#if>
        </extraparams>
</#if>
</#macro>
<#macro levelLeftJoin>
    <#if levelPkColumn??>
           <isNotNull property="${getCurName(levelPkColumn)}">
           left join ${table.sqlName}${levelSubfix} h on (a.${pkColumn.sqlName} = h.${pkColumn.sqlName})
           </isNotNull>
    </#if>
    <#if ownerPkColumn??>
           <isNotNull property="${getCurName(ownerPkColumn)}">
           left join ${table.sqlName}${ownerSubfix} o on (a.${pkColumn.sqlName} = o.${pkColumn.sqlName})
           left join ${ownerTable.sqlName} u on (u.${ownerPkColumn.sqlName} = o.${ownerPkColumn.sqlName})
           </isNotNull>
    </#if>
</#macro>
<#macro commonSelect>
    <#if levelPkColumn??>
    <#assign equalInclude>(1=#${getIncludeSelfCurName(levelPkColumn)}# and h.${levelPkColumn.sqlName} = #${getCurName(levelPkColumn)}#)</#assign>
    </#if>
    <#if ownerPkColumn??>
    <#assign ownerEqual>o.${ownerPkColumn.sqlName} = #${getCurName(ownerPkColumn)}# ${delFlgEqualZero("and u.")}</#assign>
    </#if>
</#macro>
<#macro forceWrite>
    <#if levelPkColumn?? && ownerPkColumn??>
             <isNull property="${getCurName(levelPkColumn)}">
               <isNull property="${getCurName(ownerPkColumn)}">
                  and (1=0)
               </isNull>
             </isNull>
    </#if>
    <#if (levelPkColumn??) && !(ownerPkColumn??)>
             <isNull property="${getCurName(levelPkColumn)}">
                and (1=0)
             </isNull>
    </#if>
    <#if !(levelPkColumn??) && (ownerPkColumn??)>
             <isNull property="${getCurName(ownerPkColumn)}">
                and (1=0)
             </isNull>
    </#if>
</#macro>
<#macro levelSelectIn>
    <@commonSelect/>
    <#if levelPkColumn??>
    <#assign selectIn>(${equalInclude} or h.${levelPkColumn.sqlName} in (select ${levelPkColumn.sqlName} from ${levelTable.sqlName}${flatFix} where parent_id = #${getCurName(levelPkColumn)}# ${delFlgEqualZero("and ")})) </#assign>
    </#if>
        <#if levelPkColumn?? && ownerPkColumn??>
             <isNotNull property="${getCurName(levelPkColumn)}">
                <isNull property="${getCurName(ownerPkColumn)}">
                   and (${selectIn})
                </isNull>
             </isNotNull>
             <isNotNull property="${getCurName(ownerPkColumn)}">
                <isNull property="${getCurName(levelPkColumn)}">
                   and (${ownerEqual})
                </isNull>
             </isNotNull>
             <isNotNull property="${getCurName(levelPkColumn)}">
                <isNotNull property="${getCurName(ownerPkColumn)}">
                   and ((${ownerEqual}) or ${selectIn})
                </isNotNull>
             </isNotNull>
        </#if>
        <#if levelPkColumn?? && !(ownerPkColumn??)>
             <isNotNull property="${getCurName(ownerPkColumn)}">
                and (${selectIn})
             </isNotNull>
        </#if>
        <#if !(levelPkColumn??) && ownerPkColumn??>
             <isNotNull property="${getCurName(ownerPkColumn)}">
                and (${ownerEqual})
             </isNotNull>
        </#if>
</#macro>
<#macro levelSelectExists>
    <@commonSelect/>
    <#if levelPkColumn??>
    <#assign existsSelect>(${equalInclude} or exists (select null from ${levelTable.sqlName}${flatFix} where ${levelPkColumn.sqlName} = h.${levelPkColumn.sqlName} and parent_id = #${getCurName(levelPkColumn)}# ${delFlgEqualZero("and ")}))</#assign>
    </#if>
        <#if levelPkColumn?? && ownerPkColumn??>
             <isNotNull property="${getCurName(levelPkColumn)}">
                <isNull property="${getCurName(ownerPkColumn)}">
                   and (${existsSelect})
                </isNull>
             </isNotNull>
             <isNotNull property="${getCurName(ownerPkColumn)}">
                <isNull property="${getCurName(levelPkColumn)}">
                   and (${ownerEqual})
                </isNull>
             </isNotNull>
             <isNotNull property="${getCurName(levelPkColumn)}">
                <isNotNull property="${getCurName(ownerPkColumn)}">
                   and ((${ownerEqual}) or ${existsSelect})
                </isNotNull>
             </isNotNull>
        </#if>
        <#if levelPkColumn?? && !(ownerPkColumn??)>
             <isNotNull property="${getCurName(ownerPkColumn)}">
                and (${existsSelect})
             </isNotNull>
        </#if>
        <#if !(levelPkColumn??) && ownerPkColumn??>
             <isNotNull property="${getCurName(ownerPkColumn)}">
                and (${ownerEqual})
             </isNotNull>
        </#if>
</#macro>
<#macro nullLevelIdsubfix hasLevelColumn>
<#if hasLevelColumn>
NoLevelAuthority
</#if>
</#macro>
<#macro levelColumnNames>
    <#if levelPkColumn??>
        <#assign levelPkName>${getCurName(levelPkColumn)}</#assign>
        <#assign inclLevelPkName>${getIncludeSelfCurName(levelPkColumn)}</#assign>
    </#if>
    <#if levelPkColumn??>
        <#assign onwerPkName>${getCurName(ownerPkColumn)}</#assign>
    </#if>
</#macro>
