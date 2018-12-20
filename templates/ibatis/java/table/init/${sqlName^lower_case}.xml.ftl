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
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE
    table SYSTEM "http://sources.alipay.net/svn/dtd/table-config-1.0.dtd"
    [<!ENTITY ${table.className?upper_case} SYSTEM "${table.sqlName?lower_case}.xml.xhtml">
]>
<table sqlName="${table.sqlName}" className="<#if add_illegal_prefix=='true'>?</#if>${table.className}">
   <#if add_illegal_prefix=='true'>
↑请检查上面className是否正确,按驼峰写法修改类名，将非法字符"?"去掉,并删除本行↑
   </#if>
    <!-- 不需要配置的列请删除-->
    <!-- <column name="status" javaType="${packageName}.enums.StatusEnum"/> -->

    <#function getCommonOrderByFields>
        <#assign text="">
        <#if upt_dt_clmn!="">
            <#assign text><#compress>${StringUtil.concat(', ',text,'a.${upt_dt_clmn} desc')}</#compress></#assign>
        </#if>
        <#if crt_dt_clmn!="">
            <#assign text><#compress>${StringUtil.concat(', ',text,'a.${crt_dt_clmn} desc')}</#compress></#assign>
        </#if>
        <#if text=="">
            <#assign text>a.${table.pkColumn.sqlName}</#assign>
        </#if>
        <#return text>
    </#function>
    <#assign commonOrderByFields=getCommonOrderByFields()>
    <#list table.columns as column>
        <#if column.isDateButLong>
    <column name="${column.sqlName}" javaType="java.util.Date" />
        </#if>
    </#list>
    <sql id="get${table.className}PageListOrderBy">
        ${commonOrderByFields}
    </sql>
    <#list table.columns as column>
        <#if column.unique || column.pk>
    <sql id="get${table.className}sBy${column.columnName?cap_first}sOrderBy">
        ${commonOrderByFields}
    </sql>
        </#if>
    </#list>

    <!-- 引用 ${table.sqlName?lower_case}.xml.xhml ,表修改后，需重新执行 gen.sh table ${table.sqlName} -e -->
    &${table.className?upper_case};
    <!-- 引用 ${table.sqlName?lower_case}.xml.xhml 结束 -->

    <!-- 自定义方法请写在下面 需要自动提示，请将dalgenX目录下的 gen.schemas-1.0.dtd 配到 eclipse 或 idea中
      file:gen.schemas-1.0.dtd
      System Id
      http://sources.alipay.net/svn/dtd/table-config-1.0.dtd
    -->
    <!--
    <operation name="..." remarks="">
        <sql>
            ...
        </sql>
    </operation>
    -->

</table>
