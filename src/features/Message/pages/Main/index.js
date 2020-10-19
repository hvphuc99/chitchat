import React from "react";
import { Drawer, Grid, makeStyles, Typography } from "@material-ui/core";
import NavigateBar from "features/Message/components/NavigateBar";
import MenuChat from "features/Message/components/MenuChat";
import ChatForm from "features/Message/components/ChatForm";
import { useDispatch, useSelector } from "react-redux";
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
import IconButton from "components/IconButton";
import useMedia from "services/mediaQuery";
import { IconButton as LogoButton } from "@material-ui/core";
import logo from "assets/images/logo.png";
import { resetMessage } from "features/Message/messageSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeCurrentUserId, removeToken } from "app/userSlice";
import { setNotify } from "app/notifySlice";

const useStyles = (innerHeight) =>
  makeStyles({
    root: {
      height: "100vh",
      backgroundColor: "#EFF7FE",
    },
    // Greater small size
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
      marginBottom: "10px",
    },
    comingSoon: {
      flexGrow: 1,
    },
    //Medium size
    menuChatHeader: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "10px",
    },
    menuButton: {
      height: 40,
      width: 40,
      backgroundColor: "#E2F0FC",
    },
    // Small size
    menuHeader: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "18px",
      "& .MuiIconButton-root": {
        padding: 0,
      },
    },
    logoImg: {
      height: 30,
      width: 30,
    },
    menuHeaderLeft: {
      display: "flex",
      alignItems: "center",
      "& h6": {
        fontWeight: 700,
        marginLeft: 10,
      },
    },
    menuHeaderRight: {
      display: "flex",
      alignItems: "center",
    },
    menuHeaderButton: {
      height: 30,
      width: 30,
      backgroundColor: "#E2F0FC",
    },
    smallSizeRoot: {
      display: "flex",
      flexDirection: "column",
      height: innerHeight,
      backgroundColor: "white",
      width: "100%",
    },
    menuSmallSize: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: "15px 15px 0px 15px",
      width: "100%",
      maxHeight: `calc(100% - 56px)`,
    },
    menuChatSmallSize: {
      flexGrow: 1,
      marginTop: 10,
      maxHeight: "calc(100% - 91px)",
    },
    leftSideBarContainer: {
      height: "100%",
    },
  });

function Main(props) {
  const { mobileScreenSize } = useSelector((state) => state.screen);
  const classes = useStyles(mobileScreenSize)();
  const { isMediumSize, isSmallSize, isGreaterLargeSize } = useMedia();
  const { currentUserId } = useSelector((state) => state.user);
  const {
    showChatForm,
    selectedOption,
    showSearchFormFullScreen,
  } = useSelector((state) => state.message);
  const [groupChats, setGroupChats] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loadingAllMessages, setLoadingAllMessages] = useState(true);
  const [loadingFriendRequests, setLoadingFriendRequests] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [numberOfFriendRequest, setNumberOfFriendRequest] = useState(0);
  const [showNavigate, setShowNavigate] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickLogoButton = () => {
    dispatch(resetMessage());
    history.push("/");
  };

  const handleClickLogout = () => {
    userApi
      .logout()
      .then((res) => {
        dispatch(removeToken());
        dispatch(removeCurrentUserId());
        dispatch(resetMessage());
        dispatch(
          setNotify({
            type: "success",
            message: res,
          })
        );
        history.push("/login");
      })
      .catch((err) => {
        dispatch(
          setNotify({
            type: "error",
            message: err,
          })
        );
      });
  };

  const renderOption = () => {
    let element = null;

    switch (selectedOption) {
      case options.ALL_MESSAGES_OPTION:
        element = (
          <>
            {isSmallSize ? (
              <>
                <div className={classes.menuHeader}>
                  <div className={classes.menuHeaderLeft}>
                    <LogoButton onClick={handleClickLogoButton}>
                      <img className={classes.logoImg} src={logo} alt="logo" />
                    </LogoButton>
                    <Typography variant="subtitle1">Chats</Typography>
                  </div>
                  <div className={classes.menuHeaderRight}>
                    <div>
                      <IconButton
                        icon="fas fa-sign-out-alt"
                        iconColor="#1c9dea"
                        className={classes.menuHeaderButton}
                        onClick={handleClickLogout}
                      />
                    </div>
                  </div>
                </div>
                <Search />
                <div className={classes.menuChatSmallSize}>
                  {loadingAllMessages ? (
                    <Loading />
                  ) : (
                    <MenuChat groupChats={groupChats} />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={classes.menuChatHeader}>
                  {isMediumSize && (
                    <>
                      <div>
                        <IconButton
                          icon="fas fa-bars"
                          iconColor="#1c9dea"
                          message="Menu"
                          className={classes.menuButton}
                          onClick={() => setShowNavigate(true)}
                        />
                      </div>
                      <Drawer
                        anchor="left"
                        open={showNavigate}
                        onClose={() => setShowNavigate(false)}
                      >
                        <NavigateBar
                          numberOfFriendRequest={numberOfFriendRequest}
                        />
                      </Drawer>
                    </>
                  )}
                  <Search />
                </div>
                {loadingAllMessages ? (
                  <Loading />
                ) : (
                  <MenuChat groupChats={groupChats} />
                )}
              </>
            )}
          </>
        );
        break;
      case options.FRIENDS_OPTION:
        element = (
          <>
            {isMediumSize && (
              <>
                <div>
                  <IconButton
                    icon="fas fa-bars"
                    iconColor="#1c9dea"
                    message="Menu"
                    className={classes.menuButton}
                    onClick={() => setShowNavigate(true)}
                  />
                </div>
                <Drawer
                  anchor="left"
                  open={showNavigate}
                  onClose={() => setShowNavigate(false)}
                >
                  <NavigateBar numberOfFriendRequest={numberOfFriendRequest} />
                </Drawer>
              </>
            )}
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
            {isMediumSize && (
              <>
                <div>
                  <IconButton
                    icon="fas fa-bars"
                    iconColor="#1c9dea"
                    message="Menu"
                    className={classes.menuButton}
                    onClick={() => setShowNavigate(true)}
                  />
                </div>
                <Drawer
                  anchor="left"
                  open={showNavigate}
                  onClose={() => setShowNavigate(false)}
                >
                  <NavigateBar numberOfFriendRequest={numberOfFriendRequest} />
                </Drawer>
              </>
            )}
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
            {isMediumSize && (
              <>
                <div>
                  <IconButton
                    icon="fas fa-bars"
                    iconColor="#1c9dea"
                    message="Menu"
                    className={classes.menuButton}
                    onClick={() => setShowNavigate(true)}
                  />
                </div>
                <Drawer
                  anchor="left"
                  open={showNavigate}
                  onClose={() => setShowNavigate(false)}
                >
                  <NavigateBar numberOfFriendRequest={numberOfFriendRequest} />
                </Drawer>
              </>
            )}
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
    <>
      {isGreaterLargeSize && (
        <>
          <Grid container className={classes.root}>
            <Grid item xs={3} className={classes.leftSideBar}>
              <Grid container className={classes.leftSideBarContainer}>
                <Grid item xs={2} className={classes.navigate}>
                  <NavigateBar numberOfFriendRequest={numberOfFriendRequest} />
                </Grid>
                <Grid item xs={10} className={classes.menu}>
                  {renderOption()}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9} className={classes.chatForm}>
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
        </>
      )}

      {isMediumSize && (
        <>
          <Grid container className={classes.root}>
            <Grid item xs={4} className={classes.leftSideBar}>
              <div
                className={classes.leftSideBarContainer + " " + classes.menu}
              >
                {renderOption()}
              </div>
            </Grid>
            <Grid item xs={8} className={classes.chatForm}>
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
        </>
      )}

      {isSmallSize && (
        <>
          {!showChatForm ? (
            <>
              {!showSearchFormFullScreen ? (
                <div className={classes.smallSizeRoot}>
                  <div className={classes.menuSmallSize}>{renderOption()}</div>
                  <NavigateBar numberOfFriendRequest={numberOfFriendRequest} />
                </div>
              ) : (
                <Search />
              )}
            </>
          ) : (
            <ChatForm />
          )}
        </>
      )}
    </>
  );
}

export default Main;
