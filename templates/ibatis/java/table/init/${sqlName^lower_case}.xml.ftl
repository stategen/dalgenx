﻿<#--
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
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE table SYSTEM "http://sources.alipay.net/svn/dtd/table-config-1.0.dtd">
<table sqlName="${table.sqlName}" className="<#if add_illegal_prefix=='true'>?</#if>${table.className}">
   <#if add_illegal_prefix=='true'>
↑请检查上面className是否正确,按驼峰写法修改类名，将非法字符"?"去掉,并删除本行↑
   </#if>
   
    <!-- 不需要配置的列请删除-->
    <!-- <column name="currency_Unit" javaType="java.util.Currency"/> -->
    <!-- <column name="status" javaType="aa.bb.cc.StatusEnum"/> -->
    <!-- <column name="sex" javaType="aa.bb.cc.SexEnum"/> -->
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

    <#list table.columns as column>
        <#if column.isDateButLong>
    <column name="${column.sqlName}" javaType="java.util.Date" />
        </#if>
    </#list>
    
    <operation name="insert" paramType="object" remarks="">
      <!-- 临时方案，请在 field或 value 两边加上空格,以方便dalgen解析 -->
        <sql>
            insert into ${table.sqlName} (
            <#assign added =false>
            <#if crt_dt_clmn!=""><#if added>, </#if><#assign added =true>${crt_dt_clmn}</#if>
            <#if upt_dt_clmn!=""><#if added>, </#if><#assign added =true>${upt_dt_clmn}</#if>
            <#if sft_dlt_clmn!=""><#if added>, </#if><#assign added =true>${sft_dlt_clmn}</#if>
              <#list table.columns as column>
              <#assign sqlName=column.sqlName>
              <#if !(sqlName==crt_dt_clmn || sqlName==upt_dt_clmn || sqlName==sft_dlt_clmn)>
            <isNotNull prepend="," property="${column.columnNameFirstLower}"> ${column.sqlName} </isNotNull>
              </#if>
              </#list>
            ) VALUES (
            <#assign added =false>
            <#if crt_dt_clmn!=""><#if added>, </#if><#assign added =true><#if is_create_time_long>UNIX_TIMESTAMP(CURRENT_TIMESTAMP(6))*1000<#else>CURRENT_TIMESTAMP(6)</#if></#if>
            <#if upt_dt_clmn!=""><#if added>, </#if><#assign added =true><#if is_update_time_long>UNIX_TIMESTAMP(CURRENT_TIMESTAMP(6))*1000<#else>CURRENT_TIMESTAMP(6)</#if></#if>
            <#if sft_dlt_clmn!=""><#if added>, </#if><#assign added =true>${not_delete_value}</#if>
            <#list table.columns as column>
            <#assign sqlName=column.sqlName>
            <#if !(sqlName==crt_dt_clmn || sqlName==upt_dt_clmn || sqlName==sft_dlt_clmn)>
            <isNotNull prepend="," property="${column.columnNameFirstLower}"><#if column.isDateButLong> UNIX_TIMESTAMP(?)*1000 <#else> ? </#if> </isNotNull>
              </#if>
              </#list>
            )
          <#list table.pkColumns as column>
            <#if column.simpleJavaType=='Long' || column.simpleJavaType=='Integer'>
            <selectKey resultClass="long" keyProperty="${column.columnNameFirstLower}">
                select  LAST_INSERT_ID()
            </selectKey>
            <#else>
            <#assign dateStr>DATE_FORMAT(CURRENT_TIMESTAMP(6),'%Y%m%d%H%i%s%f')</#assign>
            <#assign radmonStr>LPAD(ROUND(RAND()*100000000),8,'0')</#assign>            
            <selectKey keyProperty="${column.columnNameFirstLower}" resultClass="String" type="pre">
                select if((#${column.columnNameFirstLower}#  is null) ,CONCAT(${dateStr},${radmonStr}) ,#${column.columnNameFirstLower}# ) as ${column.columnNameFirstLower}
            </selectKey>
            </#if>
            <#break>    
          </#list>
        </sql>
    </operation>
    <#list table.columns as column>
    <#if column.unique || column.pk>

    <operation name="deleteBy${column.columnName?cap_first}" remarks="">
        <sql>
           <#if sft_dlt_clmn!="">
            UPDATE ${table.sqlName} SET
            ${sft_dlt_clmn} = ${delete_value}
            <#if upt_dt_clmn!="">, ${upt_dt_clmn} = <#if is_update_time_long>UNIX_TIMESTAMP(CURRENT_TIMESTAMP(6))*1000<#else>CURRENT_TIMESTAMP(6)</#if></#if>
           <#else>
            DELETE from ${table.sqlName}
            </#if>
            where
          <#if sft_dlt_clmn!="">
            ${sft_dlt_clmn} = ${not_delete_value}
          </#if>
            <#if hasSftDel>and </#if>${column.sqlName} = ?
        </sql>
    </operation>
    </#if>
    </#list>

    <operation name="update" paramType="object" remarks="">
        <#if upt_dt_clmn=="">
        <!-- 因为dalgen 生成sqlmap中sql时会执行一条模拟生成sql语句检查是否sql是否正确，以减少因为sql中的bug对系统造成影响，
              但是dalgen在生成动态sql语句时，无法获得ibatis的默认属性removeFirstPrepend ="true" ，所以生成的sql语句会是错误的，
              导致后面的代码无法生成，故手工在第一条上添加 removeFirstPrepend ="true" ,让我们自己的代码生成器拦截这个方法以避
              开dalgen的错误, 由于removeFirstPrepend ="true" 在ibatis中是默认开启的，因此对ibatis没有任何影响-->
        </#if>
        <sql>
            UPDATE ${table.sqlName}
            <#if upt_dt_clmn!="">SET ${upt_dt_clmn}= <#if is_update_time_long>UNIX_TIMESTAMP(CURRENT_TIMESTAMP(6))*1000<#else>CURRENT_TIMESTAMP(6)</#if>
            <#assign added =true></#if>
            <dynamic><#if upt_dt_clmn==""> prepend="SET"</#if>
             <#assign added =false>
              <#list table.notPkColumns as column><#assign sqlName=column.sqlName>
              <#if !(sqlName==crt_dt_clmn || sqlName==upt_dt_clmn || sqlName==sft_dlt_clmn)>
                <isNotNull property="${column.columnNameFirstLower}" prepend=","<#if !added && upt_dt_clmn==""><#assign added =true> removeFirstPrepend="true"</#if>>
                    ${column.sqlName} = <#if column.isDateButLong> UNIX_TIMESTAMP(#${column.columnNameFirstLower}#)*1000 <#else> ? </#if>
                </isNotNull>
                </#if>
          </#list>
            </dynamic>
            where
            <#if sft_dlt_clmn!="">${sft_dlt_clmn} = ${not_delete_value}</#if>
            <#if hasSftDel>and </#if>${table.pkColumn.sqlName} = ?
        </sql>
    </operation>
    <#list table.columns as column>
    <#if column.unique || column.pk>

    <operation name="get${table.className}By${column.columnName?cap_first}" multiplicity="one" remarks="">
        <sql>
            select
           <#list table.canSelColumns as column>
            a.${column.sqlName}<#if column_has_next>,</#if>
          </#list>
            from ${table.sqlName} a
            where
            <#if sft_dlt_clmn!="">a.${sft_dlt_clmn} = ${not_delete_value}</#if>
            <#if hasSftDel>and </#if>a.${column.sqlName} = ?
        </sql>
    </operation>
    </#if>
    </#list>

<#--    <operation name="get${table.className}PageList" multiplicity="paging" remarks="">
        <sql>
            select
           <#list table.canSelColumns as column>
            a.${column.sqlName}<#if column_has_next>,</#if>
           </#list>
            from ${table.sqlName} a
            where
            <#if sft_dlt_clmn!="">a.${sft_dlt_clmn} = ${not_delete_value}</#if>
        </sql>
    </operation>-->
    <operation name="get${table.className}PageListByDefaultQuery" paramType="object" multiplicity="paging" remarks="">
        <sql>
            select
           <#list table.canSelColumns as column>
            a.${column.sqlName}<#if column_has_next>,</#if>
           </#list>
            from ${table.sqlName} a
            where
      <#if sft_dlt_clmn!="">
            a.${sft_dlt_clmn} = ${not_delete_value}
      <#else>
            0=0
      </#if>
      <#assign beginIs></#assign>
      <#assign endIs="">
      <#list table.canSelColumns as column>
            <#--<!--a.${column.sqlName} ${column.JDBCType}&ndash;&gt;-->
        <#assign sqlNameUp=column.sqlName?upper_case>
        <#if CollectionUtil.mapContainsKey(soft_delete_fields,sqlNameUp)>
          <#continue>
        <#elseif sqlNameUp?ends_with('IMG') || sqlNameUp?ends_with('IMAGE') || sqlNameUp?ends_with('ICON')>
          <#continue>
        <#elseif StringUtil.endsWithIgnoreCase(column.sqlName,"id") || StringUtil.endsWithIgnoreCase(column.sqlName,"type") || (column.columnAlias?? && StringUtil.containsIgnoreCase(column.columnAlias,"enum"))>
          <#assign beginIs>
            ${beginIs?trim}
            <isEmpty property="${column.columnName}s">
          </#assign>
            <isNotEmpty property="${column.columnName}s" open="and">
                a.${column.sqlName} in
                <iterate property="${column.columnName}s" conjunction="," open="(" close=")">
                    #${column.columnName}s[]#
                </iterate>
            </isNotEmpty>
          <#assign endIs></isEmpty>
            ${endIs}
          </#assign>
        <#elseif column.javaType="java.util.Date" || column.javaType="java.lang.Integer" || column.javaType="java.lang.Long" || column.javaType="java.math.BigDecimal">
          <#assign beginIs>
            ${beginIs?trim}
            <isNull property="${column.columnName}Min">
          </#assign>
            <isNotNull property="${column.columnName}Min" open="and">
                a.${column.sqlName} >=#${column.columnName}Min#
            </isNotNull>
          <#assign endIs></isNull>
            ${endIs}
          </#assign>
          <#assign beginIs>
            ${beginIs?trim}
            <isNull property="${column.columnName}Max">
          </#assign>
            <isNotNull property="${column.columnName}Max" open="and">
                a.${column.sqlName} &lt;#${column.columnName}Max#
            </isNotNull>
          <#assign endIs></isNull>
            ${endIs}
          </#assign>
        <#elseif column.javaType="java.lang.String">
          <#assign beginIs>
            ${beginIs?trim}
            <isEmpty property="${column.columnName}Like">
          </#assign>
            <isNotEmpty property="${column.columnName}Like" open="and">
                a.${column.sqlName} like CONCAT('%',#${column.columnName}Like#,'%')
            </isNotEmpty>
          <#assign endIs></isEmpty>
            ${endIs}
          </#assign>
        </#if>
    </#list>
            <#if (beginIs?length gt 0) && (endIs?length gt 0)>
            ${beginIs?trim}
              and 0 = 1
            ${endIs?trim}
            </#if>
        </sql>
    </operation>
<#--    <#list table.columns as column>
    <#if column.unique && !column.pk>
    <operation name="getBy${column.columnName}" paramType="primitive" multiplicity="one" remarks="">
        <sql>
            select
            <#list table.canSelColumns as column>
            a.${column.sqlName}<#if column_has_next>,</#if>
            </#list>
             from ${table.sqlName} a where
             a.${column.sqlName} = ? <#if sft_dlt_clmn!="">
             and a.${sft_dlt_clmn} = ${not_delete_value}
             </#if>
        </sql>
    </operation>
    </#if>
    </#list>-->
    <#list table.columns as column>
    <#if column.unique || column.pk>

    <operation name="get${table.className}sBy${column.columnName?cap_first}s" multiplicity="many" remarks="">
        <sql>
            select
           <#list table.canSelColumns as column>
            a.${column.sqlName}<#if column_has_next>,</#if>
          </#list>
            from ${table.sqlName} a
            where
            <#if sft_dlt_clmn!="">a.${sft_dlt_clmn} = ${not_delete_value}</#if>
            <#if hasSftDel>and </#if>a.${column.sqlName} in
            <iterate property="${column.columnName}s" conjunction="," open="(" close=")">
                #${column.columnName}s[]#
            </iterate>
        </sql>
    </operation>
    </#if>
    </#list>
    <#list table.columns as column>
    <#if column.unique || column.pk>

    <operation name="deleteBy${column.columnName?cap_first}s" remarks="">
        <sql>
           <#if sft_dlt_clmn!="">
            UPDATE ${table.sqlName} SET
               ${sft_dlt_clmn} = ${delete_value}
               <#if upt_dt_clmn!="">, ${upt_dt_clmn} = <#if is_update_time_long>UNIX_TIMESTAMP(CURRENT_TIMESTAMP(6))*1000<#else>CURRENT_TIMESTAMP(6)</#if></#if>
           <#else>
            DELETE from ${table.sqlName}
           </#if>
            where
            <#if sft_dlt_clmn!="">${sft_dlt_clmn} = ${not_delete_value}</#if>
            <#if hasSftDel>and </#if>${column.sqlName} in
            <iterate property="${column.columnName}s" conjunction="," open="(" close=")">
                #${column.columnName}s[]#
            </iterate>
        </sql>
    </operation>
    </#if>
    </#list>
    
    <!-- 以上是生成代码，勿动 ,如果表变更，重新执行 gen.sh table ${table.sqlName} -e 再复制再粘贴覆盖-->
</table>