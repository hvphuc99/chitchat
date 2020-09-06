import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  message: "",
};

const notifySlice = createSlice({
  name: "notify123",
  initialState: initialState,
  reducers: {
    setNotify: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearNotify: (state, action) => {
      state.type = "";
      state.message = "";
    },
  },
});

const { reducer, actions } = notifySlice;
export const { setNotify, clearNotify } = actions;
export default reducer;
