import { createSlice } from "@reduxjs/toolkit";
const loginState = { loggedIn: false };
const loginSlice = createSlice({
  name: "login slice",
  initialState: loginState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
    },
    logOut(state, action) {
      state.loggedIn = false;
    },
  },
});
const loginSliceReducer=loginSlice.reducer
export const loginSliceAction=loginSlice.actions
export default loginSliceReducer

