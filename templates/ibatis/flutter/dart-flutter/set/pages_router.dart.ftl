import 'package:fluro/fluro.dart';
import 'pages.dart';

class PagesRouter {
  static registerRouters(Router router) {
<#list apis as api>
  <#if api.genRoute>
    router.define(${api}Page.path, handler: ${api}Page.handler);
  </#if>
</#list>
  }
}