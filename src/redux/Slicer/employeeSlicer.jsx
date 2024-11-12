import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseApi from "../../baseApi";

export const fetchEmployee = createAsyncThunk("fetchEmployee", async () => {
  const response = await baseApi.get("v1/Employees");
  console.log("API response data:", response.data); // Log API response
  return response.data;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchEmployee.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default employeeSlice.reducer;
