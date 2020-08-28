import { Box, Container, makeStyles } from "@material-ui/core";

import AuthHeader from "features/Auth/components/AuthHeader";
import AuthNavigation from "features/Auth/components/AuthNavigation";
import ForgotPasswordForm from "features/Auth/components/ForgotPasswordForm";
import MediaLogo from "features/Auth/components/MediaLogo";
import React from "react";

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

  const handleSubmit = () => {
    console.log("submit");
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
          />
          <MediaLogo />
        </div>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
