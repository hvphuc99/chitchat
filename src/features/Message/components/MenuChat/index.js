import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Container, List, ListItem } from "@material-ui/core";
import Search from "../Search";
import { useState } from "react";
import ChatBox from "../ChatBox";

MenuChat.propTypes = {
  menu: PropTypes.array,
};

MenuChat.defaultProps = {
  menu: null,
};

const useStyles = makeStyles({
  root: {
    padding: "20px 20px",
    height: "100%",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(28,157,234,0.15)",
    },
    "& .Mui-selected": {
      backgroundColor: "#eff7fe",
      borderLeft: "4px solid #1c9dea",
    },
  },
  messageContainer: {
    margin: "10px 0px"
  },
});

function MenuChat(props) {
  const classes = useStyles();
  const { menu } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickListItem = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Container className={classes.root}>
      <Search />
      <List>
        {menu.map(({ id, name, message, date, active, avatar }) => (
          <ListItem
            className={classes.messageContainer}
            key={id}
            button
            selected={selectedIndex === id}
            onClick={(event) => handleClickListItem(event, id)}
          >
            <ChatBox
              name={name}
              message={message}
              date={date}
              active={active}
              avatar={avatar}
            />
          </ListItem>
        ))}
        {menu.map(({ id, name, message, date, active, avatar }) => (
          <ListItem
            className={classes.messageContainer}
            key={id}
            button
            selected={selectedIndex === id}
            onClick={(event) => handleClickListItem(event, id)}
          >
            <ChatBox
              name={name}
              message={message}
              date={date}
              active={active}
              avatar={avatar}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default MenuChat;