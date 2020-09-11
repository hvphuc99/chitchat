import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageList: [],
  currentGroupChatId: "",
  currentGroupChatName: "",
  showChatForm: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    setMessageList: (state, action) => {
      state.messageList = action.payload;
    },
    addMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    clearMessageList: (state, action) => {
      state.messageList = [];
    },
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
  },
});

const { reducer, actions } = messageSlice;
export const {
  setMessageList,
  addMessage,
  clearMessageList,
  setCurrentGroupChatId,
  removeCurrentGroupChatId,
  setCurrentGroupChatName,
  removeCurrentGroupChatName,
  setShowChatForm,
} = actions;
export default reducer;
