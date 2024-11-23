import { createSlice } from "@reduxjs/toolkit";
const selectedTheme = {themeMode:false, SelectedTheme: "default" };
const themeSlice = createSlice({
  name: "Theme slice",
  initialState: selectedTheme,
  reducers: {
    changeTheme(state, action) {
      (state.SelectedTheme = action.payload);
    },
    themeMode(state, action){
       state.themeMode=!state.themeMode
    }
  },
});

export const themeSliceAction=themeSlice.actions
const themeSliceReducer=themeSlice.reducer
export default themeSliceReducer
