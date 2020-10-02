import { Box, Button, Link, makeStyles, CircularProgress } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";

import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

LoginForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

LoginForm.defaultProps = {
  handleSubmit: null,
  loading: false,
};

const useStyles = makeStyles({
  forgotPassword: {
    marginTop: "12px",
    marginBottom: "20px",
  },
  loginButton: {
		color: "white",
		textTransform: "none",
  },
});

function LoginForm(props) {
  const classes = useStyles();
  const { initialValues, handleSubmit, loading } = props;
  const history = useHistory();
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
    password: Yup.string().required("Password is required."),
  });

  const handleClickForgotPassword = () => {
    history.push("/forgot-password");
  };

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
              {loading ? <CircularProgress className={classes.loginButton} size={25.57} /> : "Login" }
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
