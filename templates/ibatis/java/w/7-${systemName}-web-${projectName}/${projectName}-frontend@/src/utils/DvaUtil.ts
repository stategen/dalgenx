import {PaginationProps} from "antd/lib/pagination/Pagination";
import {History} from "history";
import {call as Call, put as Put, SelectEffect} from 'redux-saga/effects';
import * as React from 'react';
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";
import {SelectionBoxProps} from "antd/lib/table";
import {OptionProps} from "antd/lib/select";
import {ReactElement} from "react";
import {TabPaneProps} from "antd/lib/tabs";


export const TIME_FORMAT = "HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";

export interface Action {
  type: any,
  payload?: Payload | any;
  error?: boolean;

  [propName: string]: any,
}

export interface Options {
  [enumName: string]: OptionProps;
}

export type Reducer<S> = (state: S, action: Action) => S;

/*export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): Promise<T>;
}*/

export interface Dispatch {
  (action: Action): Promise<Action> | any;
}

export interface SelectFun {
  (StatesAlias): any;
}

export type select = (SelectFun);

export interface SagaCommands {
  put?: typeof Put,
  call?: typeof Call,
  select?: select,
  take: Function,
  cancel: Function,

  [key: string]: any,
}

export interface BaseState {
  /*  [areaName: string]: AreaState<any>;*/
}


export interface AreaState<T> {
  areaName?: string,
  item?: T,
  list?: T[],
  pagination?: PaginationProps;
  selectedRowKeys?: any[],
  doEdit?: boolean;
  doQuery?: boolean,
  queryRule?: any,
  type?: any,
  cancelState?: AreaState<T>,
}

/*interfaces*/
export interface Payload {
  areaExtraProps__?: AreaState<any>;
  stateExtraProps__?: BaseState;
  aaa: SelectionBoxProps

  [propName: string]: any,
}


export interface Reducers<S> {
  /*  showModal?: Reducer<S>,
    hideModal?: Reducer<S>,*/
  updateState?: Reducer<S>,
}

export interface Effect {
  ({type, payload, error}: Action, {put, call, select}: SagaCommands): any,
}

export interface Effects {
  [effect: string]: Effect;
}

export interface SubscriptionPros {
  dispatch?: Dispatch,
  history?: History
}

export interface Subscription {
  ({dispatch, history}: SubscriptionPros): any;
}

export interface Subscriptions {
  [subscription: string]: Subscription;
}

export interface DvaModel {
  pathname?: string;
  namespace?: string;
  state?: any;
  subscriptions?: Subscriptions;
  reducers?: Reducers<any>;
  effects?: Effects;
  lockPathsCache?: () => any;
}

export interface IModel<S, R extends Reducers<S>, E extends Effects> extends DvaModel {
  state?: S;
  reducers?: R;
  effects?: E,
}

export interface RouterReduxPushPros {
  pathname?: string;
  search ?: any;
}

export const modelPathsProxy = function <T>(dvaModel: DvaModel): T {
  let proxyObj: DvaModel = <DvaModel> {namespace:dvaModel.namespace};
  let namespace = proxyObj.namespace;
  const handleGet = {
    get: function (reducersOrEffects, propertyName, proxyed) {
      let path = reducersOrEffects[propertyName];
      if (path !== undefined) {
        return path;
      }
      path = namespace + "/" + propertyName;
      (<any>reducersOrEffects)[propertyName] = path;
      return path;
    }
  };

  const result: T = new Proxy(proxyObj, handleGet);
  return result;
}

export const abstractModel: IModel<any, Reducers<any>, Effects> = {
  state: <BaseState>{
    selectedRowKeys: [],
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${'$'}{total} Items`,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  reducers: {
    updateState(state: BaseState, {payload}) {
      return mergeObjects(
        state,
        payload,
      )
    },

    querySuccess(state: BaseState, {payload}) {
      const {list, pagination} = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
}

abstractModel.reducers.showModal = (state, {payload}) => {
  return {...state, ...payload, modalVisible: true};
}

abstractModel.reducers.hideModal = (state, {payload}) => {
  return {...state, modalVisible: false};
}


export interface LocationEx extends Location {
  query: {},
}

export interface DvaLocation extends Location {
  key?: string,
  query?: {};
}

export interface DvaTabPaneProps extends TabPaneProps {
  key?: string,
  opened?: boolean,
}

export interface DvaPageElement {
  location?: DvaLocation;
  children?: ReactElement<any>[];
}

export interface DvaChild extends ReactElement<any> {
  props: DvaPageElement;
}

export interface ConnectionPros {
  location?: DvaLocation,
  dispatch?: Dispatch,
  loading?
  children?: DvaChild,
}

export interface BaseProps extends ConnectionPros {
  children?,
}

export interface FormItemConfigs {
  name?: string,
  hidden?: boolean,
  isId?: boolean,
  isEnum?: boolean,
  isImage?: boolean,
  label?: string,
  isArray?: boolean,
  format?: string,
  options?: Options;
  config?: GetFieldDecoratorOptions,
  editor?: React.ReactNode,
}

export interface FormConfigs {
  [itemname: string]: FormItemConfigs;
}

export interface Bean {

}

export interface ObjectMap<T extends {}> {
  [propName: string]: T
}

export const makeMap = <T extends {}>(target: T[], idKeyName: string): ObjectMap<T> => {
  let map = {};
  target.forEach((item, index) => {
    let keyValue = item[idKeyName];
    map[keyValue] = item;
  });
  return map;
}

export const makeIndexMap = (target: {}[], idKeyName: string) => {
  let idIndexMap = {};
  target.forEach((item, index) => {
    let keyValue = item[idKeyName];
    idIndexMap[keyValue] = index;
  });
  return idIndexMap;
}

export const makerArray = (source: {} | {}[]) => {
  let sourceArray = null;
  if (!(source instanceof Array)) {
    sourceArray = new Array(1);
    sourceArray[0] = source;
  } else {
    sourceArray = source;
  }
  return sourceArray;
}

export const updateArray = (sources: any[], dest: {} | {}[], idKeyName: string) => {
  let result = Array.from(sources);
  let idIndexMap = makeIndexMap(result, idKeyName);
  let sourceArray = makerArray(dest);
  sourceArray.forEach((item) => {
    let keyValue = item[idKeyName];
    let forUpdateIndex = idIndexMap[keyValue];
    if (forUpdateIndex != null) {
      let newItem = {...result[forUpdateIndex], ...item};
      result[forUpdateIndex] = newItem;
    } else {
      let num = result.push(item);
      idIndexMap[keyValue] = num;
    }
  });

  return result;
}

export const delateArray = (sources: {}[], dest: string | string[] | {}, idKeyName: string) => {
  let sourceArray = makerArray(dest);
  let map = {};
  let result = [];
  sourceArray.forEach((item) => {
    if (!(item instanceof Object)) {
      map[item] = item;
    } else {
      let key = item[idKeyName];
      map[key] = key;
    }
  });

  sources.forEach((item) => {
    let key = item[idKeyName];
    if (key != null) {
      let findKey = map[key];
      if (findKey == null) {
        result.push(item);
      }
    }
  });
  return result;
}

export const optimizeFieldPostValues = (dest: {}) => {
  Object.keys(dest).forEach((key) => {
    let item = dest[key];
    if (item == null) {
      delete dest[key];
    } else if (item._isAMomentObject) {
      dest[key] = item.valueOf();
    }
  });
}


export const mergeObjects = (...sources) => {
  if (!sources || sources.length == 1) {
    return sources;
  }

  const result = {...sources[0]};
  let i = 0;
  while (i < sources.length - 1) {
    i++;
    const dest = sources[i];
    if (dest != null) {
      for (let key in dest) {
        const destItem = dest[key];
        if (destItem != null) {
          if (!(destItem instanceof Array)) {
            const sourceItem = result[key];
            if (sourceItem && sourceItem instanceof Object) {
              if (destItem instanceof Object) {
                result[key] = mergeObjects(sourceItem, destItem);
                continue;
              }
            }
          }
        }
        result[key] = destItem;
      }
    }
  }
  return result;
}


export const operateOptions = [{key: 'Update', name: 'Update'}, {key: 'Delete', name: 'Delete'}];

export const cleanSelectRowsProps: AreaState<any> = {
  selectedRowKeys: [],
};


