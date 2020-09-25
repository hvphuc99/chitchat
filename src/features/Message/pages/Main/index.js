import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import NavigateBar from "features/Message/components/NavigateBar";
import MenuChat from "features/Message/components/MenuChat";
import ChatForm from "features/Message/components/ChatForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import userApi from "api/userApi";
import messageApi from "api/messageApi";
import { useState } from "react";
import Loading from "components/Loading";
import Search from "features/Message/components/Search";
import Banner from "features/Message/components/Banner";
import * as options from "constants/index";
import MenuFriendRequest from "features/Message/components/MenuFriendRequest";
import MenuFriend from "features/Message/components/MenuFriend";
import ComingSoon from "components/ComingSoon";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  leftSideBar: {
    height: "100%",
    backgroundColor: "white",
  },
  navigate: {
    height: "100%",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "20px 15px",
  },
  chatForm: {
    height: "100%",
  },
  banner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  menuTitle: {
    fontSize: "18px",
    margin: "auto",
    marginBottom: "30px",
  },
  comingSoon: {
    flexGrow: 1,
  },
});

function Main(props) {
  const classes = useStyles();
  const { currentUserId } = useSelector((state) => state.user);
  const { showChatForm, selectedOption } = useSelector(
    (state) => state.message
  );
  const [groupChats, setGroupChats] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loadingAllMessages, setLoadingAllMessages] = useState(true);
  const [loadingFriendRequests, setLoadingFriendRequests] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [numberOfFriendRequest, setNumberOfFriendRequest] = useState(0);

  const renderOption = () => {
    let element = null;

    switch (selectedOption) {
      case options.ALL_MESSAGE_OPTION:
        element = (
          <>
            <Search />
            {loadingAllMessages ? (
              <Loading />
            ) : (
              <MenuChat groupChats={groupChats} />
            )}
          </>
        );
        break;
      case options.FRIENDs_OPTION:
        element = (
          <>
            <Typography variant="h5" className={classes.menuTitle}>
              Friends
            </Typography>
            {loadingFriends ? <Loading /> : <MenuFriend friends={friends} />}
          </>
        );
        break;
      case options.FRIEND_REQUESTS_OPTION:
        element = (
          <>
            <Typography variant="h5" className={classes.menuTitle}>
              Friend Requests
            </Typography>
            {loadingFriendRequests ? (
              <Loading />
            ) : (
              <MenuFriendRequest friendRequests={friendRequests} />
            )}
          </>
        );
        break;
      case options.PROFILE_OPTION:
        element = (
          <>
            <Typography variant="h5" className={classes.menuTitle}>
              Profile
            </Typography>
            <div className={classes.comingSoon}>
              <ComingSoon />
            </div>
          </>
        );
        break;
      default:
    }
    return element;
  };

  useEffect(() => {
    messageApi.groupChatsListener(currentUserId, (snapshot) => {
      if (!snapshot.val()) {
        setLoadingAllMessages(false);
        return;
      }

      const groupChats = snapshot.val();
      let belongGroups = [];
      for (let groupChatKey in groupChats) {
        const { members } = groupChats[groupChatKey];
        for (let memberKey in members) {
          if (members[memberKey] === currentUserId) {
            belongGroups = belongGroups.concat(groupChats[groupChatKey]);
            break;
          }
        }
      }

      if (belongGroups.length === 0) {
        setLoadingAllMessages(false);
        return;
      }

      let standardizedList = [];

      belongGroups.forEach((groupChat) => {
        const { id, name, members } = groupChat;
        if (members.length === 2) {
          let uid = members[0] === currentUserId ? members[1] : members[0];
          userApi.getUserInfo(uid).then((userInfo) => {
            const { firstName, lastName, picture } = userInfo;
            messageApi.getLastMessage(id).then((message) => {
              if (!message) {
                standardizedList = standardizedList.concat({
                  id,
                  name: firstName + " " + lastName,
                });
              } else {
                const { senderId, content, timestamp, type } = message;
                standardizedList = standardizedList.concat({
                  id,
                  name: firstName + " " + lastName,
                  senderId,
                  picture,
                  content,
                  timestamp,
                  type,
                });
              }
              if (standardizedList.length === belongGroups.length) {
                setGroupChats(
                  standardizedList.sort((firstMess, secondMess) => {
                    return secondMess.timestamp > firstMess.timestamp ? 1 : -1;
                  })
                );
                setLoadingAllMessages(false);
              }
            });
          });
        } else {
          messageApi.getLastMessage(id).then((message) => {
            if (!message) {
              standardizedList = standardizedList.concat({
                id,
                name,
              });
              if (standardizedList.length === belongGroups.length) {
                setGroupChats(
                  standardizedList.sort((firstMess, secondMess) => {
                    return secondMess.timestamp > firstMess.timestamp ? 1 : -1;
                  })
                );
                setLoadingAllMessages(false);
              }
            } else {
              const { senderId, content, timestamp, type } = message;
              userApi.getUserInfo(senderId).then((userInfo) => {
                const { firstName, lastName } = userInfo;
                standardizedList = standardizedList.concat({
                  id,
                  name,
                  senderId,
                  senderName: firstName + " " + lastName,
                  content,
                  timestamp,
                  type,
                });
                if (standardizedList.length === belongGroups.length) {
                  setGroupChats(
                    standardizedList.sort((firstMess, secondMess) => {
                      return secondMess.timestamp > firstMess.timestamp
                        ? 1
                        : -1;
                    })
                  );
                  setLoadingAllMessages(false);
                }
              });
            }
          });
        }
      });
    });

    userApi.friendRequestsListener(currentUserId, (snapshot) => {
      if (!snapshot.val()) {
        setFriendRequests([]);
        setLoadingFriendRequests(false);
        setNumberOfFriendRequest(0);
        return;
      }

      const requests = snapshot.val();

      let requestList = [];

      for (let userIdKey in requests) {
        const { id, timestamp } = requests[userIdKey];
        userApi.getUserInfo(id).then((userInfo) => {
          const { id, firstName, lastName, picture } = userInfo;
          const name = firstName + " " + lastName;

          requestList = requestList.concat({
            id,
            name,
            picture,
            timestamp,
          });

          if (requestList.length === Object.keys(requests).length) {
            setFriendRequests(
              requestList.sort((firstRequest, secondRequest) => {
                return secondRequest.timestamp > firstRequest.timestamp
                  ? -1
                  : 1;
              })
            );
            setNumberOfFriendRequest(requestList.length);
            setLoadingFriendRequests(false);
          }
        });
      }
    });

    userApi.friendsListener(currentUserId, (snapshot) => {
      if (!snapshot.val()) {
        setFriends([]);
        setLoadingFriends(false);
        return;
      }

      const friends = snapshot.val();

      let friendList = [];

      for (let userIdKey in friends) {
        const id = friends[userIdKey];
        userApi.getUserInfo(id).then((userInfo) => {
          const { id, firstName, lastName, picture } = userInfo;
          const name = firstName + " " + lastName;

          friendList = friendList.concat({
            id,
            name,
            picture,
          });

          if (friendList.length === Object.keys(friends).length) {
            setFriends(
              friendList.sort((firstFriend, secondFriend) => {
                return firstFriend.firstName > secondFriend.firstName ? -1 : 1;
              })
            );
            setLoadingFriends(false);
          }
        });
      }
    });
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={3}>
        <Grid container className={classes.leftSideBar}>
          <Grid item xs={12} sm={2} className={classes.navigate}>
            <NavigateBar numberOfFriendRequest={numberOfFriendRequest} />
          </Grid>
          <Grid item xs={12} sm={10} className={classes.menu}>
            {renderOption()}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={9} className={classes.chatForm}>
        {showChatForm ? (
          <ChatForm />
        ) : (
          <div className={classes.banner}>
            {" "}
            <Banner />
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default Main;
