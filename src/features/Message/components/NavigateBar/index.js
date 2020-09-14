import React from "react";
import { makeStyles } from "@material-ui/core";
import { IconButton as LogoButton } from "@material-ui/core";
import logo from "assets/images/logo.png";
import IconButton from "custom-fields/IconButton";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeToken, removeCurrentUserId } from "app/userSlice";
import userApi from "api/userApi";
import { setNotify } from "app/notifySlice";
import { setShowChatForm, removeCurrentGroupChatId, removeCurrentGroupChatPicture } from "features/Message/messageSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRight: "1px solid #eff1f2",
    padding: "20px 0px",
    "& .navigateBarHeader": {
      display: "flex",
      justifyContent: "center",
      borderBottom: "1px solid #eff1f2",
      paddingBottom: "20px",
    },
    "& .navigateBarContent": {
      display: "flex",
      alignContent: "space-between",
      flexWrap: "wrap",
      flexGrow: "1",
      textAlign: "center",
      padding: "30px 0px",
      "& .navigateBarBody": {
        width: "100%",
        "& .navigateIcon": {
          marginBottom: "40px",
        },
      },
      "& .navigateBarFooter": {
        width: "100%",
        "& .navigateIcon": {
          marginTop: "40px",
        },
      },
    },
  },
});

function NavigateBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    userApi
      .logout()
      .then((res) => {
        dispatch(removeToken());
        dispatch(removeCurrentUserId());
        dispatch(removeCurrentGroupChatPicture());
        dispatch(setShowChatForm(false));
        dispatch(
          setNotify({
            type: "success",
            message: res,
          })
          );
          history.push("/login");
      })
      .catch((err) => {
        dispatch(
          setNotify({
            type: "error",
            message: err,
          })
        );
      });
  };

  const handleClickLogoButton = () => {
    dispatch(setShowChatForm(false));
    history.push("/");
  };

  const handleClickListItem = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <div className="navigateBarHeader">
        <LogoButton onClick={handleClickLogoButton}>
          <img src={logo} alt="logo" />
        </LogoButton>
      </div>

      <div className="navigateBarContent">
        <div className="navigateBarBody">
          <div className="navigateIcon">
            <IconButton
              icon="fas fa-comments"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="All Message"
              selected={selectedIndex === 0}
              onClick={(event) => handleClickListItem(event, 0)}
            />
          </div>

          <div className="navigateIcon">
            <IconButton
              icon="fa fa-users"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Contact List"
              selected={selectedIndex === 1}
              onClick={(event) => handleClickListItem(event, 1)}
            />
          </div>

          <div className="navigateIcon">
            <IconButton
              icon="fa fa-bell"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Notification"
              badgeContent="4"
              selected={selectedIndex === 2}
              onClick={(event) => handleClickListItem(event, 2)}
            />
          </div>

          <div className="navigateIcon">
            <IconButton
              icon="fas fa-cog"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Setting"
              selected={selectedIndex === 3}
              onClick={(event) => handleClickListItem(event, 3)}
            />
          </div>
        </div>

        <div className="navigateBarFooter">
          <div className="navigateIcon">
            <IconButton
              icon="fas fa-power-off"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Log out"
              onClick={handleClickLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigateBar;
