import { Typography, makeStyles } from "@material-ui/core";

import React from "react";
import landingLogo from "assets/images/landing-logo.png";

const useStyles = makeStyles({
  root: {
    marginBottom: "24px",
    "& img": {
      paddingBottom: "20px",
    },
    "& .loginFormHeader__h6": {
      paddingBottom: "16px",
    },
    "& .loginFormHeader__h6--color--grey": {
      color: "#647589",
    },
  },
});

function AuthHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={landingLogo} alt="landing-logo" />
      <Typography className="loginFormHeader__h6" variant="h6">
        Hello Everyone, We are Chitchat
      </Typography>
      <Typography
        className="loginFormHeader__h6--color--grey"
        variant="subtitle1"
      >
        Welcome to chitchat please, login with your account
      </Typography>
    </div>
  );
}

export default AuthHeader;
