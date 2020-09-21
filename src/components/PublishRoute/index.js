import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublishRoute = ({ component: Component, ...rest }) => {
  const { token } = useSelector((state) => state.user);

  const isLogin = () => (token ? true : false);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Redirect to="/messages" /> : <Component {...props} />
      }
    />
  );
};

export default PublishRoute;
