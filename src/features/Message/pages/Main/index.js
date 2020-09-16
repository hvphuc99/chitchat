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
    padding: "20px 20px",
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
  requestTitle: {
    margin: "auto",
    marginBottom: "30px",
  }
});

function Main(props) {
  const classes = useStyles();
  const { currentUserId } = useSelector((state) => state.user);
  const { showChatForm, selectedOption } = useSelector(
    (state) => state.message
  );
  const [groupChats, setGroupChats] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingAllMessages, setLoadingAllMessages] = useState(true);
  const [loadingFriendRequests, setLoadingFriendRequests] = useState(true);
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
      case options.CONTACT_LIST_OPTION:
        element = <p>Contact list</p>;
        break;
      case options.NOTIFICATION_OPTION:
        element = (
          <>
            <Typography variant="h5" className={classes.requestTitle}>
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
        element = <p>profile</p>;
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
                const { senderId, content, timestamp } = message;
                standardizedList = standardizedList.concat({
                  id,
                  name: firstName + " " + lastName,
                  senderId,
                  picture,
                  content,
                  timestamp,
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
              const { senderId, content, timestamp } = message;
              userApi.getUserInfo(senderId).then((userInfo) => {
                const { firstName, lastName } = userInfo;
                standardizedList = standardizedList.concat({
                  id,
                  name,
                  senderId,
                  senderName: firstName + " " + lastName,
                  content,
                  timestamp,
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

      let list = [];

      for (let userIdKey in requests) {
        const {id, timestamp} = requests[userIdKey];
        userApi.getUserInfo(id).then((userInfo) => {
          const { id, firstName, lastName, picture } = userInfo;
          const name = firstName + " " + lastName;

          list = list.concat({
            id,
            name,
            picture,
            timestamp,
          });

          if (list.length === Object.keys(requests).length) {
            setFriendRequests(list.sort((firstRequest, secondRequest) => {
              return secondRequest.timestamp > firstRequest.timestamp ? -1 : 1;
            }));
            setNumberOfFriendRequest(list.length);
            setLoadingFriendRequests(false);
          }
        });
      }
    });
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid container item sm={3} className={classes.leftSideBar}>
        <Grid item sm={2} className={classes.navigate}>
          <NavigateBar numberOfFriendRequest={numberOfFriendRequest} />
        </Grid>
        <Grid item sm={10} className={classes.menu}>
          {renderOption()}
        </Grid>
      </Grid>
      <Grid item sm={9} className={classes.chatForm}>
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
