import React from "react";

import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "features/Auth/pages/Login";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
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
