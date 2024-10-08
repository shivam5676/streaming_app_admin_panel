import { createSlice } from "@reduxjs/toolkit";

const languageData = [];

const languageSlice = createSlice({
  name: "languageSlice",
  initialState: languageData,
  reducers: {
    addLanguage(state, action) {
      console.log(state);
      state.push(action.payload);
    },
    deleteLanguage(state, action) {
      const delId = action.payload;
      const findId = state.find((current) => current._id === delId);
      const filterOutDeletedObject = state.filter(
        (current) => current._id != delId
      );
      return filterOutDeletedObject;
    },
  },
});
export const languageSliceACtion = languageSlice.actions;
const languageSliceReducer = languageSlice.reducer;
export default languageSliceReducer;
