import { Box, Container, makeStyles } from "@material-ui/core";

import AuthHeader from "features/Auth/components/AuthHeader";
import AuthNavigation from "features/Auth/components/AuthNavigation";
import LoginForm from "features/Auth/components/LoginForm";
import React from "react";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "40px 0px",
  },
  loginForm: {
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

  const handleSubmit = () => {
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
        </div>
      </Container>
    </Box>
  );
}

export default Login;
