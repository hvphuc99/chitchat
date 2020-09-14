import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Container,
  List,
  ListItem,
  Typography,
  Icon,
} from "@material-ui/core";
import { useState } from "react";
import ChatBox from "../ChatBox";
import { convertTimestamp } from "utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentGroupChatId,
  setCurrentGroupChatName,
  setShowChatForm,
  setLoadingMessageList,
  setCurrentGroupChatPicture,
} from "features/Message/messageSlice";

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
      borderLeft: "4px solid #1c9dea",
    },
  },
  messageContainer: {
    margin: "0px 0px 10px 0px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  centerContainer: {
    textAlign: "center",
  }
});

function MenuChat(props) {
  const classes = useStyles();
  const { groupChats } = props;
  const { currentUserId } = useSelector((state) => state.user);
  const [selectedGroupChatId, setSelectedGroupChatId] = useState(null);
  const dispatch = useDispatch();

  const handleClickListItem = (event, id, name, picture) => {
    setSelectedGroupChatId(id);
    dispatch(setCurrentGroupChatId(id));
    dispatch(setCurrentGroupChatName(name));
    dispatch(setCurrentGroupChatPicture(picture));
    dispatch(setLoadingMessageList(true));
    dispatch(setShowChatForm(true));
  };

  return (
    <Container className={classes.root}>
      {groupChats.length === 0 ? (
        <div className={classes.logoContainer}>
          <div className={classes.centerContainer}>
            <Icon className="fas fa-users-slash" style={{ fontSize: 50, width: 100 }} />
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
                  name={name}
                  message={
                    senderId === currentUserId
                      ? `You: ${content}`
                      : senderName
                      ? `${senderName}: ${content}`
                      : content
                  }
                  date={convertTimestamp(timestamp)}
                  active={true}
                  avatar={picture}
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
