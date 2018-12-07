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

<#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    <@genFieldDescription f ''/>
const ${bean?uncap_first}_${f} = {
    <@genFieldProps bean f "  "/>
};
${bean?uncap_first}_${f}.Editor =
<@genFormFunctions bean f "  "/>

</#list>
export interface ${bean}FormItemConfigMap extends FormItemConfigMap {
<#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    <@genFormConfigsInteface bean f '  '/>

</#list>
}
export const get${bean?cap_first}FormItemConfigMap = (${bean?uncap_first}: ${bean}<@genBeanType bean 'any'/>, form?: FormPropsUtils): ${bean}FormItemConfigMap => {
<#list bean.allFields as f>
   <#if !canDrawField(f)>
        <#continue>
   </#if>
  <@genFieldDescription f '  '/>
  ${bean?uncap_first}_${f}.form = form;
  <#assign value=genValueConfigs(f,bean)>
  const ${bean?uncap_first}_${f}Value =${value};
  ${bean?uncap_first}_${f}.config.initialValue = ${bean?uncap_first}_${f}Value;
  ${bean?uncap_first}_${f}.data = ${bean?uncap_first}_${f}Value;
</#list>

  return {
<#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    ${f?cap_first}: ${bean?uncap_first}_${f},
</#list>
  }
}


