import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseApi from "../../baseApi";

export const fetchProject = createAsyncThunk("fetchProject", async () => {
  const response = await baseApi.get("v1/Projects");
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.error = action.error.message
        ? `Project ${action.error.message}`
        : "Failed to fetch project.";
    });
  },
});

export default projectSlice.reducer;
