import {PaginationProps} from "antd/lib/pagination/Pagination";
import {ColumnProps} from "antd/es/table";
import {call as Call, put as Put} from 'redux-saga/effects';
import React from 'react';
import {GetFieldDecoratorOptions, FormComponentProps} from "antd/es/form/Form";
import {OptionProps} from "antd/es/select";
import {ReactElement} from "react";
import {WrappedFormUtils} from "antd/es/form/Form";
import {History} from "history";
import {Key} from "path-to-regexp";
import {FormItemProps as _FormItemProps} from "antd/es/form/FormItem";
import _moment from 'moment';
import {AppProps, AppState} from "@i/interfaces/AppFaces";
import _cloneDeep from 'lodash.clonedeep'


export const TIME_FORMAT = "HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const cloneDeep = _cloneDeep;


export const URL_REG = /^[a-zA-z]+:\/\/[^/]*/;
export const DATA_URL_REG = /^data:[^\/]*/;
export const valueField = 'value';
export const moment = _moment;


export enum TemporalType {
  TIME = "TIME",
  DATE = "",
  TIMESTAMP = "TIMESTAMP",
}

export type KeyValue<T, V> = {
  [key in keyof T]?: V;
  }


export interface Action {
  type: any,
  payload?: Payload | any;
  error?: boolean;

  [propName: string]: any,
}

export interface RouteOrders {
  [route: string]: number
}

export interface Options extends KeyValue<Options, OptionProps> {
}

export type Reducer<S> = (state: S, action: Action) => S;

/*export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): Promise<T>;
}*/

export interface Dispatch {
  (Action): Promise<Action> | any;
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

}

export interface OptionMap {
  [propName: string]: Option,
}


export interface OptionsMap {
  [propName: string]: Option[],
}

export interface AreaState<T> {
  areaName?: string,
  list?: T[],
  index?: number,
  pagination?: PaginationProps;
  selectedRowKeys?: any[],
  doEdit?: boolean;
  doQuery?: boolean,
  queryRule?: any,
  type?: any,
  cancelState?: AreaState<T>,
}

export const initAreaState: AreaState<any> = {
  list: [],
  pagination: {},
  selectedRowKeys: [],
  doEdit: false,
  doQuery: false,
  type: null,
  index: null,
};

/*interfaces*/
export interface Payload {
  areaExtraProps__?: AreaState<any>;
  stateExtraProps__?: BaseState;

  [propName: string]: any,
}

export interface Bean {
}

export interface HasPropertiesBean extends Bean {
  // [propName: string]: any,
}

export interface HasLastOptionBean extends HasPropertiesBean {
  lastOptions__?: OptionsMap,
}

export interface Reducers<S> {
  updateState?: Reducer<S>,
}

export interface Effect {
  ({type, payload, error}: Action, {put, call, select}: SagaCommands): any,
}

export interface Effects {
}

export interface SubscriptionPros {
  dispatch?: Dispatch,
  history?: History,
}

export interface Subscription {
  ({dispatch, history}: SubscriptionPros): any;
}

export interface SetupProps {
  pathname?: string,
  match?: RegExpExecArray,
  keys?: Key[],
}

export interface SetupParamsFun {
  (setupProps: SetupProps): any,
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
  getInitState?: () => any;
}

export interface IModel<S, R extends Reducers<S>, E extends Effects> extends DvaModel {
  state?: S,
  reducers?: R,
  effects?: E,
}

export interface RouterReduxPushPros {
  pathname?: string,
  search ?: any,
}

export const modelPathsProxy = function <T>(dvaModel: DvaModel): T {
  let proxyObj: DvaModel = <DvaModel> {namespace: dvaModel.namespace};
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
};

export const abstractModel: IModel<any, Reducers<any>, Effects> = {
  reducers: {
    updateState(state: BaseState, {payload}) {
      return mergeObjects(
        state,
        payload,
      )
    },
  },
};


export interface DvaLocation extends Location {
  key?: string,
  query?: {};
}

export interface DvaPageElement {
  location?: DvaLocation;
  children?: ReactElement<any>[];
}

export interface LoadingProps {
  effects?: any;
  models?: any;
}

export interface ConnectionPros {
  location?: DvaLocation,
  dispatch?: Dispatch,
  loading?: LoadingProps
  children?: React.ReactNode,
}

export interface FormPropsUtils extends WrappedFormUtils {
  getFieldProps?(field: string, getFieldDecoratorOptions: GetFieldDecoratorOptions),
}

export interface FormProps {
  form?: FormPropsUtils,
}


export interface ComponetMap {
  [fieldname: string]: React.ReactNode;
}

export interface OptionConvertor {
  value?: string,
  title?: string,
  label?: string,
  url?: string,
  parentId?: string,
}

export const makeOptionMap = (options: Option[]): ObjectMap<Option> => {
  if (options) {
    return makeMap(options, valueField);
  }
  return {};
}


export function convertToOptions(options: Option[], optionConvertor: OptionConvertor): Option[] {
  if (options && optionConvertor && Object.keys(optionConvertor)) {
    const value = optionConvertor.value;
    const title = optionConvertor.title;
    const label = optionConvertor.label;
    const url = optionConvertor.url;
    options.forEach(option => {
      value && (option.value = option[value]);
      title && (option.title = option[title]);
      label && (option.label = option[label]);
      url && (option.url = option[url]);
    })
  }
  return options;
}


export interface ReferConfig {
  options?: OptionMap,
  api?: string,
  nullTitle?: string,
  referField?: string,
  optionConvertor?: OptionConvertor,
}

export interface FormItemProps extends Partial<_FormItemProps> {

}

export interface ColumnRender<T> {
  (record: T): any;

  (record: T, joinTitle: string): any;

  (record: T, joinTitle: string, text: string): any;

  (record: T, joinTitle: string, text: string, index: number): any;

  (record: T, joinTitle: string, text: string, index: number, columnConfig: ColumnConfig<T>): any;
}

export interface ColumnConfig<T> extends Partial<ColumnProps<T>> {
  // key?: React.Key,
  // dataIndex?: string,
  // title?: string,
  key?: string, //覆盖key
  noJson?: boolean,
  hidden?: boolean,
  isId?: boolean,
  isEnum?: boolean,
  isImage?: boolean,
  isArray?: boolean,
  renderImage?: boolean,
  format?: string,
  temporalType?: string,
  referConfig?: ReferConfig,
  typeIsHidden?: boolean,
  changes?: string[] ,
  changeBy?: string,
  nullTitle?: string,
  falseTitle?: string,
  trueTitle?: string,
  //from java bean annotation Editor
  props?: {};
  config?: GetFieldDecoratorOptions,
  renderColumn?: ColumnRender<T>,
}

export interface FormItemConfig extends ColumnConfig<any> {
  record?: HasLastOptionBean,
  UIEditor__?: any,
  formItemProps?: FormItemProps,
  /*Editor?: (props) => any,*/
  formProps?: FormProps,
  componentMap?: ComponetMap,
}

export const makeTreeOptions = (makeTree: boolean, options: Option[], referConfig: ReferConfig) => {
  if (referConfig.optionConvertor && referConfig.optionConvertor.parentId) {
    const optionTreeConfig = arrayToTree(options, valueField, referConfig.optionConvertor.parentId);
    options = optionTreeConfig.tree;
  }
  return options;
};

export const getOptionMapFormColumnConfig = (columnConfig: ColumnConfig<any>, record: Bean): OptionMap => {
  const referConfig = columnConfig.referConfig;

  if (columnConfig.isEnum) {
    return referConfig.options;
  }
  let options: Option[];

  const referField = referConfig.referField;
  options = record[referField];
  (options && !Array.isArray(options)) && (options = [options]);
  if (referConfig.optionConvertor) {
    options = convertToOptions(options, referConfig.optionConvertor);
  }
  (!options) && (options = []);
  return makeOptionMap(options);
};

export function getRecordValue(record, columnConfig: ColumnConfig<any> = null) {
  let value = record[columnConfig.key];
  if (value == undefined) {
    value = null;
  }
  return value;
}


export const getOptionsTitlesText = (columnConfig: ColumnConfig<any>, record: Bean, jion = '/') => {
  const value = getRecordValue(record, columnConfig);
  if (null == value) {
    return value;
  }

  const optionMap = getOptionMapFormColumnConfig(columnConfig, record);
  if (!columnConfig.isArray) {
    const option = optionMap[value];
    if (option) {
      return option.title;
    } else {
      return null;
    }
  }
  const newTextArray: string[] = [];
  const values = makerArray(value);
  values.forEach(value => {
    const option = optionMap[value];
    if (option) {
      newTextArray.push(option.title);
    }
  });
  return newTextArray.join(jion);
};

export const convertImageUrl = (imageFile) => {
  if (imageFile) {
    const url = imageFile.url;
    if (url) {
      if (!(url.startsWith('/') || url.match(URL_REG) || url.match(DATA_URL_REG))) {
        imageFile.url = window['publicPath'] + url;
      }
    }
  }
};

export const setFormItemConfigFormProps = (formItemConfigs: FormItemConfig[], formProps: FormProps) => {
  formItemConfigs.forEach(formItemConfig => {
    formItemConfig.formProps = formProps;
  })
};

export const setFormItemConfigMapFormProps = (formItemConfigMap: KeyValue<any, FormItemConfig>, formProps: FormProps) => {
  setFormItemConfigFormProps(Object.values(formItemConfigMap), formProps);
};


export interface FormItemConfigMap {
  [name: string]: FormItemConfig;
}

export interface FormItemConfigFixed extends Partial<FormItemConfig> {
  //这两个属性不参写在 FormItemConfig,否则ide点击不能到具体const上
  Editor?: (props: FormItemEditorProps) => any,
}

export function confirmChanges(formItemConfigs: FormItemConfig[]) {
  const formItemConfigMap = {} as FormItemConfigMap;
  formItemConfigs.forEach((formItemConfig: FormItemConfig) => {
    formItemConfigMap[formItemConfig.key] = formItemConfig;
  });

  formItemConfigs.forEach((formItemConfig: FormItemConfig) => {
    const changeBy = formItemConfig.changeBy;
    if (changeBy) {
      const parentFormItemConfig = formItemConfigMap[changeBy];
      let changes = parentFormItemConfig.changes;
      if (!changes) {
        changes = [];
        parentFormItemConfig.changes = changes;
      }
      changes.push(formItemConfig.key);
    }
  });
}


export interface FormItemEditorProps extends Partial<FormProps> {
  formItemConfig?: FormItemConfigFixed,
  formItemProps?: FormItemProps,
  children?: React.ReactNode,
}

export interface Option extends OptionProps {
  label?: string;
  children?: Option[],
  url?: string,
  isLeaf?: boolean
}

export class BaseCommand {
  static updateState_type(payload) {
    return {type: "updateState", payload};
  }
}

export interface FormItemConfigMap extends KeyValue<FormItemConfigMap, FormItemConfig> {
}


export function filterOptions(options: Option[], value: any) {
  if (value == null) {
    return null;
  }

  if (options == null) {
    return null;
  }

  if (!(value instanceof Array)) {
    value = makerArray(value);
  }

  const optionMap = makeMap(options, valueField);
  return value.map((v) => {
    const option = optionMap[v];
    if (option) {
      const {children = null, ...others} = option;
      return others;
    }
  })
}

export interface ObjectMap<T extends {}> {
  [propName: string]: T
}


export const makeMap = <T extends {}>(target: T[], idKeyName: string): ObjectMap<T> => {
  const map = {} as ObjectMap<T>;
  target.forEach((item) => {
    const keyValue = item[idKeyName];
    map[keyValue] = item;
  });
  return map;
};

export interface ArrayMap {
  [key: string]: boolean;
}

export const makeArrayMap = (arr: []): ArrayMap => {
  const result: ArrayMap = {};
  if (arr) {
    arr.forEach((a) => {
      result[a] = true;
    })
  }
  return result;
};

export const makeIndexMap = (target: {}[], idKeyName: string) => {
  const idIndexMap = {};
  target.forEach((item, index) => {
    let keyValue = item[idKeyName];
    idIndexMap[keyValue] = index;
  });
  return idIndexMap;
};

export const makerArray = <T>(source: T | T[]): T[] => {
  let sourceArray = null;
  if (source == undefined) {
    return undefined;
  }

  if (!(Array.isArray(source))) {
    sourceArray = new Array(1);
    sourceArray[0] = source;
  } else {
    sourceArray = source;
  }
  return sourceArray;
};

export const updateArray = (sources: any[], dest: {} | {}[], idKeyName: string) => {
  const result = Array.from(sources);
  const idIndexMap = makeIndexMap(result, idKeyName);
  const sourceArray = makerArray(dest);
  sourceArray.forEach((item) => {
    let keyValue = item[idKeyName];
    let forUpdateIndex = idIndexMap[keyValue];
    if (forUpdateIndex != null) {
      const newItem = {...result[forUpdateIndex], ...item};
      result[forUpdateIndex] = newItem;
    } else {
      const num = result.push(item);
      idIndexMap[keyValue] = num;
    }
  });

  return result;
};

export const delateArray = <T>(sources: T[], dest: any | any[] | T, idKeyName: string) => {
  const sourceArray = makerArray(dest);
  const map = {};
  const result = [];
  sourceArray.forEach((item) => {
    if (!(item instanceof Object)) {
      map[item] = item;
    } else {
      const key = item[idKeyName];
      map[key] = key;
    }
  });

  sources.forEach((item) => {
    const key = item[idKeyName];
    if (key != null) {
      let findKey = map[key];
      if (findKey == null) {
        result.push(item);
      }
    }
  });
  return result;
};

export const getMomentDate = (value) => {
  if (value == null) {
    return value;
  } else if (value._isAMomentObject) {
    return moment(value).toDate();
  }
  return value;
};

export const optimizeFieldPostValues = (dest: {}) => {
  Object.keys(dest).forEach((key) => {
    const item = dest[key];
    if (item == null) {
      delete dest[key];
    } else if (item._isAMomentObject) {
      dest[key] = item.valueOf();
    } else if (item instanceof Date) {
      dest[key] = item.valueOf();
    }
  });
};


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
      let key = null;
      for (key in dest) {
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
};


export const operateOptions = [{key: 'Update', name: 'Update'}, {key: 'Delete', name: 'Delete'}];

export const cleanSelectRowsProps: AreaState<any> = {
  selectedRowKeys: [],
};


export function uncapFirst(str) {
  return str.replace(/(\w)/, function (v) {
    return v.toLowerCase();
  });
}

export function convertTitleToLableOptions(options: Option[]) {
  if (options) {
    Object.values(options).forEach(
      (option) => {
        if (option.label == null) {
          option.label = option.title;
        }
        convertTitleToLableOptions(option.children)
      }
    )
  }
  return options;
}

export interface TreeConfig<T> {
  tree: T[],
  maxCol: number,
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree<T>(array: T[], id = 'id', pid = 'pid', children = 'children'): TreeConfig<T> {
  let maxCol = 1;
  if (!array) {
    return {tree: array, maxCol};
  }

  const map = makeMap(array, id);
  array.forEach((item) => {
    map[item[id]] = item;
  });

  return mapToTree(array, map, pid, children);
}

export function mapToTree<T>(array: T[], map, pid = 'pid', children = 'children'): TreeConfig<T> {
  let maxCol = 1;
  if (!array || !map) {
    return {tree: array, maxCol};
  }
  const maxColField = 'maxCol___';

  array.forEach((item) => {
    item[children] = undefined;
    item[maxColField] = maxCol;
  });

  const tree = [];
  array.forEach((item) => {
    const parent = map[item[pid]];
    if (parent) {
      !parent[children] && (parent[children] = []);
      parent[children].push(item);
      const itemLevel = parent[maxColField] + 1;
      item[maxColField] = itemLevel;
      maxCol = Math.max(maxCol, itemLevel);
    } else {
      tree.push(item);
    }
  });
  return {tree, maxCol};
}




