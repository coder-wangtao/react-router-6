import React, { createContext } from "react";
const NavigatorContext = createContext();
const LocationContext = createContext();

export function Route(props) {}

export function Router({ children, location, navigator }) {
  //children 是
  //<Routes>
  //   <Route path="/" element={<Home />} />
  //   <Route path="/profile" element={<Profile />} />
  //   <Route path="/post/:id" element={<Post />} />
  // </Routes>
  // let navigationContext = { navigator }; //navigator=history对象
  //location 当前路由
  //navigator history对象
  return (
    <NavigatorContext.Provider value={{ navigator }}>
      <LocationContext.Provider value={{ location }}>
        {children}
      </LocationContext.Provider>
    </NavigatorContext.Provider>
  );
}

export function Routes({ children }) {
  const a = useRoutes(createRoutesFromChildren(children));
  return a;
}

function useLocation() {
  return React.useContext(LocationContext).location;
}

/**
 * 用routes和当前浏览器地址进行匹配
 */
function useRoutes(routes) {
  let location = useLocation();
  let pathname = location.pathname;
  for (let i = 0; i < routes.length; i++) {
    let { path, element } = routes[i];
    let match = matchPath(path, pathname);
    if (match) return element;
  }
}

function matchPath(path, pathname) {
  let matcher = compilePath(path);
  return pathname.match(matcher);
}

//在上一版本
function compilePath(path) {
  let regexpSource = "^" + path;
  regexpSource += "$";
  let matcher = new RegExp(regexpSource);
  return matcher;
}

function createRoutesFromChildren(children) {
  let routes = [];
  React.Children.forEach(children, (element) => {
    let route = {
      path: element.props.path, //要匹配的路径
      element: element.props.element, //要渲染的元素
    };
    routes.push(route);
  });
  return routes;
}
