///  Do not remove this unless you get business authorization.
///  ResponseStatus
///  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
///  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
import '../../stgutil/json_util.dart';
import '../../stgutil/column_util.dart';
import '../../stgutil/class_as_enum.dart';

class ResponseStatus extends ClassAsEnum<ResponseStatus> {
  const ResponseStatus(value, title) : super(value, title);

  /// OK
  static const OK = ResponseStatus("OK", 'OK');

  /// ERROR
  static const ERROR = ResponseStatus("ERROR", 'ERROR');

  /// MISSED
  static const MISSED = ResponseStatus("MISSED", 'MISSED');

  /// PAY_NO_TOKEN
  static const PAY_NO_TOKEN = ResponseStatus("PAY_NO_TOKEN", 'PAY_NO_TOKEN');

  /// NOT_LOGIN
  static const NOT_LOGIN = ResponseStatus("NOT_LOGIN", 'NOT_LOGIN');

  static Map<String, ResponseStatus> _map = {
    OK.value: OK,
    ERROR.value: ERROR,
    MISSED.value: MISSED,
    PAY_NO_TOKEN.value: PAY_NO_TOKEN,
    NOT_LOGIN.value: NOT_LOGIN
  };

  static ResponseStatus fromJson(dynamic value) {
    return _map[value];
  }

  static List<ResponseStatus> fromJsonList(List<dynamic> values){
    return JsonUtil.parseList(values, ResponseStatus.fromJson);
  }

  static Map<String, Option> responseStatusOptions ={
    /// OK
    'OK': Option(
      value: ResponseStatus.OK,
      label: 'OK',
    ),

    /// ERROR
    'ERROR': Option(
      value: ResponseStatus.ERROR,
      label: 'ERROR',
    ),

    /// MISSED
    'MISSED': Option(
      value: ResponseStatus.MISSED,
      label: 'MISSED',
    ),

    /// PAY_NO_TOKEN
    'PAY_NO_TOKEN': Option(
      value: ResponseStatus.PAY_NO_TOKEN,
      label: 'PAY_NO_TOKEN',
    ),

    /// NOT_LOGIN
    'NOT_LOGIN': Option(
      value: ResponseStatus.NOT_LOGIN,
      label: 'NOT_LOGIN',
    )

  };
}
