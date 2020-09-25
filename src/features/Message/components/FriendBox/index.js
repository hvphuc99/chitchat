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
    alignItems: "center",
  },
  name: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& h5": {
      fontSize: "15px",
      fontWeight: "700",
      textTransform: "none",
      color: "#223645",
      margin: "0px 0px 10px 10px",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    "& .MuiButton-label": {
      fontSize: "11px",
      "@media (max-width: 1100px)": {
      fontSize: "9px",
      },
    },
  },
  menuItem: {
    padding: "0px 10px",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
  },
  itemTextContainer: {
    "& .MuiTypography-body1": {
      fontSize: "11px",
      marginLeft: "5px",
    },
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
      <Grid item xs={12} sm={2} className={classes.avatarContainer}>
        <Avatar
          src={picture}
          active={true}
          onClick={onClickUser}
          cursorHover={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.name}>
        <h5 onClick={onClickUser}>{name}</h5>
      </Grid>
      <Grid item xs={12} sm={4} className={classes.buttonContainer}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={handleClickFriendOption}
          startIcon={
            <Icon
              className="fas fa-user-check"
              style={{
                width: "fit-content",
                color: "#1c9dea",
                fontSize: "11px",
              }}
            />
          }
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
            <Icon
              className="fas fa-user-times"
              style={{
                width: "fit-content",
                color: "#1c9dea",
                fontSize: "11px",
              }}
            />
            <ListItemText primary="Unfriend" className={classes.itemTextContainer} />
          </MenuItem>
        </StyledMenu>
      </Grid>
    </Grid>
  );
}

export default FriendBox;
