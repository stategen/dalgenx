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
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import ${bean} from "../beans/${bean}"
import UIColumns from "@utils/UIColumns";
<#list bean.imports as imp>
    <#if imp.isEnum>
import {${imp?uncap_first}Options} from '../enums/${imp}';
    </#if>
</#list>

<#assign genericProps><#if bean.genericFields?? ><<#list bean.genericFields as g>${g.genericName}<#if g_has_next>,</#if></#list>></#if></#assign>
namespace ${bean}Columns {

  <#list bean.allFields as f>
  <#if (f.description?length gt 0)>
  /** ${f.description}  ${f.temporalType!}*/
  </#if>
  export const ${f} = {
    <@genFieldProps bean f '    '/>
    <#if !f.noJson>
        <#assign edidtorName>${getEditorName(f)}</#assign>
    render: (text: any, record: ${bean}${genericProps}, index: number) =>{
      return ${f}.renderColumn(record, null, text, index, ${f});
    },
    </#if>
  } as ColumnConfig<${bean}${genericProps}>;

  </#list>

  export const ${bean?uncap_first}columns = {
    <#list bean.allFields as f>
       <#if !canDrawFormField(f)>
           <#continue>
       </#if>
    ${f},
    </#list>
  }

}

export default ${bean}Columns;