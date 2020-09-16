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
import FriendRequestBox from "../FriendRequestBox";
import userApi from "api/userApi";
import { useSelector } from "react-redux";

MenuFriendRequest.propTypes = {
  friendRequests: PropTypes.array,
};

MenuFriendRequest.defaultProps = {
  friendRequests: null,
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
  requestsContainer: {
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
});

function MenuFriendRequest(props) {
  const classes = useStyles();
  const { friendRequests } = props;
  const { currentUserId } = useSelector((state) => state.user);

  const handleConfirmRequest = (senderId) => {
    userApi
      .acceptFriendRequest(currentUserId, senderId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteRequest = (senderId) => {
    userApi
      .deleteFriendRequest(currentUserId, senderId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };


  return (
    <Container className={classes.root}>
      {friendRequests.length === 0 ? (
        <div className={classes.logoContainer}>
          <div className={classes.centerContainer}>
            <Icon
              className="fas fa-users-slash"
              style={{ fontSize: 50, width: 100 }}
            />
            <Typography variant="h6">You don't have friend request</Typography>
          </div>
        </div>
      ) : (
        <List>
          {friendRequests.map(({ id, name, picture, timestamp }) => (
            <ListItem className={classes.requestsContainer} key={id}>
              <FriendRequestBox
                id={id}
                name={name}
                avatar={picture}
                timestamp={timestamp}
                handleConfirmRequest={handleConfirmRequest}
                handleDeleteRequest={handleDeleteRequest}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default MenuFriendRequest;
