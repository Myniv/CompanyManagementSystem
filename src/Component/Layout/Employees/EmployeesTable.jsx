/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Elements/DeleteConfirmation";

const EmployeesTable = () => {
  const { employees, setEmployees } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
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

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Employees Table</h2>
        </div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Front Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Position</th>
              <th scope="col">Department</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employees) => (
              <tr scope="row" key={employees.empNo}>
                <td>{employees.empNo}</td>
                <td>{employees.fName}</td>
                <td>{employees.lName}</td>
                <td>{employees.address}</td>
                <td>{employees.dob}</td>
                <td>{employees.sex}</td>
                <td>{employees.position}</td>
                <td>{employees.deptNo}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex justify-content-md">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => onEditingEmployees(employees.empNo)}
                      value={"edit"}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteEmployees(employees.empNo)}
                      value={"delete"}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="9">
                <div className="d-flex justify-content-end">
                  <div className="d-grid gap-2 col-1">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm btn-block me-1"
                      onClick={onAddEmployees}
                    >
                      Add Employees
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeesTable;
