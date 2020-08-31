import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  withStyles,
  Badge,
  Grid,
  Avatar,
} from "@material-ui/core";

MessageListItem.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

MessageListItem.defaultProps = {
  active: false,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: "50px",
    width: "50px",
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
      margin: "0px 0px 5px 10px",
    },
    "& h6": {
      fontSize: "calc(13px + (12 - 11) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "400",
      textTransform: "none",
      color: "#647589",
      margin: "10px 0px 5px 10px",
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

function MessageListItem(props) {
  const classes = useStyles();
  const { name, message, date, avatar, active } = props;

  return (
    <Grid container className={classes.root}>
      <Grid item sm={2}>
        {active ? (
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar src={avatar} className={classes.avatar} />
          </StyledBadge>
        ) : (
          <Avatar src={avatar} className={classes.avatar} />
        )}
      </Grid>
      <Grid item sm={8} className={classes.overviewMessage}>
        <h5>{name}</h5>
        <h6>{message}</h6>
      </Grid>
      <Grid item sm={2} className={classes.date}>
        <h6>{date}</h6>
      </Grid>
    </Grid>
  );
}

export default MessageListItem;
