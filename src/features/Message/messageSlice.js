import { createSlice } from "@reduxjs/toolkit";
import { ALL_MESSAGES_OPTION } from "constants/index";

const initialState = {
  currentGroupChatId: "",
  currentGroupChatName: "",
  currentGroupChatPicture: "",
  showChatForm: false,
  loadingMessageList: false,
  selectedOption: ALL_MESSAGES_OPTION,
  numberOfFriendRequest: 0,
  messageList: [],
  showSearchFormFullScreen: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    setCurrentGroupChatId: (state, action) => {
      state.currentGroupChatId = action.payload;
    },
    removeCurrentGroupChatId: (state, action) => {
      state.currentGroupChatId = "";
    },
    setCurrentGroupChatName: (state, action) => {
      state.currentGroupChatName = action.payload;
    },
    removeCurrentGroupChatName: (state, action) => {
      state.currentGroupChatName = "";
    },
    setShowChatForm: (state, action) => {
      state.showChatForm = action.payload;
    },
    setLoadingMessageList: (state, action) => {
      state.loadingMessageList = action.payload;
    },
    setCurrentGroupChatPicture: (state, action) => {
      state.currentGroupChatPicture = action.payload;
    },
    removeCurrentGroupChatPicture: (state, action) => {
      state.currentGroupChatPicture = "";
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    setNumberOfFriendRequest: (state, action) => {
      state.numberOfFriendRequest = action.payload;
    },
    setMessageList: (state, action) => {
      state.messageList = action.payload;
    },
    addMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    clearMessageList: (state, action) => {
      state.messageList = [];
    },
    resetMessage: (state, action) => initialState,
    setShowSearchFormFullScreen: (state, action) => {
      state.showSearchFormFullScreen = action.payload;
    },
  },
});

const { reducer, actions } = messageSlice;
export const {
  setCurrentGroupChatId,
  removeCurrentGroupChatId,
  setCurrentGroupChatName,
  removeCurrentGroupChatName,
  setShowChatForm,
  setLoadingMessageList,
  setCurrentGroupChatPicture,
  removeCurrentGroupChatPicture,
  setSelectedOption,
  resetMessage,
  setNumberOfFriendRequest,
  setMessageList,
  addMessage,
  clearMessageList,
  setShowSearchFormFullScreen,
} = actions;
export default reducer;
