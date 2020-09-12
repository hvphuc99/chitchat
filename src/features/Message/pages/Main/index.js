import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
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
});

function Main(props) {
  const classes = useStyles();
  const { currentUserId } = useSelector((state) => state.user);
  const { showChatForm } = useSelector((state) => state.message);
  const [groupChats, setGroupChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messageApi
      .getGroupChatList(currentUserId)
      .then((groupChatList) => {
        const standardizedList = (groupChatList) => {
          let list = [];
          return new Promise((resolve, reject) => {
            groupChatList.forEach((groupChat) => {
              const { id, name, members } = groupChat;
              if (name === "") {
                let uid =
                  members[0] === currentUserId ? members[1] : members[0];
                userApi.getUserInfo(uid).then((userInfo) => {
                  const { firstName, lastName } = userInfo;
                  messageApi.getLastMessage(id).then((message) => {
                    const { senderId, content, timestamp } = message;
                    list = list.concat({
                      id,
                      name: firstName + " " + lastName,
                      senderId,
                      content,
                      timestamp,
                    });
                    if (list.length === groupChatList.length) {
                      resolve(list);
                    }
                  });
                });
              }
            });
          });
        };
        standardizedList(groupChatList).then((list) => {
          setGroupChats(list);
          setLoading(false);
        });
      })
      .catch((err) => {});
  });

  return (
    <Grid container className={classes.root}>
      <Grid container item sm={3} className={classes.leftSideBar}>
        <Grid item sm={2} className={classes.navigate}>
          <NavigateBar />
        </Grid>
        <Grid item sm={10} className={classes.menu}>
          <Search />
          {loading ? <Loading /> : <MenuChat groupChats={groupChats} />}
        </Grid>
      </Grid>
      <Grid item sm={9} className={classes.chatForm}>
        {showChatForm ? <ChatForm /> : ""}
      </Grid>
    </Grid>
  );
}

export default Main;
