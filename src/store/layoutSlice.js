import { createSlice } from "@reduxjs/toolkit";

const layoutData = [];

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState: layoutData,
  reducers: {
    addLayout(state, action) {
      return action.payload;
    },
    deleteLayout(state, action) {
      const delId = action.payload;
      const findId = state.find((current) => current._id === delId);
      const filterOutDeletedObject = state.filter(
        (current) => current._id != delId
      );
      return filterOutDeletedObject;
    },
  },
});
export const layoutSliceACtion = layoutSlice.actions;
const layoutSliceReducer = layoutSlice.reducer;
export default layoutSliceReducer;
