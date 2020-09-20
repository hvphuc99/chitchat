import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import ChatHeader from "../ChatHeader";
import ChatFooter from "../ChatFooter";
import ChatContent from "../ChatContent";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessageList, setLoadingMessageList, setMessageList } from "features/Message/messageSlice";
import messageApi from "api/messageApi";
import { useEffect } from "react";
import userApi from "api/userApi";
import Loading from "components/Loading";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
    height: "100%",
    marginLeft: "3px",
  },
  content: {
    flexGrow: "1",
    width: "100%",
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

function ChatForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    currentGroupChatName,
    currentGroupChatId,
    loadingMessageList,
    currentGroupChatPicture,
    messageList,
  } = useSelector((state) => state.message);
  const { currentUserId } = useSelector((state) => state.user);

  const handleSendTextMessage = (values, { resetForm }) => {
    const { message } = values;
    if (message === "") return;
    messageApi.sendMessage(currentUserId, currentGroupChatId, message, 0);
    const itemMessage = {
      senderId: currentUserId,
      timestamp: Date.now(),
      content: message,
      type: 0,
    };
    dispatch(addMessage(itemMessage))
    resetForm();
  };

  useEffect(() => {
    messageApi.messageListListener(currentGroupChatId, (snapshot) => {
      if (!snapshot.val()) {
        dispatch(clearMessageList());
        dispatch(setLoadingMessageList(false));
        return;
      }
      const list = Object.values(snapshot.val());
      let newList = [];
      list.forEach((message, index) => {
        const { senderId } = message;
        userApi.getUserInfo(senderId).then((userInfo) => {
          const { firstName, lastName, picture } = userInfo;
          const name = firstName + " " + lastName;
          newList = newList.concat({
            name,
            picture,
            ...message,
          });
          if (newList.length === list.length) {
            dispatch(setMessageList(newList.sort((firstMess, secondMess) => {
              return secondMess.timestamp > firstMess.timestamp ? -1 : 1;
            })))
            dispatch(setLoadingMessageList(false));
          }
        });
      });
    });
  }, [loadingMessageList]);

  return (
    <Box className={classes.root}>
      <ChatHeader
        name={currentGroupChatName}
        avatar={currentGroupChatPicture}
        active={true}
      />
      <div className={classes.content}>
        {loadingMessageList ? <Loading /> : <ChatContent messageList={messageList} />}
      </div>
      <ChatFooter onSubmit={handleSendTextMessage} />
    </Box>
  );
}

export default ChatForm;
