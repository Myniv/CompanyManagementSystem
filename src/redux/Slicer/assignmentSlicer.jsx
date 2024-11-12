import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseApi from "../../baseApi";

export const fetchAssignment = createAsyncThunk("fetchAssignment", async () => {
  const response = await baseApi.get("v1/Worksons");
  return response.data;
});

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssignment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAssignment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAssignment.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default assignmentSlice.reducer;
