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
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Project ID</th>
            <th scope="col">Project Name</th>
            <th scope="col">Department ID</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr scope="row" key={project.projNo}>
              <td>{project.projNo}</td>
              <td>{project.projName}</td>
              <td>{project.deptNo}</td>
              <td>
                <div className="d-grid gap-2 d-md-flex justify-content-md">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onEditProject(project.projNo)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDeleteProject(project.projNo)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <div className="d-flex justify-content-end">
                <div className="d-grid gap-2 col-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-block"
                    onClick={onAddProject}
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
