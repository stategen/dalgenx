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
import {Effect, Effects, Reducers, IModel, BaseState, modelPathsProxy, BaseProps, Reducer, AreaState, Subscription,
        Subscriptions, RouterReduxPushPros, SetupParamsFun, mergeObjects, initAreaState, ExtraBeanProps} from '@utils/DvaUtil';
import {${api?uncap_first}CustomState,${api}CustomSubscriptions , ${api}CustomEffects, ${api}CustomReducers} from '@pages/${api.route}/${api}CustomFaces'
<@genImports api.imports,'../'/>
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export interface ${api}InitState extends BaseState {
<#list api.areas as area>
<#if !area.isSimpleResponse>
  ${genArea(area)}?: AreaState<${area}>;
</#if>
</#list>
}

export type ${api}State = ${api}InitState & typeof ${api?uncap_first}CustomState;

export interface ${api}InitSubscriptions extends Subscriptions{
<#if api.inits?size gt 0>
  ${setupName()}?: Subscription;
</#if>
}

export type ${api}Subscriptions = ${api}InitSubscriptions & ${api}CustomSubscriptions;

export interface ${api}InitEffects extends Effects {
<#if api.inits?size gt 0>
  ${setupName()}?: Effect;
</#if>
<#list api.functions as fun>
<#if fun.state.genEffect>
  /** ${fun.description} */
  ${fun}?: Effect,
</#if>
</#list>
}

export type ${api}Effects = ${api}InitEffects & ${api}CustomEffects;

interface ${api}InitReducers<S extends ${api}State> extends Reducers<S> {
<#if api.inits?size gt 0>
  <@getReduceName setupName() true/>?: Reducer<${api}State>,
</#if>
<#list api.functions as fun>
  /** ${fun.description} <#if fun.state.genEffect> 成功后</#if> 更新状态*/
  <@getReduceName fun fun.state.genEffect/>?: Reducer<${api}State>,
</#list>
}

export type ${api}Reducers = ${api}InitReducers<${api}State> & ${api}CustomReducers;

<#assign path>${api.route?uncap_first?replace('/$','/:')}</#assign>
export interface ${api}Model extends IModel<${api}State, ${api}Reducers, ${api}Effects> {
  /** ${api?uncap_first} */
  namespace?: string;
  /** /${path} */
  pathname?: string;
  state?: ${api}State;
  reducers?: ${api}Reducers;
  effects?: ${api}Effects;
  subscriptions?: ${api}Subscriptions;
<#if api.inits?size gt 0>
  <#list api.inits as fun>
  ${fun}InitParamsFn?: SetupParamsFun;
  </#list>
  getInitState?: () => ${api}State;
</#if>
}

export interface ${api}Props extends BaseProps {
  ${api?uncap_first}State?: ${api}State,
}

<#assign path>${api.route?uncap_first?replace('/$','/:')}</#assign>
export const ${api?uncap_first}InitModel: ${api}Model = <${api}Model>{
  namespace: '${api?uncap_first}',
  pathname: '/${path}',
  state: {},
  subscriptions: {},
  reducers: <${api}Reducers>{},
  effects: <${api}Effects>{},
};

<#assign statesStr="">
<#list api.areas as area>
<#if !area.isSimpleResponse>
<#assign stateName>${api?uncap_first}${genArea(area)?cap_first}State</#assign>
export const ${stateName} = {
  areaName: '${genArea(area)}',
};
<#assign statesStr=appendParam(statesStr,'${genArea(area)}: {...${stateName}, ...initAreaState}')>
</#if>

</#list>
${api?uncap_first}InitModel.getInitState = () => {
  const initState = <#if statesStr?length gt 0>mergeObjects({${statesStr}},${api?uncap_first}CustomState);<#else>${api?uncap_first}CustomState;</#if>
  return initState;
}

${api?uncap_first}InitModel.state=${api?uncap_first}InitModel.getInitState();

/***把 namespace 带过来，以便生成路径*/
export const ${api?uncap_first}Effects = modelPathsProxy<${api}Effects>(${api?uncap_first}InitModel);

/***把 namespace 带过来，以便生成路径*/
export const ${api?uncap_first}Reducers = modelPathsProxy<${api}Reducers>(${api?uncap_first}InitModel);

export class ${api}Dispatch {
  static route(search?: any) {
    const pushRoute: RouterReduxPushPros = {
      pathname: ${api?uncap_first}InitModel.pathname,
    };
    if (search != null) {
      pushRoute.search = queryString.stringify(search);
    }
    return routerRedux.push(pushRoute);
  }
<#function buildParams fun>
    <#local params><#if isEmpty(fun.params)>params?: {}<#else><#if fun.json??>${fun.json}: ${genType(fun.json)}<#else>params: { ${genTypeAndNames(fun.params)} }</#if></#if>, areaExtraProps__?: AreaState<any>, stateExtraProps__?: ${api}State</#local>
    <#return params>
</#function>
<#if api.inits?size gt 0>

  static ${setupName()}_effect(<#if api.effectInits?size == 1><#list api.effectInits as fun>${buildParams(fun)}</#list>) {</#if>
        <#if api.effectInits?size gt 1>
        <#list api.effectInits as fun>
              ${fun}InitParams?: {${buildParams(fun)}},
        </#list>
               params?: {}) {
    </#if>
    return {
      type: ${api?uncap_first}InitModel.namespace + '/${setupName()}',
      payload: {
        <#if api.effectInits?size gt 1>
        ...params,
        </#if>
        <#list api.effectInits as fun>
           <#if api.effectInits?size gt 1>
        ${fun}InitParams,
           <#else>
               <#if fun.json??>
        ${fun.json},
               <#else>
        ...params,
               </#if>
        areaExtraProps__,
        stateExtraProps__,
           </#if>
        </#list>
      }
    }
  }
</#if>
<#assign  findUpdateState=false>
<#list api.functions as fun>
  <#if fun.state.genEffect>

    <#assign p_is_empty=isEmpty(fun.params)>
    <#assign method><#if fun.method??>${fun.method}<#else>GET</#if></#assign>
    <#assign url><#list fun.urlParts as u><#if u.isParam>:${u}<#else>${u}</#if></#list></#assign>
  /** ${fun.description} */
  static ${fun}_effect(${buildParams(fun)}) {
    return {
      type: ${api?uncap_first}InitModel.namespace + '/${fun}',
      payload: {
        <#if fun.json??>
        ${fun.json},
        <#else>
        ...params,
        </#if>
        areaExtraProps__,
        stateExtraProps__,
      }
    }
  };
  <#else>

  static <@getReduceName fun fun.state.genEffect/>_reducer(${api?uncap_first}State: ${api}State) {
    <#if !findUpdateState>
        <#if fun=="updateState">
            <#assign  findUpdateState=true>
        </#if>
    </#if>
    return {
      type: ${api?uncap_first}InitModel.namespace + '/<@getReduceName fun fun.state.genEffect/>',
      payload: {
        ...${api?uncap_first}State,
      }
    }
  }
  </#if>
</#list>
  <#if !findUpdateState>

  static updateState_reducer(${api?uncap_first}State: ${api}State) {
    return {
      type: ${api?uncap_first}InitModel.namespace + '/updateState',
      payload: {
        ...${api?uncap_first}State,
      }
    }
  }
  </#if>

}