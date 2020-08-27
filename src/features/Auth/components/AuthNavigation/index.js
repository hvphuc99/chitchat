import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, makeStyles } from "@material-ui/core";

AuthNavigation.propTypes = {};

const useStyles = makeStyles({
  root: {
    width: "50%",
    padding: "23px",
    marginBottom: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    "& .loginButton": {
      color: "white",
    },
    "& .signUpButton": {
      color: "#1c9dea",
    }
  },
})

function AuthNavigation(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Button
          className="loginButton"
          size="medium"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          className="signUpButton"
          size="medium"
          variant="contained"
          color="secondary"
          fullWidth
        >
          Sign up
        </Button>
      </Grid>
    </Grid>
  );
}

export default AuthNavigation;
