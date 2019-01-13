import pathToRegexp from "path-to-regexp";
import {RouteOrders, SetupProps} from "@utils/DvaUtil";

export default class RouteUtil {

  static getRealPathname(pathname: string): string {
    pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return pathname;
  }

  static getMatch(route:string, pathname: string, keys?: any[]): RegExpExecArray {
    keys = keys || [];
    const regEx = pathToRegexp(route || '', keys, {end: false});
    const match = regEx.exec(pathname);
    return match;
  }

  static getParams({pathname, match, keys}: SetupProps) {
    if (match) {
      const names = keys.map(key => key.name);
      const params = names.reduce((memo, name, idx) => {
        memo[name] = match[idx + 1];
        return memo
      }, {});
      return params;
    }
    return null;
  };

  static compileRoute(route: string, params: {}) {
    let toPathFn = pathToRegexp.compile(route || "");
    return toPathFn(params);
  }

  static isRouteOpend(routeOrders: RouteOrders, pathname: string): boolean {
    if (pathname) {
      pathname = this.getRealPathname(pathname);
      if (pathname.indexOf(":") > 0) {
        return true;
      }
      const routes = Object.keys(routeOrders);
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (this.getMatch(route, pathname)) {
          return true;
        }
      }
    }
    return false;
  }


  static getNextMaxOpendOrder(routeOrders: RouteOrders): number {
    //1留给dashborad
    let maxOpendOrder = 1;
    const values = Object.values(routeOrders);
    const maxOrder = Math.max(maxOpendOrder, ...values) + 1;
    return maxOrder;
  }


  static checkNotExistAndGetNextOrder(routeOrders: RouteOrders, route: string): number {
    if (route) {
      if (!routeOrders[route]) {
        const nextMaxOpendOrder = this.getNextMaxOpendOrder(routeOrders);
        return nextMaxOpendOrder;
      }
    }
    return null;
  }

  static checkAndGetPreOrder(opendOrders: RouteOrders, inactiveRoute: string): string {
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

  static getQuery(listener) {
    const query = listener.query;
    if (query && query instanceof Object) {
      return query;
      // for (let i in query) {
      //   return query;
      // }
    }
    return null;
  }
}

