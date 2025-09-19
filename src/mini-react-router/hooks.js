import React, { memo, useCallback, useContext, useMemo } from "react";
import { NavigationContext, RouteContext } from "./Context";
import { normalizePathname } from "./utils";
import Outlet from "./Outlet";
import { matchPath, matchRoutes } from "react-router-dom";

export function useRoutes(routes) {
  const location = useLocation();
  const pathname = location.pathname;
  //因为我们在 Route 中定义的 path 都是相对路径，
  // 所以我们在 matchRoutes 方法中，需要对 routes 对象遍历，
  // 对于 children 里面的 path 需要变成完整的路径，并且需要将 routes 扁平化，
  // 不在使用嵌套结构
  const matches = matchRoutes(routes, { pathname });
  return renderMatches(matches);
}

function renderMatches(matches) {
  if (matches === null) {
    return null;
  }
  debugger;

  // reduceRight 方法, 从右往左累加
  //matches 采用从右往左的遍历顺序，将上一项的返回值作为后一项的 outlet，那么子路由就作为 outlet 传递给了父路由
  return matches.reduceRight((outlet, match) => {
    return (
      <RouteContext.Provider value={{ outlet, matches }}>
        {match.route.element || outlet}
      </RouteContext.Provider>
    );
  }, null);
}

export function useNavigate() {
  //跳转
  const { navigator } = useContext(NavigationContext);

  const navigate = useCallback(
    (to, options = {}) => {
      if (typeof to === "number") {
        navigator.go(to);
        return;
      }
      (!!options.replace ? navigator.replace : navigator.push)(
        to,
        options.state
      );
    },
    [navigator]
  );

  return navigate;
}

//ok
export function useLocation() {
  const { location } = useContext(NavigationContext);
  return location;
}

//children
//ok
export function useOutlet() {
  let { outlet } = useContext(RouteContext);
  return outlet;
}
//ok
export function useParams() {
  const { matches } = useContext(RouteContext);
  const routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
//ok
export function useMatch(pattern) {
  const { pathname } = useLocation();
  return useMemo(() => matchPath(pattern, pathname), [pattern, pathname]);
}
//ok
export function useResolvedPath(to) {
  const { pathname } = useLocation();
  return useMemo(
    () => ({
      pathname: to,
      hash: "",
      search: "",
    }),
    [pathname]
  );
}

// return routes
//   .map((route) => {
//     // const match = pathname === route.path || pathname === "/" + route.path;
//     const match = pathname.startsWith(route.path);
//     return (
//       match &&
//       route.children.map((child) => {
//         let m = normalizePathname(child.path) === pathname;
//         return (
//           m && (
//             <RouteContext.Provider value={{ outlet: child.element }}>
//               {route.element !== undefined ? route.element : <Outlet />}
//             </RouteContext.Provider>
//           )
//         );
//       })
//     );
//   })
//   .filter(Boolean);
