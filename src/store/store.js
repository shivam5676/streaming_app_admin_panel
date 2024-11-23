import { configureStore } from "@reduxjs/toolkit";
import sliderSliceReducer from "./sliderSlice";
import layoutSliceReducer from "./layoutSlice";
import movieSliceReducer from "./movieSlice";
import GenreSliceReducer from "./genreSlice";
import languageSliceReducer from "./languageSlice";
import loginSliceReducer from "./loginSlice";
import themeSliceReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    sliderData: sliderSliceReducer,
    layOutData: layoutSliceReducer,
    movieData: movieSliceReducer,
    genreData: GenreSliceReducer,
    languageData: languageSliceReducer,
    loginData: loginSliceReducer,
    theme: themeSliceReducer,
  },
});
export default store;
