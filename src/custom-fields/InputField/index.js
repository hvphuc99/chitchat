import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import PropTypes from "prop-types";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,

  disabled: PropTypes.bool,

  variant: PropTypes.string,
  margin: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  value: "",

  disabled: false,

  variant: "standard",
  margin: "normal",
};

function InputField(props) {
  const { field, type, label, placeholder, value, disabled, variant, margin } = props;
  const { name } = field;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (type === "password") {
    return (
      <FormControl variant={variant} margin={margin} fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          name={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}

          disabled={disabled}

          labelWidth={70}

          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }

          {...field}
        />
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

        variant={variant}
        margin={margin}
        fullWidth

        {...field}
      />
    );
  }
}

export default InputField;
