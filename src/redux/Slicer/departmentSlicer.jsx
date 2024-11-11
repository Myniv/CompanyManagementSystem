import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDepartment = createAsyncThunk("fetchDepartment", async () => {
  const response = await axios.get("http://localhost:5184/api/v1/Departements");
  return response.data;
});

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDepartment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDepartment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDepartment.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default departmentSlice.reducer;
