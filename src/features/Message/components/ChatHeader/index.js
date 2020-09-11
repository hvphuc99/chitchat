import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import Avatar from "../Avatar";
import IconButton from "custom-fields/IconButton";
import { useSelector } from "react-redux";

ChatHeader.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

ChatHeader.defaultProps = {
  active: false,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 36px",
    width: "100%",
    backgroundColor: "white",
    borderBottom: "1px solid #eff1f2",
  },
  leftSide: {
    display: "flex",
    justifyContent: "center",
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
    },
    "& .online": {
      color: "#3fcc35",
    },
  },
  rightSide: {
    display: "flex",
    justifyContent: "center",
    "& .icon": {
      marginLeft: "20px",
    },
  },
});

function ChatHeader(props) {
  const classes = useStyles();
  const { name, avatar, active } = props;

  return (
    <Box className={classes.root}>
      <div className={classes.leftSide}>
        <Avatar src={avatar} active={active} />
        <span>
          <h5>{name}</h5>
          {active ? <h6 className="online">Online</h6> : <h6>Offline</h6>}
        </span>
      </div>
      <div className={classes.rightSide}>
        <div className="icon">
          <IconButton
            icon="fas fa-phone-alt"
            iconColor="#223645"
            backgroundColor="#eff1f2"
            backgroundColorHover="#D3D8DB"
            message="Voice Call"
          />
        </div>
        <div className="icon">
          <IconButton
            icon="fas fa-video"
            iconColor="#223645"
            backgroundColor="#eff1f2"
            backgroundColorHover="#D3D8DB"
            message="Video Chat"
          />
        </div>
      </div>
    </Box>
  );
}

export default ChatHeader;
