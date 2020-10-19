import "./App.scss";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";

import ForgotPassword from "features/Auth/pages/ForgotPassword";
import Login from "features/Auth/pages/Login";
import NotFound from "components/NotFound";
import React from "react";
import SignUp from "features/Auth/pages/SignUp";
import theme from "custom-theme";
import Message from "features/Message";
import { useSelector, useDispatch } from "react-redux";
import Notify from "components/Notify";
import PrivateRoute from "components/PrivateRoute";
import PublishRoute from "components/PublishRoute";
import { useState } from "react";
import userApi from "api/userApi";
import { removeToken, setCurrentUserId } from "app/userSlice";
import Loading from "components/Loading";
import { setMobileScreenSize } from "app/screenSlice";
import useMedia from "services/mediaQuery";

const useStyles = (innerHeight) =>
  makeStyles({
    loadingContainer: {
      height: innerHeight,
    },
  });

function App() {
  const classes = useStyles(window.innerHeight)();
  const { type, message } = useSelector((state) => state.notify);
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const { isSmallSize } = useMedia();
	
	if (isSmallSize) {
		dispatch(setMobileScreenSize(window.innerHeight));
	}

  if (loading) {
    userApi.verifyToken(token).then((userId) => {
      if (userId) {
        dispatch(setCurrentUserId(userId));
      } else {
        dispatch(removeToken());
      }
      setLoading(false);
    });
    return (
      <div className={classes.loadingContainer}>
        <Loading />
      </div>
    );
  } else {
    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            {message && <Notify type={type} message={message} />}
            <Switch>
              <Redirect exact from="/" to="/messages" />

              <PrivateRoute exact path="/messages" component={Message} />

              <PublishRoute exact path="/login" component={Login} />
              <PublishRoute exact path="/sign-up" component={SignUp} />
              <PublishRoute
                exact
                path="/forgot-password"
                component={ForgotPassword}
              />

              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
