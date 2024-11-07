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
        <table className="table table-hover table-bordered ">
          <thead>
            <tr className="table-dark">
              <th scope="col" className="text-center">ID Department</th>
              <th scope="col" className="text-center">Department Name</th>
              <th scope="col" className="text-center">Department Manager</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((departments) => (
              <tr scope="row" key={departments.deptNo}>
                <td className="table-light text-center">{departments.deptNo}</td>
                <td className="table-light text-center">{departments.deptName}</td>
                <td className="table-light text-center">{departments.mgrEmpNo}</td>
                <td className="table-light text-center">
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => onEditDepartments(departments.deptNo)}
                      value={"edit"}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDeleteDepartments(departments.deptNo)}
                      value={"delete"}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <td colSpan="4" className="text-center">
            <div className="d-flex justify-content-end">
              <div className="d-grid col-2">
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
      </div>
    </>
  );
};

export default DepartmentsTable;
