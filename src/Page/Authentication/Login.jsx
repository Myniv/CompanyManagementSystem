import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShowLoading from "../../Component/Elements/ShowLoading";
import { login, reset } from "../../redux/Slicer/authSlicer";
import LoadingState from "../../Component/Elements/LoadingState";
import LoadingWithErrorMessage from "../../Component/Elements/LoadingWithErrorMessage";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      LoadingWithErrorMessage({
        loadingMessage: "Logging in...",
        errorMessage: "Username or Password is wrong.",
      });
    }
    if (isSuccess || user) {
      ShowLoading({
        loadingMessage: "Logging in...",
        nextPage: () => navigate("/profile"),
      });
      console.log("Success login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isLoading) {
    return (
      <>
        <LoadingState />
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={onChange}
                required
                placeholder="Enter username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default Login;
