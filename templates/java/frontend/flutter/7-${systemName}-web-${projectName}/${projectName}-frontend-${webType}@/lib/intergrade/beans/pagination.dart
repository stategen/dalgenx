///  Do not remove this unless you get business authorization.
///  Pagination
///  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
///  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
import '../../stgutil/json_util.dart';
import '../../stgutil/front_bean.dart';

class Pagination with FrontBean {
  /// current
  int current;

  /// page
  int page;

  /// pageNum
  int pageNum;

  /// pageSize
  int pageSize;

  /// total
  int total;

  /// totalPages
  int totalPages;

  Pagination({
    this.current,
    this.page,
    this.pageNum,
    this.pageSize,
    this.total,
    this.totalPages,
  });

  static Pagination fromJson(Map<String, dynamic> json) {
    if (json == null) {
      return null;
    }
    return Pagination(
      current: JsonUtil.parseInt(json['current']),
      page: JsonUtil.parseInt(json['page']),
      pageNum: JsonUtil.parseInt(json['pageNum']),
      pageSize: JsonUtil.parseInt(json['pageSize']),
      total: JsonUtil.parseInt(json['total']),
      totalPages: JsonUtil.parseInt(json['totalPages']),
    );
  }

  static List<Pagination> fromJsonList(List jsonList) {
    return JsonUtil.genFromJsonList(jsonList, Pagination.fromJson);
  }

  /// jsonEncode会调用这个方法
  @override
  Map<String, dynamic> toJson() {
    var result = new Map<String, dynamic>();
    if (this.current != null) {
      result['current'] = JsonUtil.intToJson(current);
    }
    if (this.page != null) {
      result['page'] = JsonUtil.intToJson(page);
    }
    if (this.pageNum != null) {
      result['pageNum'] = JsonUtil.intToJson(pageNum);
    }
    if (this.pageSize != null) {
      result['pageSize'] = JsonUtil.intToJson(pageSize);
    }
    if (this.total != null) {
      result['total'] = JsonUtil.intToJson(total);
    }
    if (this.totalPages != null) {
      result['totalPages'] = JsonUtil.intToJson(totalPages);
    }
    return result;
  }

  static Map<int, Pagination> toIdMap(List<Pagination> paginationList) {
    var result = Map<int, Pagination>();
    if (paginationList != null) {
      int index = 0;
      for (var pagination in paginationList) {
        result[index] = pagination;
        index ++;
      }
    }
    return result;
  }

}

