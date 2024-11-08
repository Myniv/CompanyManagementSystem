/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Elements/DeleteConfirmation";

const AssignmentsTable = () => {
  const { assignments, setAssignments, setSelectedAssignments } =
    useOutletContext();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(storedAssignments);

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);

    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const [loading, setLoading] = useState(true);
  const showLoading = () => {
    setTimeout(() => {
      return setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    if (loading) {
      showLoading();
    }
  }, [loading]);

  const onDeleteAssignment = (assNo) => {
    const deleteAssignment = () => {
      const storedAssignments =
        JSON.parse(localStorage.getItem("assignments")) || [];
      const updatedAssignments = storedAssignments.filter(
        (a) => a.assNo !== assNo
      );

      localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
      setAssignments(updatedAssignments);
    };
    DeleteConfirmation({ deleteData: () => deleteAssignment() });
  };

  const onEditAssignment = (assNo) => {
    navigate(`/assignments/${assNo}`);
  };

  const onAddAssignment = () => {
    navigate("/assignments/new");
  };
  const onDetailAssignment = (empId, projId, assNo) => {
    navigate(`/assignments/${empId}/${projId}`);
    setSelectedAssignments(assNo);
  };

  const getProjectsName = (projNo) => {
    const foundProjects = projects.find(
      (projects) => Number(projects.projNo) === Number(projNo)
    );

    if (foundProjects) {
      return foundProjects.projName;
    } else {
      return "";
    }
  };

  const getEmployeesName = (empNo) => {
    const foundEmployees = employees.find(
      (employees) => Number(employees.empNo) === Number(empNo)
    );

    if (foundEmployees) {
      return <>{`${foundEmployees.fName} ${foundEmployees.lName}`}</>;
    } else {
      return "";
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <img src="/img/LoadingSpinner.svg" alt="Loading..." />
        </div>
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Assignments Table</h2>
          </div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col" className="text-center">
                  Employee
                </th>
                <th scope="col" className="text-center">
                  Project
                </th>
                <th scope="col" className="text-center">
                  Date Worked
                </th>
                <th scope="col" className="text-center">
                  Hours Worked
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr scope="row" key={assignment.assNo}>
                  <td className="table-light text-center">
                    {getEmployeesName(assignment.empNo)}
                  </td>
                  <td className="table-light text-center">
                    {getProjectsName(assignment.projNo)}
                  </td>
                  <td className="table-light text-center">
                    {assignment.dateWorked}
                  </td>
                  <td className="table-light text-center">
                    {assignment.hoursWorked}
                  </td>
                  <td className="table-light text-center">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onEditAssignment(assignment.assNo)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDeleteAssignment(assignment.assNo)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() =>
                          onDetailAssignment(
                            assignment.empNo,
                            assignment.projNo,
                            assignment.assNo
                          )
                        }
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <td colSpan="5" className="text-center">
                <div className="d-flex justify-content-end">
                  <div className="d-grid col-3">
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={onAddAssignment}
                    >
                      Add Assignments
                    </button>
                  </div>
                </div>
              </td>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AssignmentsTable;
