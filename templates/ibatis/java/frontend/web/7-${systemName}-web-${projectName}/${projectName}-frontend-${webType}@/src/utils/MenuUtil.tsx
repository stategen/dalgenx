import Menu from "@i/beans/Menu";
import RouteUtil from "@utils/RouteUtil";

export  default class MenuUtil {
  static filterMenuByPathname(pathname: string, menus: Menu[]) {
    pathname = RouteUtil.getRealPathname(pathname);
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (RouteUtil.getMatch(menu.route, pathname)) {
        return menu;
      }
    }
    return null;
  }
}
