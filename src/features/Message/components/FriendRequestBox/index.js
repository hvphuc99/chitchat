import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Button } from "@material-ui/core";
import Avatar from "../Avatar";
import { convertTimestamp } from "utils";

FriendRequestBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  handleConfirmRequest: PropTypes.func,
  handleDeleteRequest: PropTypes.func,
};

FriendRequestBox.defaultProps = {
  handleConfirmRequest: null,
  handleDeleteRequest: null,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2px",
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
      margin: "0px 0px 10px 16px",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    "& .delete-button": {
      color: "#1C1F22",
      backgroundColor: "#D8DADF",
      marginLeft: "10px",
    },
    "& .confirm-button": {
      backgroundColor: "#1c9dea",
      color: "white",
      marginLeft: "16px",
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

function FriendRequestBox(props) {
  const classes = useStyles();
  const {
    id,
    name,
    avatar,
    timestamp,
    handleConfirmRequest,
    handleDeleteRequest,
  } = props;

  const onClickConfirm = () => {
    handleConfirmRequest(id);
  };

  const onClickDelete = () => {
    handleDeleteRequest(id);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item sm={2}>
        <Avatar src={avatar} />
      </Grid>
      <Grid item sm={8} className={classes.overviewMessage}>
        <h5>{name}</h5>
        <div className={classes.buttonContainer}>
          <Button
            className="navigateLoginBtn confirm-button"
            size="small"
            variant="contained"
            fullWidth
            onClick={onClickConfirm}
          >
            Confirm
          </Button>
          <Button
            className="navigateLoginBtn delete-button"
            size="medium"
            variant="contained"
            fullWidth
            onClick={onClickDelete}
          >
            Delete
          </Button>
        </div>
        <span></span>
      </Grid>
      <Grid item sm={2} className={classes.date}>
        <h6>{convertTimestamp(timestamp)}</h6>
      </Grid>
    </Grid>
  );
}

export default FriendRequestBox;
