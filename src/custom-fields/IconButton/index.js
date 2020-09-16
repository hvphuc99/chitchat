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
  selected: PropTypes.bool,
  backgroundColorSelected: PropTypes.string,
  iconColorSelected: PropTypes.string,
  size: PropTypes.string,
  fontSize: PropTypes.string,
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
  selected: false,
  backgroundColorSelected: "#1c9dea",
  iconColorSelected: "white",
  size: "medium",
  fontSize: "default",
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
    onClick,
    selected,
    backgroundColorSelected,
    iconColorSelected,
    size,
    fontSize,
    ...other
  } = props;

  const newIconColor = selected ? iconColorSelected : iconColor;

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
    selected: {
      backgroundColor: backgroundColorSelected,
    }
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
        className={selected ? classes.root + " " + classes.selected : classes.root}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClick}
        size={size}
        {...other}
      >
        {badgeContent ? (
          <StylesLibrary.Badge badgeContent={badgeContent} color="error">
            <StylesLibrary.Icon className={icon} style={{ color: newIconColor }} fontSize={fontSize} />
          </StylesLibrary.Badge>
        ) : (
          <StylesLibrary.Icon className={icon} style={{ color: newIconColor }} fontSize={fontSize} />
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
