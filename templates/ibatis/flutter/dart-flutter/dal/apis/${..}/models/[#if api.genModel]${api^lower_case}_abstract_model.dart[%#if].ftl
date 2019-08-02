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

import 'dart:math' as Math;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

<@genImports api.imports,'../'/>
import '../../stgutil/stg_util.dart';
import '../../stgutil/init_state.dart';
import '../apis/${fix$(api)}Apis.dart';

class ${api}BaseState {
<#list api.areas as area>
    <#if !area.isSimpleResponse>
  AreaState<${area}> ${genArea(area)};
    </#if>
</#list>

  void merge(${api}BaseState source) {
<#list api.areas as area>
    <#assign areaName>${genArea(area)}</#assign>
    ${areaName} != null ? ${areaName}.merge(source.${areaName}) : ${areaName} = source.${areaName};
</#list>
  }

}

class _${api}State with ${api}BaseState {
<#if isNotEmptyList(api.areas)>
  _${api}State({
    <#list api.areas as area>
        <#if !area.isSimpleResponse>
    AreaState<${area}> ${genArea(area)},
        </#if>
    </#list>
  });
</#if>

}


abstract class ${api}AbstractModel with ChangeNotifier, ${api}BaseState {
<#if api.inits?size gt 0>

  Future<void> ${setupName()}(BuildContext context) async {
    var newState = await ${api}Command.${setupName()}(this,
    <#list api.inits as fun>
        ${fun}SetupParams : ${fun}SetupParams(context)<#if fun_has_next>, </#if>
    </#list>
    );
    mergeState(context, newState);
  }
</#if>

<#list api.functions as fun>
    <#if fun.state.genEffect>

  /// ${fun.description}
  Future<void> ${fun}(BuildContext context<#if isNotEmptyList(fun.params)>, <#if fun.json??>${fun.json}: ${genType(fun.json)}<#else>{Map<String, dynamic> payload, ${genTypeAndNames(fun.params,true)} }</#if></#if>) async {
    var newState = await ${api}Command.${fun}(this<#if isNotEmptyList(fun.params)>, payload: payload, ${genParamsStr(fun.params)}</#if>);
    mergeState(context, newState);
  }
        <#if fun.return.isPageList && fun.area??>

  Future<void> ${nextEffectName(fun)}(BuildContext context) async {
    var newState = await ${api}Command.${nextEffectName(fun)}(this);
    mergeState(context, newState);
  }
        </#if>
        <#if fun.state.genRefresh>

  Future<void> ${refreshEffectName(fun)}(BuildContext context) async {
    var newState = await ${api}Command.${refreshEffectName(fun)}(this);
    mergeState(context, newState);
  }
        </#if>
    </#if>
</#list>
<#if api.inits?size gt 0>
    <#list api.inits as fun>

  ${fun}SetupParams(BuildContext context) {
        <#if api.route?contains("/$")>
    return RouteUtil.getParams(context);
        <#else>
    return null;
        </#if>
  }
    </#list>
</#if>

  void mergeState(BuildContext context, ${api}BaseState newState) {
    this.merge(newState);
    notifyListeners();
  }
}


abstract class ${api}Command {
<#if api.inits?size gt 0>
  static Future<${api}BaseState> ${setupName()} (${api}AbstractModel ${api?uncap_first}state, {<#list api.inits as fun>Map<String, dynamic> ${fun}SetupParams<#if fun_has_next>, </#if></#list>}) async {
    var newState = ${api}BaseState();
    <#list api.inits as fun>
    // ${fun.description}
        <#if fun.state.genEffect>
            <#if isNotEmptyList(fun.params)>
            </#if>
    <#if fun.area??>var ${fun}State = </#if>await ${api}Command.${fun}(${api?uncap_first}state<#if isNotEmptyList(fun.params)>, payload: ${fun}SetupParams</#if>);
            <#if fun.area??>
    newState.merge(${fun}State);
            </#if>
        <#else>
        </#if>
    </#list>
    return newState;
  }

</#if>
<#function genOldAreaStr fun>
  <#local oldAreaStr>var old${genArea(fun.area)?cap_first} = ${api?uncap_first}state.${genArea(fun.area)};</#local>
  <#return oldAreaStr>
</#function>
<#list api.functions as fun>
  <#if fun.state.genEffect>

  <#assign genEffect=true>
  /// ${fun.description}
  static Future<${api}BaseState> ${fun}(${api}AbstractModel ${api?uncap_first}state<#if isNotEmptyList(fun.params)>, <#if fun.json??>${fun.json}: ${genType(fun.json)}<#else>{Map<String, dynamic> payload, ${genTypeAndNames(fun.params,true)} }</#if></#if>) async {
    <#assign state =fun.state>
    <#assign resultName>${genResultName(fun)}</#assign>
    <#assign returnTypeWithGeneric><@genTypeWithGeneric fun.return/></#assign>
    <#assign oldAreaStr=''>
    <#assign writeArea=false>
    <#assign writeResult=false>
    <#assign newMap=''>
    <#assign isOne =false>
    <#assign r=fun.return>
    <#if fun.params?size==1><#assign one=fun.params[0]><#assign isOne =true></#if>
    <#if r.isPageList && fun.area??>
      <#assign oldAreaStr=genOldAreaStr(fun)>
    ${oldAreaStr}
    payload = {<#if r.isPageList>'page': 1, 'pageSize': 10, </#if>...old${genArea(fun.area)?cap_first}.queryRule, ...payload};
    </#if>
    <#if !r.isVoid><@genTypeWithGeneric r/> ${resultName} = </#if>await ${api}Apis.${fun}(<#if isNotEmptyList(fun.params)><#if isOne>null, </#if>payload: payload, ${genParamsStr(fun.params)}</#if>);
    <#if !r.isVoid>
      <#if r.isSimpleResponse>
    if (${resultName} != null && !${resultName}.success) {
      throw ${resultName}.message;
    }
      <#assign resultName>payload</#assign>
      </#if>
      <#if fun.area?? && fun.area.idKeyName??>
        <#assign writeArea=true>
        <#if !r.isSimpleResponse>
          <#assign newMap>${fun.area?uncap_first}Map</#assign>
          <#if newMap=resultName>
              <#assign newMap>new${fun.area}Map</#assign>
          </#if>
          <#if state.dataOpt!='FULL_REPLACE' && oldAreaStr?length ==0>
    ${genOldAreaStr(fun)}
          </#if>
          <#if r.isPageList>
    var pagination = ${resultName}?.pagination;
          </#if>
    <#assign toMapParam><#if !r.isArray && !r.isPageList>[</#if>${resultName}${doPageList(fun)}<#if !r.isArray && !r.isPageList>]</#if></#assign>
    <#assign typeToMap><#if !r.isSimple>${getSimpleType(r)}.toIdMap(</#if>${toMapParam}<#if !r.isSimple>)</#if></#assign>
          <#if state.dataOpt='APPEND_OR_UPDATE'>
    var ${newMap} = CollectionUtil.appendOrUpdateMap(old${genArea(fun.area)?cap_first}?.clone()?.valueMap,  ${typeToMap});
          <#elseif state.dataOpt='DELETE_IF_EXIST'>
    var ${newMap} = CollectionUtil.deleteMap(old${genArea(fun.area)?cap_first}?.clone()?.valueMap, ${typeToMap});
          <#else>
            <#assign newMap>${typeToMap}</#assign>
          </#if>
        </#if>
      <#else>
        <#assign writeResult=true>
      </#if>
  </#if>

    var newState = _${api}State(
      <#if writeArea>
      ${genArea(fun.area)}: AreaState(
         <#if newMap?length gt 0>
        valueMap: ${newMap},
         </#if>
         <#if r.isPageList>
        pagination: pagination,
         </#if>
       <#if r.isPageList || fun.state.genRefresh>
        queryRule: payload,
       </#if>
      ),
      </#if>
    );
    return newState;
  }

  <#if r.isPageList && fun.area??>

  static Future<${api}BaseState> ${nextEffectName(fun)}(${api}AbstractModel ${api?uncap_first}state) async {
    ${genOldAreaStr(fun)}
    var pagination = old${genArea(fun.area)?cap_first}?.pagination;
    var page = pagination?.current;
    page = (page != null ? page : 0) + 1;
    var totalPages = (pagination.total / (pagination?.pageSize ?? 10)).ceil();
    page = Math.min(page, totalPages);
    var payload = {...old${genArea(fun.area)?cap_first}.queryRule, 'page': page};
    var newAreaState = await ${api}Command.${fun}(${api?uncap_first}state,payload: payload);
    return newAreaState;
  }
    </#if>
    <#if fun.state.genRefresh>

  static Future<${api}BaseState> ${refreshEffectName(fun)}(${api}AbstractModel ${api?uncap_first}state) async {
    ${genOldAreaStr(fun)}
    var payload = {...old${genArea(fun.area)?cap_first}.queryRule};
    var newAreaState = await ${api}Command.${fun}(${api?uncap_first}state,payload: payload);
    return newAreaState;
  }
      </#if>
  </#if>
</#list>

}