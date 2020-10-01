import { Button, Grid, makeStyles, CircularProgress } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";

import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";

SignUpForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

SignUpForm.defaultProps = {
  handleSubmit: null,
  loading: false,
};

const useStyles = makeStyles({
  signUpButton: {
    color: "white",
    marginTop: "20px",
  },
  circular: {
    color: "white",
  },
});

function SignUpForm(props) {
  const classes = useStyles();
  const { initialValues, handleSubmit, loading } = props;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("First Name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must contain at least 6 characters"),
    confirmPassword: Yup.string().required("Password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
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
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FastField
                  name="firstName"
                  component={InputField}
                  label="First Name"
                  value={values.firstName}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  name="lastName"
                  component={InputField}
                  label="Last Name"
                  value={values.lastName}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>

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

            <FastField
              name="confirmPassword"
              component={InputField}
              type="password"
              label="Confirm Password"
              labelWidth={135}
              value={values.confirmPassword}
              variant="outlined"
              margin="normal"
            />

            <Button
              className={classes.signUpButton}
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              fullWidth
            >
              {loading ? <CircularProgress className={classes.circular} size={25.57} /> : "Sign up" }
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignUpForm;
