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
import AssignmentService from "../../Service/AssignmentService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

const fetchAssignmentService = async ({ pageNumber, perPage }) => {
  const { data } = await AssignmentService.getAllAssignmentsPagination(
    pageNumber,
    perPage
  );
  console.log(data);
  return data;
};

const AssignmentsTablePaginationServer = () => {
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  console.log(currentUser.role);

  const dispatch = useDispatch();

  const [assignment, setAssignment] = useState([]);
  //   const assignment = useSelector((state) => state.assignment);
  const project = useSelector((state) => state.project);
  const employee = useSelector((state) => state.employee);
  useEffect(() => {
    // dispatch(fetchAssignment());
    dispatch(fetchProject());
    dispatch(fetchEmployee());
  }, []);

  //-------------Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["assignments", pageNumber, perPage],
    queryFn: () =>
      fetchAssignmentService({ pageNumber: pageNumber, perPage: perPage }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.total / perPage));
    }
  }, [data, perPage, pageNumber]);

  const handlePageSizeChange = (event) => {
    // setPageSize(event.target.value);
    setPageNumber(event.selected + 1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(e.target.value);
  };
  //---------------Pagination

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

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
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
              {data.data.map((assignment) => (
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
                      ) : currentUser.role.includes("Department Manager") ? (
                        <>
                          <SecondaryButton
                            onClick={() =>
                              onDetailAssignment(
                                assignment.empno,
                                assignment.projno
                              )
                            }
                            buttonName="Detail"
                          />
                          <PrimaryButton
                            onClick={() =>
                              onEditAssignment(
                                assignment.projno,
                                assignment.empno
                              )
                            }
                            buttonName="Edit"
                          />
                        </>
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
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value="3">3</option>
                <option value="6">6</option>
              </select>
            </div>
            <ReactPaginate
              previousLabel={
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  aria-label="Previous"
                  disabled={pageNumber === 1}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              }
              nextLabel={
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  aria-label="Next"
                  disabled={pageNumber === pageCount}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              }
              pageClassName="btn-dark"
              pageLinkClassName="btn btn-outline-dark"
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageSizeChange}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentsTablePaginationServer;
