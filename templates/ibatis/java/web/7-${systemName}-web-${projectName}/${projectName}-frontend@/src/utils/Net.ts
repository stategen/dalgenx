/* global window */
import cloneDeep from 'lodash.clonedeep';
import pathToRegexp, {Token, Key} from 'path-to-regexp';
import {message} from 'antd';
// import 'whatwg-fetch';
import {routerRedux} from 'dva/router'
import Response from "@i/beans/Response";
import fetch from "dva/fetch";


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

export interface RequestInitEx extends RequestInit {
  apiUrlKey?: string;
  url?: string;
  method?: Method | string,
  data?: {},
  mediaType?: MediaType,
}

function getFormData(jsonData: {}): FormData {
  let formData: FormData = new FormData();
  Object.keys(jsonData).forEach(key => {
    formData.append(key, jsonData[key])
  });
  return formData;
}

function getUrlData(jsonData: {}): string {
  let result: string = Object.keys(jsonData).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(jsonData[key]);
  }).join('&');
  return result;
}


const buildRequestProperties = (requestInitEx: RequestInitEx): RequestInitEx => {
  let {
    url,
    method,
    mediaType,
    data,
    apiUrlKey,
  } = requestInitEx;

  const cloneData = data ? cloneDeep(data) : {};

  let domain = ''
  const urlMathStr = /[a-zA-z]+:\/\/[^/]*/;
  if (url.match(urlMathStr)) {
    [domain] = url.match(urlMathStr);
    url = url.slice(domain.length)
  }
  const match: Token[] = pathToRegexp.parse(url);
  url = pathToRegexp.compile(url)(data);
  let item: Token;
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
    url = location.host +'/' + url;
  }

  let headers: Headers = new Headers();
  let body: any = null;

  if (mediaType == MediaType.FORM) {
    body = body || getFormData(cloneData);
  } else if (mediaType == MediaType.JSON) {
    headers.append('Content-Type', 'application/json');
    body = body || JSON.stringify(cloneData);
  } else {
    let paramUrl: string = getUrlData(cloneData) || '';
    url += paramUrl.length > 0 ? `?${'$'}{paramUrl}` : '';
    body = null;
  }

  let credentials: RequestCredentials = requestInitEx.credentials || "include";
  let result = {url, headers, method, body, credentials};
  return result;
};

export class Net {
  /***内部api获取，直接调用，省去编辑各种 headers 等麻烦  */
  static fetch(requestInitEx: RequestInitEx): any {
    let requestProperties: RequestInitEx = buildRequestProperties(requestInitEx);
    let {url, ...requestInit} = requestProperties;

    let value: any = fetch(url, requestInit)
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
    let requestProperties: RequestInitEx = buildRequestProperties(requestInitEx);
    let {url, ...requestInit} = requestProperties;
    requestInit.mode = "cors";
    let value: any = fetch(url, requestInit)
      .then((response) => JSON.stringify(response))
      .catch((error) => {
        throw error;
      });
    return value;
  }
}


