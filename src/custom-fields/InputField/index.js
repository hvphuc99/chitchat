import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import PropTypes from "prop-types";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  labelWidth: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,

  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,

  variant: PropTypes.string,
  margin: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  labelWidth: 75,
  placeholder: "",
  value: "",

  disabled: false,
  autoFocus: false,
  autoComplete: "on",

  variant: "standard",
  margin: "normal",
};

function InputField(props) {
  const {
    field,
    form,
    type,
    label,
    labelWidth,
    placeholder,
    value,
    disabled,
    autoFocus,
    variant,
    margin,
    autoComplete,
    ...other
  } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showErrors = errors[name] && touched[name];

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (type === "password") {
    return (
      <FormControl
        variant={variant}
        margin={margin}
        fullWidth
        error={showErrors}
      >
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          name={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          labelWidth={labelWidth}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          {...field}
        />
        <FormHelperText error={showErrors}>
          {touched[name] ? errors[name] : ""}
        </FormHelperText>
      </FormControl>
    );
  } else {
    return (
      <TextField
        name={name}
        type={type}
        label={label}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        variant={variant}
        margin={margin}
        fullWidth
        error={showErrors}
        helperText={touched[name] ? errors[name] : ""}
        {...field}
        {...other}
      />
    );
  }
}

export default InputField;
