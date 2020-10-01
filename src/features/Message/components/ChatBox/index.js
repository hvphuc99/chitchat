import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
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
    justifyContent: "space-between",
		width: "100%",
  },
  leftSide: {
    display: "flex",
		alignItems: "center",
  },
  midSide: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "calc(100% - 100px)",
    "& h5": {
      fontSize: "15px",
      fontWeight: "700",
      textTransform: "none",
      color: "#223645",
      margin: "0px 0px 5px 10px",
    },
    "& h6": {
      fontSize: "11px",
      fontWeight: "400",
      textTransform: "none",
      color: "#647589",
      margin: "5px 0px 5px 10px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      fontSize: "10px",
      fontWeight: "400",
      color: "#647589",
      textAlign: "center",
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
    if (type === typeMessages.PHOTO) {
      if (id === currentUserId) {
        return "You sent a photo";
      } else {
        return name + " sent a photo";
      }
    }
    if (type === typeMessages.OTHER_FILE) {
      if (id === currentUserId) {
        return "You sent a file";
      } else {
        return name + " sent a file";
      }
    }
  };

  return (
    <Box className={classes.root}>
      <div className={classes.leftSide}>
        <Avatar src={avatar} active={active} />
      </div>
      <div className={classes.midSide}>
        <h5>{name}</h5>
        <h6>{renderMessage()}</h6>
      </div>
      <div className={classes.rightSide}>
        <h6>{date}</h6>
      </div>
    </Box>
  );
}

export default ChatBox;
