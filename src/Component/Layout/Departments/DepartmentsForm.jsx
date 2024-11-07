/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ShowLoading from "../../Elements/ShowLoading";

const DepartmentsForm = () => {
  const { departments, setDepartments } = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    deptNo: "",
    deptName: "",
    mgrEmpNo: "",
  });

  //
  useEffect(() => {
    if (!departments) {
      const storedDepartments =
        JSON.parse(localStorage.getItem("departments")) || [];
      setDepartments(storedDepartments);
    }

    if (params.id) {
      const findDepartment = departments.find(
        (department) => department.deptNo === Number(params.id)
      );
      setFormData(findDepartment);
    }
  }, [departments, params.id]);

  const onAddDepartment = () => {
    const newDepartmentId = {
      ...formData,
      deptNo:
        departments.length > 0
          ? departments[departments.length - 1].deptNo + 1
          : 1,
    };

    const newDepartments = [...departments, newDepartmentId];
    localStorage.setItem("departments", JSON.stringify(newDepartments));
    setDepartments(newDepartments);

    ShowLoading({
      loadingMessage: "The new department is being added...",
      nextPage: () => navigate("/departments"),
    });
  };

  const onUpdateDepartment = () => {
    const editingDepartments = departments.map((department) => {
      if (department.deptNo === formData.deptNo) {
        return { ...department, ...formData };
      } else {
        return department;
      }
    });

    setDepartments(editingDepartments);
    localStorage.setItem("departments", JSON.stringify(editingDepartments));

    ShowLoading({
      loadingMessage: `The department with id ${params.id} is updating...`,
      nextPage: () => navigate("/departments"),
    });
  };

  const onCancel = () => {
    setFormData({
      deptNo: "",
      deptName: "",
      mgrEmpNo: "",
    });
    navigate("/departments");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.deptName ||
      formData.deptName.length < 2 ||
      formData.deptName.length > 100
    ) {
      newErrors.deptName =
        "Department name must be between 2 and 100 characters.";
    }
    if (!formData.mgrEmpNo) {
      newErrors.mgrEmpNo = "Manager Employee Number is required.";
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
      if (params.id) {
        onUpdateDepartment();
      } else {
        onAddDepartment();
      }
      setFormData({
        deptNo: "",
        deptName: "",
        mgrEmpNo: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const departmentId =
    departments.length > 0 ? departments[departments.length - 1].deptNo + 1 : 1;

  return (
    <div className="mb-5">
      <h2 className="ms-5">
        {params.id ? "Edit Department" : "Add Department"}
      </h2>
      <div className="container border">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="deptNo" className="form-label">
              Department ID
            </label>
            <input
              type="number"
              className="form-control"
              id="deptNo"
              name="deptNo"
              value={params.id ? params.id : departmentId}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deptName" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              id="deptName"
              name="deptName"
              className={`form-control ${errors.deptName ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.deptName}
              required
              placeholder="Department Name"
            />
            {errors.deptName && (
              <div className="invalid-feedback">{errors.deptName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="mgrEmpNo" className="form-label">
              Manager Employee Number
            </label>
            <input
              type="number"
              id="mgrEmpNo"
              name="mgrEmpNo"
              className={`form-control ${errors.mgrEmpNo ? "is-invalid" : ""}`}
              value={formData.mgrEmpNo}
              onChange={handleChange}
              required
              placeholder="Manager Employee Number"
            />
            {errors.mgrEmpNo && (
              <div className="invalid-feedback">{errors.mgrEmpNo}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary m-1">
            {params.id ? "Edit Department" : "Add Department"}
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
  );
};

export default DepartmentsForm;
