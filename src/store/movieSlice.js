import { createSlice } from "@reduxjs/toolkit";

const moviesData = [];

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: moviesData,
  reducers: {
    addMovie(state, action) {
      return action.payload;
    },
    deleteMovie(state, action) {
      const delId = action.payload;
      console.log(action.payload, "...>");
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
