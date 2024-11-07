/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Elements/DeleteConfirmation";

const AssignmentsTable = () => {
  const { assignments, setAssignments, setSelectedAssignments } =
    useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(storedAssignments);
  }, []);

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

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Assignments Table</h2>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-dark">
            <th scope="col" className="text-center">
              Employee ID
            </th>
            <th scope="col" className="text-center">
              Project ID
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
              <td className="table-light text-center">{assignment.empNo}</td>
              <td className="table-light text-center">{assignment.projNo}</td>
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
  );
};

export default AssignmentsTable;
