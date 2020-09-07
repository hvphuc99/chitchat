import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  token: cookies.get("token", { path: "/" }),
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
  },
});

const { reducer, actions } = userSlice;
export const { setToken, removeToken } = actions;
export default reducer;
