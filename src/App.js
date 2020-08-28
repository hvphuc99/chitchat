import "./App.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import ForgotPassword from "features/Auth/pages/ForgotPassword";
import Login from "features/Auth/pages/Login";
import NotFound from "components/NotFound";
import React from "react";
import SignUp from "features/Auth/pages/SignUp";
import theme from "theme";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
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
