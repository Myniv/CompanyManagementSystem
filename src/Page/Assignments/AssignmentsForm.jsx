/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowLoading from "../../Component/Elements/ShowLoading";
import { useSelector } from "react-redux";
import baseApi from "../../baseApi";
import DangerButton from "../../Component/Elements/DangerButton";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import AssignmentService from "../../Service/AssignmentService";

const AssignmentsForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [errorAPI, setErrorAPI] = useState("");

  const [formData, setFormData] = useState({
    assno: "",
    empno: "",
    projno: "",
    dateworked: "",
    hoursworked: "",
  });

  const [assignments, setAssignments] = useState([]);

  // const assignments = useSelector((state) => state.assignment);
  const projects = useSelector((state) => state.project);
  const employees = useSelector((state) => state.employee);

  useEffect(() => {
    if (params.projId && params.empId) {
      AssignmentService.getAssignmentsId(params.projId, params.empId)
        .then((response) => {
          console.log(response);
          setAssignments(response);
          setFormData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.projId, params.empId]);

  const onAddAssignment = () => {
    baseApi
      .post("/WorksOn", formData)
      .then(() => {
        ShowLoading({
          loadingMessage: "The new Assignment is being added...",
          nextPage: () => navigate("/assignments"),
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorAPI(`Failed to add assignment, please train again later...`);
      });
  };

  const onUpdateAssignment = () => {
    baseApi
      .put(`/WorksOn/${params.projId}/${params.empId}`, formData) // Use projId and empId
      .then(() => {
        ShowLoading({
          loadingMessage: `The assignment is updating...`,
          nextPage: () => navigate("/assignments"),
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorAPI(`Failed to update assignment, please train again later...`);
      });
  };

  const onCancel = () => {
    setFormData({
      assno: "",
      empno: "",
      projno: "",
      dateworked: "",
      hoursworked: "",
    });
    navigate("/assignments");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.empno) {
      newErrors.empno = "Employee is required.";
    }
    if (!formData.projno) {
      newErrors.projno = "Project is required.";
    }

    const today = new Date();
    const dateworked = new Date(formData.dateworked);
    if (!formData.dateworked || dateworked > today) {
      newErrors.dateworked = "Date of work cant be exceed todays date.";
    }

    if (!formData.hoursworked || formData.hoursworked < 0) {
      newErrors.hoursworked = "Hours Worked must be a positive number.";
    }

    // const duplicateAssignment = assignments.data.some((assignment) => {
    //   return (
    //     !params.Id &&
    //     !params.empId &&
    //     assignment.empno === formData.empno &&
    //     assignment.projno === formData.projno
    //   );
    // });
    // if (duplicateAssignment) {
    //   newErrors.duplicate =
    //     "An assignment for this employee and project already exists.";
    // }

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
      if (params.empId && params.projId) {
        onUpdateAssignment();
      } else {
        onAddAssignment();
      }
      setFormData({
        empno: "",
        projno: "",
        dateworked: "",
        hoursworked: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const assignmentId =
    assignments.length > 0 ? assignments[assignments.length - 1].assno + 1 : 1;

  return (
    <div className="mb-5">
      <h2 className="ms-5">
        {params.projId && params.empId ? `Edit Assignment` : "Add Assignment"}
      </h2>
      <div className="container border">
        {errorAPI && <ErrorMessage errorMessage={errorAPI} />}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <input
              type="hidden"
              className={`form-control ${errors.assno ? "is-invalid" : ""}`}
              id="assno"
              name="assno"
              value={params.id ? params.id : assignmentId}
              onChange={handleChange}
              required
              disabled
            />
            {errors.empno && (
              <div className="invalid-feedback">{errors.assno}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="empno" className="form-label">
              Employee
            </label>
            <select
              id="empno"
              name="empno"
              className={`form-control ${
                errors.department ? "is-invalid" : ""
              }`}
              value={formData.empno}
              onChange={handleChange}
              disabled={params.empId && params.projId ? true : false}
              required
            >
              <option value="" disabled>
                Select Employee
              </option>
              {employees.data.map((employees) => (
                <option key={employees.empno} value={employees.empno}>
                  {employees.fname} {employees.lname}
                </option>
              ))}
            </select>
            {errors.empno && (
              <div className="invalid-feedback">{errors.empno}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="projno" className="form-label">
              Project
            </label>
            <select
              id="projno"
              name="projno"
              className={`form-control ${
                errors.department ? "is-invalid" : ""
              }`}
              value={formData.projno}
              onChange={handleChange}
              disabled={params.empId && params.projId ? true : false}
              required
            >
              <option value="" disabled>
                Select Project
              </option>
              {projects.data.map((projects) => (
                <option key={projects.projno} value={projects.projno}>
                  {projects.projname}
                </option>
              ))}
            </select>
            {errors.empno && (
              <div className="invalid-feedback">{errors.empno}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dateworked" className="form-label">
              Date Worked
            </label>
            <input
              type="date"
              className={`form-control ${
                errors.dateworked ? "is-invalid" : ""
              }`}
              id="dateworked"
              name="dateworked"
              value={formData.dateworked}
              onChange={handleChange}
              required
            />
            {errors.dateworked && (
              <div className="invalid-feedback">{errors.dateworked}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="hoursworked" className="form-label">
              Hours Worked
            </label>
            <input
              type="number"
              className={`form-control ${
                errors.hoursworked ? "is-invalid" : ""
              }`}
              id="hoursworked"
              name="hoursworked"
              value={formData.hoursworked}
              onChange={handleChange}
              required
              min="1"
            />
            {errors.hoursworked && (
              <div className="invalid-feedback">{errors.hoursworked}</div>
            )}

            {errors.duplicate && (
              <div className="alert alert-danger mt-2" role="alert">
                {errors.duplicate}
              </div>
            )}
          </div>
          <PrimaryButton
            type={"submit"}
            buttonName={
              params.empId && params.projId
                ? "Update Assignment"
                : "Add Assignment"
            }
          />
          <DangerButton
            onClick={onCancel}
            buttonName={
              params.empId && params.projId ? "Cancel Edit" : "Cancel Add"
            }
          />
        </form>
      </div>
    </div>
  );
};

export default AssignmentsForm;
