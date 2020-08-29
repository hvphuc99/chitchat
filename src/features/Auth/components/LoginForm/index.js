import { Box, Button, Link, makeStyles } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";

import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

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
  const history = useHistory();

  const handleClickForgotPassword = () => {
    history.push("/forgot-password");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
    password: Yup.string().required("Password is required."),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        const { values } = formikProps;

        return (
          <Form>
            <FastField
              name="email"
              component={InputField}
              label="Email Address"
              value={values.email}
              variant="outlined"
              margin="normal"
            />

            <FastField
              name="password"
              component={InputField}
              type="password"
              label="Password"
              value={values.password}
              variant="outlined"
              margin="normal"
            />

            <Box
              className={classes.forgotPassword}
              display="flex"
              justifyContent="flex-end"
            >
              <Link color="inherit" onClick={handleClickForgotPassword}>
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
        );
      }}
    </Formik>
  );
}

export default LoginForm;
