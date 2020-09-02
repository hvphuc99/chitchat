import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import ChatHeader from "../ChatHeader";
import ChatFooter from "../ChatFooter";
import ChatContent from "../ChatContent";
import { useEffect } from "react";

ChatForm.propTypes = {};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "space-between",
    height: "100%",
  },
});

function ChatForm(props) {
  const classes = useStyles();

  useEffect(() => {});

  return (
    <Box className={classes.root}>
      <ChatHeader
        name="Phuc Hoang"
        avatar="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
        active={true}
      />
      <ChatContent />
      <ChatFooter />
    </Box>
  );
}

export default ChatForm;
