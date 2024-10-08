import { createSlice } from "@reduxjs/toolkit";

const genreData = [];

const genreSlice = createSlice({
  name: "genreSlice",
  initialState: genreData,
  reducers: {
    addGenre(state, action) {
      console.log(state);
      state.push(action.payload);
    },
    deleteGenre(state, action) {
      const delId = action.payload;
      const findId = state.find((current) => current._id === delId);
      const filterOutDeletedObject = state.filter(
        (current) => current._id != delId
      );
      return filterOutDeletedObject;
    },
  },
});
export const GenreSliceACtion = genreSlice.actions;
const GenreSliceReducer = genreSlice.reducer;
export default GenreSliceReducer;
