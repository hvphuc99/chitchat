import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import ChatHeader from "../ChatHeader";
import ChatFooter from "../ChatFooter";
import ChatContent from "../ChatContent";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setMessageList,
  setLoadingMessageList,
} from "features/Message/messageSlice";
import messageApi from "api/messageApi";
import { useEffect } from "react";
import userApi from "api/userApi";
import Loading from "components/Loading";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "space-between",
    height: "100%",
  },
  content: {
    flexGrow: "1",
    height: "500px",
  },
});

function ChatForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentGroupChatName, currentGroupChatId, loadingMessageList } = useSelector(
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

  useEffect(() => {
    messageApi.messageListListener(currentGroupChatId, (snapshot) => {
      if (!snapshot.val()) {
        dispatch(setLoadingMessageList(false));
        return;
      }
      const messageList = Object.values(snapshot.val());
      let newList = [];
      messageList.forEach((message, index) => {
        const { senderId } = message;
        userApi.getUserInfo(senderId).then((userInfo) => {
          const { firstName, lastName } = userInfo;
          const name = firstName + " " + lastName;
          newList = newList.concat({
            name,
            ...message,
          });
          if (newList.length === messageList.length) {
            dispatch(
              setMessageList(
                newList.sort((firstMess, secondMess) => {
                  return secondMess.timestamp > firstMess.timestamp ? -1 : 1;
                })
              )
            );
            dispatch(setLoadingMessageList(false));
          }
        });
      });
    });
  }, [loadingMessageList]);

  return (
    <Box className={classes.root}>
      <ChatHeader name={currentGroupChatName} avatar={null} active={true} />
      <div className={classes.content}>
        {loadingMessageList ? <Loading /> : <ChatContent /> }
      </div>
      <ChatFooter onSubmit={handleSendMessage} />
    </Box>
  );
}

export default ChatForm;
