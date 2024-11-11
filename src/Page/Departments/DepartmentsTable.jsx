/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../redux/Slicer/departmentSlicer";

const DepartmentsTable = () => {
  const { departments, setDepartments } = useOutletContext();
  const [employees, setEmployees] = useState([]);
  const [employeesDepartment, setEmployeesDepartment] = useState([]);
  const [show, setShow] = useState(false);
  const [departmentId, setDepartmentId] = useState([]);
  
  const navigate = useNavigate();


  const dispatch = useDispatch();
  const dataDepartment = useSelector((state) => state.department);
  useEffect(() => {
    dispatch(fetchDepartment());
  }, []);
  console.log(dataDepartment);

  const onDeleteDepartments = (deptno) => {
    const deleteDepartments = () => {
      const storedDepartments =
        JSON.parse(localStorage.getItem("departments")) || [];
      const deleteDepartments = storedDepartments.filter(
        (b) => b.deptno !== deptno
      );

      localStorage.setItem("departments", JSON.stringify(deleteDepartments));
      setDepartments(deleteDepartments);
    };
    DeleteConfirmation({ deleteData: () => deleteDepartments() });
  };

  const onEditDepartments = (deptno) => {
    navigate(`/departments/${deptno}`);
  };

  const onAddDepartments = () => {
    navigate(`/departments/new`);
  };

  const onDetailEmployee = (deptno) => {
    const employeeDepartment = employees.filter(
      (emp) => Number(emp.deptno) === Number(deptno)
    );
    setEmployeesDepartment(employeeDepartment);

    const departmentId = departments.find(
      (departments) => Number(departments.deptno) === Number(deptno)
    );
    setDepartmentId(departmentId);
    setShow(true);
  };

  return (
    <>
      {dataDepartment.isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <img src="/img/LoadingSpinner.svg" alt="Loading..." />
        </div>
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Departments Table</h2>
          </div>
          <table className="table table-hover table-bordered ">
            <thead>
              <tr className="table-dark">
                <th scope="col" className="text-center">
                  ID Department
                </th>
                <th scope="col" className="text-center">
                  Department Name
                </th>
                <th scope="col" className="text-center">
                  Department Manager
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataDepartment.data.map((departments) => (
                <tr scope="row" key={departments.deptno}>
                  <td className="table-light text-center">
                    {departments.deptno}
                  </td>
                  <td className="table-light text-center">
                    {departments.deptname}
                  </td>
                  <td className="table-light text-center">
                    {departments.mgrempno}
                  </td>
                  <td className="table-light text-center">
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onEditDepartments(departments.deptno)}
                        value={"edit"}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDeleteDepartments(departments.deptno)}
                        value={"delete"}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => onDetailEmployee(departments.deptno)}
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <td colSpan="4" className="text-center">
              <div className="d-flex justify-content-end">
                <div className="d-grid col-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={onAddDepartments}
                  >
                    Add Departments
                  </button>
                </div>
              </div>
            </td>
          </table>
          {show && (
            <div className="mt-4">
              <div className="card">
                <div
                  className="card-header d-flex justify-content-between bg-dark"
                >
                  <h5 className="text-white">
                    Employee Details on {departmentId.deptName}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShow(false)}
                  ></button>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeesDepartment.map((emp) => (
                        <tr key={emp.empNo}>
                          <td>{emp.empNo}</td>
                          <td>
                            {emp.fName} {emp.lName}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DepartmentsTable;
