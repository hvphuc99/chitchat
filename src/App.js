import "./App.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import Login from "features/Auth/pages/Login";
import React from "react";
import theme from "theme";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
