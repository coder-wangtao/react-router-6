import Home from "./Home";
import Profile from "./Profile";
import User from "./User";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import { Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
let LazyProfile = lazy(() => import("./Profile"));
const routes = [
  { path: "/", element: <Home /> },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <LazyProfile />
      </Suspense>
    ),
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "add",
        element: <UserAdd />,
      },
      {
        path: "list",
        element: <UserList />,
      },
      {
        // path: "detail/:id",
        path: "detail",
        element: <UserDetail />,
      },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
];

export default routes;
