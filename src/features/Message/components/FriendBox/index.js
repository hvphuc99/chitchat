import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Button,
  withStyles,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@material-ui/core";
import Avatar from "../Avatar";
import { useState } from "react";

FriendBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  handleUnfriend: PropTypes.func,
  handleClickUser: PropTypes.func,
};

FriendBox.defaultProps = {
  handleUnfriend: null,
  handleClickUser: null,
};

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

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: "2px",
  },
  name: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "16px",
    "& h5": {
      fontSize: "calc(17px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "700",
      textTransform: "none",
      color: "#223645",
      margin: "0px 0px 10px 0px",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  menuItem: {
    padding: "0px 10px",
  },
  avatar: {
    width: "100%",
    maxWidth: "46px",
  }
});

function FriendBox(props) {
  const classes = useStyles();
  const { id, name, picture, handleUnfriend, handleClickUser } = props;
  const [showUnfriend, setShowUnfriend] = useState(null);

  const onClickUnfriend = () => {
    handleUnfriend(id);
  };

  const onClickUser = () => {
    handleClickUser(id, name, picture);
  };

  const handleClickFriendOption = (event) => {
    setShowUnfriend(event.currentTarget);
  };

  const closeFriendOption = () => {
    setShowUnfriend(null);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={2}>
        <div className={classes.avatar}>
          <Avatar
            src={picture}
            active={true}
            onClick={onClickUser}
            cursorHover={true}
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.name}>
        <h5 onClick={onClickUser}>{name}</h5>
      </Grid>
      <Grid item xs={12} sm={4} className={classes.buttonContainer}>
        <Button
          className="navigateLoginBtn"
          size="small"
          variant="contained"
          fullWidth
          onClick={handleClickFriendOption}
          startIcon={<Icon className="fas fa-user-check" style={{ width: "fit-content", color: "#1c9dea", fontSize: "13px" }} />}
        >
          Friends
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
      </Grid>
    </Grid>
  );
}

export default FriendBox;
