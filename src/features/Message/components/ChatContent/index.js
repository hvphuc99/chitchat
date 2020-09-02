import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Avatar } from "@material-ui/core";
import { useEffect } from "react";

ChatContent.propTypes = {};

const useStyles = makeStyles({
  root: {
    flexGrow: "1",
    height: "500px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
    "& .Mui-selected": {
      backgroundColor: "#eff7fe",
      borderLeft: "4px solid #1c9dea",
    },
  },
  chatBoxLeft: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "12px 36px",
    "& h5": {
      fontSize: "calc(17px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "700",
      textTransform: "none",
      color: "#223645",
      margin: "0px 0px 5px 24px",
    },
    "& .messageBox": {
      display: "flex",
      alignItems: "center",
      width: "fit-content",
      borderRadius: "20px",
      fontSize: "calc(13px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "600",
      color: "#223645",
      backgroundColor: "#e5edf5",
      margin: "5px 0px 5px 24px",
      padding: "16px 20px",
    },
    "& .time": {
      fontSize: "calc(13px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "400",
      textTransform: "none",
      color: "#647589",
      margin: "4px 0px 0px 20px",
    },
  },
  chatBoxRight: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "12px 36px",
    "& .chatBoxRightContent": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      "& .messageBox": {
        display: "flex",
        justifyContent: "inherit",
        alignItems: "center",
        width: "fit-content",
        borderRadius: "20px",
        fontSize: "calc(13px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
        fontWeight: "600",
        color: "white",
        backgroundColor: "#1c9dea",
        margin: "5px 0px 5px 24px",
        padding: "16px 20px",
      },
      "& .time": {
        fontSize: "calc(13px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
        fontWeight: "400",
        textTransform: "none",
        color: "#647589",
        margin: "4px 0px 0px 20px",
      },
    },
  },
});

function ChatContent(props) {
  const classes = useStyles();

  const arrChatBox = [];

  for (let i = 0; i < 20; i++) {
    arrChatBox.push(
      <div key={i}>
        <Box className={classes.chatBoxLeft}>
          <Avatar src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />
          <span>
            <h5>Phuc Hoang</h5>
            <div className="messageBox">How are you?</div>
          </span>
          <h6 className="time">Today at 4:40 PM</h6>
        </Box>
        <Box className={classes.chatBoxRight}>
          <div className="chatBoxRightContent">
            <h6 className="time">Today at 4:40 PM</h6>
            <div className="messageBox">I'm good. How about you?</div>
          </div>
        </Box>
      </div>
    );
  }

  const scrollToBottom = (id) => {
    const box = document.getElementById(id);
    box.scrollTop = box.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom("chatBox");
  },[]);

  return <div id="chatBox" className={classes.root}>{arrChatBox.map((box) => box)}</div>;
}

export default ChatContent;
