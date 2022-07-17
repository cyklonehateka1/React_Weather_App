import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherAction = createAsyncThunk(
  "weather/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${payload}&lon=${payload}&appid=${process.env.REACT_APP_API_KEY}`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slices

const weatherSlice = createSlice({
  name: "weather",
  initialState: {},
  extraReducers: (builder) => {
    // Pending
    builder
      .addCase(fetchWeatherAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherAction.fulfilled, (state, action) => {
        state.weather = action?.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(fetchWeatherAction.rejected, (state, action) => {
        state.loading = false;
        state.weather = undefined;
        state.error = action?.payload;
      });
  },
});

export default weatherSlice.reducer;
