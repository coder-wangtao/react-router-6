import React, { Children, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
  Navigate,
  useMatch,
} from "./mini-react-router";
import Home from "./Home";
import Product from "./Product";
import { AuthProvider, useAuth } from "./auth";
import { useResolvedPath } from "./mini-react-router";
const About = React.lazy(() => import("./pages/About"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="app">
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="product" element={<Product />}>
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route
              path="user"
              element={
                <RequiredAuth>
                  <User />
                </RequiredAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route
              path="about"
              element={
                <>
                  <Suspense fallback={<h1>loading...</h1>}>
                    <About />
                  </Suspense>
                </>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </div>
);

function Layout(props) {
  return (
    <div className="border">
      <CustomLink to="/">首页</CustomLink>
      <CustomLink to="/product">商品</CustomLink>
      <CustomLink to="/user">用户中心</CustomLink>
      <CustomLink to="/login">登录</CustomLink>
      <CustomLink to="/about">关于</CustomLink>
      <Outlet />
    </div>
  );
}

export function CustomLink({ to, ...rest }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  debugger;
  return <Link to={to} {...rest} style={{ color: match ? "red" : "black" }} />;
}

function RequiredAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />;
  }

  return children;
}

function ProductDetail() {
  let navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <h1>ProductDetail</h1>
      <p>{params.id}</p>
      <button onClick={() => navigate("/")}>go home</button>
    </div>
  );
}

function User() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User</h1>
      <p>{auth.user?.username}</p>
      <button
        onClick={() => {
          auth.signout(() => navigate("/login"));
        }}
      >
        退出登录
      </button>
    </div>
  );
}

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  if (auth.user) {
    return <Navigate to={from} />;
  }

  const submit = (e) => {
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    auth.signin({ username }, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input type="text" name="username" />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>NoMatch</h1>
    </div>
  );
}
