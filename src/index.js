import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "./react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Post from "./post";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  </BrowserRouter>
);
