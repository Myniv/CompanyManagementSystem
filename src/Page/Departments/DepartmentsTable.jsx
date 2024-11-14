/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartment,
  setLoading,
} from "../../redux/Slicer/departmentSlicer";
import { fetchEmployee } from "../../redux/Slicer/employeeSlicer";
import baseApi from "../../baseApi";

const DepartmentsTable = () => {
  const [detailDepartment, setDetailDepartment] = useState([]);
  const [show, setShow] = useState(false);
  const [departmentId, setDepartmentId] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const employee = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchEmployee());
  }, []);

  const onDeleteDepartments = (deptno) => {
    const deleteDepartments = () => {
      dispatch(setLoading(true));
      baseApi
        .delete(`v1/Departements/${deptno}`)
        .then((res) => {
          dispatch(fetchDepartment());
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoading(false));
        });
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
    const employeeDepartment = employee.data.filter(
      (emp) => Number(emp.deptno) === Number(deptno)
    );
    setDetailDepartment(employeeDepartment);

    const departmentId = department.data.find(
      (departments) => Number(departments.deptno) === Number(deptno)
    );
    setDepartmentId(departmentId);
    setShow(true);
  };

  const getEmployeesName = (mgrempno) => {
    const foundEmployees = employee.data.find(
      (emp) => Number(emp.empno) === Number(mgrempno)
    );

    if (foundEmployees) {
      return <>{`${foundEmployees.fname} ${foundEmployees.lname}`}</>;
    }
  };

  return (
    <>
      {department.isLoading ? (
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
              {department.data.map((departments) => (
                <tr scope="row" key={departments.deptno}>
                  <td className="table-light text-center">
                    {departments.deptno}
                  </td>
                  <td className="table-light text-center">
                    {departments.deptname}
                  </td>
                  <td className="table-light text-center">
                    {departments.mgrempno
                      ? getEmployeesName(departments.mgrempno)
                      : "N/A"}
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
                <div className="card-header d-flex justify-content-between bg-dark">
                  <h5 className="text-white">
                    Employee Details on {departmentId.deptname}
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
                      {detailDepartment.map((emp) => (
                        <tr key={emp.empno}>
                          <td>{emp.empno}</td>
                          <td>
                            {emp.fname} {emp.lname}
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
