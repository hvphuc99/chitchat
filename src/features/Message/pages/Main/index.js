import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import NavigateBar from "features/Message/components/NavigateBar";
import MessageList from "features/Message/components/MessageList";

const useStyles = makeStyles({
  root: {
    height: "100%",
    maxHeight: "100vh",
  },
  leftSideBar: {
    backgroundColor: "white",
  },
});

const allMessages = [
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
    active: true,
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
    active: true,
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
        <Grid item sm={2}>
          <NavigateBar />
        </Grid>
        <Grid item sm={10}>
          <MessageList messages={allMessages}/>
        </Grid>
      </Grid>
      <Grid item sm={9}>
        Message
      </Grid>
    </Grid>
  );
}

export default Main;
