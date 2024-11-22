import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseApi from "../../baseApi";

export const fetchAssignment = createAsyncThunk("fetchAssignment", async () => {
  const response = await baseApi.get("/WorksOn/all");
  return response.data;
});

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssignment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAssignment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAssignment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
        ? `Assignment ${action.error.message}`
        : "Failed to fetch assignment.";
    });
  },
});

export default assignmentSlice.reducer;
