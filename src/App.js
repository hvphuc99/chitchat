import "./App.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import ForgotPassword from "features/Auth/pages/ForgotPassword";
import Login from "features/Auth/pages/Login";
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
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgotpassword" component={ForgotPassword} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
