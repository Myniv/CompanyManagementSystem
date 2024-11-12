/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignment } from "../../redux/Slicer/assignmentSlicer";
import { fetchProject } from "../../redux/Slicer/projectSlicer";
import { fetchEmployee } from "../../redux/Slicer/employeeSlicer";

const AssignmentsTable = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const assignment = useSelector((state) => state.assignment);
  const project = useSelector((state) => state.project);
  const employee = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(fetchAssignment());
    dispatch(fetchProject());
    dispatch(fetchEmployee());
  }, []);

  const onDeleteAssignment = (projno, empno) => {
    // const deleteAssignment = () => {
    //   const storedAssignments =
    //     JSON.parse(localStorage.getItem("assignments")) || [];
    //   const updatedAssignments = storedAssignments.filter(
    //     (a) => a.assNo !== assNo
    //   );
    //   localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
    //   setAssignments(updatedAssignments);
    // };
    // DeleteConfirmation({ deleteData: () => deleteAssignment() });
  };

  const onEditAssignment = (assNo) => {
    navigate(`/assignments/${assNo}`);
  };

  const onAddAssignment = () => {
    navigate("/assignments/new");
  };
  const onDetailAssignment = (empId, projId) => {
    navigate(`/assignments/${empId}/${projId}`);
  };

  const getProjectsName = (projno) => {
    const foundProjects = project.data.find(
      (projects) => Number(projects.projno) === Number(projno)
    );

    if (foundProjects) {
      return foundProjects.projname;
    } else {
      return "";
    }
  };

  const getEmployeesName = (empno) => {
    const foundEmployees = employee.data.find(
      (employees) => Number(employees.empno) === Number(empno)
    );

    if (foundEmployees) {
      return <>{`${foundEmployees.fname} ${foundEmployees.lname}`}</>;
    } else {
      return "";
    }
  };

  return (
    <>
      {assignment.isLoading ? (
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
              {assignment.data.map((assignment) => (
                <tr scope="row" key={(assignment.empno, assignment.projno)}>
                  <td className="table-light text-center">
                    {getEmployeesName(assignment.empno)}
                  </td>
                  <td className="table-light text-center">
                    {getProjectsName(assignment.projno)}
                  </td>
                  <td className="table-light text-center">
                    {assignment.dateworked}
                  </td>
                  <td className="table-light text-center">
                    {assignment.hoursworked}
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
                        onClick={() =>
                          onDeleteAssignment(
                            assignment.projno,
                            assignment.empno
                          )
                        }
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() =>
                          onDetailAssignment(
                            assignment.empno,
                            assignment.projno
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
