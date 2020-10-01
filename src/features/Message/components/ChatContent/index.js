import React, { useRef } from "react";
import { useEffect } from "react";
import MessageBox from "../MessageBox";
import { useSelector } from "react-redux";
import { formatTimeFull } from "utils";
import PropTypes from "prop-types";

ChatContent.propTypes = {
  messageList: PropTypes.array,
};

ChatContent.defaultProps = {
  messageList: [],
};

function ChatContent(props) {
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
    <>
      {messageList.map(({ senderId, content, timestamp, type, name, picture }) =>
        senderId === currentUserId ? (
          <MessageBox
            position="right"
            content={content}
            timestamp={formatTimeFull(timestamp)}
            type={type}
          />
        ) : (
          <MessageBox
            name={name}
            avatar={picture}
            position="left"
            content={content}
            timestamp={formatTimeFull(timestamp)}
            type={type}
          />
        )
      )}
      <div ref={messageEnd}></div>
    </>
  );
}

export default ChatContent;
