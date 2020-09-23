import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Box,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Avatar from "../Avatar";
import IconButton from "custom-fields/IconButton";
import ComingSoon from "components/ComingSoon";

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
    alignItems: "center",
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
  avatarContainer: {
    maxWidth: "46px",
  },
  rightSide: {
    display: "flex",
    justifyContent: "center",
    "& .icon": {
      marginLeft: "20px",
    },
  },
  dialog: {
    "& .MuiDialog-paper": {
      position: "absolute",
      width: "40%",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "none",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function ChatHeader(props) {
  const classes = useStyles();
  const { name, avatar, active } = props;
  const [showDialog, setShowDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setShowDialog(true);
  };

  const handleClickCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <Box className={classes.root}>
      <div className={classes.leftSide}>
        <div className={classes.avatarContainer}><Avatar src={avatar} active={active} /></div>
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
            onClick={handleClickOpenDialog}
          />
        </div>
        <div className="icon">
          <IconButton
            icon="fas fa-video"
            iconColor="#223645"
            backgroundColor="#eff1f2"
            backgroundColorHover="#D3D8DB"
            message="Video Chat"
            onClick={handleClickOpenDialog}
          />
        </div>
      </div>
      <Dialog
        className={classes.dialog}
        open={showDialog}
        TransitionComponent={Transition}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle>Voice Call and Video Chat</DialogTitle>
        <DialogContent>
          <ComingSoon />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ChatHeader;
