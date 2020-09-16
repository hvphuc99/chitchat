import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Avatar, Button, Icon } from "@material-ui/core";
import { useState } from "react";
import * as options from "constants/index";

SearchResult.propTypes = {
  userId: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  picture: PropTypes.string,
  currentOption: PropTypes.string,
  self: PropTypes.bool,
  handleClickAddFriend: PropTypes.func,
  handleClickCancelRequest: PropTypes.func,
  handleClickAcceptRequest: PropTypes.func,
};

SearchResult.defaultProps = {
  userId: "",
  firstName: "",
  lastName: "",
  picture: "",
  currentOption: "",
  self: false,
  handleClickAddFriend: null,
  handleClickCancelRequest: null,
  handleClickAcceptRequest: null,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  info: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& h5": {
      fontSize: "calc(17px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "700",
      textTransform: "none",
      color: "#223645",
      margin: "0px 0px 5px 16px",
    },
  },
  option: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  optionButton: {
    color: "#1C1F22",
    backgroundColor: "#D8DADF",
    marginLeft: "20px",
  },
});

function SearchResult(props) {
  const classes = useStyles();
  const {
    userId,
    firstName,
    lastName,
    picture,
    self,
    currentOption,
    handleClickAddFriend,
    handleClickCancelRequest,
    handleClickAcceptRequest,
  } = props;
  const [option, setOption] = useState(currentOption);

  const renderAddFriendOption = () => {
    const content = "Add Friend";
    const icon = (
      <Icon className="fas fa-user-plus" style={{ width: 30, height: 20 }} />
    );
    const onClick = () => {
      handleClickAddFriend(userId);
      setOption(options.CANCEL_REQUEST_OPTION);
    };
    return (
      <Button
        variant="contained"
        startIcon={icon}
        className={classes.optionButton}
        onClick={onClick}
      >
        {content}
      </Button>
    );
  };

  const renderCancelRequestOption = () => {
    const content = "Cancel Request";
    const icon = (
      <Icon className="fas fa-user-times" style={{ width: 30, height: 20 }} />
    );
    const onClick = () => {
      handleClickCancelRequest(userId);
      setOption(options.ADD_FRIEND_OPTION);
    };
    return (
      <Button
        variant="contained"
        startIcon={icon}
        className={classes.optionButton}
        onClick={onClick}
      >
        {content}
      </Button>
    );
  };

  const renderFriendsOption = () => {
    const content = "Friends";
    const icon = (
      <Icon className="fas fa-user-check" style={{ width: 30, height: 20 }} />
    );
    const onClick = () => {
    };
    return (
      <Button
        variant="contained"
        startIcon={icon}
        className={classes.optionButton}
        onClick={onClick}
      >
        {content}
      </Button>
    );
  };

  const renderAcceptRequestOption = () => {
    const content = "Accept Request";
    const icon = (
      <Icon className="fas fa-user-plus" style={{ width: 30, height: 20 }} />
    );
    const onClick = () => {
      handleClickAcceptRequest(userId);
      setOption(options.FRIENDS_OPTION);
    };
    return (
      <Button
        variant="contained"
        startIcon={icon}
        className={classes.optionButton}
        onClick={onClick}
      >
        {content}
      </Button>
    );
  };

  const renderOption = () => {
    if (self) return;
    if (option === options.ADD_FRIEND_OPTION) return renderAddFriendOption();
    if (option === options.FRIENDS_OPTION) return renderFriendsOption();
    if (option === options.CANCEL_REQUEST_OPTION)
      return renderCancelRequestOption();
    if (option === options.ACCEPT_REQUEST_OPTION)
      return renderAcceptRequestOption();
  };

  return (
    <Grid container className={classes.root}>
      <Grid item sm={7} className={classes.info}>
        <Avatar src={picture} />
        <h5>{firstName + " " + lastName}</h5>
      </Grid>
      <Grid item sm={5} className={classes.option}>
        {renderOption()}
      </Grid>
    </Grid>
  );
}

export default SearchResult;
