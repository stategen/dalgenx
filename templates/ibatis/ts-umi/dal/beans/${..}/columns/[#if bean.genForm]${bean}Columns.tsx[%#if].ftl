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
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT} from "@utils/DvaUtil";
import ${bean} from "../beans/${bean}"
import {ColumnProps} from "antd/lib/table";
import moment from 'moment';
<#list bean.imports as imp>
    <#if imp.isEnum>
import {${imp?uncap_first}Options} from '../enums/${imp}';
    </#if>
</#list>

<#assign genericProps><#if bean.genericFields?? ><<#list bean.genericFields as g>${g.genericName}<#if g_has_next>,</#if></#list>></#if></#assign>
export interface ${bean}Columns<${bean?substring(0,1)}> {
<#list bean.allFields as f>
    <#if !canDrawFormField(f)>
      <#continue>
    </#if>
    <#if (f.description?length gt 0)>
  /** ${f.description}  ${f.temporalType!}*/
    </#if>
  ${f}?: ColumnProps<${bean?substring(0,1)}>,

</#list>
 /** 操作 */
 Operation?: ColumnProps<${bean?substring(0,1)}>,

 [columnName: string]: ColumnProps<${bean?substring(0,1)}>,

}

export const ${bean?uncap_first}DefaultColumns: ${bean}Columns<${bean}${genericProps}> = {

  <#list bean.allFields as f>
  <#if !canDrawFormField(f)>
      <#continue>
  </#if>
  <#if (f.description?length gt 0)>
  /** ${f.description}  ${f.temporalType!}*/
  </#if>
  ${f}: {
    title: '${f.title}',
    dataIndex: '${f}',
    key: '${f}',
    <#if f.temporalType??>
      <#assign format>${f.temporalType}_FORMAT</#assign>
    render: (text: any, record: ${bean}${genericProps}, index: number) => record.${f} ? moment(record.${f}).format(${format}) : null,
    <#elseif f.isImage>
    render: (text: any, record: ${bean}${genericProps}, index: number) => <img width={24} src={text} />,
    <#elseif f.isEnum>
    render: (text: any, record: ${bean}${genericProps}, index: number) => {
      const optionProp = ${f.type?uncap_first}Options[text];
      return optionProp != null ? optionProp.title : null;
    },
    </#if>
  },

  </#list>
}
