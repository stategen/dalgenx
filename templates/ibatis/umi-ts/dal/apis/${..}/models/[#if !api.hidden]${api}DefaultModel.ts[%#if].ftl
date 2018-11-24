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
    <#assign state =fun.state>
    <#assign resultName>${genResultName(fun)}</#assign>
    <#assign returnTypeWithGeneric><@genTypeWithGeneric fun.return/></#assign>
    <#if !fun.return.isVoid>const ${resultName}: <@genTypeWithGeneric fun.return/> = </#if>yield call(${api}Apis.${fun}, payload);
    <#if !fun.return.isVoid>
    <#if fun.return.isSimpleResponse>
    if (${resultName} && !${resultName}.success) {
      throw ${resultName}.message;
    }
      <#assign resultName>payload</#assign>
    <#else>
      <#if fun.area?? && fun.area.idKeyName??>
        <#assign writeArea=true>
        <#assign newList>${fun.area?uncap_first}s</#assign>
        <#if newList=resultName>
              <#assign newList>new${fun.area}s</#assign>
        </#if>
        <#if state.operation!='FULL_REPLACE'>
    const old${fun.area}s: ${fun.area}[] = yield select(({${api?uncap_first}: ${api?uncap_first}State}) => ${api?uncap_first}State.${genArea(fun.area)}.list);
        </#if>
        <#if fun.return.isPageList>
    const pagination = ${resultName} ? ${resultName}.pagination : null;
        </#if>
        <#if state.operation='APPEND_OR_UPDATE_CURRENT'>
    const ${newList} = updateArray(old${fun.area}s, ${resultName} ? ${resultName}${doPageList(fun)} : null, "${fun.area.idKeyName}");
        <#elseif state.operation='DELETE_IF_EXIST'>
    const ${newList} = delateArray(old${fun.area}s, ${resultName} ? ${resultName}${doPageList(fun)} : null, "${fun.area.idKeyName}");
        <#else>
            <#assign newList>${resultName} ? ${arrayPrefix(fun)}${resultName}${doPageList(fun)}${arraySubfix(fun)} : []</#assign>
        </#if>
       <#else>
            <#assign writeResult=true>
       </#if>
      </#if>
    </#if>

    const newPayload: ${api}State = {
    <#if writeArea??>
      ${genArea(fun.area)}: {
          <#if newList?? && newList?length gt 0>
        list: ${newList},
          </#if>
          <#if fun.return.isPageList>
        pagination,
        queryRule: payload,
          </#if>
          <#if state.areaExtraProps?size gt 0>
        ...{
              <#list state.areaExtraProps as prop>
                  ${prop},
              </#list>
        },
          </#if>
        ...payload ? payload.areaExtraProps__ : null,
      },
    </#if>
    <#if writeResult??>
      ...${resultName},
    </#if>
    <#if state.stateExtraProps?size gt 0>
      ...{
      <#list state.stateExtraProps as prop>
        ${prop},
      </#list>
      },
    </#if>
      ...payload ? payload.stateExtraProps__ : null,
    };
    return newPayload;
  };

  </#if>
  /** ${fun.description} <#if fun.state.genEffect> 成功后</#if> 更新状态*/
  static <@getReduceName fun fun.state.genEffect/>_reducer = (state: ${api}State, payload): ${api}State => {
    <#assign state =fun.state>
    <#if !state.genEffect && ((state.areaExtraProps?size gt 0) || (state.stateExtraProps?size gt 0))>
        <#assign mergedState>mergedState</#assign>
    const ${mergedState}: ${api}State = {
        <#if fun.area?? && fun.area.idKeyName?? && (state.areaExtraProps?size gt 0)>
            ${genArea(fun.area)}: {
        ...{
            <#list state.areaExtraProps as prop>
                ${prop},
            </#list>
        },
        ...payload ? payload.areaExtraProps__ : null,
      },
        </#if>
        <#if state.stateExtraProps?size gt 0>
      ...{
            <#list state.stateExtraProps as prop>
                ${prop},
            </#list>
      },
      ...payload ? payload.stateExtraProps__ : null,
        </#if>
    };

    </#if>
    return mergeObjects(
      state,
    <#if mergedState??>
        ${mergedState},
    </#if>
      payload,
    );
  };

</#list>
}

export const ${api?uncap_first}DefaultModel: ${api}Model = <${api}Model>(mergeObjects(abstractModel, ${api?uncap_first}InitModel));
<#if api.inits?size gt 0>

${api?uncap_first}DefaultModel.subscriptions.${setupName()} = ({dispatch, history}) => {
  history.listen((location) => {
    const pathname = location.pathname;
    const match = RouteUtil.getMatch(${api?uncap_first}DefaultModel.pathname, pathname);
    if (!match) {
      return;
    }
    let payload = {page: 1, pageSize: 10, ...RouteUtil.getQuery(location)} ;
    <#if api.inits?size gt 0>
        <#assign paramNames=''>
        <#list api.inits as fun>
    const ${fun}Params = ${api?uncap_first}DefaultModel.${fun}InitParamsFn ? ${api?uncap_first}DefaultModel.${fun}InitParamsFn({pathname, match}) : null;
        <#assign paramNames><#if paramNames?length gt 0>${paramNames}, </#if>${fun}Params</#assign>
        </#list>
    payload = {...payload, <#if api.inits?size gt 1>${paramNames}<#else>...${paramNames}</#if>}
    </#if>
    dispatch({
      type: '${api?uncap_first}/${setupName()}',
      payload,
    })
  })
};

${api?uncap_first}DefaultModel.effects.${setupName()} = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, ${api?uncap_first}DefaultModel.pathname);
  if (!routeOpend) {
    return;
  }

  if (${api?uncap_first}DefaultModel.getInitState){
    const initState =${api?uncap_first}DefaultModel.getInitState();
    yield put({
        type: 'updateState',
        payload: initState,
      }
    )
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
