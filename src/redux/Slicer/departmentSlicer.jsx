import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../baseApi";

export const fetchDepartment = createAsyncThunk("fetchDepartment", async () => {
  const response = await baseApi.get("/Departements/all");
  return response.data;
});

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDepartment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDepartment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchDepartment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
        ? `Department ${action.error.message}`
        : "Failed to fetch department.";
    });
  },
});

export const { setLoading } = departmentSlice.actions;
export default departmentSlice.reducer;
