import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../Service/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user,
  isLoading: false,
  isSuccess: false,
  isAuthenticated: false,
  isError: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await AuthService.register(userData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await AuthService.login(userData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (thunkAPI) => {
    try {
      return await AuthService.logout(refreshToken);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.refreshToken();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  //Register
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user || action.payload;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    });

    //login
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuthenticated = true;
      state.user = action.payload.user || action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isAuthenticated = false;
      state.message = action.payload.message;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { reset } = authSlicer.actions;
export default authSlicer.reducer;
