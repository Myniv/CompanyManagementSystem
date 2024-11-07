/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Elements/DeleteConfirmation";

const DepartmentsTable = () => {
  const { departments, setDepartments } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedDepartments =
      JSON.parse(localStorage.getItem("departments")) || [];
    setDepartments(storedDepartments);
  }, []);

  const onDeleteDepartments = (deptNo) => {
    const deleteDepartments = () => {
      const storedDepartments =
        JSON.parse(localStorage.getItem("departments")) || [];
      const deleteDepartments = storedDepartments.filter(
        (b) => b.deptNo !== deptNo
      );

      localStorage.setItem("departments", JSON.stringify(deleteDepartments));
      setDepartments(deleteDepartments);
    };
    DeleteConfirmation({ deleteData: () => deleteDepartments() });
  };

  const onEditDepartments = (deptNo) => {
    navigate(`/departments/${deptNo}`);
  };

  const onAddDepartments = () => {
    navigate(`/departments/new`);
  };

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Departments Table</h2>
        </div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID Department</th>
              <th scope="col">Department Name</th>
              <th scope="col">Department Manager</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((departments) => (
              <tr scope="row" key={departments.deptNo}>
                <td>{departments.deptNo}</td>
                <td>{departments.deptName}</td>
                <td>{departments.mgrEmpNo}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex justify-content-md">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => onEditDepartments(departments.deptNo)}
                      value={"edit"}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteDepartments(departments.deptNo)}
                      value={"delete"}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">
                <div className="d-flex justify-content-end">
                  <div className="d-grid gap-2 col-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm btn-block"
                      onClick={onAddDepartments}
                    >
                      Add Departments
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

export default DepartmentsTable;
