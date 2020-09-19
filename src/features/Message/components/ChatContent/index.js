import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import MessageBox from "../MessageBox";
import { useSelector } from "react-redux";
import { convertTimestampFull } from "utils";
import PropTypes from "prop-types";

ChatContent.propTypes = {
  messageList: PropTypes.array,
};

ChatContent.defaultProps = {
  messageList: [],
};

const useStyles = makeStyles({
  root: {
    height: "100%",
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
});

function ChatContent(props) {
  const classes = useStyles();
  const { currentUserId } = useSelector((state) => state.user);
  const { messageList } = props;
  const messageEnd = useRef();
  const scrollToBottom = () => {
    messageEnd.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div id="chatBox" className={classes.root}>
      {messageList.map(({ senderId, content, timestamp, type, name, picture }) =>
        senderId === currentUserId ? (
          <MessageBox
            position="right"
            content={content}
            timestamp={convertTimestampFull(timestamp)}
            type={type}
          />
        ) : (
          <MessageBox
            name={name}
            avatar={picture}
            position="left"
            content={content}
            timestamp={convertTimestampFull(timestamp)}
            type={type}
          />
        )
      )}
      <div ref={messageEnd}></div>
    </div>
  );
}

export default ChatContent;
