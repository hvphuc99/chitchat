import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import ChatHeader from "../ChatHeader";
import ChatFooter from "../ChatFooter";
import ChatContent from "../ChatContent";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "features/Message/messageSlice";
import messageApi from "api/messageApi";

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
  const dispatch = useDispatch();
  const { currentGroupChatName, currentGroupChatId } = useSelector(
    (state) => state.message
  );
  const { currentUserId } = useSelector((state) => state.user);

  const handleSendMessage = (values, { resetForm }) => {
    const { message } = values;
    if (message === "") return;
    messageApi.sendMessage(currentUserId, currentGroupChatId, message, 0);
    const itemMessage = {
      senderId: currentUserId,
      timestamp: Date.now(),
      content: message,
      type: 0,
    };
    dispatch(addMessage(itemMessage));
    resetForm();
  };

  return (
    <Box className={classes.root}>
      <ChatHeader name={currentGroupChatName} avatar={null} active={true} />
      <ChatContent />
      <ChatFooter onSubmit={handleSendMessage} />
    </Box>
  );
}

export default ChatForm;
