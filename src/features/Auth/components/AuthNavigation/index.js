import { Button, Grid, makeStyles } from "@material-ui/core";

import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "50%",
    padding: "23px",
    marginBottom: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    "& .normal-button": {
      backgroundColor: "#E2F0FC",
      color: "#1c9dea",
    },
    "& .selected-button": {
      backgroundColor: "#1c9dea",
      color: "white",
    },
  },
});

function AuthNavigation(props) {
  const classes = useStyles();
  const history = useHistory();

  const changeSelectBtn = (normal, select) => {
    const normalBtn = document.querySelector(normal);
    const selectBtn = document.querySelector(select);
    normalBtn.classList.remove("selected-button");
    selectBtn.classList.add("selected-button");
  };

  const handleClickLoginButton = () => {
    history.push("/login");
  };

  const handleClickSignUpButton = () => {
    history.push("/sign-up");
  };

  useEffect(() => {
    switch (history.location.pathname) {
      case "/login":
        changeSelectBtn(".navigateSignUpBtn", ".navigateLoginBtn");
        break;
      case "/sign-up":
        changeSelectBtn(".navigateLoginBtn", ".navigateSignUpBtn");
        break;
      default:
    }
  });

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Button
          className="navigateLoginBtn normal-button"
          size="medium"
          variant="contained"
          fullWidth
          onClick={handleClickLoginButton}
        >
          Login
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          className="navigateSignUpBtn normal-button"
          size="medium"
          variant="contained"
          fullWidth
          onClick={handleClickSignUpButton}
        >
          Sign up
        </Button>
      </Grid>
    </Grid>
  );
}

export default AuthNavigation;
