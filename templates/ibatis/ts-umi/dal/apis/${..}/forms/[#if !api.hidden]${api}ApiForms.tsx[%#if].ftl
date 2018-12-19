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
${fun}_${f}.Editor =
<@genFormFunctions fun f "  "/>

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
  export interface ${api}Api${fun?cap_first}FormItemConfigMap extends FormItemConfigMap {
    <#list fun.params as param>
      <#if !canDrawFormParam(param)>
          <#continue>
      </#if>
      <@genFormConfigsInteface fun param "    "/>
    </#list>
  }

  export const get${fun?cap_first}FormItemConfigMap = (queryRule: ObjectMap<any> = {}, pagesProps: PagesProps): ${api}Api${fun?cap_first}FormItemConfigMap => {
  <#list fun.params as f>
      <#if !canDrawFormParam(f)>
          <#continue>
      </#if>
    <@assginField fun f 'queryRule' '    '/>
  </#list>

    return {
    <#list fun.params as f>
      <#if !canDrawFormParam(f)>
          <#continue>
      </#if>
      ${f?cap_first}: {...${fun?uncap_first}_${f}, initialValue: ${fun?uncap_first}_${f}Value, pagesProps, record: queryRule },
    </#list>
    }
  }
  </#list>
}