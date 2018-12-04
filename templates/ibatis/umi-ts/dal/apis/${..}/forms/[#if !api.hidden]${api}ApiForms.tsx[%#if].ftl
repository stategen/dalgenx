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
<@formImports/>
<#list api.imports as imp>
    <#if imp.isEnum>
import {${imp?uncap_first}Options} from '../enums/${imp}';
    </#if>
</#list>

<#list api.functions as fun>
  <#if fun.params?? && fun.params?size gt 0>
  <#if !fun.genForm>
      <#continue >
  </#if>
  <#list fun.params as f>
      <#if !canDrawParam(f)>
          <#continue>
      </#if>
          <#if (f.description?length gt 0)>
/** ${f.description}  ${f.temporalType!}*/
          </#if>
const ${fun}_${f} = {
    <#assign text><@genFieldProps fun f /></#assign>
    <@indent text "  "/>
};
  <#assign text><@genFormFunctions fun f/></#assign>
${fun}_${f}.editor =
  <@indent text "  "/>

  </#list>

export namespace ${api}ApiForms {
      <#list api.functions as fun>
          <#if !fun.genForm>
              <#continue >
          </#if>
          <#if fun.params?? && fun.params?size gt 0>
  export interface ${fun?cap_first}FormConfigs extends FormConfigs {
          <#list fun.params as param>
              <#if !canDrawParam(param)>
                  <#continue>
              </#if>
  <#assign text><@genFormConfigsInteface fun param /><#t></#assign>
  <@indent text "  "/>
          </#list>
  }
          </#if>
      </#list>

  export const get${fun?cap_first}FormConfigs = (queryRule: ObjectMap<any> = {}, formPropsUtils?: FormPropsUtils): ${fun?cap_first}FormConfigs => {
      <#if !fun.genForm>
          <#continue >
      </#if>
      <#list fun.params as f>
          <#if !canDrawParam(f)>
              <#continue>
          </#if>
          <#if (f.description?length gt 0)>
    /** ${f.description}  ${f.temporalType!}*/
          </#if>
    ${fun}_${f}.formPropsUtils = formPropsUtils;
    <#assign value=genValueConfigs(f, 'queryRule')>
    ${fun}_${f}.config.initialValue = ${value};
    ${fun}_${f}.value = ${value};
      </#list>

    return {
    <#list fun.params as f>
      <#if !canDrawParam(f)>
          <#continue>
      </#if>
      ${f}: ${fun}_${f},
    </#list>
    }
  }
  </#if>
</#list>
}