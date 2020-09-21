import { Box, Container, makeStyles } from "@material-ui/core";

import AuthHeader from "features/Auth/components/AuthHeader";
import AuthNavigation from "features/Auth/components/AuthNavigation";
import ForgotPasswordForm from "features/Auth/components/ForgotPasswordForm";
import MediaLogo from "features/Auth/components/MediaLogo";
import React from "react";
import userApi from "api/userApi";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotify } from "app/notifySlice";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "40px 0px",
  },
  forgotPasswordForm: {
    position: "relative",
    backgroundColor: "white",
    padding: "50px",
  },
});

const initialValues = {
  email: "",
};

function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    const { email } = values;
    setLoading(true);
    userApi
      .resetPassword(email)
      .then((res) => {
        dispatch(setNotify({
          type: "success",
          message: "Check your email for a link to reset your password"
        }))
        history.push("/login");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center">
          <AuthNavigation />
        </Box>
        <div className={classes.forgotPasswordForm}>
          <AuthHeader />
          <ForgotPasswordForm
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

export default ForgotPassword;
