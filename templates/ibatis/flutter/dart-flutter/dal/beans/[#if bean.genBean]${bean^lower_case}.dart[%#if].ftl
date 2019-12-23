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
<@genImports bean.imports,'../'/>
import '../../stgutil/json_util.dart';
import '../../stgutil/front_bean.dart';

<#assign genericStr><@genBeanType bean ''/></#assign>
class ${bean}${genericStr}<#if bean.extend> extends ${bean.parentBean}</#if> with FrontBean {
<#assign hasIdField=false>
<#list bean.fields as f>
    <#if f.isId>
    <#assign idField=f>
    <#assign hasIdField=true>
  /// ${f}
  static const String ${bean}_ID = '${f}';

        <#break>
    </#if>
</#list>
  <#list bean.fields as f>
  <#if (f.description?length>0)>
  /// ${f.description}
  </#if>
  <#assign type>${getSimpleType(f)}</#assign>
  <#if f.isArray>List<</#if>${type}<#if f.isArray>></#if> ${f};

  </#list>
<#if isNotEmptyList(bean.allFields)>
  ${bean}({
<#list bean.allFields as f>
    <#if !f.isSuper>this.</#if>${f},
</#list>
  })<#if bean.extend> : super(<#list bean.superFields as f>${f}: ${f}<#if f_has_next>, </#if></#list>)</#if>;
</#if>

    <#assign genericFn=''>
    <#assign genericFnName=''>
    <#list bean.allFields as f>
        <#if (f.generic?? && f.generic.isObjectClass)>
            <#if !f.isArray>
                <#assign genericFn='FromJsonFn'>
                <#assign genericFnName='genericFromJsonFn'>
            <#else>
                <#assign genericFn='FromJsonListFn'>
                <#assign genericFnName='genericFromJsonListFn'>
            </#if>
          <#break>
        </#if>
    </#list>
  static ${bean}${genericStr} fromJson${genericStr}(Map<String, dynamic> json<#if isNotEmpty(genericFn)>, ${genericFn}${genericStr} ${genericFnName}</#if>) {
    if (json == null) {
      return null;
    }
    return ${bean}${genericStr}(
    <#list bean.allFields as f>
        <#if !f.serialize>
            <#continue >
        </#if>
        <#assign type>${getSimpleType(f)}</#assign>
        <#assign j>json['${f}']</#assign>
        <#assign psJson>
            <#if f.isArray>
                <#if f.isSimple>
                    <#if (f.generic?? && !f.generic.isObjectClass)  || (!f.isGeneric) >
                        JsonUtil.parseList<${type}>(${j}, JsonUtil.parse${type?cap_first})
                    <#elseif (f.generic?? && f.generic.isObjectClass)>
                        ${genericFnName}(<#if f.isArray>List<Map<String,dynamic>>.from(</#if>${j}<#if f.isArray>)</#if>)
                    <#else>
                        ${j}
                    </#if>
                <#else>${type}.fromJsonList(${j})
                </#if>
            <#else>
                <#if f.isSimple>
                  <#if (f.isGeneric && f.generic??) || (!f.isGeneric)>
                    JsonUtil.parse${type?cap_first}(${j})
                  <#else>
                    ${j}
                  </#if>
                <#else>${type}.fromJson(${j})
                </#if>
            </#if>
        </#assign>
      ${f}: <#compress>${psJson}</#compress>,
    </#list>
    );
  }

  static List<${bean}${genericStr}> fromJsonList${genericStr}(List jsonList<#if isNotEmpty(genericFn)>, ${genericFn}${genericStr} ${genericFnName}</#if>) {
    <#if isNotEmpty(genericFn)>
    List<${bean}${genericStr}> result;
    if (jsonList != null){
      List<Map<String, dynamic>> jsonMapList;
      if (jsonList is List<Map<String, dynamic>>){
        jsonMapList = List<Map<String, dynamic>>.from(jsonList);
      } else {
        jsonMapList= jsonList;
      }
      result = List(jsonMapList.length);
      for (var json in jsonList) {
        result.add(${bean}.fromJson(json, ${genericFnName}));
      }
    }
    return result;
    <#else>
    return JsonUtil.genFromJsonList(jsonList, ${bean}.fromJson);
    </#if>
  }
  <#if !bean.generic??>

  /// jsonEncode会调用这个方法
  @override
  Map<String, dynamic> toJson() {
    <#if bean="Response">
      ${json}
    </#if>
    var result = new Map<String, dynamic>();
    <#list bean.allFields as f>
        <#if !f.deserialize>
            <#continue>
        </#if>
    <#assign type>${getSimpleType(f)}</#assign>
    if (this.${f} != null) {
      <#if f.isArray>
      var list = List();
      for (var v in ${f}) {
          <#if f.isEnum >
        list.add(v.toString());
          <#elseif f.isSimple >
        list.add(JsonUtil.${type?uncap_first}ToJson(v));
          <#elseif  !f.generic?? || !f.generic.isObjectClass>
        list.add(v.toJson());
          <#else>
        list.add(v);
          </#if>
      }
      result['${f}'] = list;
      <#else>
          <#if f.isEnum >
      result['${f}'] = ${f}.toString();
          <#elseif f.isSimple>
      result['${f}'] = JsonUtil.${type?uncap_first}ToJson(${f});
          <#elseif  !f.generic?? || !f.generic.isObjectClass>
      result['${f}'] = ${f}.toJson();
          <#else>
      result['${f}'] =  ${f};
          </#if>
      </#if>
    }
    </#list>
    return result;
  }
  </#if>

  <#if hasIdField>
  static Map<${idField.type}, ${bean}> toIdMap(List<${bean}> ${bean?uncap_first}List) {
    var result = Map<${idField.type}, ${bean}>();
    if (${bean?uncap_first}List != null) {
      for (var ${bean?uncap_first} in ${bean?uncap_first}List) {
        if (${bean?uncap_first} != null) {
          result[${bean?uncap_first}.${idField}] = ${bean?uncap_first};
        }
      }
    }
    return result;
  }
  <#else>
  static Map<int, ${bean}> toIdMap(List<${bean}> ${bean?uncap_first}List) {
    var result = Map<int, ${bean}>();
    if (${bean?uncap_first}List != null) {
      int index = 0;
      for (var ${bean?uncap_first} in ${bean?uncap_first}List) {
        result[index] = ${bean?uncap_first};
        index ++;
      }
    }
    return result;
  }
  </#if>
<#--<#if !bean.generic??>

  static List<Map<String, dynamic>> toMaps(List<${bean}> ${bean?uncap_first}List) {
    var result = List<Map<String, dynamic>>();
    if (${bean?uncap_first}List != null) {
      for (var ${bean?uncap_first} in ${bean?uncap_first}List) {
        if (${bean?uncap_first} != null) {
          result.add(${bean?uncap_first}.toJson());
        }
      }
    }
    return result;
  }
</#if>-->

}

