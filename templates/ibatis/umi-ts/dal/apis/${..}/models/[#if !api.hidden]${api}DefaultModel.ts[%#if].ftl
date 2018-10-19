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
import {${api?uncap_first}InitModel, ${api}Model, ${api}State} from "../interfaces/${api}Faces";
import ${api}Apis from "../apis/${api}Apis";
import {abstractModel, updateArray, delateArray, mergeObjects, AreaState} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
<@genImports api.imports,'../'/>
<#macro genSubscription funName>
({dispatch, history}) => {
  history.listen((location) => {
    if (!RouteUtil.isRoutMatchPathname(${api?uncap_first}DefaultModel.pathname, location.pathname)){
      return;
    }

    const payload = location.query || {page: 1, pageSize: 10};
    dispatch({
      type: '${api?uncap_first}/${funName}',
      payload,
    })
  })
};
</#macro>

export class ${api}Command {
<#if api.inits?size gt 0>
  static * ${setupName()}_effect({payload}, {call, put, select}) {
    let newPayload = {};
    <#assign checknames=''>
    <#list api.inits as fun>
    /** ${fun.description} */
        <#if fun.state.genEffect>

    const ${fun}Payload = yield ${api}Command.${fun}_effect({payload<#if api.inits?size gt 1>: {...payload, ...(payload ? payload.${fun}Params : null)}</#if>}, {call, put, select});
    newPayload = ${api}Command.<@getReduceName fun fun.state.genEffect/>_reducer(<${api}State>newPayload, ${fun}Payload);
        <#else>
    newPayload = ${api}Command.<@getReduceName fun fun.state.genEffect/>_reducer(<${api}State>newPayload, {});
        </#if>
    </#list>
    return newPayload;
  };

</#if>
<#list api.functions as fun>
  <#if fun.state.genEffect>
  /** ${fun.description} */
  static * ${fun}_effect({payload}, {call, put, select}) {
     <@genEffectBody api fun false/>
  };

  </#if>
  /** ${fun.description} <#if fun.state.genEffect> 成功后</#if> 更新状态*/
  static <@getReduceName fun fun.state.genEffect/>_reducer = (state: ${api}State, payload): ${api}State => {
    <@getReducerBody api fun/>
  };

</#list>
}

export const ${api?uncap_first}DefaultModel: ${api}Model = <${api}Model>(mergeObjects(abstractModel, ${api?uncap_first}InitModel));
<#if api.inits?size gt 0>

${api?uncap_first}DefaultModel.subscriptions.${setupName()} = <@genSubscription setupName()/>;

${api?uncap_first}DefaultModel.effects.${setupName()} = function* ({payload}, {call, put, select}) {
  const appState = yield select(_=>_.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, ${api?uncap_first}DefaultModel.pathname);
  if (!routeOpend){
    return;
  }
  const newPayload = yield ${api}Command.${setupName()}_effect({payload}, {call, put, select});

  <@genEffectPut setupName() true/>
};

${api?uncap_first}DefaultModel.reducers.<@getReduceName setupName() true/> = (state: ${api}State, {payload}): ${api}State => {
  return mergeObjects(
    state,
    payload,
  );
};

</#if>
<#list api.functions as fun>
<#if fun.state.genEffect>
/** ${fun.description} */
${api?uncap_first}DefaultModel.effects.${fun} = function* ({payload}, {call, put, select}) {
  const newPayload = yield ${api}Command.${fun}_effect({payload}, {call, put, select});
  <@genEffectPut fun fun.state.genEffect />
};
</#if>

${api?uncap_first}DefaultModel.reducers.<@getReduceName fun fun.state.genEffect/> = (state: ${api}State, {payload}): ${api}State => {
  return ${api}Command.<@getReduceName fun fun.state.genEffect/>_reducer(state, payload);
};

</#list>
