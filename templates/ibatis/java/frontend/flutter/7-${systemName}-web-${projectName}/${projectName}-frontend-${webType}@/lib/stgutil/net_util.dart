import 'dart:io';

import '../intergrade/configs/${systemName}${projectName?cap_first}_config.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'log_utils.dart';
import 'toast.dart';
import '../intergrade/beans/response.dart' as Res;

import 'package:path_provider/path_provider.dart';

// 数据格式太乱,简单处理一下

//const _BASE_URL = "https://douban.uieee.com/v2";
//const _BASE_URL = "http://localhost:8080/tradeApp/";

const CODE_SUCCESS = 1; //自定义成功

const _REQUEST_ERROR = -100; //网络请求错误
const _TIMEOUT_ERROR_CODE = -101; // 网络超时,请重试!
const _INVALID_API_KEY = 104; //apikey无线
const _BAD_REQUEST = 400; //请求的地址不存在或者包含不支持的参数
const _UNAUTHORIZED = 401; //数据未授权
const _FORBIDDEN = 403; //数据被禁止访问访问
const _NOT_FOUND = 404; //请求的资源不存在或被删除
const _INTERNAL_SERVER_ERROR = 500; //内部错误
const _NEED_PERMISSION = 1000; //数据未授权


enum Method {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

const Map<Method, String> METHODS = {
  Method.GET: 'GET',
  Method.POST: 'POST',
  Method.PUT: 'PUT',
  Method.PATCH: 'PATCH',
  Method.DELETE: 'DELETE',
};

enum MediaType {
  JSON,
  FORM,
  URL,
}

class RequestInit {
  String baseUrlKey;
  String path;
  Method method;
  Map<String, dynamic> data;
  MediaType mediaType;
}


const Map<int, String> _NetError = {
  CODE_SUCCESS: "请求成功",
  _TIMEOUT_ERROR_CODE: "网络超时,请重试!",
  _REQUEST_ERROR: "网络请求错误",
  _INVALID_API_KEY: "ApiKey无效了",
  _BAD_REQUEST: "请求的地址不存在或者包含不支持的参数",
  _UNAUTHORIZED: "数据未授权",
  _FORBIDDEN: "数据被禁止访问访问",
  _NOT_FOUND: "请求的资源不存在或被删除",
  _INTERNAL_SERVER_ERROR: "内部错误",
  _NEED_PERMISSION: "数据未授权",
  null: "网络超时,请重试!",
};

class NetError {
  final String status;
  final int code;
  final String message;

  const NetError({this.code, this.status, this.message});
}

final Map<String, String> BASE_URLS = {
  ${systemName}${projectName?cap_first}BaseUrlKey: "http://192.168.43.14:8080/tradeApp/",
};

final Map<String, Dio> DIO_MAP = Map();

_onError(NetError netError) {
  String errorMessage = "接口请求异常： code: ${'${'}netError.code}, message: ${'${'}netError.message},status: ${'${'}netError
    .status}";
  Log.e(errorMessage);
  debugPrintStack(label: errorMessage);
  Toast.show(netError.message);
}


class NetUtil {

  static NetError _errorAnalysis(error) {
    if (error == null) {
      return NetError(code: _REQUEST_ERROR, message: '网络超时,请重试!');
    }

    if (error is NetError) {
      return error;
    }

    if (error is Map<String, dynamic>) {
      if (error['code'] == null) {
        return NetError(code: _REQUEST_ERROR, message: '网络超时,请重试!');
      }

      if (error["message"] == null) {
        var errorMessage = _NetError[error['code']];
        error["message"] = errorMessage;
      }

      return NetError(code: error['code'], message: error['message']);
    } else {
      return NetError(code: _REQUEST_ERROR, message: '网络请求错误');
    }
  }

  static _findDio(String baseUrlKey) async {
    Dio dio = DIO_MAP[baseUrlKey];
    if (dio == null) {
      String baseUrl=BASE_URLS[baseUrlKey];
      assert(baseUrl!=null,"baseUrl 不能为空");

      dio = Dio();
      dio.options.baseUrl =baseUrl;
      dio.options.connectTimeout = 100000; // 100s
      dio.options.receiveTimeout = 100000; // 100s
      Directory tempDir = await getTemporaryDirectory();
      String tempPath = tempDir.path;


      var persistCookieJar = new PersistCookieJar(dir: tempPath);
      dio.interceptors.add(CookieManager(persistCookieJar));
      DIO_MAP[baseUrlKey] = dio;
    }
    return dio;
  }

  // 统一数据，统一数据流出格式
  static Future<dynamic> fetch(RequestInit requestInit) async {
//    try {
    Dio dio = await _findDio(requestInit.baseUrlKey);
    var method = METHODS[requestInit.method];
    dynamic data;

    //组装data
    if (requestInit.mediaType == MediaType.FORM) {
      if (requestInit.data != null) {
        data = FormData.from(requestInit.data);
      }
    } else {
      data = requestInit.data;
    }

    //method类型
    var options = Options();
    options.method = method;

    var response = await dio.request(requestInit.path, options: options, data: data);
    if (response != null) {
      if (response.statusCode == 200) {
        var resEx = Res.Response.fromJson(response.data);
        if (!resEx.success) {
          throw NetError(code: resEx.code, status: resEx.status?.toString(), message: resEx.message);
        }
        return resEx.data;
      }
      throw {'code': response.statusCode};
    }
    else {
      throw {'code': _REQUEST_ERROR};
    }
//    } catch (e) {
//      var error = _errorAnalysis(e);
//      _onError(error);
//    }
  }

}