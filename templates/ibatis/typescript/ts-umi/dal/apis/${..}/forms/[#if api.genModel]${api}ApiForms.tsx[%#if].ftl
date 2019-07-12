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
import UIEditors from "@utils/UIEditors";
import {
  FormItemConfig, FormItemConfigMap, TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ObjectMap,
  TemporalType, FormProps, confirmChanges<#if webFlag?? && webFlag>, FormItemProps</#if>, moment
} from "@utils/DvaUtil";
import UIColumns from "@utils/UIColumns";
<#list api.imports as imp>
    <#if imp.isEnum>
import {${imp?uncap_first}Options} from '../enums/${imp}';
    <#elseif imp.isBean>
import ${imp}Columns from '../columns/${imp}Columns';
    </#if>
</#list>


namespace ${api}ApiForms {
<#list api.functions as fun>
  <#if !fun.genForm || isEmptyList(fun.params) >
     <#continue >
  </#if>
  <#list fun.params as f>
    <#if !canDrawFormParam(f)>
      <#continue>
    </#if>
<@genFieldDescription f '  '/>
  const ${fun}_${f} = {
  <#if f.field??>
  <#assign fieldText><@genFieldProps fun f.field "    "/></#assign>
  <#else>
  <#assign fieldText></#assign>
  </#if>
  <#assign paramText><@genFieldProps fun f "    "/></#assign>
  <#if StringUtil.equals(fieldText,paramText)>
    ...${f.field.owner}Columns.${f},
  <#else>
${paramText}
  </#if>
  <@genParamProps fun f "    "/>
  };
   </#list>
  confirmChanges([
    <#list fun.params as f>
        <#if !canDrawFormParam(f)>
            <#continue>
        </#if>
      ${fun?uncap_first}_${f},
    </#list>
    ]
  );
</#list>

  <#list api.functions as fun>
    <#if !fun.genForm || isEmptyList(fun.params) >
      <#continue >
  </#if>

  export interface I${fun?cap_first}FormItemConfigMap extends FormItemConfigMap {
    <#list fun.params as param>
      <#if !canDrawFormParam(param)>
          <#continue>
      </#if>
      <@genFormConfigsInteface fun param "    "/>
    </#list>
  }

  let ${removeGet(fun)?cap_first}FormItemConfigMap = null;
  export const remove${fun?cap_first}FormItemConfigMapRef = ((ref) => ref ? null : ${removeGet(fun)?cap_first}FormItemConfigMap = null);
  <#list fun.params as f>
      <#if !canDrawFormParam(f)>
          <#continue>
      </#if>
      <#assign customBuild=getEditorName(f)>
  ${fun}_${f}.Editor = ((props?: UIEditors.${customBuild}EditorProps) => {
    return UIEditors.rebuildEditor(props, ${removeGet(fun)?cap_first}FormItemConfigMap.${f?cap_first}, remove${fun?cap_first}FormItemConfigMapRef);
  }) as any;
  </#list>

  /**
   <#list fun.params as f>
     <#if !canDrawFormParam(f)>
         <#continue>
     </#if>
   const ${f?cap_first}Editor = ${removeGet(fun)?uncap_first}FormItemConfigMap.${f?cap_first}.Editor;
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
  export const get${removeGet(fun)?cap_first}FormItemConfigMap = (queryRule: ObjectMap<any> = {}, formProps?: FormProps<#if webFlag?? && webFlag>, formItemProps?: FormItemProps</#if>): I${fun?cap_first}FormItemConfigMap => {
  <#list fun.params as f>
      <#if !canDrawFormParam(f)>
          <#continue>
      </#if>
    /** ${getEditorName(f)} */
    <@assginField fun f 'queryRule' '    '/>
  </#list>
    queryRule.lastOptions__ ? null : queryRule.lastOptions__ = {};
    const componentMap = {};
    ${removeGet(fun)?cap_first}FormItemConfigMap = {
    <#list fun.params as f>
      <#if !canDrawFormParam(f)>
          <#continue>
      </#if>
      ${f?cap_first}: {
        ...${fun?uncap_first}_${f},
        config: {...${fun?uncap_first}_${f}.config, initialValue: ${fun?uncap_first}_${f}Value},
        formProps,
        record: queryRule,
        componentMap,
        <#if webFlag?? && webFlag>formItemProps,</#if>
      },
    </#list>
    }
    return ${removeGet(fun)?cap_first}FormItemConfigMap;
  }
  </#list>
}
export default ${api}ApiForms;