import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import NavigateBar from "features/Message/components/NavigateBar";

const useStyles = makeStyles({
  root: {
    height: "100%",
    maxHeight: "100vh",
  },
  leftSideBar: {
    backgroundColor: "white",
  }
});

function Main(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container item sm={4} className={classes.leftSideBar}>
        <Grid item sm={2}>
          <NavigateBar />
        </Grid>
        <Grid item sm={10}>
          Message Box
        </Grid>
      </Grid>
      <Grid item sm={8}>
        Message
      </Grid>
    </Grid>
  );
}

export default Main;
