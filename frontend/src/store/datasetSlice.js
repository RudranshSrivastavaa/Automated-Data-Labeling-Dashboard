import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "dataset/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5010/api/datasets");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch data");
    }
  }
);


const slice = createSlice({
  name: "dataset",
  initialState: {
    data: [],
    stats: {},
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default slice.reducer;
