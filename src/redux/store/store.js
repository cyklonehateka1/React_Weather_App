import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../slices/weatherSlices";
import cityReducer from "../slices/citySlices";
const store = configureStore({
  reducer: {
    city: cityReducer,
    weather: weatherReducer,
  },
});

export default store;
