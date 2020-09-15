import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Avatar, Button, Icon } from "@material-ui/core";

SearchResult.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  picture: PropTypes.string,
  sendRequest: PropTypes.bool,
  friend: PropTypes.bool,
};

SearchResult.defaultProps = {
  firstName: "",
  lastName: "",
  picture: "",
  sendRequest: false,
  friend: false,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  info: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& h5": {
      fontSize: "calc(17px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
      fontWeight: "700",
      textTransform: "none",
      color: "#223645",
      margin: "0px 0px 5px 16px",
    },
  },
  option: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  optionButton: {
    color: "#1c9dea",
  },
});

function SearchResult(props) {
  const classes = useStyles();
  const { firstName, lastName, picture, sendRequest, friend } = props;

  const renderOption = () => {
    let content = "Add Friend";
    let icon = <Icon className="fas fa-user-plus" style={{ width: 30, height: 20 }}/>;

    if (friend) {
      content = "Friends";
      icon = <Icon className="fas fa-user-check" style={{ width: 30, height: 20 }} />;
    }
    if (sendRequest) {
      content = "Cancel Request"
      icon = <Icon className="fas fa-user-times" style={{ width: 30, height: 20 }} />;
    }
    return (
      <Button variant="contained" color="secondary" startIcon={icon} className={classes.optionButton} >
        {content}
      </Button>
    );
  };

  return (
    <Grid container className={classes.root}>
      <Grid item sm={7} className={classes.info}>
        <Avatar src={picture} />
        <h5>{firstName + " " + lastName}</h5>
      </Grid>
      <Grid item sm={5} className={classes.option}>
        {renderOption()}
      </Grid>
    </Grid>
  );
}

export default SearchResult;
