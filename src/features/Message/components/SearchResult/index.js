import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Avatar,
  Button,
  Icon,
  withStyles,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
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
  handleClickUser: PropTypes.func,
  handleUnfriend: PropTypes.func,
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
  handleClickUser: null,
  handleUnfriend: null,
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
    "@media (max-width: 1200px)": {
      fontSize: "10px",
    },
  },
  name: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
    "@media (max-width: 1600px)": {
      fontSize: "17px",
    },
    "@media (max-width: 1500px)": {
      fontSize: "15px",
    },
  },
  avatar: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuItem: {
    padding: "0px 10px",
  },
  avatarContainer: {
    width: "100%",
    maxWidth: "46px",
  },
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

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
    handleClickUser,
    handleUnfriend,
  } = props;
  const [option, setOption] = useState(currentOption);
  const [showUnfriend, setShowUnfriend] = useState(null);

  const handleClickFriendOption = (event) => {
    setShowUnfriend(event.currentTarget);
  };

  const closeFriendOption = () => {
    setShowUnfriend(null);
  };

  const onClickUnfriend = () => {
    handleUnfriend(userId);
    setOption(options.ADD_FRIEND_OPTION);
  };

  const renderAddFriendOption = () => {
    const content = "Add Friend";
    const icon = (
      <Icon
        className="fas fa-user-plus"
        style={{ width: "fit-content", color: "#1c9dea", fontSize: "12px" }}
      />
    );
    const onClick = () => {
      handleClickAddFriend(userId);
      setOption(options.CANCEL_REQUEST_OPTION);
    };
    return (
      <Button
        variant="contained"
        size="small"
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
      <Icon
        className="fas fa-user-times"
        style={{ width: "fit-content", color: "#1c9dea", fontSize: "12px" }}
      />
    );
    const onClick = () => {
      handleClickCancelRequest(userId);
      setOption(options.ADD_FRIEND_OPTION);
    };
    return (
      <Button
        variant="contained"
        size="small"
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
      <Icon
        className="fas fa-user-check"
        style={{ width: "fit-content", color: "#1c9dea", fontSize: "12px" }}
      />
    );
    return (
      <>
        <Button
          variant="contained"
          size="small"
          startIcon={icon}
          className={classes.optionButton}
          onClick={handleClickFriendOption}
        >
          {content}
        </Button>
        <StyledMenu
          anchorEl={showUnfriend}
          keepMounted
          open={Boolean(showUnfriend)}
          onClose={closeFriendOption}
        >
          <MenuItem onClick={onClickUnfriend} className={classes.menuItem}>
            <ListItemText primary="Unfriend" />
          </MenuItem>
        </StyledMenu>
      </>
    );
  };

  const renderAcceptRequestOption = () => {
    const content = "Accept Request";
    const icon = (
      <Icon
        className="fas fa-user-plus"
        style={{ width: "fit-content", color: "#1c9dea", fontSize: "12px" }}
      />
    );
    const onClick = () => {
      handleClickAcceptRequest(userId);
      setOption(options.FRIENDS_OPTION);
    };
    return (
      <Button
        variant="contained"
        size="small"
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

  const onClickResult = () => {
    const name = firstName + " " + lastName;
    handleClickUser(userId, name, picture);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={7} className={classes.info}>
        <div className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
            src={picture}
            onClick={onClickResult}
          />
        </div>
        <h5 className={classes.name} onClick={onClickResult}>
          {firstName + " " + lastName}
        </h5>
      </Grid>
      <Grid item xs={12} sm={5} className={classes.option}>
        {renderOption()}
      </Grid>
    </Grid>
  );
}

export default SearchResult;
