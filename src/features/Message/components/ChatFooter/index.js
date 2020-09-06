import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import IconButton from "custom-fields/IconButton";
import { Formik, Form, FastField } from "formik";
import InputField from "custom-fields/InputField";

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
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    "& .icon": {
      marginLeft: "16px",
    },
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

function ChatFooter(props) {
  const classes = useStyles();

  const handleSubmit = (event) => {
    console.log("submit");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => {
        const { submitForm } = formikProps;
        return (
          <Form>
            <Box className={classes.root}>
              <div className={classes.leftSide}>
                <div className="icon">
                  <FastField
                    name="sticker"
                    component={IconButton}
                    icon="far fa-sticky-note"
                    iconColor="#1c9dea"
                    backgroundColor="rgba(28,157,234,0.15)"
                    backgroundColorHover="#D3D8DB"
                    anchorOrigin={customAnchorOrigin}
                    transformOrigin={customTransformOrigin}
                    message="Choose a sticker"
                  />
                </div>
                <div className="icon">
                  <FastField
                    name="emoji"
                    component={IconButton}
                    icon="far fa-smile"
                    iconColor="#1c9dea"
                    backgroundColor="rgba(28,157,234,0.15)"
                    backgroundColorHover="#D3D8DB"
                    anchorOrigin={customAnchorOrigin}
                    transformOrigin={customTransformOrigin}
                    message="Choose an emoji"
                  />
                </div>
                <div className="icon">
                  <FastField
                    name="attach"
                    component={IconButton}
                    icon="fas fa-paperclip"
                    iconColor="#1c9dea"
                    backgroundColor="rgba(28,157,234,0.15)"
                    backgroundColorHover="#D3D8DB"
                    anchorOrigin={customAnchorOrigin}
                    transformOrigin={customTransformOrigin}
                    message="Attach a file"
                  />
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
