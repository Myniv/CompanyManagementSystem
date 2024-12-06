import { useEffect, useState } from "react";
import DangerButton from "../../Component/Elements/DangerButton";
import { useSelector } from "react-redux";
import EmployeeService from "../../Service/EmployeeService";
import ShowLoading from "../../Component/Elements/ShowLoading";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoadingWithErrorMessage from "../../Component/Elements/LoadingWithErrorMessage";
import UploadFiles from "./UploadFiles";

const EmployeesLeaveReqForm = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    empno: currentUser.employee.empno,
    startDate: "",
    endDate: "",
    leaveType: "",
    leaveReason: "",
  });

  const { fixUpload, setFixUpload } = useOutletContext();

  const [totalDate, setTotalDate] = useState(0);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.leaveReason ||
      formData.leaveReason.length < 2 ||
      formData.leaveReason.length > 100
    ) {
      newErrors.leaveReason = "Title must be between 2 and 100 characters";
    }

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    console.log(today);

    if (!formData.startDate) {
      newErrors.startDate = "Start Date is required.";
    } else if (formData.startDate < today) {
      newErrors.startDate = "Start Date cannot be in the past.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End Date is required.";
    } else if (formData.endDate < formData.startDate) {
      newErrors.endDate = "End Date cannot be earlier than Start Date.";
    }

    if (totalDate > 2 && !fixUpload) {
      newErrors.fixUpload = "File leave must have been uploaded!";
    }

    return newErrors;
  };

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffInTime = end - start;
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
      setTotalDate(diffInDays);
    } else {
      setTotalDate(0);
    }
  }, [formData.startDate, formData.endDate]);

  const onReqLeave = async () => {
    try {
      await EmployeeService.addLeaveReqEmployee(formData);
      ShowLoading({
        loadingMessage: "Requesting leave...",
        nextPage: () => navigate("/profile"),
      });
      console.log("Request success");
    } catch (error) {
      console.log(error);
      LoadingWithErrorMessage({
        loadingMessage: "Requesting leave....",
        errorMessage: error,
      });
    }
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
      console.log("FormData being sent:", formData);
      onReqLeave();
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const onReset = () => {
    setFormData({
      empno: currentUser.employee.empno,
      startDate: "",
      endDate: "",
      leaveType: "",
      leaveReason: "",
    });
    setFixUpload(false);
  };

  const leaveType = ["Sick Leave", "Annual Leave", "Personal Leave"];

  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">Request Book</h2>
        <div className="container border">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="requester" className="form-label">
                Requester
              </label>
              <input
                type="text"
                id="requester"
                name="requester"
                className={`form-control`}
                value={`${currentUser.employee.fname} ${currentUser.employee.lname}`}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className={`form-control ${
                  errors.startDate ? "is-invalid" : ""
                }`}
                value={formData.startDate}
                onChange={handleChange}
                required
                placeholder="startDate"
              />
              {errors.startDate && (
                <div className="invalid-feedback">{errors.startDate}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
                value={formData.endDate}
                onChange={handleChange}
                required
                placeholder="endDate"
              />
              {errors.endDate && (
                <div className="invalid-feedback">{errors.endDate}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="leaveType" className="form-label">
                Leave Type
              </label>
              <select
                id="leaveType"
                name="leaveType"
                className={`form-control ${
                  errors.leaveType ? "is-invalid" : ""
                }`}
                value={formData.leaveType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Leave Type
                </option>
                {leaveType.map((leaveType) => (
                  <option key={leaveType} value={leaveType}>
                    {leaveType}
                  </option>
                ))}
              </select>
              {errors.position && (
                <div className="invalid-feedback">{errors.position}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="leaveReason" className="form-label">
                Leave Reason
              </label>
              <input
                type="text"
                id="leaveReason"
                name="leaveReason"
                className={`form-control ${
                  errors.leaveReason ? "is-invalid" : ""
                }`}
                value={formData.leaveReason}
                onChange={handleChange}
                required
                placeholder="Leave Reason"
              />
              {errors.leaveReason && (
                <div className="invalid-feedback">{errors.leaveReason}</div>
              )}
            </div>
            {totalDate > 2 && formData.leaveType === "Sick Leave" && (
              <div className="mb-3">
                <UploadFiles />
                {errors.fixUpload && (
                  <div className="text-danger mt-2">{errors.fixUpload}</div>
                )}
              </div>
            )}
            {/* <UploadFiles /> */}
            <button type="submit" className="btn btn-primary m-3 btn-sm">
              Submit
            </button>
            <DangerButton onClick={onReset} buttonName={`Reset`} />
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeesLeaveReqForm;
