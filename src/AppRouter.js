import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App.js";
import ShortLinkRedirect from "./components/ShortLinkRedirect";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route
        path="/:hash"
        render={props => <ShortLinkRedirect hash={props.match.params.hash} />}
      />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
