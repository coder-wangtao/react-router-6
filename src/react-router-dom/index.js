import { createBrowserHistory, createHashHistory } from "history";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { Router } from "../react-router";
export * from "../react-router";

export function HashRouter({ children }) {
  let historyRef = useRef(null);
  if (historyRef.current === null) {
    historyRef.current = createHashHistory();
  }
  //window.history二次封装的对象
  let history = historyRef.current;
  let [state, setState] = useState({
    action: history.action, //跳转到当前路径的动作 push pop
    location: history.location, //当前路径
  });
  //类似宏任务，执行比较慢（会在浏览器渲染后执行）
  //   useEffect

  //类似微任务同步（会在浏览器渲染前执行）
  useLayoutEffect(() => {
    //监听路径变化事件，当地址中的路径发生改变的话，会重新执行setState组件会重新刷新
    history.listen((update) => {
      setState(update);
    });
  }, [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigateType={state.action}
      navigator={history}
    />
  );
}

export function BrowserRouter({ children }) {
  let historyRef = useRef(null);
  if (historyRef.current === null) {
    historyRef.current = createBrowserHistory();
  }
  //window.history二次封装的对象
  let history = historyRef.current;
  let [state, setState] = useState({
    action: history.action, //跳转到当前路径的动作 push pop
    location: history.location, //当前路径
  });

  //类似宏任务，执行比较慢（会在浏览器渲染后执行）
  //   useEffect

  //类似微任务同步（会在浏览器渲染前执行）
  useLayoutEffect(() => {
    //监听路径变化事件，当地址中的路径发生改变的话，会重新执行setState组件会重新刷新
    history.listen((update) => {
      setState(update);
    });
  }, [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigateType={state.action}
      navigator={history}
    />
  );
}
