import axios from "axios";
import { refreshToken, logout } from "./redux/Slicer/authSlicer";
import { store } from "./redux/store";

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        await store.dispatch(refreshToken()).unwrap();
        return baseApi(originalRequest);
      } catch (refreshError) {
        await store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default baseApi;
