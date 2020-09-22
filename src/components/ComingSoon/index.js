import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import comingSoonImg from "assets/images/coming-soon.png";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    textAlign: "center",
  },
  image: {
    width: "50%",
  },
});

function ComingSoon(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img className={classes.image} src={comingSoonImg} alt="coming-soon" />
        <Typography variant="h6">Coming Soon</Typography>
        <Typography variant="subtitle1">
          In progress 
        </Typography>
      </div>
    </div>
  );
}

export default ComingSoon;
