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
<#macro indent text dest>
<#assign lines =StringUtil.toLines(text)>
<#list lines as line>
${dest}${line}
</#list>
</#macro>
<#macro genCopyright entity>
///  Do not remove this unless you get business authorization.
///  <#if entity?is_string>${entity}<#else>${entity.description!}</#if>
///  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
///  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
</#macro>
<#macro genCopyrightCanEdit entity>
///  Do not remove this unless you get business authorization.
///  <#if entity?is_string>${entity}<#else>${entity.description!}</#if>
///  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
///  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
</#macro>
<#macro genTypeWithGeneric r><#if r.isArray>List<${r.generic}><#else>${r.type}<#if r.isGeneric><${r.generic}></#if></#if></#macro>
<#function getSimpleType f><#assign result><#if f.isGeneric><#if f.genericName??>${f.genericName}<#else>${f.generic}</#if><#else>${f.type}</#if></#assign> <#return result></#function>
<#function canGenReducer fun>
<#return fun.state.genEffect || fun.state.genReducer>
</#function>
<#function getReduceName fun genEffect><#assign text>${fun}<#if genEffect>_success</#if></#assign><#return text></#function>

<#function isNotEmpty str>
  <#return (str??) && str?length gt 0>
</#function>

<#function isEmpty str>
  <#return !isNotEmpty(str!)>
</#function>

<#function isNotEmptyList list>
    <#return (list??) && (list?size gt 0) >
</#function>

<#function isEmptyList list>
    <#return !isNotEmptyList(list!) >
</#function>

<#function genResultName fun>
    <#if !fun.return.isSimple>
        <#if fun.return.generic??>
            <#assign resultName>${fun.return.generic?uncap_first}<#if fun.return.isArray>s</#if><#if fun.return.isPageList>PageList</#if></#assign>
        <#else>
            <#assign resultName>${fun.return?uncap_first}<#if fun.return.isArray>s</#if></#assign>
        </#if>
    <#else>
        <#assign resultName>${fun}</#assign>
        <#assign resultName><#if resultName?starts_with("get")>${resultName?substring(3)?uncap_first}<#else>${resultName}</#if></#assign>
        <#assign indexBy=resultName?index_of("By")/>
        <#assign resultName><#if indexBy gt 0 >${resultName?substring(0,indexBy)}<#else>${resultName}</#if></#assign>
        <#assign resultName><#if resultName?starts_with("create")>${resultName?substring(6)}<#else>${resultName}</#if></#assign>
        <#assign resultName><#if resultName?starts_with("delete")>result<#else>${resultName}</#if></#assign>
        <#assign resultName><#if resultName?length =0><@genTypeWithGeneric fun.return/><#else>result</#if></#assign>
        <#assign resultName>${resultName?uncap_first}</#assign>
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

<#function setupName>
<#return 'init'>
</#function>

<#function canDrawFormField f>
    <#if f="deleteFlag">
        <#return false>
    </#if>

    <#if !(f.isSimple || f.isEnum)>
        <#return false>
    </#if>

    <#if f.isArray>
       <#if f.generic?? && !(f.generic.isSimple || f.generic.isEnum)>
           <#return false>
       </#if>
    </#if>

    <#if f.noJson>
        <#return false>
    </#if>

    <#return true>
</#function>

<#function canDrawFormParam p>
    <#if p="deleteFlag" || p="page" || p="pageSize" || p="pageNum" || p.isPagination>
        <#return false>
    <#else>
        <#return true>
    </#if>
</#function>

<#function fix$ importStr>
    <#assign result>${importStr?replace('$','\\$')}</#assign>
    <#return result>
</#function>

<#macro genImports imports,relativePath>
    <#list imports as import>
        <#if import.importPath??>
import '${relativePath}${import.importPath}/${fix$(import)}.dart';
        <#else>
${import.wholeImportPath};
        </#if>
    </#list>
</#macro>

<#function genArea bean>
<#assign areaName>${bean?uncap_first}Area</#assign>
<#return areaName>
</#function>

<#macro genFormConfigsInteface bean f ind>
<#assign text>
  <#if (f.description?length gt 0)>
/** ${f.description}  ${f.temporalType!}*/
  </#if>
${f?cap_first}?: typeof ${bean?uncap_first}_${f} & Partial<FormItemConfig>,
</#assign>
<@indent text ind/>
</#macro>

<#macro genSelectOptionConsts f>
const ${f.type?uncap_first}SelectOptions= makeSelectOptions(${f.type?uncap_first}Options);
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

<#macro genBeanType bean genName><#if bean.genericFields?? ><<#list bean.genericFields as g><#if genName?length gt 0>${genName}<#else>${g.genericName}</#if><#if g_has_next>, </#if></#list>></#if></#macro>
<#function genType p>
    <#if p.isArray>
      <#assign result>List<${p.generic}></#assign>
    <#else>
        <#assign result>${p.type}<#if p.isGeneric><${p.generic}></#if></#assign>
    </#if>
    <#return result>
</#function>

<#function appendParam paramsStr pStr>
   <#assign result=paramsStr>
   <#if pStr?length gt 0>
   <#assign result>${paramsStr}<#if paramsStr?length gt 0>, </#if>${pStr}</#assign>
   </#if>
   <#return result>
</#function>

<#function genTypeAndNames params doRequired>
   <#assign hasPage=false>
   <#assign hasPageSize=false>
   <#list params as p>
   <#if p=='page'>
       <#assign hasPage=true>
   </#if>
   <#if p=='pageSize'>
       <#assign hasPageSize=true>
   </#if>
  </#list>
  <#assign paramsStr=''>
  <#list params as p>
    <#if p.type=='PaginationProps' || p.type=='Pagination'>
        <#assign paginationStr=''>
        <#if !hasPage>
           <#assign paginationStr>${appendParam(paginationStr,'int page')}</#assign>
        </#if>
        <#if !hasPageSize>
           <#assign paginationStr>${appendParam(paginationStr,'int pageSize')}</#assign>
        </#if>
        <#assign paramsStr>${appendParam(paramsStr,paginationStr)}</#assign>
    <#else>
        <#assign pStr><#if !p.required || !doRequired><#else>@required </#if>${genType(p)} ${p}</#assign>
        <#assign paramsStr>${appendParam(paramsStr,pStr)}</#assign>
    </#if>
  </#list>
  <#return  paramsStr>
</#function>

<#function genParamsStr params>
   <#assign hasPage=false>
   <#assign hasPageSize=false>
   <#list params as p>
   <#if p=='page'>
       <#assign hasPage=true>
   </#if>
   <#if p=='pageSize'>
       <#assign hasPageSize=true>
   </#if>
  </#list>
  <#assign paramsStr=''>
  <#list params as p>
    <#if p.type=='PaginationProps' || p.type=='Pagination'>
        <#assign paginationStr=''>
        <#if !hasPage>
           <#assign paginationStr>${appendParam(paginationStr,"page: page")}</#assign>
        </#if>
        <#if !hasPageSize>
           <#assign paginationStr>${appendParam(paginationStr,"pageSize: pageSize")}</#assign>
        </#if>
        <#assign paramsStr>${appendParam(paramsStr,paginationStr)}</#assign>
    <#else>
        <#assign pStr>${p}: ${p}</#assign>
        <#assign paramsStr>${appendParam(paramsStr,pStr)}</#assign>
    </#if>
  </#list>
  <#return  paramsStr>
</#function>



<#function nextEffectName fun>
    <#return fun+'Next'>
</#function>

<#function refreshEffectName fun>
    <#return fun+'Refresh'>
</#function>



<#macro genFieldDescription f ind>
<#assign text>
<#if (f.description?length gt 0)>
/** ${f.description} ${f.temporalType!}*/
</#if>
</#assign>
<#if text?? && text?length gt 0>
<@indent text ind/>
</#if>
</#macro>

<#macro assginField bean f dataName ind>
<#assign text>
<#assign value=genValueConfigs(f, dataName)>
const ${bean?uncap_first}_${f}Value = ${value};
</#assign>
<#if text?? && text?length gt 0>
<@indent text ind/>
</#if>
</#macro>


<#function removeGet name>
  <#return StringUtil.trimePrefixIgnoreCase(name,'get')>
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
        <#assign  customBuild>Select</#assign>
    <#elseif field.referConfig??>
        <#assign customBuild>Select</#assign>
    <#else>
        <#assign customBuild='Input'>
    </#if>
    <#return customBuild>
</#function>

<#macro  genFieldProps beanOrFun p ind>
<#if !beanOrFun??>
<#return></return>
</#if>
<#assign text>
<#assign editorName>${getEditorName(p)}</#assign>
key: '${p}',
dataIndex: '${p}',
title: '${p.title}',
<#if p.noJson>
noJson: true,
<#else>
renderColumn: UIColumns.${editorName}Render,
</#if>
<#if p.hidden>
hidden: true,
</#if>
<#if p.isId>
isId: true,
</#if>
<#if p.isEnum>
isEnum: true,
</#if>
<#if p.isArray>
isArray: true,
</#if>
<#if p.temporalType??>
temporalType: TemporalType.${p.temporalType},
format: ${p.temporalType}_FORMAT,
</#if>
<#if p.editorType?? && p.editorType='Hidden'>
typeIsHidden: true,
</#if>
<#if isNotEmpty(p.changeBy!)>
changeBy: '${p.changeBy}',
</#if>
<#if editorName=='Image'>
renderImage: true,
</#if>
<#if p.referConfig??>
referConfig: {
  <#if p.isEnum>
  options: <#if p.isGeneric>${p.generic?uncap_first}<#else>${p.type?uncap_first}</#if>Options,
  </#if>
  <#if p.referConfig.api??>
  api: '${p.referConfig.api}',
  </#if>
  <#if p.referConfig.referField??>
  referField: '${p.referConfig.referField}',
  </#if>
  <#if p.referConfig.optionConvertor??>
      <#assign url>${p.referConfig.optionConvertor.url!}</#assign>
      <#assign parentId>${p.referConfig.optionConvertor.parentId!}</#assign>
      <#assign value>${p.referConfig.optionConvertor.value!}</#assign>
      <#assign title>${p.referConfig.optionConvertor.title!}</#assign>
      <#assign label>${p.referConfig.optionConvertor.label!}</#assign>
  <#if isNotEmpty(value) || isNotEmpty(title) || isNotEmpty(url) || isNotEmpty(parentId)>
  optionConvertor: {
    <#if isNotEmpty(value)>
    value: '${value}',
    </#if>
    <#if isNotEmpty(title)>
    title: '${title}',
    </#if>
    <#if isNotEmpty(url)>
    url: '${url}',
    </#if>
    <#if isNotEmpty(parentId)>
    parentId: '${parentId}',
    </#if>
    <#if isNotEmpty(label)>
    label: '${label}',
    </#if>
  },
  </#if>
  </#if>
},
</#if>
config: {
  <#if editorName=='Switch'>
  valuePropName: 'checked',
  </#if>
<#--  <#if editorName=='Image' || editorName=='Upload'>
  valuePropName: 'fileList',
  </#if>-->
    <#if isNotEmptyList(p.rules!)>
  rules: [
        <#list p.rules as rule>
    {
            <#if (rule.required?? && rule.required ) || (p.required?? && p.required)>
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
},
<#if isNotEmpty(p.falseTitle!)>
falseTitle: '${p.falseTitle}',
</#if>
<#if isNotEmpty(p.nullTitle!)>
nullTitle: '${p.nullTitle}',
</#if>
<#if isNotEmpty(p.trueTitle!)>
trueTitle: '${p.trueTitle}',
</#if>
<#if isNotEmpty(p.props!)>
props: {${p.props}},
</#if>
</#assign>
<@indent text ind/>
</#macro>


<#macro  genParamProps fun param ind>
<#assign text>
<#assign editorName>${getEditorName(param)}</#assign>
UIEditor__: UIEditors.Build${editorName}Editor,
Editor: UIEditors.Build${editorName}Editor,
</#assign>
<@indent text ind/>
</#macro>