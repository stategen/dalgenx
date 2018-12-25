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
import {Net, Method, MediaType, RequestInitEx} from "@utils/Net";

<@genImports api.imports,'../'/>
import {apiUrlKey} from "../${configDir}/${projectName}-config";

export default class ${api}Apis {
<#list api.functions as fun>
    <#assign method><#if fun.method??>${fun.method}<#else>GET</#if></#assign>
    <#assign url><#list fun.urlParts as u><#if u.isParam>:${u}<#else>${u}</#if></#list></#assign>
  /**
   * ${method} ${url}
   * ${fun.description}
   */
  <#assign one="">
  static ${fun}(<#if isEmptyList(fun.params)>params?: {}<#else><#if fun.json??>${fun.json}: ${genType(fun.json)}<#else>params: { ${genTypeAndNames(fun.params,true)} }<#if fun.params?size==1><#assign one=fun.params[0]> | ${genType(one)}</#if></#if></#if>): ${genType(fun.return)} {
    let requestInit: RequestInitEx = <RequestInitEx>{};
    requestInit.apiUrlKey = apiUrlKey;
    requestInit.url = '${url}';
    <#if fun.json??>
    requestInit.mediaType = MediaType.JSON;
    <#elseif (method=="POST")>
    requestInit.mediaType = MediaType.FORM;
    <#else>
    </#if>
    requestInit.data = <#if fun.json??>${fun.json}<#else><#if one?has_content>params instanceof Object ? params : {${one}: params}<#else>params</#if></#if>;
    requestInit.method = Method.${method};
    return Net.fetch(requestInit);
  }

</#list>
}