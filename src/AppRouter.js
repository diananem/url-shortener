import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App.js";
import ShortLinkRedirect from "./components/ShortLinkRedirect";

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route
        path="/:hash"
        render={props => <ShortLinkRedirect hash={props.match.params.hash} />}
      />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
