import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid } from "@material-ui/core";
import Avatar from "../Avatar";
import * as typeMessages from "constants/typeMessage";
import { useSelector } from "react-redux";

ChatBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  active: PropTypes.bool,
  type: PropTypes.number,
};

ChatBox.defaultProps = {
  active: false,
  type: 0,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  overviewMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& h5": {
      fontSize: "calc(17px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "700",
      textTransform: "none",
      color: "#223645",
      margin: "0px 0px 5px 16px",
    },
    "& h6": {
      fontSize: "calc(13px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "400",
      textTransform: "none",
      color: "#647589",
      margin: "5px 0px 5px 16px",
      width: "100%",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  },
  date: {
    "& h6": {
      fontSize: "calc(11px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "400",
      color: "#647589",
    },
  },
});

function ChatBox(props) {
  const classes = useStyles();
  const { id, name, message, date, avatar, active, type } = props;
  const { currentUserId } = useSelector((state) => state.user);

  const renderMessage = () => {
    if (type === typeMessages.TEXT) {
      if (id === currentUserId) {
        return "You: " + message;
      } else {
        return message;
      }
    }
    if (type === typeMessages.STICKER) {
      if (id === currentUserId) {
        return "You sent a sticker";
      } else {
        return name + " sent a sticker";
      }
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={2}>
        <Avatar src={avatar} active={active}/>
      </Grid>
      <Grid item xs={12} sm={8} className={classes.overviewMessage}>
        <h5>{name}</h5>
        <h6>{renderMessage()}</h6>
      </Grid>
      <Grid item xs={12} sm={2} className={classes.date}>
        <h6>{date}</h6>
      </Grid>
    </Grid>
  );
}

export default ChatBox;
