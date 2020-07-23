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
<#assign dollar = '$'>
<#function appendParam paramsStr pStr>
    <#assign result=paramsStr>
    <#if pStr?length gt 0>
        <#assign result>${paramsStr}<#if paramsStr?length gt 0>, </#if>${pStr}</#assign>
    </#if>
    <#return result>
</#function>
<#function isUseParamObject sql>
	<#if (sql.params?size <= 1)>
		<#return false/>
	</#if>
	<#if (sql.paramType = 'parameterObject' || sql.params?size >= 1000)>
		<#return true/>
	</#if>
	<#return false/>		
</#function>

<#function generateSelectResultClass sql pojo_package_name=''>
    <#if sql.resultClass!='' && sql.resultClass?contains('.')>
         <#return sql.resultClass/>
    </#if>

    <#local resultClassName><#if sql.resultClassName==tableConfig.className>${sql.resultClassName}<#else>${sql.resultClassName}</#if></#local>
    <#if sql.columnsCount==1>
    	<#return resultClassName/>
    </#if>
    <#if sql.columnsInSameTable && !sql.hasCustomResultClass>
        <#local resultClassName=tableConfig.className/>
    <#elseif 'object'==sql.resultClass>
        <#local resultClassName=tableConfig.className />
    <#elseif 'dto'==sql.resultClass>
        <#local resultClassName=tableConfig.className+dto_name_suffix/>
    <#else>
        <#local resultClassName=tableConfig.className />
    </#if>

    <#if pojo_package_name!=''>
         <#local resultClassName=pojo_package_name+'.'+resultClassName/>
    </#if>
    <#return resultClassName/>
</#function>

<#macro generateResultClassName sql suffix=''>
	<#compress>
	<#if sql.selectSql>
        <#local resultClassName>${generateSelectResultClass(sql)}</#local>
		<#if sql.paging>
			PageList<${resultClassName}>
		<#elseif sql.multiplicity = 'one'>
			${resultClassName}
		<#else>
			List<${resultClassName}>
		</#if>
	<#else>
		<#if sql.deleteSql>
          <#if (sql.operation='delete' || sql.operation='deleteBy${sql.table.pkColumn.columnName?cap_first}s')>
              <#list sql.params as param>${param.preferredParameterJavaType}<#break></#list>
          <#else>
			Long
          </#if>
		 </#if>
		
		<#if sql.insertSql>
			<#if sql.paramType = 'object'>
			  <#if sql.operation='insert'>
			    ${tableConfig.className}
			  <#else>
				${tableConfig.pkColumn.simpleJavaType}
			  </#if>
			<#else>
				Long
			</#if>
		</#if>
		
		<#if sql.updateSql>
			<#if sql.paramType = 'object' && sql.operation='update'>
				${tableConfig.className}
			<#elseif (sql.operation='delete' || sql.operation='deleteBy${sql.table.pkColumn.columnName?cap_first}s')>
                <#list sql.params as param>${param.preferredParameterJavaType}<#break></#list>
            <#else>
				Long
			</#if>
		</#if>
	</#if>
	</#compress>
</#macro>

<#macro generateOperationArguments sql>
<@generateOperationArgumentsExclude sql ""/>
</#macro>
<#macro generateOperationArgumentsExclude sql excludeParam>
<#compress>
	<#if sql.paramType = 'object'>
		${tableConfig.table.className}${pojo_name_suffix} ${tableConfig.table.classNameFirstLower}<#if sql.paging>, int pageSize, int pageNum</#if>
	<#elseif !(sql.paramType =='primitive' || sql.paramType =='')>
		${sql.paramType} ${sql.paramType?uncap_first}<#if sql.paging>, int pageSize, int pageNum</#if>
	<#else>
		<#if isUseParamObject(sql)>
			${sql.parameterClassName} param
		<#else>
            <#assign added=false>
            <#list sql.params as param><#if excludeParam=="${param.paramName?uncap_first}"><#continue></#if><#if added>, </#if>${param.preferredParameterJavaType} ${param.paramName?uncap_first}<#assign added=true></#list><#if sql.paging><#if sql.params?size gt 0>, </#if>int pageSize, int pageNum</#if>
		</#if>
	</#if>
</#compress>
</#macro>
<#macro generateOperationParams sql>
<@generateOperationParamsExclude sql ""/>
</#macro>
<#macro generateOperationParamsExclude sql excludeParam>
<#compress>
    <#if sql.paramType = 'object'>
         ${tableConfig.table.classNameFirstLower}<#if sql.paging>, pageSize, pageNum</#if>
    <#else> 
        <#if isUseParamObject(sql)>
            param
        <#else>
            <#if !(sql.paramType =='primitive' || sql.paramType =='')>
	            <#if sql.paging>
	                ${sql.paramType?uncap_first},pageSize,pageNum
	            <#else>
	                ${sql.paramType?uncap_first}
	            </#if>
	        <#else>
	           <#list sql.params as param><#if excludeParam=="${param.paramName?uncap_first}"> null <#else> ${param.paramName} </#if><#if param_has_next>,</#if></#list><#if sql.paging><#if sql.params?size gt 0>, </#if>pageSize, pageNum</#if>
	        </#if>
        </#if>
    </#if>
</#compress>
</#macro>

<#macro controllerGenerateOperationArguments sql>
<#compress>
    <#if sql.paramType = 'object'>
        ,${tableConfig.table.className} ${tableConfig.table.classNameFirstLower} 
    <#else>
        <#if isUseParamObject(sql)>
            ,${sql.parameterClassName} param
        <#else>
            <#if sql.paging>
                <#if (sql.params?size>0)>,</#if><#list sql.params as param>${param.preferredParameterJavaType} ${param.paramName},</#list><#if (sql.params?size==0)>,</#if>int pageSize,int pageNum
            <#else>
                <#if (sql.params?size>0)>,</#if><#list sql.params as param>${param.preferredParameterJavaType} ${param.paramName}<#if param_has_next>,</#if></#list>
            </#if>
        </#if>
    </#if>
</#compress>
</#macro>

<#macro getDateFieldValue column>
<#compress>
    <#if column.javaType?lower_case?contains('long')>
        UNIX_TIMESTAMP(CURRENT_TIMESTAMP(6))
    <#else>
        CURRENT_TIMESTAMP(6)
    </#if>
</#compress>
</#macro>
<#macro genColumnGetterSetter table>
    <#list table.columns as column>
    /**
     * Setter method for property <tt>${column.columnNameLower} ${column.columnAlias!}</tt>.
     * @param ${column.columnNameLower} ${column.columnAlias!}
     */
    public void set${column.columnName?cap_first}(${column.simple} ${column.columnNameLower}) {
        this.${column.columnName} = ${column.columnNameLower};
    }

    /**
     * Getter method for property <tt>${column.columnNameLower} ${column.columnAlias!}</tt>.
     * @return property value of ${column.columnNameLower} ${column.columnAlias!}
     */
    public ${column.simple} get${column.columnName?cap_first}() {
        return this.${column.columnName};
    }

    </#list>
</#macro>
<#macro genParameterGetterSetter table>
    <#list table.fieldParameters as param>
        <#if param.column??>
    /*** ${param.column.columnAlias!}${StringUtil.trimLeft(param.paramName,param.column.columnName)}<#if param.sql??> in ${param.sql.operation}</#if> */
        </#if>
    public void set${param.paramName?cap_first}(${param.simple} ${param.paramName}) {
        this.${param.paramName} = ${param.paramName};
    }

        <#if param.column??>
    /*** ${param.column.columnAlias!}${StringUtil.trimLeft(param.paramName,param.column.columnName)}<#if param.sql??> in ${param.sql.operation}</#if> */
        </#if>
    public ${param.simple} get${param.paramName?cap_first}() {
        return this.${param.paramName};
    }

    </#list>
</#macro>
