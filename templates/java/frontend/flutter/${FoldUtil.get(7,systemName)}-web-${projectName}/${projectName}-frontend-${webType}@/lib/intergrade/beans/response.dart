///  Do not remove this unless you get business authorization.
///  Response
///  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
///  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
import '../enums/responsestatus.dart';
import '../beans/simpleresponse.dart';
import '../../stgutil/json_util.dart';
import '../../stgutil/front_bean.dart';

class ResponseFields {
  static const code = 'code';
  static const data = 'data';
  static const exeptionClass = 'exeptionClass';
  static const message = 'message';
  static const status = 'status';
  static const success = 'success';
}

class Response<T> extends SimpleResponse with FrontBean {
  /// code
  int code;

  /// data
  T data;

  /// exeptionClass
  String exeptionClass;

  /// status
  ResponseStatus status;

  Response({
    this.code,
    this.data,
    this.exeptionClass,
    message,
    this.status,
    success,
  }) : super(message: message, success: success);

  static Response<T> fromJson<T>(Map<String, dynamic> json) {
    if (json == null) {
      return null;
    }
    return Response<T>(
      code: JsonUtil.parseInt(json[ResponseFields.code]),
      data: json[ResponseFields.data],
      exeptionClass: JsonUtil.parseString(json[ResponseFields.exeptionClass]),
      message: JsonUtil.parseString(json[ResponseFields.message]),
      status: ResponseStatus.fromJson(json[ResponseFields.status]),
      success: JsonUtil.parseBool(json[ResponseFields.success]),
    );
  }

  static List<Response<T>> fromJsonList<T>(List jsonList) {
    return JsonUtil.genFromJsonList(jsonList, Response.fromJson);
  }

  static Map<int, Response> toIdMap(List<Response> responseList) {
    var result = Map<int, Response>();
    if (responseList != null) {
      int index = 0;
      for (var response in responseList) {
        result[index] = response;
        index ++;
      }
    }
    return result;
  }

}

