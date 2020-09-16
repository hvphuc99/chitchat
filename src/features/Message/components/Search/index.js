import React from "react";
import {
  Button,
  makeStyles,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useRef } from "react";
import userApi from "api/userApi";
import SearchResult from "../SearchResult";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import * as options from "constants/index";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      position: "absolute",
      top: "10%",
      width: "40%",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "none",
    },
  },
  searchButton: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    height: "50px",
    marginBottom: "30px",
    borderRadius: "30px",
    color: "#1c9dea",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

function Search(props) {
  const classes = useStyles();

  const { currentUserId } = useSelector((state) => state.user);

  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const typingTimeoutRef = useRef(null);

  const handleClickOpenSearchForm = () => {
    setShowSearchForm(true);
  };

  const handleClickCloseSearchForm = () => {
    setShowSearchForm(false);
    setSearchTerm("");
    setUserList([]);
  };

  const handleOnChangeSearchForm = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setUserList([]);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      handleSubmitSearchForm(formValues);
    }, 500);
  };

  const handleClickAddFriend = (userId) => {
    userApi
      .sendFriendRequest(currentUserId, userId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickCancelRequest = (userId) => {
    userApi
      .removeFriendRequest(currentUserId, userId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickAcceptRequest = (senderId) => {
    userApi
      .acceptFriendRequest(currentUserId, senderId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitSearchForm = (formValues) => {
    const { searchTerm } = formValues;
    if (!searchTerm) {
      setUserList([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    userApi.searchUser(searchTerm).then((list) => {
      userApi.getUserInfo(currentUserId).then((userInfo) => {
        const { sendFriendRequests, receiveFriendRequests, friends } = userInfo;
        const newList = list.map((user) => {
          const { id, firstName, lastName, picture } = user;
          let currentOption = options.ADD_FRIEND_OPTION;
          if (id === currentUserId) {
            return {
              id,
              firstName,
              lastName,
              picture,
              self: true,
            };
          }

          for (let userIdKey in sendFriendRequests) {
            const userId = sendFriendRequests[userIdKey].id;
            if (userId === id) {
              currentOption = options.CANCEL_REQUEST_OPTION;
              break;
            }
          }
          for (let userIdKey in receiveFriendRequests) {
            const userId = receiveFriendRequests[userIdKey].id;
            if (userId === id) {
              currentOption = options.ACCEPT_REQUEST_OPTION;
              break;
            }
          }
          for (let userIdKey in friends) {
            const userId = friends[userIdKey];
            if (userId === id) {
              currentOption = options.FRIENDS_OPTION;
              break;
            }
          }
          return {
            id,
            firstName,
            lastName,
            picture,
            currentOption,
          };
        });
        setUserList(newList);
        setLoading(false);
      });
    });
  };

  return (
    <>
      <Button
        className={classes.searchButton}
        variant="contained"
        color="secondary"
        startIcon={<SearchIcon />}
        onClick={handleClickOpenSearchForm}
      >
        Search
      </Button>
      <Dialog
        className={classes.root}
        open={showSearchForm}
        TransitionComponent={Transition}
        onClose={handleClickCloseSearchForm}
      >
        <DialogTitle>
          <TextField
            name="searchTerm"
            placeholder="Search"
            value={searchTerm}
            autoFocus="true"
            autoComplete="off"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleOnChangeSearchForm}
          />
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Loading />
          ) : (
            userList.map(
              ({
                id,
                firstName,
                lastName,
                picture,
                currentOption,
                afterOption,
                self,
              }) => (
                <SearchResult
                  userId={id}
                  firstName={firstName}
                  lastName={lastName}
                  picture={picture}
                  currentOption={currentOption}
                  self={self}
                  handleClickAddFriend={handleClickAddFriend}
                  handleClickCancelRequest={handleClickCancelRequest}
                  handleClickAcceptRequest={handleClickAcceptRequest}
                />
              )
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Search;
