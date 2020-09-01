import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid } from "@material-ui/core";
import Avatar from "../Avatar";

MessageListItem.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

MessageListItem.defaultProps = {
  active: false,
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
      margin: "0px 0px 5px 10px",
    },
    "& h6": {
      fontSize: "calc(13px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "400",
      textTransform: "none",
      color: "#647589",
      margin: "5px 0px 5px 10px",
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

function MessageListItem(props) {
  const classes = useStyles();
  const { name, message, date, avatar, active } = props;

  return (
    <Grid container className={classes.root}>
      <Grid item sm={2}>
        <Avatar src={avatar} active={active} />
      </Grid>
      <Grid item sm={8} className={classes.overviewMessage}>
        <h5>{name}</h5>
        <h6>{message}</h6>
      </Grid>
      <Grid item sm={2} className={classes.date}>
        <h6>{date}</h6>
      </Grid>
    </Grid>
  );
}

export default MessageListItem;
