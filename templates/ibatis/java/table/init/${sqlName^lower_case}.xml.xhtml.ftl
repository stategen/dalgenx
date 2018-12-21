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
<#include './table.include.ftl'>
    <!-- 以下是生成代码，勿动 ,如果表变更，重新执行 gen.sh table ${table.sqlName} -e 会自动覆盖-->
    <operation name="insert" paramType="object" remarks="">
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

    <operation name="delete<#if column!=table.pkColumn>By${column.columnName?cap_first}</#if>" remarks="">
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
    <operation name="get${table.className}PageList" paramType="object" multiplicity="paging" remarks="">
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
        <#elseif sqlNameUp?ends_with('IMG') || sqlNameUp?ends_with('IMAGE') || sqlNameUp?ends_with('ICON') || sqlNameUp?ends_with('URL')>
          <#continue>
        <#elseif StringUtil.endsWithIgnoreCase(column.sqlName,"id") || StringUtil.endsWithIgnoreCase(column.sqlName,"type") || StringUtil.endsWithIgnoreCase(column.sqlName,"enum") || StringUtil.containsIgnoreCase(column.columnAlias!,"enum")>
          <#assign beginIs>
            ${beginIs?trim}
            <isNull property="${column.columnName}">
          </#assign>
            <isNotNull property="${column.columnName}" open="and">
               a.${column.sqlName}=?
            </isNotNull>
          <#assign endIs></isNull>
            ${endIs}
          </#assign>
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
            <isNull property="${column.columnName}">
          </#assign>
          <isNotNull property="${column.columnName}" open="and">
            a.${column.sqlName}=?
          </isNotNull>
          <#assign endIs></isNull>
            ${endIs}
          </#assign>
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
            order by
            <include refid = "get${table.className}PageListOrderBy" />
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
    <#if column.unique || column.pk || StringUtil.containsIgnoreCase(column.columnAlias!,"fk") || StringUtil.containsIgnoreCase(column.columnAlias!,"select")>

    <operation name="get${table.className}sBy${column.columnName?cap_first}s" multiplicity="many" remarks="">
        <sql>
            select
           <#list table.canSelColumns as column>
            a.${column.sqlName}<#if column_has_next>,</#if>
          </#list>
            from ${table.sqlName} a
            where
            <#if sft_dlt_clmn!="">a.${sft_dlt_clmn} = ${not_delete_value}</#if>
            <isEmpty property="${column.columnName}s"<#if hasSftDel> open="and"</#if>>
                1=0
            </isEmpty>
            <isNotEmpty property="${column.columnName}s"<#if hasSftDel> open="and"</#if>>
                a.${column.sqlName} in
                <iterate property="${column.columnName}s" conjunction="," open="(" close=")">
                    #${column.columnName}s[]#
                </iterate>
            </isNotEmpty>
            order by
            <include refid="get${table.className}sBy${column.columnName?cap_first}sOrderBy" />
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
            <isEmpty property="${column.columnName}s"<#if hasSftDel> open="and"</#if>>
                1=0
            </isEmpty>
            <isNotEmpty property="${column.columnName}s"<#if hasSftDel> open="and"</#if>>
                ${column.sqlName} in
                <iterate property="${column.columnName}s" conjunction="," open="(" close=")">
                    #${column.columnName}s[]#
                </iterate>
            </isNotEmpty>
        </sql>
    </operation>
    </#if>
    </#list>
    
    <!-- 以上是生成代码，勿动 ,如果表变更，重新执行 gen.sh table ${table.sqlName} -e 会自动覆盖-->