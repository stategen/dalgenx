import '../intergrade/configs/${projectName}App_config.dart';


class AppConfig {
  static final String appid = "wx2f40ccdc0d1f9217";


  static final int netwait = isInDebugMode()? 1000000:10000; //debug :1000�룬release:10��
  static final String universalLink = "https://your.univerallink.com/link/";

  static Map<String, String> BASE_URLS = {
    ${projectName}AppBaseUrlKey: "http://192.168.43.100:8080/${projectName}App/",
  };


  static bool isInDebugMode() {
    bool inDebugMode = false;
    assert(inDebugMode = true);//���debugģʽ�»ᴥ����ֵ
    return inDebugMode;
  }
}

