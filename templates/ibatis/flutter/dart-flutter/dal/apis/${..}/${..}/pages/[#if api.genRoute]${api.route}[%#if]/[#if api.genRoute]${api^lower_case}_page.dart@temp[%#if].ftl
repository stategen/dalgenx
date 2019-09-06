<#--
    Copyright (C) 2018  niaoge<78493244@qq.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<@genCopyrightCanEdit api/>
import 'package:flutter/material.dart';
import 'package:fluro/fluro.dart';
import 'package:provider/provider.dart';
import '${fix$(api?lower_case)}_provider.dart';


class ${api}Page extends StatelessWidget {
  // 路由路径
  static final String path = '/${fix$(api.route)}';

  // 路由创建方式
  static final Handler handler = Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> params) {
      return ${api?cap_first}Provider.create(
        child: ${api?cap_first}Page(params: params)
      );
    }
  );

  Map<String, List<String>> params;

  ${api}Page({this.params});

  @override
  Widget build(BuildContext context) {
    // 这里提供provider是避免省事，将provider全部配到main下，而不能释放资源
    return ${api}Provider.create(
      child: ${api}Scene(),
    );
  }
}

class ${api}Scene extends StatefulWidget {

  @override
  _${api}PageState createState() => _${api}PageState();

}

class _${api}PageState extends State<${api}Scene> {

  ${api}Provider ${api?uncap_first}Provider;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // state在整个生部周期只需要拿和注册一次
    ${api?uncap_first}Provider = ${api}Provider.of(context);
  }

  @override
  Widget build(BuildContext context) {
    //var fetched = ${api?uncap_first}Provider.${api?uncap_first}WrapArea.fetched ?? false;
    //if (!fetched) {
    //  ${api?uncap_first}Provider.xxx(context,);
    //}

    return Text('${fix$(api?uncap_first)} Page 创建成功!');
  }

}