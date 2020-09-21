import React, { useRef, useState } from "react";
import {
  Box,
  Icon,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
  withStyles,
} from "@material-ui/core";
import IconButton from "custom-fields/IconButton";
import { Formik, Form, FastField } from "formik";
import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import { Picker } from "emoji-mart";
import Sticker from "../Sticker";
import storageApi from "api/storageApi";

ChatFooter.propTypes = {
  onSubmit: PropTypes.func,
  onSendPhoto: PropTypes.func,
  onSendOtherFile: PropTypes.func,
};

ChatFooter.defaultProps = {
  onSubmit: null,
  onSendPhoto: null,
  onSendOtherFile: null,
};

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
    alignItems: "center",
    "& .icon": {
      marginRight: "16px",
    },
  },
  midSide: {
    flexGrow: "1",
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    "& .icon": {
      marginLeft: "16px",
    },
  },
  viewInput: {
    display: "none",
  },
});

const customAnchorOrigin = {
  vertical: "top",
  horizontal: "center",
};

const customTransformOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

const initialValues = {
  message: "",
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
      vertical: "top",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    {...props}
  />
));

function ChatFooter(props) {
  const classes = useStyles();
  const { onSubmit, onSendPhoto, onSendOtherFile } = props;
  const [showEmoji, setShowEmoji] = useState(null);
  const [showMoreOption, setShowMoreOption] = useState(null);
  const [showSticker, setShowSticker] = useState(null);
  const refInputPhoto = useRef();
  const refInputOtherFile = useRef();

  const handleClickEmoji = (event) => {
    setShowEmoji(event.currentTarget);
  };

  const handleCloseEmoji = () => {
    setShowEmoji(null);
  };

  const handleClickMoreOption = (event) => {
    setShowMoreOption(event.currentTarget);
  };

  const closeMoreOption = () => {
    setShowMoreOption(null);
  };

  const handleClickSticker = (event) => {
    setShowSticker(event.currentTarget);
  };

  const handleCloseSticker = () => {
    setShowSticker(null);
  };

  const onChoosePhoto = (event) => {
    closeMoreOption();
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      storageApi.uploadPhoto(image).then((url) => {
        onSendPhoto(url);
      })
    } else {
      // Do nothing
    }
  }

  const onChooseOtherFile = (event) => {
    closeMoreOption();
    if (event.target.files && event.target.files[0]) {
      const otherFile = event.target.files[0];
      storageApi.uploadOtherFile(otherFile).then((url) => {
        onSendOtherFile(url);
      })
    } else {
      // Do nothing
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => {
        const { submitForm } = formikProps;
        const handleSelectEmoji = (emoji) => {
          formikProps.setFieldValue(
            "message",
            formikProps.values.message + emoji.native
          );
        };
        return (
          <Form>
            <Box className={classes.root}>
              <div className={classes.leftSide}>
                <div className="icon">
                  <IconButton
                    icon="far fa-sticky-note"
                    iconColor="#1c9dea"
                    backgroundColor="rgba(28,157,234,0.15)"
                    backgroundColorHover="#D3D8DB"
                    anchorOrigin={customAnchorOrigin}
                    transformOrigin={customTransformOrigin}
                    message="Choose a sticker"
                    onClick={handleClickSticker}
                  />
                  <Popover
                    open={Boolean(showSticker)}
                    anchorEl={showSticker}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    onClose={handleCloseSticker}
                  >
                    <Sticker />
                  </Popover>
                </div>
                <div className="icon">
                  <IconButton
                    icon="far fa-smile"
                    iconColor="#1c9dea"
                    backgroundColor="rgba(28,157,234,0.15)"
                    backgroundColorHover="#D3D8DB"
                    anchorOrigin={customAnchorOrigin}
                    transformOrigin={customTransformOrigin}
                    message="Choose an emoji"
                    onClick={handleClickEmoji}
                  />
                  <Popover
                    open={Boolean(showEmoji)}
                    anchorEl={showEmoji}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    onClose={handleCloseEmoji}
                  >
                    <Picker
                      set="twitter"
                      title="Pick your emoji"
                      emoji="point_up"
                      onSelect={handleSelectEmoji}
                    />
                  </Popover>
                </div>
                <div className="icon">
                  <IconButton
                    icon="fas fa-plus"
                    iconColor="#1c9dea"
                    backgroundColor="rgba(28,157,234,0.15)"
                    backgroundColorHover="#D3D8DB"
                    anchorOrigin={customAnchorOrigin}
                    transformOrigin={customTransformOrigin}
                    message="Open more option"
                    onClick={handleClickMoreOption}
                  />
                  <StyledMenu
                    anchorEl={showMoreOption}
                    keepMounted
                    open={Boolean(showMoreOption)}
                    onClose={closeMoreOption}
                  >
                    <MenuItem onClick={() => refInputPhoto.current.click()}>
                      <ListItemIcon>
                        <Icon
                          className="fas fa-image"
                          style={{ color: "#1c9dea" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Attach a photo" />
                    </MenuItem>
                    <input
                      ref={refInputPhoto}
                      accept="image/*"
                      type="file"
                      className={classes.viewInput}
                      onChange={onChoosePhoto}
                    />
                    <MenuItem onClick={() => refInputOtherFile.current.click()}>
                      <ListItemIcon>
                        <Icon
                          className="fas fa-paperclip"
                          style={{ color: "#1c9dea" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Attach a file" />
                    </MenuItem>
                    <input
                      ref={refInputOtherFile}
                      accept="*"
                      type="file"
                      className={classes.viewInput}
                      onChange={onChooseOtherFile}
                    />
                  </StyledMenu>
                </div>
              </div>

              <div className={classes.midSide}>
                <FastField
                  name="message"
                  component={InputField}
                  placeholder="Write your message..."
                  variant="outlined"
                  margin="none"
                  autoComplete="off"
                  autoFocus={true}
                />
              </div>
              <div className={classes.rightSide}>
                <div className="icon">
                  <FastField
                    name="plus"
                    component={IconButton}
                    icon="fas fa-paper-plane"
                    iconColor="white"
                    backgroundColor="#1c9dea"
                    backgroundColorHover="#1280c1"
                    anchorOrigin={customAnchorOrigin}
                    transformOrigin={customTransformOrigin}
                    message="Send your message"
                    onClick={submitForm}
                  />
                </div>
              </div>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ChatFooter;
