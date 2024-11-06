import { useState, useEffect } from "react";

const EmployeesTable = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, [setEmployees]);

  const onDeleteEmployees = (id) => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const deleteEmployees = storedEmployees.filter((b) => b.id !== id);

    localStorage.setItem("employees", JSON.stringify(deleteEmployees));
    setEmployees(deleteEmployees);
  };

  const onEditingEmployees = (id) => {
    // const selectEmployees = employees.find((employees) => employees.id === id);
    console.log("EditEmployees");
    // navigate(`/employees/${id}`)
  }

  const onAddEmployees = () => {
    console.log("Add Employees");
    // navigate("/employees/new");
  }

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
              <th scope="col">Departmen</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employees) => (
              <tr scope="row" key={employees.id}>
                <td>{employees.id}</td>
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
                      onClick={() => onEditingEmployees(employees.id)}
                      value={"edit"}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteEmployees(employees.id)}
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

export default EmployeesTable
