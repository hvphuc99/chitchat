import {
  Icon,
  IconButton,
  Popover,
  Typography,
  makeStyles,
} from "@material-ui/core";

import React from "react";
import { useState } from "react";

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
  popover: {
    pointerEvents: "none",
  },
});

function MediaLogo(props) {
  const classes = useStyles();

  const [googleAnchorEl, setGoogleAnchorEl] = useState(null);
  const [facebookAnchorEl, setFacebookAnchorEl] = useState(null);

  const handleGooglePopoverOpen = (event) => {
    setGoogleAnchorEl(event.currentTarget);
  };

  const handleGooglePopoverClose = () => {
    setGoogleAnchorEl(null);
  };

  const handleFacebookPopoverOpen = (event) => {
    setFacebookAnchorEl(event.currentTarget);
  };

  const handleFacebookPopoverClose = () => {
    setFacebookAnchorEl(null);
  };

  const openGoogle = Boolean(googleAnchorEl);
  const openFacebook = Boolean(facebookAnchorEl);

  return (
    <div className={classes.root}>
      <IconButton
        className="google-button"
        onMouseEnter={handleGooglePopoverOpen}
        onMouseLeave={handleGooglePopoverClose}
      >
        <Icon className="fa fa-google" style={{ color: "white" }} />
      </IconButton>
      <Popover
        className={classes.popover}
        open={openGoogle}
        anchorEl={googleAnchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleGooglePopoverClose}
        disableRestoreFocus
      >
        <Typography>Sign in with google</Typography>
      </Popover>

      <IconButton
        className="facebook-button"
        onMouseEnter={handleFacebookPopoverOpen}
        onMouseLeave={handleFacebookPopoverClose}
      >
        <Icon className="fa fa-facebook" style={{ color: "white" }} />
      </IconButton>
      <Popover
        className={classes.popover}
        open={openFacebook}
        anchorEl={facebookAnchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleFacebookPopoverClose}
        disableRestoreFocus
      >
        <Typography>Sign in with facebook</Typography>
      </Popover>
    </div>
  );
}

export default MediaLogo;
