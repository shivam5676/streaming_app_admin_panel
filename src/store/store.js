import { configureStore } from "@reduxjs/toolkit";
import sliderSliceReducer from "./sliderSlice";
import layoutSliceReducer from "./layoutSlice";
import movieSliceReducer from "./movieSlice";

const store = configureStore({
  reducer: {
    sliderData: sliderSliceReducer,
    layOutData: layoutSliceReducer,
    movieData: movieSliceReducer,
  },
});
export default store;
