import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  Box,
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Link,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import logo from "../../../../assets/images/landing-logo.png";

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

const useStyles = makeStyles({
  root: {
    padding: "40px 0px"
  },
  loginForm: {
    backgroundColor: "white",
    padding: "50px",
  },
  loginFormHeader: {
    marginBottom: "24px",
    "& img": {
      paddingBottom: "20px",
    },
    "& .loginFormHeader__h6": {
      paddingBottom: "16px",
    },
    "& .loginFormHeader__h6--color--grey": {
      color: "#647589"
    }
  },
  loginForm__a: {
    marginTop: "22px",
    marginBottom: "30px",
  },
  loginForm__button: {
    color: "white"
  },
  navigation: {
    width: "50%",
    padding: "23px",
    marginBottom: "30px",
    backgroundColor: "white",
    borderRadius: "10px"
  },
  navigation__loginButton: {
    color: "white"
  },
  navigation__signUpButton: {
    color: "#1c9dea"
  }
});

function LoginForm(props) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center">
          <Grid container spacing={2} className={classes.navigation}>
            <Grid item xs={12} sm={6}>
              <Button
                className={classes.navigation__loginButton}
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
                className={classes.navigation__signUpButton}
                size="medium"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Box>
        <div className={classes.loginForm}>
          <div className={classes.loginFormHeader}>
            <img src={logo} alt="logo" />
            <Typography className="loginFormHeader__h6" variant="h6">
              Hello Everyone , We are Chitchat
            </Typography>
            <Typography className="loginFormHeader__h6--color--grey" variant="subtitle1">
              Welcome to chitchat please, login to your account
            </Typography>
          </div>
          <form>
            <TextField
              name="email"
              type="email"
              label="Email Address"
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <Box
              className={classes.loginForm__a}
              display="flex"
              justifyContent="flex-end"
            >
              <Link href="#" color="inherit">
                Forgot Password?
              </Link>
            </Box>

            <Button
              className={classes.loginForm__button}
              size="large"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    </Box>
  );
}

export default LoginForm;
