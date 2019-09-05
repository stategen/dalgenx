import 'package:${frontendName}/stgutil/init_state.dart';
import 'package:flutter/material.dart';

import '../intergrade/beans/pagination.dart';

typedef SetupParamsFn =Map<String, dynamic> Function(BuildContext context);

const TIME_FORMAT = "HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";
const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";

const DEFAULT_PAGE_NUM =1;
const DEFAULT_PAGE_SIZE =10;


class AreaState<T> {
  String areaName;
  bool fetched;
  Map<dynamic, T> valueMap;
  int index = 0;
  Pagination pagination;
  List<dynamic> selectedRowKeys;
  bool doEdit;
  bool doQuery;
  Map<String, dynamic> queryRule;
  dynamic type;
  AreaState<T> cancelState;


  AreaState.init(){
    initState();
  }

  void initState(){
    this.fetched = false;
    this.valueMap = {};
    this.index = 0;
  }

  List<T> get list {
    return valueMap != null ? List.unmodifiable(valueMap.values) : List(0);
  }

  T get first {
    var list = this.list;
    if (list.length > 0) {
      return list[0];
    }
    return null;
  }

  T get current {
    if (valueMap == null || valueMap.isEmpty || index == null || index >= valueMap.length) {
      return null;
    }

    return list[index];
  }

  AreaState({
    this.areaName,
    this.fetched,
    this.valueMap,
    this.pagination,
    this.queryRule
  });


  void merge(AreaState<T> source) {
    if (source != null) {
      if (source.valueMap != null) {
        this.valueMap = source.valueMap;
      }

      if (source.pagination != null) {
        this.pagination = source.pagination;
      }

      if (source.queryRule != null) {
        this.queryRule = source.queryRule;
      }

      if (source.index != null) {
        this.index = source.index;
      }

      if (source.fetched != null) {
        this.fetched = source.fetched;
      }
    }
  }

  AreaState<T> clone() {
    var newArea = AreaState(
      valueMap: Map.of(this.valueMap),
    );
    return newArea;
  }
}


abstract class RouteUtil {

  static Map<String, dynamic> getParams(BuildContext context) {
    return null;
  }
}



