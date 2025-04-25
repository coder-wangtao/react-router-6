import { Link, Routes, Route, Outlet } from "react-router-dom";
import UserAdd from "./UserAdd";
import UserList from "./UserList";

function User(props) {
  return (
    <div>
      User
      <ul>
        <li>
          <Link to="/user/add">添加用户</Link>
        </li>
        <li>
          <Link to="/user/list">用户列表</Link>
        </li>
        <li>
          <Link to="/user/detail">用户详情</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default User;
