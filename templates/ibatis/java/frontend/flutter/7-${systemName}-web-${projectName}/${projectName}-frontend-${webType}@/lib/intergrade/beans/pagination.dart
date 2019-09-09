///  Do not remove this unless you get business authorization.
///  Pagination
///  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
///  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
import '../../stgutil/json_util.dart';
import '../../stgutil/front_bean.dart';

class Pagination with FrontBean {
  /// page
  int page;

  /// pageSize
  int pageSize;

  /// total
  int total;

  /// pageNum
  int pageNum;

  /// totalPages
  int totalPages;

  /// current
  int current;

  Pagination({
    this.page,
    this.pageSize,
    this.total,
    this.pageNum,
    this.totalPages,
    this.current,
  });

  static Pagination fromJson(Map<String, dynamic> json) {
    if (json == null) {
      return null;
    }
    return Pagination(
      page: JsonUtil.parseInt(json['page']),
      pageSize: JsonUtil.parseInt(json['pageSize']),
      total: JsonUtil.parseInt(json['total']),
      pageNum: JsonUtil.parseInt(json['pageNum']),
      totalPages: JsonUtil.parseInt(json['totalPages']),
      current: JsonUtil.parseInt(json['current']),
    );
  }

  static List<Pagination> fromJsonList(List jsonList) {
    return JsonUtil.genFromJsonList(jsonList, Pagination.fromJson);
  }

  Map<String, dynamic> toMap() {
    var result = new Map<String, dynamic>();
    if (this.page != null) {
      result['page'] = JsonUtil.intToJson(page);
    }
    if (this.pageSize != null) {
      result['pageSize'] = JsonUtil.intToJson(pageSize);
    }
    if (this.total != null) {
      result['total'] = JsonUtil.intToJson(total);
    }
    if (this.pageNum != null) {
      result['pageNum'] = JsonUtil.intToJson(pageNum);
    }
    if (this.totalPages != null) {
      result['totalPages'] = JsonUtil.intToJson(totalPages);
    }
    if (this.current != null) {
      result['current'] = JsonUtil.intToJson(current);
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

  static List<Map<String, dynamic>> toMaps(List<Pagination> paginationList) {
    var result = List<Map<String, dynamic>>();
    if (paginationList != null) {
      for (var pagination in paginationList) {
        if (pagination != null) {
          result.add(pagination.toMap());
        }
      }
    }
    return result;
  }

}

