import { createSlice } from "@reduxjs/toolkit";

const sliderData = [];

const sliderSlice = createSlice({
  name: "sliderSlice",
  initialState: sliderData,
  reducers: {
    addSlider(state, action) {
      console.log(state);
      state.push(action.payload);
    },
    deleteSlider(state, action) {
      const delId = action.payload;
      const findId = state.find((current) => current._id === delId);
      const filterOutDeletedObject = state.filter(
        (current) => current._id != delId
      );
      return filterOutDeletedObject;
    },
  },
});
export const sliderSliceACtion = sliderSlice.actions;
const sliderSliceReducer = sliderSlice.reducer;
export default sliderSliceReducer;