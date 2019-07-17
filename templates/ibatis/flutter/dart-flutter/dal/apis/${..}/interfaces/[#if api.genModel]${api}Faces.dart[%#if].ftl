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
<#--import '../pages/${api.route}/${api}CustomFaces.dart'-->
<@genImports api.imports,'../'/>
import '../../stgutil/stg_util.dart';
import 'package:flutter/material.dart';

class ${api}State<#-- with ${api?uncap_first}CustomState--> {
<#list api.areas as area>
<#if !area.isSimpleResponse>
  AreaState<${area}> ${genArea(area)};
</#if>
</#list>
}


abstract class ${api}AbstractModel {
<#if api.inits?size gt 0>
  ///${setupName()}?: Effect;
</#if>
<#list api.functions as fun>
<#if fun.state.genEffect>
  /// ${fun.description}
    <#assign one="">
    <#assign isOne =false>
    <#assign r=fun.return>
    <#if fun.params?size==1><#assign one=fun.params[0]><#assign isOne =true></#if>
  void ${fun}(<#if isEmptyList(fun.params)><#else><#if fun.json??>${fun.json}: ${genType(fun.json)}<#else>{ ${genTypeAndNames(fun.params,true)} }</#if></#if>) ;
  <#if fun.return.isPageList && fun.area??>
  ///${nextEffectName(fun)}?: Effect,
  </#if>
  <#if fun.state.genRefresh>
  ///${refreshEffectName(fun)}?: Effect,
  </#if>
</#if>
</#list>
}