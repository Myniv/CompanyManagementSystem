/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ShowLoading from "../../Elements/ShowLoading";

const AssignmentsForm = () => {
  const { assignments, setAssignments } = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    assNo: "",
    empNo: "",
    projNo: "",
    dateWorked: "",
    hoursWorked: "",
  });

  useEffect(() => {
    if (!assignments) {
      const storedAssignments =
        JSON.parse(localStorage.getItem("assignments")) || [];
      setAssignments(storedAssignments);
    }
    if (params.id) {
      const foundAssignment = assignments.find(
        (assignment) => assignment.assNo === Number(params.id)
      );
      if (foundAssignment) {
        setFormData(foundAssignment);
      }
    }
  }, [assignments, params.id]);

  const onAddAssignment = () => {
    const newAssignmentId = {
      ...formData,
      assNo:
        assignments.length > 0
          ? assignments[assignments.length - 1].assNo + 1
          : 1,
    };

    const newAssignments = [...assignments, newAssignmentId];
    localStorage.setItem("assignments", JSON.stringify(newAssignments));
    setAssignments(newAssignments);

    ShowLoading({
      loadingMessage: "The new assignment is being added...",
      nextPage: () => navigate("/assignments"),
    });
  };

  const onUpdateAssignment = () => {
    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.assNo === formData.assNo) {
        return { ...assignment, ...formData };
      } else {
        return assignment;
      }
    });

    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));

    ShowLoading({
      loadingMessage: `The assignment with id ${params.id} is updating...`,
      nextPage: () => navigate("/assignments"),
    });
  };

  const onCancel = () => {
    setFormData({
      assNo: "",
      empNo: "",
      projNo: "",
      dateWorked: "",
      hoursWorked: "",
    });
    navigate("/assignments");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.empNo) {
      newErrors.empNo = "Employee ID is required.";
    }
    if (!formData.projNo) {
      newErrors.projNo = "Project ID is required.";
    }
    if (!formData.dateWorked) {
      newErrors.dateWorked = "Date Worked is required.";
    }
    if (!formData.hoursWorked || formData.hoursWorked <= 0) {
      newErrors.hoursWorked = "Hours Worked must be a positive number.";
    }
    return newErrors;
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
      if (params.id) {
        onUpdateAssignment();
      } else {
        onAddAssignment();
      }
      setFormData({
        empNo: "",
        projNo: "",
        dateWorked: "",
        hoursWorked: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const assignmentId =
    assignments.length > 0 ? assignments[assignments.length - 1].assNo + 1 : 1;

  return (
    <div className="mb-5">
      <h2 className="ms-5">
        {params.id ? `Edit Assignment with ID ${params.id}` : "Add Assignment"}
      </h2>
      <div className="container border">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="assNo" className="form-label">
              Assignment ID
            </label>
            <input
              type="number"
              className={`form-control ${errors.assNo ? "is-invalid" : ""}`}
              id="assNo"
              name="assNo"
              value={params.id ? params.id : assignmentId}
              onChange={handleChange}
              required
              disabled
            />
            {errors.empNo && (
              <div className="invalid-feedback">{errors.assNo}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="empNo" className="form-label">
              Employee ID
            </label>
            <input
              type="text"
              className={`form-control ${errors.empNo ? "is-invalid" : ""}`}
              id="empNo"
              name="empNo"
              value={formData.empNo}
              onChange={handleChange}
              required
            />
            {errors.empNo && (
              <div className="invalid-feedback">{errors.empNo}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="projNo" className="form-label">
              Project ID
            </label>
            <input
              type="text"
              className={`form-control ${errors.projNo ? "is-invalid" : ""}`}
              id="projNo"
              name="projNo"
              value={formData.projNo}
              onChange={handleChange}
              required
            />
            {errors.projNo && (
              <div className="invalid-feedback">{errors.projNo}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dateWorked" className="form-label">
              Date Worked
            </label>
            <input
              type="date"
              className={`form-control ${
                errors.dateWorked ? "is-invalid" : ""
              }`}
              id="dateWorked"
              name="dateWorked"
              value={formData.dateWorked}
              onChange={handleChange}
              required
            />
            {errors.dateWorked && (
              <div className="invalid-feedback">{errors.dateWorked}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="hoursWorked" className="form-label">
              Hours Worked
            </label>
            <input
              type="number"
              className={`form-control ${
                errors.hoursWorked ? "is-invalid" : ""
              }`}
              id="hoursWorked"
              name="hoursWorked"
              value={formData.hoursWorked}
              onChange={handleChange}
              required
              min="1"
            />
            {errors.hoursWorked && (
              <div className="invalid-feedback">{errors.hoursWorked}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary m-1">
            {params.id ? "Update Assignment" : "Add Assignment"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-danger m-1"
          >
            {params.id ? "Cancel Edit" : "Cancel Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentsForm;
