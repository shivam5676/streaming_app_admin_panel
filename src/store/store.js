import { configureStore } from "@reduxjs/toolkit";
import sliderSliceReducer from "./sliderSlice";
import layoutSliceReducer from "./layoutSlice";
import movieSliceReducer from "./movieSlice";
import GenreSliceReducer from "./genreSlice";
import languageSliceReducer from "./languageSlice";

const store = configureStore({
  reducer: {
    sliderData: sliderSliceReducer,
    layOutData: layoutSliceReducer,
    movieData: movieSliceReducer,
    genreData: GenreSliceReducer,
    languageData:languageSliceReducer
  },
});
export default store;
