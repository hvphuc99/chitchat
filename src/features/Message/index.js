import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Main from "./pages/Main";

function Message() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={Main} />
    </Switch>
  );
}

export default Message;