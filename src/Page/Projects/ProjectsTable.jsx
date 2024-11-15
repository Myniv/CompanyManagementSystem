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

const ProjectsTable = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department);
  const projects = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchProject());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(5);

  const onDeleteProject = (projNo) => {
    const deleteProject = () => {
      baseApi
        .delete(`v1/Projects/${projNo}`)
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

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentPosts = projects.data.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {projects.isLoading ? (
        <LoadingState />
      ) : projects.error ? (
        <ErrorMessage errorMessage={projects.error} />
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
              {currentPosts.map((project) => (
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
          <Pagination
            length={projects.data.length}
            postsPerPage={postsPerPge}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default ProjectsTable;
