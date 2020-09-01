import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import IconButton from "components/IconButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "26px 36px",
    width: "100%",
    backgroundColor: "white",
    borderTop: "1px solid #eff1f2",
  },
  leftSide: {
    display: "flex",
    justifyContent: "center",
    "& .icon": {
      marginRight: "15px",
    },
  },
  midSide: {
    flexGrow: "1",
    backgroundColor: "blue",
  },
  rightSide: {
    "& .icon": {
      marginLeft: "15px",
    },
  }
});

const customAnchorOrigin = {
  vertical: "top",
  horizontal: "center",
};

const customTransformOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

function MessageFormFooter(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.leftSide}>
        <div className="icon">
          <IconButton
            icon="far fa-smile"
            iconColor="#1c9dea"
            backgroundColor="rgba(28,157,234,0.15)"
            backgroundColorHover="#D3D8DB"
            anchorOrigin={customAnchorOrigin}
            transformOrigin={customTransformOrigin}
            
          />
        </div>
        <div className="icon">
          <IconButton
            icon="fas fa-plus"
            iconColor="#1c9dea"
            backgroundColor="rgba(28,157,234,0.15)"
            backgroundColorHover="#D3D8DB"
            anchorOrigin={customAnchorOrigin}
            transformOrigin={customTransformOrigin}
          />
        </div>
      </div>
      <div className={classes.midSide}>Input field</div>
      <div className={classes.rightSide}>
        <div className="icon">
          <IconButton
            icon="fas fa-paper-plane"
            iconColor="white"
            backgroundColor="#1c9dea"
            backgroundColorHover="#1280c1"
            anchorOrigin={customAnchorOrigin}
            transformOrigin={customTransformOrigin}
          />
        </div>
      </div>
    </Box>
  );
}

export default MessageFormFooter;
