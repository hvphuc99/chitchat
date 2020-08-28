import { Box, Container, makeStyles } from "@material-ui/core";

import AuthHeader from "features/Auth/components/AuthHeader";
import AuthNavigation from "features/Auth/components/AuthNavigation";
import React from "react";
import SignUpForm from "features/Auth/components/SignUpForm";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "40px 0px",
  },
  signUpForm: {
    backgroundColor: "white",
    padding: "50px",
  },
});

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
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
        <div className={classes.signUpForm}>
          <AuthHeader />
          <SignUpForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
          />
        </div>
      </Container>
    </Box>
  );
}

export default SignUp;
