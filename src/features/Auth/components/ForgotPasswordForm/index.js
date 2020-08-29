import { Button, makeStyles } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";

import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
};

ForgotPasswordForm.defaultProps = {
  handleSubmit: null,
};

const useStyles = makeStyles({
  forgotPasswordButton: {
    color: "white",
    marginTop: "30px",
  },
});

function ForgotPasswordForm(props) {
  const classes = useStyles();
  const { initialValues, handleSubmit } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
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

            <Button
              className={classes.forgotPasswordButton}
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              fullWidth
            >
              Reset Password
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ForgotPasswordForm;
