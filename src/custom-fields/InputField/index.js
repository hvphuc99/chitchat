import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,

  disabled: PropTypes.bool,

  variant: PropTypes.string,
  margin: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",

  disabled: false,

  variant: "standard",
  margin: "normal",
};

function InputField(props) {
  const { field, type, label, placeholder, disabled, variant, margin } = props;
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

          disabled={disabled}

          labelWidth={70}

          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
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

        disabled={disabled}

        variant={variant}
        margin={margin}
        fullWidth
      />
    );
  }
}

export default InputField;
