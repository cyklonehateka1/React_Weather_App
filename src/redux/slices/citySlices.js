import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCityAction = createAsyncThunk(
  "city/fetch",
  async (payload, { rejectWithValuem, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${payload}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
      );
      return data;
    } catch (error) {
      throw new error();
    }
  }
);

const citySlice = createSlice({
  name: "city",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.city = action.payload;
      })
      .addCase(fetchCityAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default citySlice.reducer;
