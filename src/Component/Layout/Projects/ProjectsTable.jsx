/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Elements/DeleteConfirmation";

const ProjectsTable = () => {
  const { projects, setProjects } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
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

  return (
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
              ID Department
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr scope="row" key={project.projNo}>
              <td className="table-light text-center">{project.projNo}</td>
              <td className="table-light text-center">{project.projName}</td>
              <td className="table-light text-center">{project.deptNo}</td>
              <td className="table-light text-center">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onEditProject(project.projNo)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDeleteProject(project.projNo)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <td colSpan="4" className="text-center">
            <div className="d-flex justify-content-end">
              <div className="d-grid col-2">
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
  );
};

export default ProjectsTable;
