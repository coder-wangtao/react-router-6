import { createBrowserHistory } from "history";
import Router from "./Router";
import { useLayoutEffect, useRef, useState } from "react";

export default function BrowserRouter({ children }) {
  //组件卸载之前用
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }
  const history = historyRef.current;

  const [state, setstate] = useState({ location: history.location });

  useLayoutEffect(() => {
    history.listen(setstate);
  }, [history]);

  return (
    <Router children={children} navigator={history} location={state.location} />
  );
}
