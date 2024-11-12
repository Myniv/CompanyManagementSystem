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
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProject.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default projectSlice.reducer