import { createBrowserHistory, createHashHistory } from "history";
// createHashHistory 如果你需要兼容性，特别是针对老旧浏览器或没有配置服务器的场景，createHashHistory 是一个不错的选择。
// createBrowserHistory 如果你更倾向于使用现代浏览器，且希望拥有更干净的 URL 和更好的 SEO 支持，createBrowserHistory 更为合适。
import Router from "./Router";
import { useLayoutEffect, useEffect, useRef, useState } from "react";

export default function BrowserRouter({ children }) {
  //组件卸载之前用
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }
  const history = historyRef.current;

  const [state, setstate] = useState({ location: history.location });

  //dom变更之后里立马执行，如果不立马执行，会遗漏很多更新
  //react-router-dom
  //源码中使用useLayoutEffect，
  useLayoutEffect(() => {
    //dom变更之后里立马执行，立马执行history.listen监听路由变化。(防止遗漏很多更新)
    history.listen(setstate);
    //  //dom变更之后里立马执行，如果不立马执行，会遗漏很多更新
    // setTimeout(() => {
    //   history.listen(setstate);
    // }, 20000);
  }, [history]);

  return (
    <Router children={children} navigator={history} location={state.location} />
  );
}
