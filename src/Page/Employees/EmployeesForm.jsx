/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowLoading from "../../Component/Elements/ShowLoading";
import { useDispatch, useSelector } from "react-redux";
import baseApi from "../../baseApi";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import EmployeeService from "../../Service/EmployeeService";
import { fetchDepartment } from "../../redux/Slicer/departmentSlicer";

const EmployeesForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [submit, setSubmit] = useState(false);
  const [errorAPI, setErrorAPI] = useState("");

  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const employee = useSelector((state) => state.employee);

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
        sex: "Male",
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
        .then((employeeData) => {
          const { empDependents, ...employeeDetails } = employeeData; // Extract empDependents and rest of the employee data
          setFormData({
            ...employeeDetails, // Set other employee fields
            empDependents:
              empDependents.length > 0
                ? empDependents
                : [
                    {
                      fname: "",
                      lname: "",
                      sex: "",
                      relation: "",
                      birthDate: "",
                    },
                  ], // Set dependents if any
          });
        })
        .catch((error) => {
          setErrorAPI("Failed to load employee data.");
          console.error(error);
        });
    }
    // dispatch(fetchDepartment());
  }, [params.id]);

  useEffect(() => {
    dispatch(fetchDepartment());
    // dispatch(fetchEmployee());
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
    baseApi
      .post("/Employees", formData)
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
    baseApi
      .put(`v1/Employees/${params.id}`, formData)
      .then(() => {
        ShowLoading({
          loadingMessage: `The employees with id ${params.id} is updating...`,
          nextPage: () => navigate("/employees"),
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorAPI(`Failed to update employees, please train again later...`);
      });
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
    if (!formData.position) {
      newErrors.sex = "Position is required.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is part of the dependents array
    if (e.target.id.startsWith("dependent-")) {
      const index = 0; // Assuming you are handling the first dependent
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
      // Regular form field updates
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
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
                    placeholder="+62xxxxxxxxx"
                    onChange={handleChange}
                    required
                  />
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
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
                    />
                    {errors.ssn && (
                      <div className="invalid-feedback">{errors.ssn}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <h5>Dependents</h5>
              <div className="border p-3 mb-3">
                <div className="mb-3">
                  <label htmlFor={`dependent-fname`} className="form-label">
                    Dependent First Name
                  </label>
                  <input
                    type="text"
                    id={`dependent-fname`}
                    name="fname"
                    className="form-control"
                    value={formData.empDependents[0].fname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`dependent-lname`} className="form-label">
                    Dependent Last Name
                  </label>
                  <input
                    type="text"
                    id={`dependent-lname`}
                    name="lname"
                    className="form-control"
                    value={formData.empDependents[0].lname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 formcheck">
                  <label className="form-label">Select Gender</label>
                  <div className="mt">
                    <input
                      type="radio"
                      id="sexDependent1"
                      name="sex"
                      className={`form-check-input`}
                      value="Male"
                      onChange={handleChange}
                      checked={formData.empDependents[0].sex === "Male"}
                    />
                    <label
                      htmlFor="sexDependent1"
                      className="form-check-label ms-2"
                    >
                      Male
                    </label>

                    <input
                      type="radio"
                      id="sexDependent2"
                      name="sex"
                      className={`form-check-input ms-2`}
                      value="Female"
                      onChange={handleChange}
                      checked={formData.empDependents[0].sex === "Female"}
                    />
                    <label
                      htmlFor="sexDependent2"
                      className="form-check-label ms-2"
                    >
                      Female
                    </label>
                    {errors.dependentsex && (
                      <div className="invalid-feedback">
                        {errors.dependentsex}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor={`dependent-relation`} className="form-label">
                    Relation
                  </label>
                  <input
                    type="text"
                    id={`dependent-relation`}
                    name="relation"
                    className="form-control"
                    value={formData.empDependents[0].relation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`dependent-birthdate`} className="form-label">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    id={`dependent-birthdate`}
                    name="birthDate"
                    className="form-control"
                    value={formData.empDependents[0].birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
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
