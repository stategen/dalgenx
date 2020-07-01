import 'dart:convert';
import 'dart:io';

import 'package:app_frontend_flutter/stgutil/app_config.dart';
import 'package:oktoast/oktoast.dart';
import 'package:path_to_regexp/path_to_regexp.dart';

import '../intergrade/configs/tradeApp_config.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:flutter/material.dart';
import 'log_utils.dart';
import 'toast.dart';
import '../intergrade/beans/response.dart' as Res;

import 'package:path_provider/path_provider.dart';
import 'app_config.dart';

// 数据格式太乱,简单处理一下



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
  String apiUrlKey;
  String path;
  Method method;
  dynamic data;
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



final Map<String, Dio> DIO_MAP = Map();

_onError(NetError netError) {
  String errorMessage = "接口请求异常： code: ${'${'}netError.code}, message: ${'${'}netError.message},status: ${'${'}netError
    .status}";
  Log.e(errorMessage);
  debugPrintStack(label: errorMessage);
  Toast.show(netError.message);
}

class _RequestInterceptors extends InterceptorsWrapper {
  @override
  Future onRequest(RequestOptions options) {
    if (options.path.contains("/api/wx")){
      options.headers["appid"] =AppConfig.appid;
    }
    return super.onRequest(options);
  }
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

  static _findDio(String apiUrlKey) async {
    Dio dio = DIO_MAP[apiUrlKey];
    if (dio == null) {
      String domainUrl=AppConfig.BASE_URLS[apiUrlKey];
      assert(domainUrl!=null,"domainUrl 不能为空");

      dio = Dio();
      dio.options.baseUrl = domainUrl;
      dio.options.connectTimeout = AppConfig.netwait; // 100s
      dio.options.receiveTimeout = AppConfig.netwait; // 100s
      Directory tempDir = await getTemporaryDirectory();
      String tempPath = tempDir.path;


      var persistCookieJar = new PersistCookieJar(dir: tempPath);
      dio.interceptors.add(CookieManager(persistCookieJar));
      dio.interceptors.add(_RequestInterceptors());
      DIO_MAP[apiUrlKey] = dio;
    }
    return dio;
  }

  static final _netErrorCodes=[401,500];

  // 统一数据，统一数据流出格式
  static Future<dynamic> fetch(RequestInit requestInit, [bool responseWrapped = true]) async {
//    try {
    Dio dio = await _findDio(requestInit.apiUrlKey);
    var method = METHODS[requestInit.method];
    dynamic data;

    //TODO 像typescript一样处理 path-to-regexp
    if (requestInit.path.indexOf(":") >= 0) {
      final toPath = pathToFunction(requestInit.path); // =>/user/:id
      requestInit.path = toPath(requestInit.data); // => '/user/12'
      assert(requestInit.path.indexOf(":") < 0, "${r'${'}requestInit.path} 路径中还有变量没有填充!");
    }
    //组装data
    if (requestInit.mediaType == MediaType.FORM) {
      if (requestInit.data != null) {
        data = FormData.fromMap(requestInit.data);
      }
    } else {
      data = requestInit.data;
    }

    //method类型
    var options = Options();
    options.method = method;

    var response = await dio.request(requestInit.path, options: options, data: data);
    if (response != null) {
      //stategen会强制包装服务器500执行错误和权限校验不通过401
      bool parseReponse = (responseWrapped && response.statusCode == 200) || (_netErrorCodes.contains(response.statusCode) );
      var reponseData = response.data;
      if (parseReponse) {
        var resEx = Res.Response.fromJson(reponseData);
        if (responseWrapped && !resEx.success) {
          showToast(resEx.message);
          throw NetError(code: resEx.code, status: resEx.status?.toString(), message: resEx.message);
        }
        return resEx.data;
      }

      if (response.statusCode == 200 ) {
        return reponseData;
      }

      //其它，抛出错误码
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