/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ShowLoading from "../../Elements/ShowLoading";

const EmployeesForm = () => {
  const { employees, setEmployees } = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
  };

  const employeeId =
    employees.length > 0 ? employees[employees.length - 1].empNo + 1 : 1;

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
                    className={`form-control`}
                    value={formData.fName}
                    onChange={handleChange}
                    required
                    placeholder="Front Name"
                    // ref={focusNameInput}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lName"
                    name="lName"
                    className={`form-control`}
                    value={formData.lName}
                    onChange={handleChange}
                    required
                    placeholder="Last Name"
                    // ref={focusNameInput}
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className={`form-control `}
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Address"
                  />
                  {/* {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )} */}
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
                      className={`form-check-input`}
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
                    {/* {errors.gender && (
                      <div className="invalid-feedback">{errors.gender}</div>
                    )} */}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date Of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className={`form-control`}
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      placeholder="DD-MM-YYYY"
                      // ref={focusNameInput}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="position" className="form-label">
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      className={`form-control`}
                      value={formData.position}
                      onChange={handleChange}
                      required
                      placeholder="Position"
                      // ref={focusNameInput}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="deptNo" className="form-label">
                      Department
                    </label>
                    <input
                      type="number"
                      id="deptNo"
                      name="deptNo"
                      className={`form-control`}
                      value={formData.deptNo}
                      onChange={handleChange}
                      placeholder="Department Number"
                      required
                      // ref={focusNameInput}
                    />
                  </div>
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
