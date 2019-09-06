import 'package:${frontendName}/intergrade/pages.dart';
import 'package:${frontendName}/stgutil/route_util.dart';
import 'package:${frontendName}/pages/index_page.dart';
import 'package:${frontendName}/provide/current_index_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //注入文件
    RouterUtil.configureRoutes();

    return MultiProvider(
      //这里只能提供几个公用的Provider,以免占用资源
      providers: [
        ChangeNotifierProvider(builder: (_) => CurrentIndexProvide()),
      ],
      child: Container(
        child: MaterialApp(
          title: '百姓生活+',
          onGenerateRoute: RouterUtil.router.generator,
          //去掉DEBUG字样
          debugShowCheckedModeBanner: false,
          //设置主题
          theme: ThemeData(primaryColor: Colors.pink),
          home: IndexPage(),
	  
        ),
      ),
    );

//    return
  }
}
