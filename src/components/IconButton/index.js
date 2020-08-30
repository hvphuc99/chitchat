import React from "react";
import PropTypes from "prop-types";
import * as StylesLibrary from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundColorHover: PropTypes.string,
  message: PropTypes.string,
  badgeContent: PropTypes.string,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  iconColor: "black",
  backgroundColor: "white",
  backgroundColorHover: "white",
  message: "",
  badgeContent: "",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  onClick: null,
};

function IconButton(props) {
  const {
    icon,
    iconColor,
    backgroundColor,
    backgroundColorHover,
    message,
    badgeContent,
    anchorOrigin,
    transformOrigin,
    onClick
  } = props;

  const classes = makeStyles({
    root: {
      backgroundColor: backgroundColor,
      "&:hover": {
        backgroundColor: backgroundColorHover,
      },
    },
    popover: {
      pointerEvents: "none",
    },
  })();

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <StylesLibrary.IconButton
        className={classes.root}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClick}
      >
        {badgeContent ? (
          <StylesLibrary.Badge badgeContent={4} color="error">
            <StylesLibrary.Icon className={icon} style={{ color: iconColor }} />
          </StylesLibrary.Badge>
        ) : (
          <StylesLibrary.Icon className={icon} style={{ color: iconColor }} />
        )}
      </StylesLibrary.IconButton>
      {message && (
        <StylesLibrary.Popover
          className={classes.popover}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <StylesLibrary.Typography>{message}</StylesLibrary.Typography>
        </StylesLibrary.Popover>
      )}
    </>
  );
}

export default IconButton;
