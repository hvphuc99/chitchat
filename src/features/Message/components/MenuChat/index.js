import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Container,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import ChatBox from "../ChatBox";
import { formatTime } from "utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentGroupChatId,
  setCurrentGroupChatName,
  setShowChatForm,
  setLoadingMessageList,
  setCurrentGroupChatPicture,
} from "features/Message/messageSlice";
import search from "assets/images/search.png";
import { useEffect } from "react";
import messageApi from "api/messageApi";

MenuChat.propTypes = {
  groupChats: PropTypes.array,
};

MenuChat.defaultProps = {
  groupChats: null,
};

const useStyles = makeStyles({
  root: {
    padding: "0",
    flexGrow: "1",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(28,157,234,0.15)",
    },
    "& .Mui-selected": {
      backgroundColor: "#eff7fe",
      borderLeft: "2px solid #1c9dea",
    },
    "& .MuiListItem-gutters": {
      paddingLeft: "0px",
      paddingRight: "0px",
    }
  },
  messageContainer: {
    margin: 0,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  centerContainer: {
    textAlign: "center",
  },
  searchImage: {
    width: "100%",
  },
});

function MenuChat(props) {
  const classes = useStyles();
  const { groupChats } = props;
  const { currentGroupChatId } = useSelector((state) => state.message);
  const [selectedGroupChatId, setSelectedGroupChatId] = useState(null);
  const dispatch = useDispatch();

  const handleClickListItem = (event, id, name, picture) => {
    if (currentGroupChatId) {
      messageApi.removeMessageListListener(currentGroupChatId);
    }
    setSelectedGroupChatId(id);
    dispatch(setCurrentGroupChatId(id));
    dispatch(setCurrentGroupChatName(name));
    dispatch(setCurrentGroupChatPicture(picture));
    dispatch(setLoadingMessageList(true));
    dispatch(setShowChatForm(true));
  };

  useEffect(() => {
    setSelectedGroupChatId(currentGroupChatId);
  }, [currentGroupChatId]);

  return (
    <Container className={classes.root}>
      {groupChats.length === 0 ? (
        <div className={classes.logoContainer}>
          <div className={classes.centerContainer}>
            <img className={classes.searchImage} src={search} alt="search" />
            <Typography variant="h6">No chat room</Typography>
            <Typography variant="subtitle1">
              If you don't have friends, you can search and add friends to chat
            </Typography>
          </div>
        </div>
      ) : (
        <List>
          {groupChats.map(
            ({
              id,
              name,
              senderId,
              senderName,
              picture,
              content,
              timestamp,
              type,
            }) => (
              <ListItem
                className={classes.messageContainer}
                key={id}
                button
                selected={selectedGroupChatId === id}
                onClick={(event) =>
                  handleClickListItem(event, id, name, picture)
                }
              >
                <ChatBox
                  id={senderId}
                  name={name}
                  message={content}
                  date={formatTime(timestamp)}
                  active={true}
                  avatar={picture}
                  type={type}
                />
              </ListItem>
            )
          )}
        </List>
      )}
    </Container>
  );
}

export default MenuChat;
