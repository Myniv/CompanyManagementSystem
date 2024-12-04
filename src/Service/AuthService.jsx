import baseApi from "../baseApi";

const register = async (userData) => {
  const response = await baseApi.post("/Auth/register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await baseApi.post("/Auth/login", userData);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  await baseApi.post("Auth/logout");
  localStorage.removeItem("user");
};

const refreshToken = async () => {
  const response = await baseApi.post("/Auth/refresh-token");
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

const AuthService = {
  register,
  login,
  logout,
  refreshToken,
};

export default AuthService;
