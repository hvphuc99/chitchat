import { Box, Container, makeStyles } from "@material-ui/core";

import AuthHeader from "features/Auth/components/AuthHeader";
import AuthNavigation from "features/Auth/components/AuthNavigation";
import MediaLogo from "features/Auth/components/MediaLogo";
import React from "react";
import SignUpForm from "features/Auth/components/SignUpForm";
import userApi from "api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "app/userSlice";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { setNotify } from "app/notifySlice";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "40px 0px",
  },
  signUpForm: {
    position: "relative",
    backgroundColor: "white",
    padding: "50px",
  },
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    const { firstName, lastName, email, password, confirmPassword } = event;
    setLoading(true);
    userApi
      .signUp(firstName, lastName, email, password, confirmPassword)
      .then(() => {
        dispatch(
          setNotify({
            type: "success",
            message: "Verify your email address",
          })
        );
        history.push("/login");
      })
      .catch((err) => {
        dispatch(
          setNotify({
            type: "error",
            message: "Email address is already used",
          })
        );
        setLoading(false);
      });
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
            loading={loading}
          />
          <MediaLogo />
        </div>
      </Container>
    </Box>
  );
}

export default SignUp;
