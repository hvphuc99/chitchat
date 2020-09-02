import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import NavigateBar from "features/Message/components/NavigateBar";
import MenuChat from "features/Message/components/MenuChat";
import ChatForm from "features/Message/components/ChatForm";

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
  menuChat: {
    height: "100%",
  },
  chatForm: {
    height: "100%",
  }
});

const menu = [
  {
    id: 0,
    name: "Nguyen Van A",
    message: "OK. Let's go!",
    date: "31/08/2020",
    active: true,
    avatar: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  },
  {
    id: 1,
    name: "Nguyen Van B",
    message: "OK. Let's go!",
    date: "31/08/2020",
    active: true,
    avatar: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  },
  {
    id: 2,
    name: "Nguyen Van C",
    message: "OK. Let's go!",
    date: "31/08/2020",
    active: false,
    avatar: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  },
  {
    id: 3,
    name: "Nguyen Van D",
    message: "OK. Let's go!",
    date: "31/08/2020",
    active: true,
    avatar: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  },
  {
    id: 4,
    name: "Nguyen Van E",
    message: "OK. Let's go!",
    date: "31/08/2020",
    active: false,
    avatar: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  },
  {
    id: 5,
    name: "Nguyen Van F",
    message: "OK. Let's go!",
    date: "31/08/2020",
    active: true,
    avatar: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  },
  {
    id: 6,
    name: "Nguyen Van G",
    message: "OK. Let's go!",
    date: "31/08/2020",
    active: true,
    avatar: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  },
];

function Main(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container item sm={3} className={classes.leftSideBar}>
        <Grid item sm={2} className={classes.navigate}>
          <NavigateBar />
        </Grid>
        <Grid item sm={10} className={classes.menuChat}>
          <MenuChat menu={menu}/>
        </Grid>
      </Grid>
      <Grid item sm={9} className={classes.chatForm}>
        <ChatForm />
      </Grid>
    </Grid>
  );
}

export default Main;
