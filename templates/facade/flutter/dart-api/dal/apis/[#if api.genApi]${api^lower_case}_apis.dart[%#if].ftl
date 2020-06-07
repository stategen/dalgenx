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
import "../configs/${projectName}_config.dart";
import '../../stgutil/net_util.dart';
import 'package:flutter/material.dart';

class ${api}Apis {
<#list api.functions as fun>
    <#assign method><#if fun.method??>${fun.method}<#else>GET</#if></#assign>
    <#assign url><#list fun.urlParts as u><#if u.isParam>:${u}<#else>${u}</#if></#list></#assign>
  /// ${method} ${url}
  /// ${fun.description}
  <#assign one="">
  <#assign isOne =false>
  <#assign r=fun.return>
  <#if fun.params?size==1><#assign one=fun.params[0]><#assign isOne =true></#if>
  static Future<<#if r.isVoid>dynamic<#else>${genType(r)}</#if>> ${fun}(<#if isEmptyList(fun.params)><#else><#if fun.json??>${genType(fun.json)} ${fun.json}<#else><#if isOne>${genType(one)} param, </#if>{Map<String, dynamic> payload, ${genTypeAndNames(fun.params,true)} }</#if></#if>) async {
    var requestInit = RequestInit();
    requestInit.apiUrlKey = ${projectName}BaseUrlKey;
    requestInit.path = '${url}';
    <#if fun.json??>
    requestInit.mediaType = MediaType.JSON;
    <#elseif (method=="POST")>
    requestInit.mediaType = MediaType.FORM;
    <#else>
    </#if>
    <#if isNotEmptyList(fun.params)>
      <#if fun.json??>
    var payload =${fun.json}<#if !fun.json.isSimple>?.toJson()</#if>;
      <#else>
    payload ??= {};
        <#if isOne>
    if (param != null) {
      <#if one.isSimple>
      payload['${one}'] = param;
      <#else>
      var json = param.toJson();
      payload.addAll(json);
      </#if>
    }
        </#if>
         <#list fun.params as p>
         <#if p=='pagination'>
             <#continue >
         </#if>
    if (${p} != null) {
     <#if p.isSimple>
      payload['${p}'] = ${p};
     <#else>
      var ${p}Json = ${p}.toJson();
      payload.addAll(${p}Json);
     </#if>
    }
        </#list>
      </#if>
    requestInit.data = payload;
    </#if>
    requestInit.method = Method.${method};
    var dest = await NetUtil.fetch(requestInit<#if !fun.isWrap || r.isVoid>, false</#if>);
    <#if r.isSimple>
    return dest;
    <#elseif r.isArray>
    return ${r.generic}.fromJsonList(dest as List);
    <#elseif !r.generic??>
    return ${r}.fromJson(dest);
    <#else>
        <#if !r.generic.isObjectClass>
          <#if r.org.generic?? && r.org.generic.isArray>
    return ${r.type}.fromJson(dest, ${r.generic}.fromJsonList);
          <#else>
    return ${r.type}.fromJson(dest, ${r.generic}.fromJson);
          </#if>
        </#if>
    </#if>
  }

</#list>
}