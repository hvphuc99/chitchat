import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  circular: {
    color: "#1C9DEA",
  }
})

function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.circular} />
    </div>
  );
}

export default Loading;