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
<#macro genCopyright entity>
/**
 *  Do not remove this unless you get business authorization.
 *  <#if entity?is_string>${entity}<#else>${entity.description!}</#if>
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
</#macro>
<#macro genCopyrightCanEdit entity>
/**
 *  Do not remove this unless you get business authorization.
 *  <#if entity?is_string>${entity}<#else>${entity.description!}</#if>
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
</#macro>
<#macro genTypeWithGeneric r><#if r.isArray>${r.generic}[]<#else>${r.type}<#if r.isGeneric><${r.generic}></#if></#if></#macro>
<#macro getSimpleType r><#if r.isArray>${r.generic}[]<#else>${r.type}</#if></#macro>
<#macro getReduceName fun genEffect>${fun}<#if genEffect>_success</#if></#macro>

<#function genResultName fun>
    <#if !fun.return.isSimple>
        <#if fun.return.generic??>
            <#local resultName>${fun.return.generic?uncap_first}<#if fun.return.isArray>s</#if><#if fun.return.isPageList>PageList</#if></#local>
        <#else>
            <#local resultName>${fun.return?uncap_first}<#if fun.return.isArray>s</#if></#local>
        </#if>
    <#else>
        <#local resultName>${fun}</#local>
        <#local resultName><#if resultName?starts_with("get")>${resultName?substring(3)?uncap_first}<#else>${resultName}</#if></#local>
        <#local indexBy=resultName?index_of("By")/>
        <#local resultName><#if indexBy gt 0 >${resultName?substring(0,indexBy)}<#else>${resultName}</#if></#local>
        <#local resultName><#if resultName?starts_with("create")>${resultName?substring(6)}<#else>${resultName}</#if></#local>
        <#local resultName><#if resultName?starts_with("delete")>result<#else>${resultName}</#if></#local>
        <#local resultName><#if resultName?length =0><@genTypeWithGeneric fun.return/><#else>result</#if></#local>
        <#local resultName>${resultName?uncap_first}</#local>
    </#if>
    <#return resultName>
</#function>

<#function arrayPrefix fun>
 <#if !fun.return.isArray && !fun.return.isPageList>
   <#return '['>
 <#else>
   <#return ''>
 </#if>
</#function>

<#function arraySubfix fun>
 <#if !fun.return.isArray && !fun.return.isPageList>
   <#return ']'>
 <#else>
   <#return ''>
 </#if>
</#function>

<#function doPageList fun>
    <#if fun.return.isPageList>
      <#if fun.return.type=="PageList">
          <#return '.items'>
      <#else>
          <#return '.list'>
      </#if>
    </#if>
    <#return ''>
</#function>

<#macro genEffectPut fun genEffect>
  yield put({
      type: '<@getReduceName fun genEffect/>',
      payload: newPayload,
    }
  )
</#macro>

<#function setupName>
<#return 'setup'>
</#function>

<#function canDrawField f>
    <#if f="deleteFlag">
        <#return false>
    <#elseif f.isArray>
        <#return false>
    <#else>
        <#return true>
    </#if>
</#function>

<#function canDrawParam p>
    <#if p="deleteFlag" || p="page" || p="pageSize" || p="pageNum" || p.isPagination>
        <#return false>
    <#else>
        <#return true>
    </#if>
</#function>
<#macro genImports imports,relativePath>
    <#list imports as import>
        <#if import.importPath??>
import ${import} from "${relativePath}${import.importPath}/${import}";
        <#else>
${import.wholeImportPath};
        </#if>
    </#list>
</#macro>

<#function genArea bean>
<#local areaName>${bean?uncap_first}Area</#local>
<#return areaName>
</#function>

<#macro genFormConfigsInteface bean f>
  <#if (f.description?length gt 0)>
  /** ${f.description}  ${f.temporalType!}*/
  </#if>
  ${f?cap_first}?: typeof ${bean}_${f} & FormItemConfig,
</#macro>

<#macro genSelectOptionConsts f>
const ${f.type?uncap_first}SelectOptions= makeSelectOptions(${f.type?uncap_first}Options);
</#macro>

<#macro  genFieldProps bean field>
name: '${field}',
<#if field.hidden>
hidden: true,
</#if>
<#if field.isId>
isId: true,
</#if>
<#if field.isEnum>
isEnum: true,
options: <#if field.isGeneric>${field.generic?uncap_first}<#else>${field.type?uncap_first}</#if>Options,
</#if>
<#if field.isImage>
isImage: true,
</#if>
<#if field.isArray>
isArray: true,
</#if>
<#if field.temporalType??>
temporalType : TemporalType.${field.temporalType},
format: ${field.temporalType}_FORMAT,
</#if>
label: "${field.title}",
<#if field.editorType??>
type: "${field.editorType}",
</#if>
Editor: UIUtil.Build${getEditorName(field)}Editor,
value: null,
formPropsUtils: null,
config: {
  initialValue: null,
    <#if field.rules?size gt 0>
  rules: [
        <#list field.rules as rule>
    {
            <#if (rule.required?? && rule.required ) || (field.required?? && field.required)>
      required: true,
            </#if>
            <#if rule.max??>
      max: ${rule.max?c},
            </#if>
            <#if rule.min??>
      min: ${rule.min?c},
            </#if>
            <#if rule.message??>
      message: "${rule.message}",
            </#if>
            <#if rule.pattern??>
      pattern: /${rule.pattern}/,
            </#if>
            <#if rule.whitespace??>
      whitespace: true,
            </#if>
    },
        </#list>
  ],
    </#if>
}
</#macro>

<#function  genValueConfigs field bean>
  <#assign value>
      <#compress>
          <#if field.temporalType??>
              <#assign initialValue>${bean?uncap_first}.${field} ? moment(${bean?uncap_first}.${field}) : null</#assign>
              ${initialValue}
          <#else>
              ${bean?uncap_first}.${field}
          </#if>
      </#compress>
  </#assign>
  <#return value>
</#function>

<#function  getEditorName field>
    <#assign configName=field>
    <#if field.editorType?length gt 0>
        <#assign customBuild=field.editorType?cap_first>
    <#elseif field.temporalType??>
        <#assign format>${field.temporalType}_FORMAT</#assign>
        <#if field.temporalType=='TIMESTAMP'>
            <#assign customBuild='TimeStamp'>
        <#elseif field.temporalType=='TIME'>
            <#assign customBuild='TimePicker'>
        <#else>
            <#assign customBuild='DatePicker'>
        </#if>
        <#assign customBuild>${customBuild}</#assign>
    <#elseif field.isEnum>
        <#assign  customBuild>Enum</#assign>
    <#elseif field.isImage>
        <#assign customBuild>Image</#assign>
    <#else>
        <#assign customBuild='Input'>
    </#if>
    <#return customBuild>
</#function>
<#macro genFormFunctions fun field>
  <#assign customBuild=getEditorName(field)>
(props: UIUtil.${customBuild}EditorProps) => {
  props ={...props, formItemConfig: ${fun}_${field}};
  return UIUtil.Build${customBuild}Editor(props);
}
</#macro>

<#macro formImports>
import UIUtil from "@utils/UIUtil";
import {FormItemConfig, FormConfigs, ObjectMap, TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, FormPropsUtils, TemporalType} from "@utils/DvaUtil";
import moment from 'moment';
</#macro>
<#macro genBeanType bean genName><#if bean.genericFields?? ><<#list bean.genericFields as g><#if genName?length gt 0>${genName}<#else>${g.genericName}</#if><#if g_has_next>, </#if></#list>></#if></#macro>
<#function genType p>
    <#if p.isArray>${p.generic}
      <#local result>[]</#local>
    <#else>
        <#local result>${p.type}<#if p.isGeneric><${p.generic}></#if></#local>
    </#if>
    <#return result>
</#function>

<#function appendParam paramsStr pStr>
   <#local result=paramsStr>
   <#if pStr?length gt 0>
   <#local result>${paramsStr}<#if paramsStr?length gt 0>, </#if>${pStr}</#local>
   </#if>
   <#return result>
</#function>

<#function genTypeAndNames params doRequired>
   <#local hasPage=false>
   <#local hasPageSize=false>
   <#list params as p>
   <#if p=='page'>
       <#local hasPage=true>
   </#if>
   <#if p=='pageSize'>
       <#local hasPageSize=true>
   </#if>
  </#list>
  <#local paramsStr=''>
  <#list params as p>
    <#if p.type=='PaginationProps' || p.type=='Pagination'>
        <#local paginationStr=''>
        <#if !hasPage>
           <#local paginationStr>${appendParam(paginationStr,'page?: number')}</#local>
        </#if>
        <#if !hasPageSize>
           <#local paginationStr>${appendParam(paginationStr,'pageSize?: number')}</#local>
        </#if>
        <#local paramsStr>${appendParam(paramsStr,paginationStr)}</#local>
    <#else>
        <#local pStr>${p}<#if !p.required || !doRequired>?</#if>: ${genType(p)}</#local>
        <#local paramsStr>${appendParam(paramsStr,pStr)}</#local>
    </#if>
  </#list>
  <#return  paramsStr>
</#function>
<#function isEmpty list>
    <#return !(list??) || (list?size <= 0) >
</#function>
<#function nextEffectName fun>
    <#return fun+'_next'>
</#function>
<#function refreshEffectName fun>
    <#return fun+'_refresh'>
</#function>

<#macro indent text dest>
<#local lines =StringUtil.toLines(text)>
<#list lines as line>
${dest}${line}
</#list>
</#macro>