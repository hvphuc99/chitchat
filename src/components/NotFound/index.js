import { Box, Button, Container, makeStyles } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "40px 0px",
    "& h1": {
      fontSize: "calc(80px + (150 - 80) * ((100vw - 320px) / (1920 - 320)))",
      color: "#1c9dea",
      lineHeight: "0.8",
      textShadow: "5px 5px 10px #1c9dea",
      marginBottom: "40px",
    },
    "& h2": {
      fontSize: "calc(20px + (28 - 20) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "800",
      color: "#223645",
      marginBottom: "20px",
    },
    "& h4": {
      fontSize: "calc(14px + (16 - 14) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "400",
      color: "#647589",
      marginBottom: "20px",
    },
  },
  container: {
    textAlign: "center",
  },
  homeButton: {
    color: "white",
    width: "50%",
  },
});

function NotFound(props) {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <h4>
          The Page You Are Attempting To Reach Is Not Available. <br />
          This May Be Because The Page Does Not Exist Or Has Been Moved.
        </h4>
        <Button
          className={classes.homeButton}
          size="large"
          color="primary"
          variant="contained"
        >
          Back To Home
        </Button>
      </Container>
    </Box>
  );
}

export default NotFound;
