/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../redux/Slicer/projectSlicer";
import { fetchDepartment } from "../../redux/Slicer/departmentSlicer";

const ProjectsTable = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department);
  const projects = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchProject());
  }, []);

  const onDeleteProject = (projNo) => {
    const deleteProject = () => {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const updatedProjects = storedProjects.filter(
        (proj) => proj.projNo !== projNo
      );

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    };
    DeleteConfirmation({ deleteData: () => deleteProject() });
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
      {projects.isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <img src="/img/LoadingSpinner.svg" alt="Loading..." />
        </div>
      ) : (
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Projects Table</h2>
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
              {projects.data.map((project) => (
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
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onEditProject(project.projno)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDeleteProject(project.projno)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <td colSpan="4" className="text-center">
                <div className="d-flex justify-content-end">
                  <div className="d-grid col-3">
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={onAddProject}
                    >
                      Add Projects
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

export default ProjectsTable;
