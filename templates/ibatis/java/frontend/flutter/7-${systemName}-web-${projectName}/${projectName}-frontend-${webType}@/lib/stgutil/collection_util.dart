abstract class CollectionUtil {

  static Map<dynamic, T> appendOrUpdateMap<T>(Map<dynamic, T> targetMap, Map<dynamic, T> destMap) {
    targetMap ??= {};
    if (destMap.isNotEmpty) {
      destMap.forEach((k, v) {
        targetMap[k] = v;
      });
    }
    return targetMap;
  }


  static Map<dynamic, T> deleteMap<T>(Map<dynamic, T> targetMap, List<dynamic> destList) {
    targetMap ??= {};
    if (targetMap.isNotEmpty) {
      if (destList.isNotEmpty) {
        destList.forEach((k) {
          targetMap.remove(k);
        });
      }
    }
    return targetMap;
  }

}
