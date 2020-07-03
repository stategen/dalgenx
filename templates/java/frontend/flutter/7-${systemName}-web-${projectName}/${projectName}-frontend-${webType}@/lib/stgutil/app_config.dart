import '../intergrade/configs/${systemName}${projectName?cap_first}_config.dart';


class AppConfig {
  static final String appid = "wx2f40ccdc0d1f9217";


  static final int netwait = isInDebugMode()? 1000000:10000; //debug :1000秒，release:10秒
  static final String universalLink = "https://your.univerallink.com/link/";

  static Map<String, String> BASE_URLS = {
    ${systemName}${projectName?cap_first}BaseUrlKey: "http://192.168.43.100:8080/${systemName}${projectName?cap_first}/",
  };


  static bool isInDebugMode() {
    bool inDebugMode = false;
    assert(inDebugMode = true);//如果debug模式下会触发赋值
    return inDebugMode;
  }
}

