import {
  Box,
  Container,
  makeStyles,
} from "@material-ui/core";

import AuthHeader from "features/Auth/components/AuthHeader";
import AuthNavigation from "features/Auth/components/AuthNavigation";
import LoginForm from "features/Auth/components/LoginForm";
import MediaLogo from "features/Auth/components/MediaLogo";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "40px 0px",
  },
  loginForm: {
    position: "relative",
    backgroundColor: "white",
    padding: "50px",
  },
});

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = () => {
    history.push("/");
    console.log("submit");
  };

  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center">
          <AuthNavigation />
        </Box>
        <div className={classes.loginForm}>
          <AuthHeader />
          <LoginForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
          />
          <MediaLogo />
        </div>
      </Container>
    </Box>
  );
}

export default Login;
