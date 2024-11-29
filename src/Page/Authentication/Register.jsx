import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingWithErrorMessage from "../../Component/Elements/LoadingWithErrorMessage";
import { register } from "../../redux/Slicer/authSlicer";
import LoadingState from "../../Component/Elements/LoadingState";
import ShowLoading from "../../Component/Elements/ShowLoading";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: "",
    email: "",
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const focusNameInput = useRef(null);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    return newErrors;
  };

  useEffect(() => {
    if (isError) {
      // alert(message);
      LoadingWithErrorMessage({
        loadingMessage: "Registering...",
        errorMessage: message,
      });
    }
    if (isSuccess) {
      ShowLoading({
        loadingMessage: "Logging in...",
        nextPage: () => navigate("/"),
      });
    }
  });

  const onCancel = () => {
    setFormData({
      userName: "",
      password: "",
      role: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(register(formData));
      console.log("Submit");
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const role = [
    "Administrator",
    "HR Manager",
    "Department Manager",
    "Employee Supervisor",
    "Employee",
  ];

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="mb-5">
          <h2 className="ms-5">Register</h2>
          <div className="container border">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  ref={focusNameInput}
                  required
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                />
                {errors.userName && (
                  <div className="invalid-feedback">{errors.userName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Select Role
                </label>
                <select
                  id="role"
                  name="role"
                  className={`form-control ${errors.role ? "is-invalid" : ""}`}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Role
                  </option>

                  {role.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <div className="invalid-feedback">{errors.mgrempno}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary m-1">
                Register
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="btn btn-danger m-1"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterUser;
