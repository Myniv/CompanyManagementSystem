/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Elements/DeleteConfirmation";

const EmployeesTable = () => {
  const { employees, setEmployees } = useOutletContext();
  const navigate = useNavigate();

  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);

    const storedDepartment =
      JSON.parse(localStorage.getItem("departments")) || [];
      setDepartment(storedDepartment);
  }, []);

  const onDeleteEmployees = (empNo) => {
    const deletedEmployees = () => {
      const storedEmployees =
        JSON.parse(localStorage.getItem("employees")) || [];
      const deleteEmployees = storedEmployees.filter((b) => b.empNo !== empNo);

      localStorage.setItem("employees", JSON.stringify(deleteEmployees));
      setEmployees(deleteEmployees);
    };
    DeleteConfirmation({ deleteData: () => deletedEmployees });
  };

  const onEditingEmployees = (empNo) => {
    // const selectEmployees = employees.find((employees) => employees.id === id);
    console.log("EditEmployees" + empNo);
    navigate(`/employees/${empNo}`);
  };

  const onAddEmployees = () => {
    navigate("/employees/new");
  };

  const getDepartmentName = (deptNo) => {
    const foundDepartment = department.find(
      (department) => Number(department.deptNo) === Number(deptNo)
    );

    if(foundDepartment){
      return foundDepartment.deptName;
    } else {
      return "";
    }

  }

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Employees Table</h2>
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="table-dark">
              <th scope="col" className="text-center">
                ID
              </th>
              <th scope="col" className="text-center">
                Front Name
              </th>
              <th scope="col" className="text-center">
                Last Name
              </th>
              <th scope="col" className="text-center">
                Address
              </th>
              <th scope="col" className="text-center">
                Date of Birth
              </th>
              <th scope="col" className="text-center">
                Gender
              </th>
              <th scope="col" className="text-center">
                Position
              </th>
              <th scope="col" className="text-center">
                Department
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr scope="row" key={employee.empNo}>
                <td className="table-light text-center">{employee.empNo}</td>
                <td className="table-light text-center">{employee.fName}</td>
                <td className="table-light text-center">{employee.lName}</td>
                <td className="table-light text-center">{employee.address}</td>
                <td className="table-light text-center">{employee.dob}</td>
                <td className="table-light text-center">{employee.sex}</td>
                <td className="table-light text-center">{employee.position}</td>
                <td className="table-light text-center">{getDepartmentName(employee.deptNo)}</td>
                <td className="table-light text-center">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => onEditingEmployees(employee.empNo)}
                      value={"edit"}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDeleteEmployees(employee.empNo)}
                      value={"delete"}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <td colSpan="9">
              <div className="d-flex justify-content-end">
                <div className="d-grid gap-2 col-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={onAddEmployees}
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </td>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeesTable;
