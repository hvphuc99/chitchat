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
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    "& h5": {
      fontSize: "calc(17px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "700",
      textTransform: "none",
      color: "#223645",
      margin: "0px 0px 0px 16px",
    },
    "& h6": {
      fontSize: "calc(11px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "400",
      color: "#647589",
      margin: "0px 0px 0px 0px",
      height: "fit-content",
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
      <Grid item xs={12} sm={2}>
        <Avatar src={avatar} />
      </Grid>
      <Grid item xs={12} sm={10} className={classes.content}>
        <div className={classes.header}>
          <h5>{name}</h5>
          <h6>{convertTimestamp(timestamp)}</h6>
        </div>
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
    </Grid>
  );
}

export default FriendRequestBox;
