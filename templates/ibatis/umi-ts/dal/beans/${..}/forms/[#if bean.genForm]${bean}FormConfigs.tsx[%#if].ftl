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
<@genCopyright bean/>
import ${bean} from "../beans/${bean}"
<@formImports/>
<#list bean.imports as imp>
    <#if imp.isEnum>
import {${imp?uncap_first}Options} from '../enums/${imp}';
    </#if>
</#list>

<#assign gens><#if bean.genericFields?? ><<#list bean.genericFields as g>${g.genericName}<#if g_has_next>,</#if></#list>></#if></#assign>
export interface ${bean}FormConfigs extends FormConfigs {
<#list bean.allFields as f>
    <#if !canDrawField(f)>
      <#continue>
    </#if>
    <@genFormConfigsInteface f/>

</#list>
  [columnName: string]: FormItemConfigs,

}

export const get${bean}FormConfigs = (${bean?uncap_first}: ${bean}<@genBeanType bean 'any'/>): ${bean}FormConfigs => {
  const result: ${bean}FormConfigs = {
    <#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    <@genFormConfigs f bean />
    </#list>
  }


  <#list bean.allFields as f>
  <#if !canDrawField(f)>
      <#continue>
  </#if>
  result.${f}.editor = <@genFormNode f 'result.'+f />;
  </#list>

  return result;
}


