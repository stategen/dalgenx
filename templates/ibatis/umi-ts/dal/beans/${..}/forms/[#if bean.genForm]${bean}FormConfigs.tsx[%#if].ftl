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
    <#if (f.description?length gt 0)>
/** ${f.description}  ${f.temporalType!}*/
    </#if>
const ${bean}_${f} = {
    <#assign text><@genFieldProps bean f /></#assign>
    <@indent text "  "/>
};
<#assign text><@genFormFunctions bean f/></#assign>
${bean}_${f}.editor =
<@indent text "  "/>

</#list>
export interface ${bean}FormConfigs extends FormConfigs {
<#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    <@genFormConfigsInteface bean f/>

</#list>
  [columnName: string]: FormItemConfig,
}
export const get${bean?cap_first}FormConfigs = (${bean?uncap_first}: ${bean}<@genBeanType bean 'any'/>, formPropsUtils?: FormPropsUtils): ${bean}FormConfigs => {
<#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    <#if (f.description?length gt 0)>
  /** ${f.description}  ${f.temporalType!}*/
    </#if>
  ${bean}_${f}.formPropsUtils = formPropsUtils;
  <#assign value=genValueConfigs(f,bean)>
  ${bean}_${f}.config.initialValue = ${value};
  ${bean}_${f}.value = ${value};
</#list>

  return {
<#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    ${f}: ${bean}_${f},
</#list>
  }
}


