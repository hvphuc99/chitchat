import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notifyReducer from "./notifySlice";

const rootReducer = {
  user: userReducer,
  notify: notifyReducer,
};

const store = configureStore({
  reducer: rootReducer
});

export default store;