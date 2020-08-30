import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { IconButton as LogoButton } from "@material-ui/core";
import logo from "assets/images/logo.png";
import IconButton from "components/IconButton";
import { useHistory } from "react-router-dom";

NavigateBar.propTypes = {};

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
      justifyContent: "center",
      alignContent: "space-between",
      flexWrap: "wrap",
      flexGrow: "1",
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

  const handleClickLogout = () => {
    history.push("/login");
  }

  return (
    <div className={classes.root}>
      <div className="navigateBarHeader">
        <LogoButton>
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
            />
          </div>

          <div className="navigateIcon">
            <IconButton
              icon="fa fa-users"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Contact List"
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
            />
          </div>

          <div className="navigateIcon">
            <IconButton
              icon="fas fa-cog"
              iconColor="#223645"
              backgroundColor="#eff1f2"
              backgroundColorHover="#D3D8DB"
              message="Setting"
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
