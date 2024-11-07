/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ShowLoading from "../../Elements/ShowLoading";

const EmployeesForm = () => {
  const { employees, setEmployees } = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();

  const [department, setDepartment] = useState([]);

  const [formData, setFormData] = useState({
    empNo: "",
    fName: "",
    lName: "",
    address: "",
    dob: "",
    sex: "",
    position: "",
    deptNo: "",
  });

  useEffect(() => {
    if (!employees) {
      const storedEmployees =
        JSON.parse(localStorage.getItem("employees")) || [];
      setEmployees(storedEmployees);
    }
    if (params.id) {
      const findEmployees = employees.find(
        (employees) => employees.empNo === Number(params.id)
      );
      setFormData(findEmployees);
    }
    const storedDepartment =
      JSON.parse(localStorage.getItem("departments")) || [];
    setDepartment(storedDepartment);
  }, [employees, params.id]);

  const onAddEmployees = () => {
    const newEmployeesId = {
      ...formData,
      empNo:
        employees.length > 0 ? employees[employees.length - 1].empNo + 1 : 1,
    };

    const newEmployee = [...employees, newEmployeesId];

    localStorage.setItem("employees", JSON.stringify(newEmployee));
    setEmployees(newEmployee);
    ShowLoading({
      loadingMessage: "The new employees is being added...",
      nextPage: () => navigate("/employees"),
    });
  };

  const onUpdateEmployees = () => {
    const editingEmployees = employees.map((employees) => {
      if (employees.empNo === formData.empNo) {
        return {
          ...employees,
          ...formData,
        };
      } else {
        return employees;
      }
    });

    setEmployees(editingEmployees);
    localStorage.setItem("employees", JSON.stringify(editingEmployees));

    ShowLoading({
      loadingMessage: `The employees with id ${params.id} is updating...`,
      nextPage: () => navigate("/employees"),
    });
  };

  const onCancel = () => {
    setFormData({
      empNo: "",
      fName: "",
      lName: "",
      address: "",
      dob: "",
      sex: "",
      position: "",
      deptNo: "",
    });
    navigate("/employees");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.fName ||
      formData.fName.length < 2 ||
      formData.fName.length > 100
    ) {
      newErrors.fName = "First name must be between 2 and 100 characters.";
    }

    if (
      !formData.lName ||
      formData.lName.length < 2 ||
      formData.lName.length > 100
    ) {
      newErrors.lName = "Last name must be between 2 and 100 characters.";
    }

    if (
      !formData.address ||
      formData.address.length > 200 ||
      formData.address.length < 2
    ) {
      newErrors.address =
        "Address must be between 2 and 200 characters.";
    }

    const minimumYears = 2006;
    const dob = new Date(formData.dob).getFullYear();

    if (!formData.dob || dob > minimumYears) {
      newErrors.dob = "Date of birth cant exceed of " + minimumYears + ".";
    }

    if (!formData.sex) {
      newErrors.sex = "Gender is required.";
    }
    if (!formData.position) {
      newErrors.sex = "Position is required.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (params.id) {
        onUpdateEmployees();
      } else {
        onAddEmployees();
      }

      setFormData({
        empNo: "",
        fName: "",
        lName: "",
        address: "",
        dob: "",
        sex: "",
        position: "",
        deptNo: "",
      });

      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const employeeId =
    employees.length > 0 ? employees[employees.length - 1].empNo + 1 : 1;

  const position = [
    "Programmer",
    "Quality Assurance",
    "Sales Consultant",
    "Social Media Specialist",
    "Administratif",
    "Data Entry",
    "Finance Analyst",
    "Accounting",
  ];
  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">
          {params.id
            ? "Form Edit Employees with id" + params.id
            : "Form Add Employees"}
        </h2>
        <div className="container border">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="empNo" className="form-label">
                    ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="empNo"
                    name="empNo"
                    value={params.id ? params.id : employeeId}
                    // value={employeeId}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fName" className="form-label">
                    Front Name
                  </label>
                  <input
                    type="text"
                    id="fName"
                    name="fName"
                    className={`form-control ${
                      errors.fName ? "is-invalid" : ""
                    }`}
                    value={formData.fName}
                    onChange={handleChange}
                    required
                    placeholder="Front Name"
                  />
                  {errors.fName && (
                    <div className="invalid-feedback">{errors.fName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="lName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lName"
                    name="lName"
                    className={`form-control ${
                      errors.lName ? "is-invalid" : ""
                    }`}
                    value={formData.lName}
                    onChange={handleChange}
                    required
                    placeholder="Last Name"
                  />
                  {errors.lName && (
                    <div className="invalid-feedback">{errors.lName}</div>
                  )}
                </div>

                <div className="mb-1">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Address"
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 formcheck">
                  <label className="form-label">Select Gender</label>
                  <div className="mt">
                    <input
                      type="radio"
                      id="sex1"
                      name="sex"
                      className={`form-check-input ${
                        errors.sex ? "is-invalid" : ""
                      }`}
                      value="Laki laki"
                      onChange={handleChange}
                      checked={formData.sex === "Laki laki"}
                    />
                    <label htmlFor="sex1" className="form-check-label ms-2">
                      Laki laki
                    </label>

                    <input
                      type="radio"
                      id="sex2"
                      name="sex"
                      className={`form-check-input ms-2`}
                      value="Perempuan"
                      onChange={handleChange}
                      checked={formData.sex === "Perempuan"}
                    />
                    <label htmlFor="sex2" className="form-check-label ms-2">
                      Perempuan
                    </label>
                    {errors.sex && (
                      <div className="invalid-feedback">{errors.sex}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date Of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className={`form-control ${
                        errors.dob ? "is-invalid" : ""
                      }`}
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      placeholder="DD-MM-YYYY"
                    />
                    {errors.dob && (
                      <div className="invalid-feedback">{errors.dob}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="position" className="form-label">
                      Position
                    </label>
                    <select
                      id="position"
                      name="position"
                      className={`form-control ${
                        errors.position ? "is-invalid" : ""
                      }`}
                      value={formData.position}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Position
                      </option>
                      {position.map((position) => (
                        <option key={position} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                    {errors.position && (
                      <div className="invalid-feedback">{errors.position}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="deptNo" className="form-label">
                      Department
                    </label>
                    <select
                      id="deptNo"
                      name="deptNo"
                      className={`form-control ${
                        errors.department ? "is-invalid" : ""
                      }`}
                      value={formData.deptNo}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {department.map((department) => (
                        <option
                          key={department.deptNo}
                          value={department.deptNo}
                        >
                          {department.deptName}
                        </option>
                      ))}
                    </select>
                    {errors.deptNo && (
                      <div className="invalid-feedback">{errors.deptNo}</div>
                    )}
                  </div>

                  {/* <div className="mb-3">
                    <label htmlFor="deptNo" className="form-label">
                      Department
                    </label>
                    <input
                      type="number"
                      id="deptNo"
                      name="deptNo"
                      className={`form-control ${
                        errors.department ? "is-invalid" : ""
                      }`}
                      value={formData.deptNo}
                      onChange={handleChange}
                      placeholder="Department Number"
                      required
                    />
                    {errors.deptNo && (
                      <div className="invalid-feedback">{errors.deptNo}</div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary m-1 right text-right"
            >
              {params.id ? "Edit Employees" : "Add Employees"}
            </button>

            <button
              type="submit"
              onClick={onCancel}
              className="btn btn-danger right text-right"
            >
              {params.id ? "Cancel Edit" : "Cancel Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeesForm;
