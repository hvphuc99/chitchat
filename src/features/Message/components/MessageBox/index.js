import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, makeStyles } from "@material-ui/core";

MessageBox.propTypes = {
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  name: PropTypes.string,
  position: PropTypes.string,
  type: PropTypes.string,
  avatar: PropTypes.string,
};

MessageBox.defaultProps = {
  name: "",
  position: "left",
  type: 0,
  avatar: "",
};

const useStyles = makeStyles({
  messageBoxLeft: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "12px 36px",
    "& .messageBoxLeftHeader": {
      display: "flex",
      alignItems: "center",
      marginLeft: "24px",
      "& h5": {
        fontSize: "calc(17px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
        fontWeight: "700",
        textTransform: "none",
        color: "#223645",
        margin: "0",
      },
      "& h6": {
        fontSize: "calc(13px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
        fontWeight: "400",
        textTransform: "none",
        color: "#647589",
        margin: "0px 0px 0px 20px",
      },
    },
    "& .messageBoxContent": {
      display: "flex",
      alignItems: "center",
      width: "fit-content",
      borderRadius: "20px",
      fontWeight: "600",
      color: "#223645",
      backgroundColor: "#e5edf5",
      margin: "12px 0px 5px 24px",
      padding: "16px 20px",
      fontSize: "18px",
    },
  },
  messageBoxRight: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "12px 36px",
    "& .messageBoxRightContainer": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      "& .messageBoxRightContent": {
        display: "flex",
        justifyContent: "inherit",
        alignItems: "center",
        width: "fit-content",
        borderRadius: "20px",
        fontWeight: "600",
        color: "white",
        backgroundColor: "#1c9dea",
        margin: "12px 0px 5px 0px",
        padding: "16px 20px",
        fontSize: "18px",
      },
      "& h6": {
        fontSize: "calc(13px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
        fontWeight: "400",
        textTransform: "none",
        color: "#647589",
        margin: "0",
      },
    },
  },
});

function MessageBox(props) {
  const classes = useStyles();
  const { name, avatar, position, content, timestamp, type } = props;

  if (position === "left") {
    return (
      <Box className={classes.messageBoxLeft}>
        <Avatar src={avatar} />
        <span>
          <div className="messageBoxLeftHeader">
            <h5>{name}</h5>
            <h6>{timestamp}</h6>
          </div>
          <div className="messageBoxContent">{content}</div>
        </span>
      </Box>
    );
  } else if (position === "right") {
    return (
      <Box className={classes.messageBoxRight}>
        <div className="messageBoxRightContainer">
          <h6>{timestamp}</h6>
          <div className="messageBoxRightContent">{content}</div>
        </div>
      </Box>
    );
  }
}

export default MessageBox;
