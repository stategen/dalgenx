import 'package:${frontendName}/intergrade/pages.dart';
import 'package:${frontendName}/intergrade/pages_router.dart';
import 'package:flutter/material.dart';

import 'package:fluro/fluro.dart';


//整体路由配置
class RouterUtil {
  static Router router = Router();

  static String root = '/';

  //详情页面
//  static String detailsPage = 'detail';

  //方法写理由整体配置静态方法


  static void configureRoutes() {
    router.notFoundHandler = Handler(
      // ignore: missing_return
      handlerFunc: (BuildContext context, Map<String, List<String>> params) {
        //没有页面自行处理
        print('ERROR===》ROUTE');
      },
    );
    PagesRouter.registerRouters(router);

  }
}
