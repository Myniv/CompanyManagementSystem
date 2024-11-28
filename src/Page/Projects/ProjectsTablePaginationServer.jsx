/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../redux/Slicer/projectSlicer";
import { fetchDepartment } from "../../redux/Slicer/departmentSlicer";
import LoadingState from "../../Component/Elements/LoadingState";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import Pagination from "../../Component/Widgets/Pagination";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import baseApi from "../../baseApi";
import SuccessMessage2 from "../../Component/Elements/SuccessMessage2";
import ErrorMessage2 from "../../Component/Elements/ErrorMessage2";
import Projectservice from "../../Service/ProjectService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

const fetchProjectService = async ({ pageNumber, perPage }) => {
  const { data } = await Projectservice.getAllProjectsPagination(
    pageNumber,
    perPage
  );
  console.log(data);
  return data;
};

const ProjectsTablePaginationServer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department);
  //   const projects = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(fetchDepartment());
    // dispatch(fetchProject());
  }, []);

  //-------------Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["departments", pageNumber, perPage],
    queryFn: () =>
      fetchProjectService({ pageNumber: pageNumber, perPage: perPage }),
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

  const onDeleteProject = (projNo) => {
    const deleteProject = () => {
      baseApi
        .delete(`/Projects/${projNo}`)
        .then((res) => {
          console.log(res);
          dispatch(fetchProject());
          SuccessMessage2("Project data has been deleted!");
        })
        .catch((err) => {
          console.log(err);
          ErrorMessage2(
            "Project data failed to delete, please try again later..."
          );
        });
    };
    DeleteConfirmation(deleteProject);
  };

  const onEditProject = (projNo) => {
    navigate(`/projects/${projNo}`);
  };

  const onAddProject = () => {
    navigate(`/projects/new`);
  };

  const getDepartmentName = (deptNo) => {
    const foundDepartment = departments.data.find(
      (department) => Number(department.deptno) === Number(deptNo)
    );

    if (foundDepartment) {
      return foundDepartment.deptname;
    } else {
      return "";
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage={isError} />
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h2>Projects Table</h2>
            <PrimaryButton onClick={onAddProject} buttonName={"Add Projects"} />
          </div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col" className="text-center">
                  ID Project
                </th>
                <th scope="col" className="text-center">
                  Project Name
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
              {data.data.map((project) => (
                <tr scope="row" key={project.projno}>
                  <td className="table-light text-center">{project.projno}</td>
                  <td className="table-light text-center">
                    {project.projname}
                  </td>
                  <td className="table-light text-center">
                    {getDepartmentName(project.deptno)}
                  </td>
                  <td className="table-light text-center">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <PrimaryButton
                        onClick={() => onEditProject(project.projno)}
                        buttonName="Edit"
                      />
                      <DangerButton
                        onClick={() => onDeleteProject(project.projno)}
                        buttonName="Delete"
                      />
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

export default ProjectsTablePaginationServer;
