import { createSlice } from "@reduxjs/toolkit";
import { ALL_MESSAGE_OPTION } from "constants/index";

const initialState = {
  currentGroupChatId: "",
  currentGroupChatName: "",
  currentGroupChatPicture: "",
  showChatForm: false,
  loadingMessageList: false,
  selectedOption: ALL_MESSAGE_OPTION,
  numberOfFriendRequest: 0,
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
    resetMessage: (state, action) => (
      initialState
    ),
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
} = actions;
export default reducer;
