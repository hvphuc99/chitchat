import { Box, Button, Link, makeStyles } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";

import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import React from "react";

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  handleSubmit: null,
};

const useStyles = makeStyles({
  forgotPassword: {
    marginTop: "22px",
    marginBottom: "30px",
  },
  loginButton: {
    color: "white",
  },
});

function LoginForm(props) {
  const classes = useStyles();
  const { initialValues, handleSubmit } = props;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <FastField
          name="email"
          component={InputField}
          label="Email Address"
          variant="outlined"
          margin="normal"
        />

        <FastField
          name="password"
          component={InputField}
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
        />

        <Box
          className={classes.forgotPassword}
          display="flex"
          justifyContent="flex-end"
        >
          <Link href="#" color="inherit">
            Forgot Password?
          </Link>
        </Box>

        <Button
          className={classes.loginButton}
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          fullWidth
        >
          Login
        </Button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
