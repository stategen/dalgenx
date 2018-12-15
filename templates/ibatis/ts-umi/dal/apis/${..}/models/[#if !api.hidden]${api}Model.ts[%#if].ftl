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
import {abstractModel, updateArray, delateArray, mergeObjects, AreaState, BaseCommand} from "@utils/DvaUtil";
import RouteUtil from "@utils/RouteUtil";
<@genImports api.imports,'../'/>


export class ${api}Command extends BaseCommand {
<#if api.inits?size gt 0>
  static * ${setupName()}_effect({payload}, {call, put, select}) {
    let newPayload = {};
    <#assign checknames=''>
    <#if api.inits?size gt 1>
        <#assign paramsStr =''>
        <#list api.inits as fun>
        <#assign paramsStr>${appendParam(paramsStr,fun+'Params = null')}</#assign>
        </#list>
    const {${paramsStr}, ...lastParams} = payload || {};
    </#if>

    <#list api.inits as fun>
    /** ${fun.description} */
        <#if fun.state.genEffect>
    const ${fun}Payload = yield ${api}Command.${fun}_effect({payload<#if api.inits?size gt 1>: {...lastParams, ...${fun}Params}</#if>}, {call, put, select});
    newPayload = ${api}Command.${getReduceName(fun, fun.state.genEffect)}_reducer(<${api}State>newPayload, ${fun}Payload);
        <#else>
    newPayload = ${api}Command.${getReduceName(fun, fun.state.genEffect)}_reducer(<${api}State>newPayload, {});
        </#if>
    </#list>
    return newPayload;
  };

  <#assign reducerName>${getReduceName(setupName(), true)}</#assign>
  static ${reducerName}_type(payload) {
    return {type: "${reducerName}", payload: payload};
  }

</#if>
<#function genOldAreaStr fun>
  <#local oldAreaStr>const old${genArea(fun.area)?cap_first} = yield select((_) => _.${api?uncap_first}.${genArea(fun.area)});</#local>
  <#return oldAreaStr>
</#function>
<#list api.functions as fun>
  <#if fun.state.genEffect>
  <#assign genEffect=true>
  /** ${fun.description} */
  static * ${fun}_effect({payload}, {call, put, select}) {
    <#assign state =fun.state>
    <#assign resultName>${genResultName(fun)}</#assign>
    <#assign returnTypeWithGeneric><@genTypeWithGeneric fun.return/></#assign>
    <#assign oldAreaStr=''>
    <#assign writeArea=false>
    <#assign writeResult=false>
    <#assign newList=''>
    <#if fun.return.isPageList && fun.area??>
      <#assign oldAreaStr=genOldAreaStr(fun)>
    ${oldAreaStr}
    payload = {<#if fun.return.isPageList>page: 1, pageSize: 10, </#if>...old${genArea(fun.area)?cap_first}.queryRule, ...payload};
    </#if>
    <#if !fun.return.isVoid>const ${resultName}: <@genTypeWithGeneric fun.return/> = </#if>yield call(${api}Apis.${fun}, payload);
    <#if !fun.return.isVoid>
      <#if fun.return.isSimpleResponse>
    if (${resultName} && !${resultName}.success) {
      throw ${resultName}.message;
    }
      <#assign resultName>payload</#assign>
      </#if>
      <#if fun.area?? && fun.area.idKeyName??>
        <#assign writeArea=true>
        <#if !fun.return.isSimpleResponse>
          <#assign newList>${fun.area?uncap_first}s</#assign>
          <#if newList=resultName>
              <#assign newList>new${fun.area}s</#assign>
          </#if>
          <#if state.dataOpt!='FULL_REPLACE' && oldAreaStr?length ==0>
    ${genOldAreaStr(fun)}
          </#if>
          <#if fun.return.isPageList>
    const pagination = ${resultName} ? ${resultName}.pagination : null;
          </#if>
          <#if state.dataOpt='APPEND_OR_UPDATE'>
    const ${newList} = updateArray(old${genArea(fun.area)?cap_first}.list, ${resultName} ? ${resultName}${doPageList(fun)} : null, "${fun.area.idKeyName}");
          <#elseif state.dataOpt='DELETE_IF_EXIST'>
    const ${newList} = delateArray(old${genArea(fun.area)?cap_first}.list, ${resultName} ? ${resultName}${doPageList(fun)} : null, "${fun.area.idKeyName}");
          <#else>
            <#assign newList>${resultName} ? ${arrayPrefix(fun)}${resultName}${doPageList(fun)}${arraySubfix(fun)} : []</#assign>
          </#if>
        </#if>
      <#else>
        <#assign writeResult=true>
      </#if>
  </#if>

    const newPayload: ${api}State = {
    <#if writeArea>
      ${genArea(fun.area)}: {
          <#if newList?length gt 0>
        list: ${newList},
          </#if>
          <#if fun.return.isPageList>
        pagination,
          </#if>
        <#if fun.return.isPageList || fun.state.genRefresh>
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
    <#if writeResult>
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

  <#assign reducerName>${getReduceName(fun, genEffect)}</#assign>
  static ${reducerName}_type(payload) {
    return {type: "${reducerName}", payload: payload};
  }
    <#if fun.return.isPageList && fun.area??>

  static * ${nextEffectName(fun)}_effect({payload}, {call, put, select}) {
    const old${genArea(fun.area)?cap_first} = yield select((_) => _.${api?uncap_first}.${genArea(fun.area)});
    const pagination = old${genArea(fun.area)?cap_first}.pagination;
    let page = pagination.current;
    page = (page ? page : 0) + 1;
    const totalPages = Math.trunc(pagination.total / (pagination.pageSize || 10)) + 1;
    page = Math.min(page, totalPages)
    payload = {...old${genArea(fun.area)?cap_first}.queryRule, page};
    const newPayload = yield ${api}Command.${fun}_effect({payload}, {call, put, select});
    return newPayload;
  }
    </#if>
    <#if fun.state.genRefresh>

  static * ${refreshEffectName(fun)}_effect({payload}, {call, put, select}) {
    const old${genArea(fun.area)?cap_first} = yield select((_) => _.${api?uncap_first}.${genArea(fun.area)});
    payload = {...old${genArea(fun.area)?cap_first}.queryRule};
    const newPayload = yield ${api}Command.${fun}_effect({payload}, {call, put, select});
    return newPayload;
  }
      </#if>
  </#if>

  /** ${fun.description} <#if fun.state.genEffect> 成功后</#if> 更新状态*/
  static ${getReduceName(fun, fun.state.genEffect)}_reducer = (state: ${api}State, payload): ${api}State => {
    <#assign state =fun.state>
    <#assign mergedState="">
    <#if !state.genEffect && ((state.areaExtraProps?size gt 0) || (state.stateExtraProps?size gt 0))>
        <#assign mergedState>mergedState</#assign>
    const ${mergedState}: ${api}State = {
        <#if fun.area?? && fun.area.idKeyName??>
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
    <#if isNotEmpty(mergedState)>
      ${mergedState},
    </#if>
      payload,
    );
  };

</#list>
}

export const ${api?uncap_first}Model: ${api}Model = <${api}Model>(mergeObjects(abstractModel, ${api?uncap_first}InitModel));
<#if api.inits?size gt 0>

${api?uncap_first}Model.subscriptions.${setupName()} = ({dispatch, history}) => {
  history.listen((listener) => {
    const pathname = listener.pathname;
    const keys = [];
    const match = RouteUtil.getMatch(${api?uncap_first}Model.pathname, pathname,keys);
    if (!match) {
      return;
    }
    let payload = {...RouteUtil.getQuery(listener)} ;
        <#assign paramNames=''>
        <#list api.inits as fun>
    const ${fun}Params = ${api?uncap_first}Model.${fun}InitParamsFn ? ${api?uncap_first}Model.${fun}InitParamsFn({pathname, match, keys}) : null;
        <#assign paramNames><#if paramNames?length gt 0>${paramNames}, </#if>${fun}Params</#assign>
        </#list>
    payload = {...payload, <#if api.inits?size gt 1>${paramNames}<#else>...${paramNames}</#if>}
    dispatch({
      type: '${api?uncap_first}/${setupName()}',
      payload,
    })
  })
};
<#if api.route?contains("/$")>
<#list api.inits as fun>
<#assign path>${api.route?uncap_first?replace('/$','/:')}</#assign>
${api?uncap_first}Model.${fun}InitParamsFn = RouteUtil.getParams;
</#list>
</#if>

${api?uncap_first}Model.effects.${setupName()} = function* ({payload}, {call, put, select}) {
  const appState = yield select(_ => _.app);
  const routeOpend = RouteUtil.isRouteOpend(appState.routeOrders, ${api?uncap_first}Model.pathname);
  if (!routeOpend) {
    return;
  }

  if (${api?uncap_first}Model.getInitState) {
    const initState = ${api?uncap_first}Model.getInitState();
    yield put(${api}Command.updateState_type(initState));
  }

  const newPayload = yield ${api}Command.${setupName()}_effect({payload}, {call, put, select});
  <#assign reducerName>${getReduceName(setupName(), true)}</#assign>
  yield put(${api}Command.${reducerName}_type(newPayload));
};

${api?uncap_first}Model.reducers.${getReduceName(setupName(), true)} = (state: ${api}State, {payload}): ${api}State => {
  return mergeObjects(
    state,
    payload,
  );
};

</#if>
<#list api.functions as fun>
<#if fun.state.genEffect>
/** ${fun.description} */
${api?uncap_first}Model.effects.${fun} = function* ({payload}, {call, put, select}) {
  const newPayload = yield ${api}Command.${fun}_effect({payload}, {call, put, select});
  yield put(${api}Command.${getReduceName(fun, fun.state.genEffect)}_type(newPayload));
};
<#if fun.return.isPageList && fun.area??>

${api?uncap_first}Model.effects.${nextEffectName(fun)} = function* ({payload}, {call, put, select}) {
  const newPayload = yield ${api}Command.${nextEffectName(fun)}_effect({payload}, {call, put, select});
  yield put(${api}Command.${getReduceName(fun, fun.state.genEffect)}_type(newPayload));
};
</#if>
<#if fun.state.genRefresh>

${api?uncap_first}Model.effects.${refreshEffectName(fun)} = function* ({payload}, {call, put, select}) {
  const newPayload = yield ${api}Command.${refreshEffectName(fun)}_effect({payload}, {call, put, select});
  yield put(${api}Command.${getReduceName(fun, fun.state.genEffect)}_type(newPayload));
};
</#if>
</#if>

${api?uncap_first}Model.reducers.${getReduceName(fun, fun.state.genEffect)} = (state: ${api}State, {payload}): ${api}State => {
  return ${api}Command.${getReduceName(fun, fun.state.genEffect)}_reducer(state, payload);
};

</#list>
