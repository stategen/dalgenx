import Menu, {MENU_ID} from "@i/beans/Menu";
import pathToRegexp from "path-to-regexp";
import Link from "umi/link";
import {Icon} from "antd";
import {config} from "@utils/index";
import {makeMap} from "@utils/DvaUtil";
import {string} from "prop-types";
import {History} from "history";
import {RouteOrders} from "@pages/app/AppCustomFaces";

const {prefix} = config;


export default class RouteUtil {

  static getRealPathname(pathname: string): string {
    pathname = pathname.startsWith('/') ? pathname : `/${'$'}{pathname}`;
    return pathname;
  }

  static isRoutMatchPathname(route, pathname: string): boolean {
    return pathToRegexp(route || '').exec(pathname) != null;
  }

  static filterMenuByPathname(pathname: string, menus: Menu[]) {
    pathname = this.getRealPathname(pathname);
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (this.isRoutMatchPathname(menu.route, pathname)) {
        return menu;
      }
    }
    return null;
  }

  static isRouteOpend(routeOrders:RouteOrders, pathname: string): boolean {
    if (pathname) {
      pathname = this.getRealPathname(pathname);
      const routes = Object.keys(routeOrders);
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        if (this.isRoutMatchPathname(route, pathname)) {
          return true
        }
      }
    }
    return false;
  }


  static getNextMaxOpendOrder(routeOrders: RouteOrders): number {
    //1留给dashborad
    let maxOpendOrder = 1;
    const values = Object.values(routeOrders);
    const maxOrder=Math.max(maxOpendOrder, ...values) + 1;
    return maxOrder;
  }



  static checkNotExistAndGetNextOrder(routeOrders:RouteOrders, route: string): number {
    if (route) {
      if (!routeOrders[route]) {
        const nextMaxOpendOrder = this.getNextMaxOpendOrder(routeOrders);
        return nextMaxOpendOrder;
      }
    }
    return null;
  }

  static checkAndGetPreOrder(opendOrders :RouteOrders, inactiveRoute: string): string {
    let maxOpendOrder = 0;
    let route = null;
    Object.keys(opendOrders).forEach((tempRoute) => {
      if (inactiveRoute !== tempRoute) {
        const temp = opendOrders[tempRoute];
        if (temp > maxOpendOrder) {
          maxOpendOrder = temp;
          route = tempRoute;
        }
      }
    });

    return route;
  }
}

