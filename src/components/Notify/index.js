import React from "react";
import PropTypes from "prop-types";
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearNotify } from "app/notifySlice";

Notify.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Notify.defaultProps = {
  type: "success",
};

const useStyles = makeStyles({
  alert: {
    minWidth: "300px",
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function Notify(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { type, message } = props;
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    dispatch(clearNotify());
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} className={classes.alert}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notify;
