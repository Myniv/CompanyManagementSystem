import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseApi from "../../baseApi";

export const fetchEmployee = createAsyncThunk("fetchEmployee", async () => {
  const response = await baseApi.get("v1/Employees");
  return response.data;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
        ? `Employee ${action.error.message}`
        : "Failed to fetch employee.";
    });
  },
});

export default employeeSlice.reducer;
