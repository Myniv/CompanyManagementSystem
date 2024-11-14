import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../baseApi";

export const fetchDepartment = createAsyncThunk("fetchDepartment", async () => {
  const response = await baseApi.get("v1/Departements");
  return response.data;
});

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
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

export const { setLoading } = departmentSlice.actions;
export default departmentSlice.reducer;
