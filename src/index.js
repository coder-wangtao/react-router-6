import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import User from "./User";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import allRoutes from "./routes";

function Foo() {
  return <div>Foo</div>;
}

function App() {
  const [routes, setRoutes] = React.useState(allRoutes);
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setRoutes([...routes, { path: "/foo", element: <Foo /> }]);
  //   }, 1000);
  // });
  return useRoutes(routes);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ul>
      <li>
        <Link to="/">首页</Link>
      </li>
      <li>
        <Link to="/user">用户管理</Link>
      </li>
      <li>
        <Link to="/profile">个人中心</Link>
      </li>
    </ul>
    {/* // <Routes>
    //   <Route path="/" element={<Home title="首页" />} />
    //   <Route path="/user/*" element={<User />}>
    //     <Route path="add" element={<UserAdd />} />
    //     <Route path="list" element={<UserList />} />
    //   </Route>
    //   <Route path="/profile" element={<Profile />} /> */}
    {/* 重定向 */}
    {/* 如何跳转路由 */}
    {/* navigate Navigate */}
    {/* <Route path="*" element={<Navigate to="/" />} /> */}
    {/* </Routes> */}
    <App />
  </BrowserRouter>
);
