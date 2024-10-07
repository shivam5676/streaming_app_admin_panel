import { createSlice } from "@reduxjs/toolkit";

const moviesData = [];

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: moviesData,
  reducers: {
    addMovie(state, action) {
      console.log(state);
      state.push(action.payload);
    },
    deleteMovie(state, action) {
      const delId = action.payload;
      const findId = state.find((current) => current._id === delId);
      const filterOutDeletedObject = state.filter(
        (current) => current._id != delId
      );
      return filterOutDeletedObject;
    },
  },
});
export const movieSliceACtion = movieSlice.actions;
const movieSliceReducer = movieSlice.reducer;
export default movieSliceReducer;
