import { Icon, IconButton, makeStyles } from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";

MediaLogo.propTypes = {};

const useStyles = makeStyles({
  root: {
    position: "absolute",
    left: "-25px",
    top: "50%",
    transform: "translateY(-50%)",
    "& .google-button": {
      display: "block",
      backgroundColor: "#ff4e2b",
      marginBottom: "15px",
    },
    "& .facebook-button": {
      display: "block",
      backgroundColor: "#2c67ce",
    },
  },
});

function MediaLogo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton className="google-button">
        <Icon className="fa fa-google" style={{ color: "white" }} />
      </IconButton>
      <IconButton className="facebook-button">
        <Icon className="fa fa-facebook" style={{ color: "white" }} />
      </IconButton>
    </div>
  );
}

export default MediaLogo;
