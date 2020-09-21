import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  token: cookies.get("token", { path: "/" }),
  currentUserId: localStorage.getItem("userId"),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      cookies.set("token", action.payload, { path: "/" });
    },
    removeToken: (state, action) => {
      state.token = "";
      cookies.remove("token", { path: "/" });
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    removeCurrentUserId: (state, action) => {
      state.currentUserId = "";
      localStorage.removeItem("userId");
    },
  },
});

const { reducer, actions } = userSlice;
export const {
  setToken,
  removeToken,
  setCurrentUserId,
  removeCurrentUserId,
} = actions;
export default reducer;
