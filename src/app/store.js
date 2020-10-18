import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notifyReducer from "./notifySlice";
import messageReducer from "features/Message/messageSlice";
import screenReducer from "./screenSlice";

const rootReducer = {
  user: userReducer,
  notify: notifyReducer,
	message: messageReducer,
	screen: screenReducer,
};

const store = configureStore({
  reducer: rootReducer
});

export default store;