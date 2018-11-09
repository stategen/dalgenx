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

export namespace ${api}ApiForms {
<#list api.functions as fun>
  <#if !fun.genForm>
      <#continue >
  </#if>
  <#if fun.params?? && fun.params?size gt 0>
  export interface ${fun}FormConfigs extends FormConfigs {
    <#list fun.params as param>
        <#if !canDrawParam(param)>
            <#continue>
        </#if>
          <@genFormConfigsInteface param /><#t>
    </#list>
  }

  </#if>
</#list>
<#list api.functions as fun>
  <#if fun.params?? && fun.params?size gt 0>
  <#if !fun.genForm>
      <#continue >
  </#if>
  export const ${fun?uncap_first}FormConfigs = (queryRule: ObjectMap<any> = {}): ${fun}FormConfigs => {
    const result: ${fun}FormConfigs = {
       <#list fun.params as param>
       <#if !canDrawParam(param)>
           <#continue>
       </#if>
      <@genFormConfigs param 'queryRule' /><#t>

      </#list>
    }

    <#list fun.params as param>
    <#if !canDrawParam(param)>
        <#continue>
    </#if>
    result.${param}.editor = <@genFormNode param 'result.'+param/>;
    </#list>

    return result;
  }
  </#if>
</#list>
}