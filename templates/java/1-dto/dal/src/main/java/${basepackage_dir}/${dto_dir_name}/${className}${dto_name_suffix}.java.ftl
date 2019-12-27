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
<#include '/java_copyright.include'/>

package ${tableConfig.basepackage}.${dto_dir_name};

import java.text.SimpleDateFormat;
<#assign lomb =lombok=="true">
<#if lomb>
import lombok.Getter;
import lombok.Setter;
</#if>

/**
 * ${tableConfig.className}${dto_name_suffix}
<#include '/java_description.include'/>
 * 该类首次生成之只，将不会被再次生成或生成覆盖，可以任意修改
 * 不建议使@Data,其hashCode有问题
 * </pre>
 */
<#if lomb>
@Getter
@Setter
</#if>
public class ${className}${dto_name_suffix} implements java.io.Serializable {
  private static final long serialVersionUID = -5216457518046898602L;
  
  <#list table.columns as column>
    /*** ${column.columnAlias!}   db_column: ${column.sqlName}  */
    private ${column.shortJavaType} ${column.columnNameLower};

  </#list>
  
    /*----------------getter & setter-------------------*/
<#if !lomb>
<@generateJavaColumns/>
</#if>
    public String toString() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd H:m:ss.SSS");
        StringBuffer sb=new StringBuffer(1024);
        sb.append('{');
      <#list table.columns as column>
        if (null != ${column.columnNameLower}) {
            <#if column.simpleJavaType='Date'>
            sb.append("${column.columnNameLower}=").append(df.format(${column.columnNameLower}))<#if column_has_next>.append(',')</#if>;
            <#else>
            sb.append("${column.columnNameLower}=").append(${column.columnNameLower})<#if column_has_next>.append(',')</#if>;
            </#if>
        }      
      </#list>
        sb.append('}');
        return sb.toString();
    }
}
<#if !lomb>
<#macro generateJavaColumns>
  <#list table.columns as column>
  
    /**
     * Setter method for property <tt>${column.columnNameLower} ${column.columnAlias!}</tt>.
     * @param ${column.columnNameLower} ${column.columnAlias!} 
     */
    public void set${column.columnName}(${column.shortJavaType} ${column.columnNameLower}) {
        this.${column.columnNameLower} = ${column.columnNameLower};
    }
  
    /**
     * Getter method for property <tt>${column.columnNameLower} ${column.columnAlias!}</tt>.
     * @return property value of ${column.columnNameLower} ${column.columnAlias!}
     */
    public ${column.shortJavaType} get${column.columnName}() {
        return this.${column.columnNameLower};
    }
  </#list>
  
  <#if "${tableConfig.className}"=="ActPageConf">
    private Map contentMap;

    public Map getContentMap() {
        return contentMap;
    }

    public void setContentMap(Map contentMap) {
        this.contentMap = contentMap;
    }
  </#if>
</#macro>
</#if>