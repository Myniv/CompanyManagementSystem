/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowLoading from "../../Component/Elements/ShowLoading";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import EmployeeService from "../../Service/EmployeeService";
import { fetchDepartment } from "../../redux/Slicer/departmentSlicer";
import LoadingWithErrorMessage from "../../Component/Elements/LoadingWithErrorMessage";
import { fetchEmployee } from "../../redux/Slicer/employeeSlicer";

const EmployeesForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [submit, setSubmit] = useState(false);
  const [errorAPI, setErrorAPI] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const employee = useSelector((state) => state.employee);

  const [isActive, setIsActive] = useState(true);
  const [deactivateReason, setDeactivateReason] = useState("");

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    position: "",
    directSupervisor: null,
    empType: "",
    empLevel: 0,
    empDependents: [
      {
        fname: "",
        lname: "",
        sex: "",
        relation: "",
        birthDate: "",
      },
    ],
    dob: "",
    sex: "",
    ssn: "",
    salary: "",
    deptno: 0,
  });

  useEffect(() => {
    if (params.id) {
      EmployeeService.getEmployeeId(params.id)
        .then((response) => {
          console.log(response.data);
          setFormData(response.data);
          setIsActive(response.data.isActive);
          setDeactivateReason(response.data.deactivateReason);
        })
        .catch((error) => {
          setErrorAPI("Failed to load employee data.");
          console.error(error);
        });
    }
  }, [params.id]);

  console.log(formData);

  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchEmployee());
  }, []);

  useEffect(() => {
    if (submit) {
      if (params.id) {
        onUpdateEmployees();
      } else {
        onAddEmployees();
      }
    }
  }, [submit]);

  const onAddEmployees = () => {
    EmployeeService.addEmployee(formData)
      .then(() => {
        ShowLoading({
          loadingMessage: "The new employees is being added...",
          nextPage: () => navigate("/employees"),
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorAPI(`Failed to add employees, please train again later...`);
      });
  };

  const onUpdateEmployees = () => {
    // baseApi
    //   .put(`/Employees/${params.id}`, formData)
    EmployeeService.updateEmployeeId(params.id, formData)
      .then(() => {
        ShowLoading({
          loadingMessage: `The employees with id ${params.id} is updating...`,
          nextPage: () => navigate("/employees"),
        });
      })
      .catch((err) => {
        console.log(err);
        LoadingWithErrorMessage({
          loadingMessage: `The employees with id ${params.id} is updating...`,
          errorMessage: "Oops, there is an error, please try again later",
        });
      });

    if (!isActive) {
      EmployeeService.updateEmployeeDeactivate(params.id, { deactivateReason })
        .then(() => {
          console.log("Get");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onCancel = () => {
    setFormData({
      empno: "",
      fname: "",
      lname: "",
      address: "",
      dob: "",
      sex: "",
      position: "",
      deptno: "",
    });
    navigate("/employees");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.fname ||
      formData.fname.length < 2 ||
      formData.fname.length > 100
    ) {
      newErrors.fname = "First name must be between 2 and 100 characters.";
    }

    if (
      !formData.lname ||
      formData.lname.length < 2 ||
      formData.lname.length > 100
    ) {
      newErrors.lname = "Last name must be between 2 and 100 characters.";
    }

    if (
      !formData.address ||
      formData.address.length > 200 ||
      formData.address.length < 2
    ) {
      newErrors.address = "Address must be between 2 and 200 characters.";
    }

    const minimumYears = 2006;
    const dob = new Date(formData.dob).getFullYear();

    if (!formData.dob || dob > minimumYears) {
      newErrors.dob = "Date of birth cant exceed of " + minimumYears + ".";
    }

    if (!formData.sex) {
      newErrors.sex = "Gender is required.";
    }
    const phoneRegex = /^[0-9]{10,15}$/;
    if (
      !formData.phoneNumber ||
      (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber))
    ) {
      newErrors.phoneNumber = "Phone number must be between 10 and 15 digits";
    }

    if (!formData.empLevel || (formData < 0 && formData > 6)) {
      newErrors.empLevel = "Employee level just between 1-6.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.id.startsWith("dependent-")) {
      const index = 0;
      const updatedDependents = [...formData.empDependents];
      updatedDependents[index] = {
        ...updatedDependents[index],
        [name]: value,
      };

      setFormData((prevData) => ({
        ...prevData,
        empDependents: updatedDependents,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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

  const employeeId =
    employee.data.length > 0
      ? employee.data[employee.data.length - 1].empno + 1
      : 1;

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

  const handleAddDependent = () => {
    setFormData((prevData) => ({
      ...prevData,
      empDependents: [
        ...prevData.empDependents,
        { fname: "", lname: "", sex: "Male", relation: "", birthDate: "" },
      ],
    }));
  };

  const handleUpdateDependent = (index, field, value) => {
    const updatedDependents = [...formData.empDependents];
    updatedDependents[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      empDependents: updatedDependents,
    }));
  };

  const handleRemoveDependent = (index) => {
    const updatedDependents = formData.empDependents.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      empDependents: updatedDependents,
    }));
  };

  const handleIsActivateChange = (e) => {
    setIsActive(e.target.value);
    console.log(isActive);
    setDeactivateReason("");
  };

  const handleIsActivateInput = (e) => {
    const value = e.target.value;

    if (isActive === "false") {
      setDeactivateReason(value);
    }
  };

  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">
          {params.id
            ? "Form Edit Employees with id" + params.id
            : "Form Add Employees"}
        </h2>
        <div className="container border">
          {errorAPI && <ErrorMessage errorMessage={errorAPI} />}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="empno" className="form-label">
                    ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="empno"
                    name="empno"
                    value={params.id ? params.id : employeeId}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fname" className="form-label">
                    Front Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    className={`form-control ${
                      errors.fname ? "is-invalid" : ""
                    }`}
                    value={formData.fname}
                    onChange={handleChange}
                    required
                    placeholder="Front Name"
                  />
                  {errors.fname && (
                    <div className="invalid-feedback">{errors.fname}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="lname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    className={`form-control ${
                      errors.lname ? "is-invalid" : ""
                    }`}
                    value={formData.lname}
                    onChange={handleChange}
                    required
                    placeholder="Last Name"
                  />
                  {errors.lname && (
                    <div className="invalid-feedback">{errors.lname}</div>
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
                <div className="mb-3">
                  <label htmlFor="emailAddress" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="emailAddress"
                    id="emailAddress"
                    name="emailAddress"
                    className={`form-control ${
                      errors.emailAddress ? "is-invalid" : ""
                    }`}
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                    disabled={params.id}
                  />
                  {errors.emailAddress && (
                    <div className="invalid-feedback">
                      {errors.emailAddress}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Salary
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    required
                    disabled={
                      !(
                        currentUser.roles.includes("HR Manager") ||
                        currentUser.roles.includes("Administrator")
                      )
                    }
                  />
                  {errors.salary && (
                    <div className="invalid-feedback">{errors.salary}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                  />
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="ssn" className="form-label">
                    SSN
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="ssn"
                    name="ssn"
                    value={formData.ssn}
                    placeholder="SSN"
                    onChange={handleChange}
                    required
                    disabled={
                      !(
                        currentUser.roles.includes("HR Manager") ||
                        currentUser.roles.includes("Administrator")
                      )
                    }
                  />
                  {errors.ssn && (
                    <div className="invalid-feedback">{errors.ssn}</div>
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
                      value="Male"
                      onChange={handleChange}
                      checked={formData.sex === "Male"}
                    />
                    <label htmlFor="sex1" className="form-check-label ms-2">
                      Male
                    </label>

                    <input
                      type="radio"
                      id="sex2"
                      name="sex"
                      className={`form-check-input ms-2`}
                      value="Female"
                      onChange={handleChange}
                      checked={formData.sex === "Female"}
                    />
                    <label htmlFor="sex2" className="form-check-label ms-2">
                      Female
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
                    <label htmlFor="deptno" className="form-label">
                      Department
                    </label>
                    <select
                      id="deptno"
                      name="deptno"
                      className={`form-select ${
                        errors.department ? "is-invalid" : ""
                      }`}
                      value={formData.deptno}
                      onChange={handleChange}
                      required
                    >
                      <option value="0" disabled>
                        Select Department
                      </option>
                      {department.data.map((department) => (
                        <option
                          key={department.deptno}
                          value={department.deptno}
                        >
                          {department.deptname}
                        </option>
                      ))}
                    </select>
                    {errors.deptno && (
                      <div className="invalid-feedback">{errors.deptno}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="directSupervisor" className="form-label">
                      Direct Supervisor
                    </label>
                    <select
                      id="directSupervisor"
                      name="directSupervisor"
                      className={`form-select ${
                        errors.directSupervisor ? "is-invalid" : ""
                      }`}
                      value={formData.directSupervisor}
                      onChange={handleChange}
                      required
                    >
                      <option value={null}>Select Direct Supervisor</option>
                      {employee.data.map((employee) => (
                        <option key={employee.empno} value={employee.empno}>
                          {employee.fname} {employee.lname}
                        </option>
                      ))}
                    </select>
                    {errors.deptno && (
                      <div className="invalid-feedback">{errors.deptno}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="empType" className="form-label">
                      Employee Type
                    </label>
                    <select
                      id="empType"
                      name="empType"
                      className={`form-select ${
                        errors.department ? "is-invalid" : ""
                      }`}
                      value={formData.empType}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Employee Type
                      </option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="empLevel" className="form-label">
                      Employee Level
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="empLevel"
                      name="empLevel"
                      value={formData.empLevel}
                      placeholder="Employee Level"
                      onChange={handleChange}
                      required
                    />
                    {errors.empLevel && (
                      <div className="invalid-feedback">{errors.empLevel}</div>
                    )}
                  </div>
                  {params.id ? (
                    <>
                      <label htmlFor="isActive" className="form-label">
                        Is Employe Active
                      </label>
                      <div className="input-group w-auto">
                        <select
                          id="isActive"
                          name="isActive"
                          className="form-select"
                          value={isActive}
                          onChange={handleIsActivateChange}
                        >
                          <option value="true">Employee Active </option>
                          <option value="false">Employee Inactive</option>
                        </select>

                        <input
                          placeholder="Deactivate Reason"
                          type="text"
                          className="form-control"
                          onChange={handleIsActivateInput}
                          value={deactivateReason}
                          required={isActive === "false"}
                          disabled={isActive === "true"}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <h5>Dependents</h5>
              {formData.empDependents?.map((dependent, index) => (
                <div className="border p-3 mb-3" key={index}>
                  <div className="mb-3">
                    <label
                      htmlFor={`dependent-fname-${index}`}
                      className="form-label"
                    >
                      Dependent First Name
                    </label>
                    <input
                      type="text"
                      id={`dependent-fname-${index}`}
                      name="fname"
                      className="form-control"
                      value={dependent.fname}
                      onChange={(e) =>
                        handleUpdateDependent(index, "fname", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`dependent-lname-${index}`}
                      className="form-label"
                    >
                      Dependent Last Name
                    </label>
                    <input
                      type="text"
                      id={`dependent-lname-${index}`}
                      name="lname"
                      className="form-control"
                      value={dependent.lname}
                      onChange={(e) =>
                        handleUpdateDependent(index, "lname", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`dependent-sex-${index}`}
                      className="form-label"
                    >
                      Dependent Gender
                    </label>
                    <select
                      id={`dependent-sex-${index}`}
                      name={`dependent-fname-${index}`}
                      className={`form-select ${
                        errors.department ? "is-invalid" : ""
                      }`}
                      value={dependent.sex || ""}
                      onChange={(e) =>
                        handleUpdateDependent(index, "sex", e.target.value)
                      }
                      required
                    >
                      <option value="" selected disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`dependent-relation-${index}`}
                      className="form-label"
                    >
                      Relation
                    </label>
                    <input
                      type="text"
                      id={`dependent-relation-${index}`}
                      name="relation"
                      className="form-control"
                      value={dependent.relation}
                      onChange={(e) =>
                        handleUpdateDependent(index, "relation", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`dependent-birthdate-${index}`}
                      className="form-label"
                    >
                      Birth Date
                    </label>
                    <input
                      type="date"
                      id={`dependent-birthdate-${index}`}
                      name="birthDate"
                      className="form-control"
                      value={dependent.birthDate}
                      onChange={(e) =>
                        handleUpdateDependent(
                          index,
                          "birthDate",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveDependent(index)}
                  >
                    Remove Dependent
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddDependent}
              >
                Add Dependent
              </button>
            </div>
            <PrimaryButton
              type={"submit"}
              buttonName={params.id ? "Edit Employees" : "Add Employees"}
            />
            <DangerButton
              onClick={onCancel}
              buttonName={params.id ? "Cancel Edit" : "Cancel Add"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeesForm;
