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
<@genCopyright api/>
<@genImports api.imports,'../'/>
import UIUtil from "@utils/UIUtil";
import {
  FormItemConfig, FormItemConfigMap, TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ObjectMap,
  TemporalType, PagesProps, rebuildFormItemConfigs
} from "@utils/DvaUtil";
import moment from 'moment';
<#list api.imports as imp>
    <#if imp.isEnum>
import {${imp?uncap_first}Options} from '../enums/${imp}';
    </#if>
</#list>
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
<#macro  genFieldProps bean field ind>
<#assign text>
<#assign editorName>${getEditorName(field)}</#assign>
name: '${field}',
<#if field.hidden>
hidden: true,
</#if>
<#if field.isId>
isId: true,
</#if>
<#if field.isEnum>
isEnum: true,
</#if>
<#if field.isArray>
isArray: true,
</#if>
<#if field.temporalType??>
temporalType: TemporalType.${field.temporalType},
format: ${field.temporalType}_FORMAT,
</#if>
label: '${field.title}',
<#if isNotEmpty(field.editorType!)>
type: '${field.editorType}',
</#if>
<#if isNotEmpty(field.changeBy!)>
changeBy: '${field.changeBy}',
</#if>
<#if field.referConfig??>
referConfig: {
  <#if field.isEnum>
  options: <#if field.isGeneric>${field.generic?uncap_first}<#else>${field.type?uncap_first}</#if>Options,
  </#if>
  <#if field.referConfig.api??>
  api: '${field.referConfig.api}',
  </#if>
  <#if field.referConfig.none??>
  none: '${field.referConfig.none}',
  </#if>
  <#if field.referConfig.referField??>
  referField: '${field.referConfig.referField}',
  </#if>
},
</#if>
UIEditor: UIUtil.Build${editorName}Editor,
Editor: UIUtil.Build${editorName}Editor,
nullLablel: '${field.nullLablel}',
<#if isNotEmpty(field.props!)>
props: {${field.props}},
</#if>
config: {
  <#if editorName=='Switch'>
  valuePropName: 'checked',
  </#if>
<#--  <#if editorName=='Image' || editorName=='Upload'>
  valuePropName: 'fileList',
  </#if>-->
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
</#assign>
<@indent text ind/>
</#macro>

<#list api.functions as fun>
  <#if !fun.genForm || isEmptyList(fun.params) >
     <#continue >
  </#if>
  <#list fun.params as f>
    <#if !canDrawFormParam(f)>
      <#continue>
    </#if>
<@genFieldDescription f ''/>
const ${fun}_${f} = {
  <@genFieldProps fun f "  "/>
};
   </#list>
rebuildFormItemConfigs([
    <#list fun.params as f>
        <#if !canDrawFormParam(f)>
            <#continue>
        </#if>
    ${fun?uncap_first}_${f},
    </#list>
  ]
);
</#list>

export namespace ${api}ApiForms {
  <#list api.functions as fun>
    <#if !fun.genForm || isEmptyList(fun.params) >
      <#continue >
  </#if>

  export interface ${fun?cap_first}FormItemConfigMap extends FormItemConfigMap {
    <#list fun.params as param>
      <#if !canDrawFormParam(param)>
          <#continue>
      </#if>
      <@genFormConfigsInteface fun param "    "/>
    </#list>
  }

  /**
   <#list fun.params as f>
     <#if !canDrawFormParam(f)>
         <#continue>
     </#if>
   const ${f?cap_first}Editor = formItemConfigMap.${f?cap_first}.Editor;
   </#list>
     <#list fun.params as f>
         <#if !canDrawFormParam(f)>
             <#continue>
         </#if>
   <${f?cap_first}Editor
   >
   </${f?cap_first}Editor>
     </#list>
   */
  let ${fun?uncap_first}FormItemConfigMap = null;
  export const remove${fun?cap_first}FormItemConfigMapRef = ((ref) => ref ? null : ${fun?uncap_first}FormItemConfigMap = null);
  <#list fun.params as f>
      <#if !canDrawFormParam(f)>
          <#continue>
      </#if>
      <#assign customBuild=getEditorName(f)>
  ${fun}_${f}.Editor = ((props?: UIUtil.${customBuild}EditorProps) => {
    return UIUtil.rebuildEditor(props, ${fun?uncap_first}FormItemConfigMap.${f?cap_first}, remove${fun?cap_first}FormItemConfigMapRef);
  }) as any;
  </#list>

  export const get${fun?cap_first}FormItemConfigMap = (queryRule: ObjectMap<any> = {}, pagesProps: PagesProps): ${fun?cap_first}FormItemConfigMap => {
  <#list fun.params as f>
      <#if !canDrawFormParam(f)>
          <#continue>
      </#if>
    /** ${getEditorName(f)} */
    <@assginField fun f 'queryRule' '    '/>
  </#list>
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    ${fun?uncap_first}FormItemConfigMap = {
    <#list fun.params as f>
      <#if !canDrawFormParam(f)>
          <#continue>
      </#if>
      ${f?cap_first}: {
        ...${fun?uncap_first}_${f},
        config: {...${fun?uncap_first}_${f}.config, initialValue: ${fun?uncap_first}_${f}Value},
        pagesProps,
        record: queryRule,
        componentMap
      },
    </#list>
    }
    return ${fun?uncap_first}FormItemConfigMap;
  }
  </#list>
}
export default ${api}ApiForms;