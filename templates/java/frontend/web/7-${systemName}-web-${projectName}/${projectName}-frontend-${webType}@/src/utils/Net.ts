/* global window */
import cloneDeep from 'lodash.clonedeep';
import pathToRegexp, {Token, Key} from 'path-to-regexp';
import {message} from 'antd';
// import 'whatwg-fetch';
import {routerRedux} from 'dva/router'
import Response from "@i/beans/Response";
import fetch from "dva/fetch";
import {ObjectMap, optimizeFieldPostValues, URL_REG} from "@utils/DvaUtil";
import {UploadFile} from 'antd/es/upload/interface';


export enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'POST',
  PATCH = 'PATCH'
}

export enum MediaType {
  JSON = 'JSON',
  FORM = 'FORM',
  URL = 'URL',
}

export interface RequestInitEx extends Partial<RequestInit> {
  apiUrlKey?: string;
  url?: string;
  method?: Method | string,
  data?: ObjectMap<any> | any,
  mediaType?: MediaType,
}

function getFormData(jsonData: {}): FormData {
  let formData: FormData = new FormData();
  if (jsonData instanceof File){
    const uploadFile:Partial<UploadFile>=jsonData;
    formData.append('file' ,jsonData);
    formData.append("uid",uploadFile.uid);
    formData.append("type",uploadFile.type);
  } else {
    Object.keys(jsonData).forEach(key => {
      formData.append(key, jsonData[key])
    });
  }
  return formData;
}

function getUrlData(jsonData: {}): string {
  let paramsStr = Object.keys(jsonData).map(function (key) {
    let paramValue = jsonData[key];
    if (paramValue != null) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(paramValue);
    }
    return null;
  }).filter(value => value != null).join('&')
  return paramsStr;
}


const buildRequestProperties = (requestInitEx: RequestInitEx): RequestInitEx => {
  let {
    url,
    method,
    mediaType,
    data,
    apiUrlKey,
  } = requestInitEx;

  if (!data){
    data={}
  }

  let cloneData ;
  if (data instanceof File){
    cloneData=data;
  } else {
    cloneData = cloneDeep(data);
    delete cloneData.areaExtraProps__;
    delete cloneData.lastOptions__;
    optimizeFieldPostValues(cloneData);
  }

  let domain = '';
  const urlMatch =url.match(URL_REG);
  if (urlMatch) {
    [domain] = urlMatch;
    url = url.slice(domain.length)
  }
  const match: Token[] = pathToRegexp.parse(url);
  url = pathToRegexp.compile(url)(cloneData);
  for (let item of match) {
    if (item instanceof Object) {
      let key: Key = <Key>item;
      if (key.name in cloneData) {
        delete cloneData[key.name]
      }
    }
  }

  if (domain !== '') {
    url = domain + url;
  } else if (apiUrlKey) {
    url = window[apiUrlKey] + url;
  } else {
    url = location.host + '/' + url;
  }

  const headers: Headers = new Headers();
  let body: any = null;

  if (mediaType == MediaType.FORM) {
    body = getFormData(cloneData);
  } else if (mediaType == MediaType.JSON) {
    headers.append('Content-Type', 'application/json');
    body = JSON.stringify(cloneData);
  } else {
    let paramUrl: string = getUrlData(cloneData) || '';
    url += paramUrl.length > 0 ? `?${'${'}paramUrl}` : '';
    body = null;
  }

  const credentials: RequestCredentials = requestInitEx.credentials || "include";
  const result = {url, headers, method, body, credentials};
  return result;
};

export class Net {
  /***内部api获取，直接调用，省去编辑各种 headers 等麻烦  */
  static fetch(requestInitEx: RequestInitEx, responseWrapped: boolean = true): any {
    const requestProperties: RequestInitEx = buildRequestProperties(requestInitEx);
    const {url, ...requestInit} = requestProperties;
    const value: any = fetch(url, requestInit)
      .then((response) => response.json())
      .then((response: Response<any>) => {
        let success: boolean = response.success;
        if (success) {
          return response.data;
        } else {
          throw response;
        }
      })
      .catch((error) => {
        const responseError = error;
        let msg = null;
        if (responseError && responseError instanceof Object) {
          throw  responseError;
        } else {
          msg = error.message || 'Network Error'
        }
        throw msg;
      });
    return value;
  }

  /***外部api*/
  static request(theUrl?: string, requestInitEx?: RequestInitEx): any {
    requestInitEx = {url: theUrl, ...requestInitEx};
    const requestProperties: RequestInitEx = buildRequestProperties(requestInitEx);
    const {url, ...requestInit} = requestProperties;
    requestInit.mode = "cors";
    const value: any = fetch(url, requestInit)
      .then((response) => JSON.stringify(response))
      .catch((error) => {
        throw error;
      });
    return value;
  }
}


