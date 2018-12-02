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
<#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    <#if (f.description?length gt 0)>
/** ${f.description}  ${f.temporalType!}*/
    </#if>
export const ${bean}_${f}: FormItemConfigs = {
    <#assign text><@genFieldProps f /></#assign>
    <@indent text "  "/>
};

    <#assign text><@genFormFunctions bean f/></#assign>
export const ${bean}_${f}_editor =
    <@indent text ''/>
${bean}_${f}.editor = ${bean}_${f}_editor;

</#list>
export const get${bean}FormConfigs = (${bean?uncap_first}: ${bean}<@genBeanType bean 'any'/>, formPropsUtils?: FormPropsUtils): ${bean}FormConfigs => {
<#list bean.allFields as f>
    <#if !canDrawField(f)>
        <#continue>
    </#if>
    <#if (f.description?length gt 0)>
  /** ${f.description}  ${f.temporalType!}*/
    </#if>
  ${bean}_${f}.formPropsUtils = formPropsUtils;
  ${bean}_${f}.config.<@genFormConfigs f bean />;
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


