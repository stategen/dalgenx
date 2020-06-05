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
<#assign table = tableConfig.table>
<#assign className = table.className>   
<#assign classNameLower = className?uncap_first>
<#assign updated_date_fields=Setting.getUpdated_date_fields()>
<#assign created_date_fields=Setting.getCreated_date_fields()>
<#assign soft_delete_fields=Setting.getSoft_delete_fields()>
<#include '/java_copyright.include'/>

package ${tableConfig.basepackage}.${pojo_dir_name};

import java.text.SimpleDateFormat;
import io.swagger.annotations.ApiModelProperty;
<#assign lomb =lombok=="true">
<#if lomb>
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
</#if>

/**
 * ${tableConfig.className}${pojo_name_suffix}
<#include '/java_description.include'/>
 * 该类仅不可以修改dalgen生成的属生(field)类型 ,方法(Method)返回值类型和参数类型
 * 不建议使@Data,其hashCode有问题
 * </pre>
 */
<#assign lomb =lombok=="true">
<#if lomb>
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
</#if>
public class ${className}${pojo_name_suffix} implements java.io.Serializable {
<#list tableConfig.sqls as sql>
    <#if sql.paramType = 'object' && sql.selectSql>
        <#list sql.params as param>
            <#if TableHelper.putParameterAsField(table,param,sql)>
            </#if>
        </#list>
    </#if>
</#list>

    private static final long serialVersionUID = -5216457518046898601L;
  <#list table.columns as column>
    /***${column.columnAlias!}   db_column: ${column.sqlName} ${column.JDBCType} */
      <#assign hidden=false>
      <#if CollectionUtil.mapContainsKey(updated_date_fields,column.sqlName?upper_case)>
          <#assign hidden=true>
      <#elseif CollectionUtil.mapContainsKey(created_date_fields,column.sqlName?upper_case)>
          <#assign hidden=true>
      <#elseif CollectionUtil.mapContainsKey(soft_delete_fields,column.sqlName?upper_case)>
          <#assign hidden=true>
      </#if>
    @ApiModelProperty(<#if hidden>value=</#if>"${column.columnAlias!}"<#if hidden>, hidden = true</#if>)
    <#if column.pk>
    @Id
    <#elseif !column.nullable>
    @NotNull
    <#elseif column.unique>
    @NotNull
    </#if>
    <#if StringUtil.endsWithIgnoreCase(column.columnName,"email")>
    @Email
    </#if>
    <#if column.javaType="java.lang.String">
    @Max(${column.size})
      <#if column.JDBCType='LONGVARCHAR'>
    @Editor(EditorType.Textarea.class)
      </#if>
    </#if>
    <#if column.javaType="java.util.Date">
    @Temporal(TemporalType.${column.JDBCType})
    </#if>
    private ${column.shortJavaType} ${column.columnName};

  </#list>
  
    /*----------------getter & setter <#if lomb>ignore by lombok </#if>-------------------*/
<#if !lomb>
<@genColumnGetterSetter table/>
</#if>
    public String toString() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd H:m:ss.SSS");
        StringBuilder sb=new StringBuilder(1024);
        sb.append('{');
      <#list table.fieldParameters as param>
            <#if param.simpleJavaType='Date'>
        sb.append("${param.paramName}=").append(${param.paramName}!=null?df.format(${param.paramName}):null).append('\n');
            <#else>
        sb.append("${param.paramName}=").append(${param.paramName}).append('\n');
            </#if>
      </#list>
      <#list table.columns as column>
            <#if column.simpleJavaType='Date'>
        sb.append("${column.columnName}=").append(${column.columnName}!=null?df.format(${column.columnName}):null)<#if column_has_next>.append('\n')</#if>;
            <#else>
        sb.append("${column.columnName}=").append(${column.columnName})<#if column_has_next>.append('\n')</#if>;
            </#if>
      </#list>
        sb.append('}');
        return sb.toString();
    }

<#list table.fieldParameters as param>
    <#assign column=param.column>
    <#if column??>
    <#assign subfix>${StringUtil.trimLeft(param.paramName,column.columnName)}</#assign>
    /*** ${column.columnAlias}${StringUtil.trimLeft(param.paramName,column.columnName)}<#if param.sql??> in ${param.sql.operation}</#if> */
    @ApiModelProperty("${column.title}<#if subfix='s'> s<#else>${subfix}</#if>")
    <#if column.javaType="java.util.Date">
    @Temporal(TemporalType.${column.JDBCType})
    </#if>
    </#if>
    @JSONField(serialize = false)
    private ${param.preferredParameterJavaType} ${param.paramName?uncap_first};

</#list>

<#if !lomb>

    <@genParameterGetterSetter table/>
</#if>
}