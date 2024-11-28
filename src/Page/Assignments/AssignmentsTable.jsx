/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignment } from "../../redux/Slicer/assignmentSlicer";
import { fetchProject } from "../../redux/Slicer/projectSlicer";
import { fetchEmployee } from "../../redux/Slicer/employeeSlicer";
import baseApi from "../../baseApi";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import SecondaryButton from "../../Component/Elements/SecondaryButton";
import LoadingState from "../../Component/Elements/LoadingState";
import Pagination from "../../Component/Widgets/Pagination";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import SuccessMessage2 from "../../Component/Elements/SuccessMessage2";
import ErrorMessage2 from "../../Component/Elements/ErrorMessage2";

const AssignmentsTable = () => {
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  console.log(currentUser.role);

  const dispatch = useDispatch();
  const assignment = useSelector((state) => state.assignment);
  const project = useSelector((state) => state.project);
  const employee = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(fetchAssignment());
    dispatch(fetchProject());
    dispatch(fetchEmployee());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(5);

  const onDeleteAssignment = (projno, empno) => {
    const deleteAssignment = () => {
      baseApi
        .delete(`v1/Worksons/${projno}/${empno}`)
        .then((res) => {
          console.log(res);
          dispatch(fetchAssignment());
          SuccessMessage2("Assignment data has been deleted!");
        })
        .catch((err) => {
          console.log(err);
          ErrorMessage2(
            "Employee data failed to delete, please try again later..."
          );
        });
    };
    DeleteConfirmation(deleteAssignment);
  };

  const onEditAssignment = (projId, empId) => {
    navigate(`/assignments/edit/${projId}/${empId}`);
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

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentPosts = assignment.data.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = (e) => {
    SetPostsPerPage(e.target.value);
  };

  return (
    <>
      {assignment.isLoading ? (
        <LoadingState />
      ) : assignment.error ? (
        <ErrorMessage errorMessage={assignment.error} />
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h2>Assignments Table</h2>
            <PrimaryButton
              onClick={onAddAssignment}
              buttonName={"Add Assignments"}
            />
          </div>
          <table className="table table-hover table-bordered table-sm">
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
              {currentPosts.map((assignment) => (
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
                      {currentUser.role.includes("HR Manager") ? (
                        <SecondaryButton
                          onClick={() =>
                            onDetailAssignment(
                              assignment.empno,
                              assignment.projno
                            )
                          }
                          buttonName="Detail"
                        />
                      ) : (
                        <>
                          <PrimaryButton
                            onClick={() =>
                              onEditAssignment(
                                assignment.projno,
                                assignment.empno
                              )
                            }
                            buttonName="Edit"
                          />
                          <DangerButton
                            onClick={() =>
                              onDeleteAssignment(
                                assignment.projno,
                                assignment.empno
                              )
                            }
                            buttonName="Delete"
                          />
                          <SecondaryButton
                            onClick={() =>
                              onDetailAssignment(
                                assignment.empno,
                                assignment.projno
                              )
                            }
                            buttonName="Detail"
                          />
                        </>
                      )}
                      {/* <PrimaryButton
                        onClick={() =>
                          onEditAssignment(assignment.projno, assignment.empno)
                        }
                        buttonName="Edit"
                      />
                      <DangerButton
                        onClick={() =>
                          onDeleteAssignment(
                            assignment.projno,
                            assignment.empno
                          )
                        }
                        buttonName="Delete"
                      />
                      <SecondaryButton
                        onClick={() =>
                          onDetailAssignment(
                            assignment.empno,
                            assignment.projno
                          )
                        }
                        buttonName="Detail"
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-between">
            <div className="input-group w-auto">
              <select
                className="form-select-sm"
                value={postsPerPge}
                onChange={handlePerPageChange}
              >
                <option value="3">3</option>
                <option value="6">6</option>
              </select>
            </div>
            <Pagination
              length={project.data.length}
              postsPerPage={postsPerPge}
              handlePagination={handlePagination}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentsTable;
