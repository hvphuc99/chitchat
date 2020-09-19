import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { GridList, GridListTile } from "@material-ui/core";

Sticker.propTypes = {};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  listContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "100%",
  },
  iconList: {
    width: 40,
    height: 40,
  },
  gridList: {
    width: "432px",
    height: "335px",
    "& li": {
      textAlign: "center",
      padding: "2px 2px 8px 2px",
      borderRadius: "10px",
      "&:hover": {
        backgroundColor: "#3e4042",
        cursor: "pointer",
      }
    },
    "& img": {
      width: 80,
      height: 80,
    },
  },
}));

function Sticker() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTest = () => {
    let test = [];
    for (let i = 0; i < 30; i++) {
      test = test.concat(
        <GridListTile button>
          <img
            alt="sticker"
            src="https://www.fcbk.su/_data/stickers/tonton_friends/tonton_friends_11.png"
          />
        </GridListTile>
      );
    }
    return test;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            icon={
              <img
                className={classes.iconList}
                alt="sticker"
                src="https://www.fcbk.su/_data/stickers/tonton_friends/tonton_friends_11.png"
              />
            }
            {...a11yProps(0)}
          />
          <Tab
            icon={
              <img
                className={classes.iconList}
                alt="sticker"
                src="https://www.fcbk.su/_data/stickers/speedy_usagyuuun/speedy_usagyuuun_00.png"
              />
            }
            {...a11yProps(0)}
          />
          <Tab
            icon={
              <img
                className={classes.iconList}
                alt="sticker"
                src="https://www.fcbk.su/_data/stickers/brown_and_friends/brown_and_friends_05.png"
              />
            }
            {...a11yProps(0)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.listContainer}>
          <GridList className={classes.gridList} cellHeight={80} cols={4}>
            {renderTest()}
          </GridList>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.listContainer}>
          <GridList className={classes.gridList} cellHeight={80} cols={4}>
            {renderTest()}
          </GridList>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.listContainer}>
          <GridList className={classes.gridList} cellHeight={80} cols={4}>
            {renderTest()}
          </GridList>
        </div>
      </TabPanel>
    </div>
  );
}

export default Sticker;
