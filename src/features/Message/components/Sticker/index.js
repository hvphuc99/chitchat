import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { GridList, GridListTile } from "@material-ui/core";
import stickerApi from "api/stickerApi";
import Loading from "components/Loading";
import messageApi from "api/messageApi";
import { useDispatch, useSelector } from "react-redux";
import * as typeMessages from "constants/typeMessage";
import { addMessage } from "features/Message/messageSlice";
import { SignalCellularNull } from "@material-ui/icons";

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
      },
    },
    "& img": {
      width: 60,
      height: 60,
    },
  },
}));

function Sticker() {
  const classes = useStyles();
  const { currentGroupChatId } = useSelector((state) => state.message);
  const { currentUserId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [speedyUsagyuuun, setSpeedyUsagyuuun] = useState([]);
  const [piyomaru, setPiyomaru] = useState([]);
  const [bluesBear, setBluesBear] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderPiyomaruSticker = () =>
    piyomaru.map((stickerUrl) => {
      const sendSticker = () => {
        dispatch(
          addMessage({
            senderId: currentUserId,
            timestamp: null,
            content: stickerUrl,
            type: typeMessages.STICKER,
          })
        );
        messageApi.sendMessage(
          currentUserId,
          currentGroupChatId,
          stickerUrl,
          typeMessages.STICKER
        );
      };

      return (
        <GridListTile button onClick={sendSticker}>
          <img alt="sticker" src={stickerUrl} />
        </GridListTile>
      );
    });

  const renderSpeedyUsagyuuunSticker = () =>
    speedyUsagyuuun.map((stickerUrl) => {
      const sendSticker = () => {
        dispatch(
          addMessage({
            senderId: currentUserId,
            timestamp: null,
            content: stickerUrl,
            type: typeMessages.STICKER,
          })
        );
        messageApi.sendMessage(
          currentUserId,
          currentGroupChatId,
          stickerUrl,
          typeMessages.STICKER
        );
      };

      return (
        <GridListTile button onClick={sendSticker}>
          <img alt="sticker" src={stickerUrl} />
        </GridListTile>
      );
    });

  const renderBluesBearSticker = () =>
  bluesBear.map((stickerUrl) => {
    const sendSticker = () => {
      dispatch(
        addMessage({
          senderId: currentUserId,
          timestamp: null,
          content: stickerUrl,
          type: typeMessages.STICKER,
        })
      );
      messageApi.sendMessage(
        currentUserId,
        currentGroupChatId,
        stickerUrl,
        typeMessages.STICKER
      );
    };

    return (
      <GridListTile button onClick={sendSticker}>
        <img alt="sticker" src={stickerUrl} />
      </GridListTile>
    );
  });

  useEffect(() => {
    if (value === 0 && piyomaru.length === 0) {
      setLoading(true);
      stickerApi
        .getPiyomaruSticker()
        .then((stickers) => {
          setPiyomaru(stickers);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    if (value === 1 && speedyUsagyuuun.length === 0) {
      setLoading(true);
      stickerApi
        .getSpeedyUsagyuuunSticker()
        .then((stickers) => {
          setSpeedyUsagyuuun(stickers);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    if (value === 2 && bluesBear.length === 0) {
      setLoading(true);
      stickerApi
        .getBluesBearSticker()
        .then((stickers) => {
          setBluesBear(stickers);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [value]);

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
                alt="piyomaru"
                src="https://firebasestorage.googleapis.com/v0/b/chitchat-af3b5.appspot.com/o/stickers%2Fpiyomaru%2Flogo.png?alt=media&token=68e54fba-9260-4a04-b0df-0daa398aabe0"
              />
            }
            {...a11yProps(0)}
          />
          <Tab
            icon={
              <img
                className={classes.iconList}
                alt="speedy usagyuuun"
                src="https://firebasestorage.googleapis.com/v0/b/chitchat-af3b5.appspot.com/o/stickers%2FspeedyUsagyuuun%2Flogo.png?alt=media&token=eb80104d-ad90-4fad-803a-76da6776f48f"
              />
            }
            {...a11yProps(1)}
          />
          <Tab
            icon={
              <img
                className={classes.iconList}
                alt="blues bear"
                src="https://firebasestorage.googleapis.com/v0/b/chitchat-af3b5.appspot.com/o/stickers%2FbluesBear%2Flogo.png?alt=media&token=724de1c3-89f0-47f2-81c6-92bceb3a7573"
              />
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.listContainer}>
          <GridList className={classes.gridList} cellHeight={80} cols={4}>
          {loading ? <Loading /> : renderPiyomaruSticker()}
          </GridList>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.listContainer}>
          <GridList className={classes.gridList} cellHeight={80} cols={4}>
            {loading ? <Loading /> : renderSpeedyUsagyuuunSticker()}
          </GridList>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.listContainer}>
          <GridList className={classes.gridList} cellHeight={80} cols={4}>
            {loading ? <Loading /> : renderBluesBearSticker()}
          </GridList>
        </div>
      </TabPanel>
    </div>
  );
}

export default Sticker;
