typedef FromJsonFn<T> = T Function(Map<String, dynamic> json);
typedef FromJsonListFn<T> = List<T> Function(List<Map<String, dynamic>> json);
typedef ParseFn<T> = T Function(dynamic value);


abstract class JsonUtil {
  static String parseString(dynamic value) {
    if (value == null) {
      return null;
    }

    if (value is String) {
      return value;
    }

    return value.toString();
  }

  static dynamic stringToJson(String value){
    return value;
  }

  static int parseInt(dynamic value) {
    if (value == null) {
      return null;
    }

    if (value is String) {
      return int.parse(value);
    }

    return value as int;
  }

  static dynamic intToJson(int value){
    return value;
  }

  static dynamic doubleToJson(double value){
    return value;
  }

  static bool parseBool(dynamic value) {
    if (value == null) {
      return null;
    }

    if (value is bool) {
      return value;
    }

    return value == 'true';
  }

  static double parseDouble(dynamic value) {
    if (value == null) {
      return null;
    }

    if (value is double) {
      return value;
    }

    return value as double;
  }

  static dynamic boolToJson(bool value){
    return value;
  }

  static bool parseWithGeneral() {

  }

  static DateTime parseDateTime(dynamic value) {
    if (value == null) {
      return null;
    }

    var timeStemp;
    if (value is int) {
      timeStemp = value;
    } else
    if (value is String) {
      timeStemp = int.tryParse(value);
      if (timeStemp == null) {
        return DateTime.parse(value);
      }
    }
    return DateTime.fromMillisecondsSinceEpoch(timeStemp);
  }

  static dynamic dateTimeToJson(DateTime value){
    return value?.millisecondsSinceEpoch?.toString();
  }

  static List<T> parseList<T>(List values, ParseFn parseFn) {
    List<T> result;
    if (values != null) {
      result = List();
      for (var value in values) {
        result.add(parseFn(value));
      }
    }
    return result;
  }

  static List<T> genFromJsonList<T>(List jsonList, FromJsonFn fromJsonFn) {
    List<T> result;
    if (jsonList != null) {
      result = List();
      for (var json in jsonList) {
        result.add(fromJsonFn(json));
      }
    }
    return result;
  }
}