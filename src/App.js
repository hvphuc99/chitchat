import "./App.scss";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import ForgotPassword from "features/Auth/pages/ForgotPassword";
import Login from "features/Auth/pages/Login";
import NotFound from "components/NotFound";
import React from "react";
import SignUp from "features/Auth/pages/SignUp";
import theme from "custom-theme";
import Message from "features/Message";
import { useSelector } from "react-redux";
import Notify from "custom-fields/Notify";

function App() {
  const { type, message } = useSelector((state) => state.notify);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {message && <Notify type={type} message={message} />}
          <Switch>
            <Redirect exact from="/" to="/messages" />

            <Route exact path="/messages" component={Message} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/forgot-password" component={ForgotPassword} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
