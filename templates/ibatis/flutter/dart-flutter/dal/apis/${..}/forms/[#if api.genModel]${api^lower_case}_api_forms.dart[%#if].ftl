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
<#list api.imports as imp>
    <#if imp.isEnum>
import '../enums/${imp?lower_case}.dart';
    <#elseif imp.isBean>
import '../columns/${imp?lower_case}_columns.dart';
    </#if>
</#list>
import '../../stgutil/column_util.dart';
import '../../stgutil/stg_util.dart';

class ${api}ApiForms {
<#list api.functions as fun>
  <#if !fun.genForm || isEmptyList(fun.params) >
     <#continue >
  </#if>
  <#list fun.params as f>
    <#if !canDrawFormParam(f)>
      <#continue>
    </#if>
<@genFieldDescription f '  /// '/>
  static FormItemConfig ${fun}_${f} = <#rt>
  <#assign fieldText></#assign>
  <#if f.field??>
    <#assign fieldText><@genFieldProps fun f.field "    "/></#assign>
  </#if>
  <#assign paramText><@genFieldProps fun f "    "/></#assign>
  <#if StringUtil.equals(fieldText,paramText)>
FormItemConfig.clone(${f.field.owner}Columns.${f})
  <#else>
FormItemConfig(
${paramText}
  )
  </#if>
  <@genParamProps fun f "    /// "/>
  ;
  </#list>

  /// Self-executing
  static void _${fun}ConfirmChanges = confirmChanges([
    <#list fun.params as f>
        <#if !canDrawFormParam(f)>
            <#continue>
        </#if>
      ${fun?uncap_first}_${f},
    </#list>
    ]
  );
</#list>

}