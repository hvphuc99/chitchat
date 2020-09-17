import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Container,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import userApi from "api/userApi";
import { useSelector, useDispatch } from "react-redux";
import FriendBox from "../FriendBox";
import search from "assets/images/search.png";
import { setCurrentGroupChatId, setCurrentGroupChatName, setCurrentGroupChatPicture, setLoadingMessageList, setShowChatForm } from "features/Message/messageSlice";

MenuFriend.propTypes = {
  friends: PropTypes.array,
};

MenuFriend.defaultProps = {
  friends: null,
};

const useStyles = makeStyles({
  root: {
    textAlign: "center",
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
  friendsContainer: {
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
  },
  searchImage: {
    width: "100%",
  },
});

function MenuFriend(props) {
  const classes = useStyles();
  const { friends } = props;
  const { currentUserId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUnfriend = (userId) => {
    userApi
      .removeFriend(currentUserId, userId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleClickUser = (userId, name, picture) => {
    let groupId;
    if (userId < currentUserId) {
      groupId = userId + "-" + currentUserId;
    } else {
      groupId = currentUserId + "-" + userId;
    }
    dispatch(setCurrentGroupChatId(groupId));
    dispatch(setCurrentGroupChatName(name));
    dispatch(setCurrentGroupChatPicture(picture));
    dispatch(setLoadingMessageList(true));
    dispatch(setShowChatForm(true));
  }

  return (
    <Container className={classes.root}>
      {friends.length === 0 ? (
        <div className={classes.logoContainer}>
          <div className={classes.centerContainer}>
            <img className={classes.searchImage} src={search} alt="search" />
            <Typography variant="h6">No friends found</Typography>
          </div>
        </div>
      ) : (
        <List>
          {friends.map(({ id, name, picture }) => (
            <ListItem className={classes.friendsContainer} key={id}>
              <FriendBox
                id={id}
                name={name}
                picture={picture}
                handleUnfriend={handleUnfriend}
                handleClickUser={handleClickUser}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default MenuFriend;
