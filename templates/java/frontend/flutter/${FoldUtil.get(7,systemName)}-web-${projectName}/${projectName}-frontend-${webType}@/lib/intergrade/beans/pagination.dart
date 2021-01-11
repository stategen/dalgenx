///  Do not remove this unless you get business authorization.
///  Pagination
///  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
///  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
import '../../stgutil/json_util.dart';
import '../../stgutil/front_bean.dart';

class PaginationFields {
  static const current = 'current';
  static const page = 'page';
  static const pageNum = 'pageNum';
  static const pageSize = 'pageSize';
  static const total = 'total';
  static const totalPages = 'totalPages';
}

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
      current: JsonUtil.parseInt(json[PaginationFields.current]),
      page: JsonUtil.parseInt(json[PaginationFields.page]),
      pageNum: JsonUtil.parseInt(json[PaginationFields.pageNum]),
      pageSize: JsonUtil.parseInt(json[PaginationFields.pageSize]),
      total: JsonUtil.parseInt(json[PaginationFields.total]),
      totalPages: JsonUtil.parseInt(json[PaginationFields.totalPages]),
    );
  }

  static List<Pagination> fromJsonList(List jsonList) {
    return JsonUtil.genFromJsonList(jsonList, Pagination.fromJson);
  }

  /// jsonEncode会调用这个方法
  @override
  Map<String, dynamic> toJson() {
    var result = Map<String, dynamic>();
    if (this.current != null) {
      result[PaginationFields.current] = JsonUtil.intToJson(current);
    }
    if (this.page != null) {
      result[PaginationFields.page] = JsonUtil.intToJson(page);
    }
    if (this.pageNum != null) {
      result[PaginationFields.pageNum] = JsonUtil.intToJson(pageNum);
    }
    if (this.pageSize != null) {
      result[PaginationFields.pageSize] = JsonUtil.intToJson(pageSize);
    }
    if (this.total != null) {
      result[PaginationFields.total] = JsonUtil.intToJson(total);
    }
    if (this.totalPages != null) {
      result[PaginationFields.totalPages] = JsonUtil.intToJson(totalPages);
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

