import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notifyReducer from "./notifySlice";
import messageReducer from "features/Message/messageSlice";

const rootReducer = {
  user: userReducer,
  notify: notifyReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: rootReducer
});

export default store;