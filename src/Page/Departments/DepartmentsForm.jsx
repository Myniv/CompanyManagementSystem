/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowLoading from "../../Component/Elements/ShowLoading";
import { useSelector } from "react-redux";
import baseApi from "../../baseApi";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";

const DepartmentsForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [submit, setSubmit] = useState(false);

  const [formData, setFormData] = useState({
    deptno: "",
    deptname: "",
    mgrempno: null,
  });

  const department = useSelector((state) => state.department);
  const employee = useSelector((state) => state.employee);

  useEffect(() => {
    if (params.id) {
      const findDepartment = department.data.find(
        (department) => Number(department.deptno) === Number(params.id)
      );
      setFormData(findDepartment);
    }
  }, [params.id]);

  useEffect(() => {
    if (submit) {
      if (params.id) {
        onUpdateDepartment();
      } else {
        onAddDepartment();
      }
    }
  });

  const onAddDepartment = () => {
    const newDepartmentId = {
      ...formData,
      deptno:
        department.data.length > 0
          ? department.data[department.data.length - 1].deptno + 1
          : 1,
    };

    baseApi
      .post("v1/Departements", newDepartmentId)
      .then(() => {
        ShowLoading({
          loadingMessage: "The new Department is being added...",
          nextPage: () => navigate("/departments"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onUpdateDepartment = () => {
    baseApi
      .put(`v1/Departements/${params.id}`, formData)
      .then(() => {
        ShowLoading({
          loadingMessage: "The Department is being edited...",
          nextPage: () => navigate("/departments"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setFormData({
      deptno: "",
      deptname: "",
      mgrempno: null,
    });
    navigate("/departments");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.deptname ||
      formData.deptname.length < 2 ||
      formData.deptname.length > 100
    ) {
      newErrors.deptname =
        "Department name must be between 2 and 100 characters.";
    }
    if (
      (formData.mgrempno !== null &&
        department.data.some(
          (departments) =>
            departments.mgrempno === formData.mgrempno && !params.id
        )) ||
      (formData.mgrempno !== null &&
        department.data.some(
          (department) =>
            department.mgrempno === formData.mgrempno &&
            department.deptno !== formData.deptno
        ))
    ) {
      newErrors.mgrempno =
        "Manager Employee must be unique and cant be the same like others.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setSubmit(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const departmentId =
    department.data.length > 0
      ? department.data[department.data.length - 1].deptno + 1
      : 1;

  return (
    <div className="mb-5">
      <h2 className="ms-5">
        {params.id ? "Edit Department" : "Add Department"}
      </h2>
      <div className="container border">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="deptno" className="form-label">
              Department ID
            </label>
            <input
              type="number"
              className="form-control"
              id="deptno"
              name="deptno"
              placeholder={departmentId}
              value={params.id}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deptname" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              id="deptname"
              name="deptname"
              className={`form-control ${errors.deptname ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.deptname}
              required
              placeholder="Department Name"
            />
            {errors.deptname && (
              <div className="invalid-feedback">{errors.deptname}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="deptNo" className="form-label">
              Department Manager
            </label>
            <select
              id="mgrempno"
              name="mgrempno"
              className={`form-control ${errors.mgrempno ? "is-invalid" : ""}`}
              value={formData.mgrempno}
              onChange={handleChange}
            >
              <option value={null} disabled selected>
                Select Department Manager
              </option>

              {employee.data
                .filter((emp) => emp.deptno === formData.deptno)
                .map((employee) => (
                  <option key={employee.empno} value={employee.empno}>
                    {employee.fname} {employee.lname}
                  </option>
                ))}
            </select>
            {errors.mgrempno && (
              <div className="invalid-feedback">{errors.mgrempno}</div>
            )}
          </div>
          <PrimaryButton
            type={"submit"}
            buttonName={params.id ? "Edit Department" : "Add Department"}
          />
          <DangerButton onClick={onCancel} buttonName={"Cancel"} />
        </form>
      </div>
    </div>
  );
};

export default DepartmentsForm;
