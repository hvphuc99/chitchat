import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileScreenSize: "",
};

const screenSlice = createSlice({
  name: "notify",
  initialState: initialState,
  reducers: {
    setMobileScreenSize: (state, action) => {
      state.mobileScreenSize = action.payload;
    },
  },
});

const { reducer, actions } = screenSlice;
export const { setMobileScreenSize } = actions;
export default reducer;
