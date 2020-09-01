import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import MessageFormHeader from "../MessageFormHeader";
import MessageFormFooter from "../MessageFormFooter";
import MessageFormBody from "../MessageFormBody";

MessageForm.propTypes = {};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "space-between",
    height: "100%",
  },
  body: {
    flexGrow: "1",
  },
});

function MessageForm(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MessageFormHeader
        name="Phuc Hoang"
        avatar="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
        active={true}
      />
      <div className={classes.body}>
        <MessageFormBody />
      </div>
      <MessageFormFooter />
    </Box>
  );
}

export default MessageForm;
