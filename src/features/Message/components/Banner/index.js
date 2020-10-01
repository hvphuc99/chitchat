import React from "react";
import landingLogo from "assets/images/landing-logo.png";
import { makeStyles, Typography } from "@material-ui/core";
import chatGroupImage from "assets/images/chat-group.png";
import "emoji-mart/css/emoji-mart.css";
import useMedia from "services/mediaQuery";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  logo: {
    paddingBottom: "20px",
    "@media (max-width: 1100px)": {
      width: "30%",
    },
  },
  normalText: {
    paddingBottom: "16px",
  },
  greyText: {
    color: "#647589",
    paddingBottom: "16px",
  },
  chatGroup: {
    width: "50%",
    "@media (max-width: 1100px)": {
      width: "30%",
    },
  },
});

function Banner() {
  const classes = useStyles();

  const { isGreaterLargeSize, isMediumSize } = useMedia();

  return (
    <div className={classes.root}>
      <img className={classes.logo} src={landingLogo} alt="landing-logo" />
      {isGreaterLargeSize && (
        <>
          <Typography className={classes.normalText} variant="h6">
            Be together, whenever
          </Typography>
          <Typography className={classes.greyText} variant="subtitle1">
            A simple way to text, video chat and plan things all in one place
          </Typography>
        </>
      )}

      {isMediumSize && (
        <>
          <Typography className={classes.normalText} variant="subtitle1">
            Be together, whenever
          </Typography>
          <Typography className={classes.greyText} variant="subtitle2">
            A simple way to text, video chat and plan things all in one place
          </Typography>
        </>
      )}

      <img
        className={classes.chatGroup}
        src={chatGroupImage}
        alt="landing-logo"
      />
    </div>
  );
}

export default Banner;
