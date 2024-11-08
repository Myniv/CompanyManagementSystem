/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ShowLoading from "../../Component/Elements/ShowLoading";

const ProjectsForm = () => {
  const { projects, setProjects } = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();

  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    projNo: "",
    projName: "",
    deptNo: "",
  });

  useEffect(() => {
    if (!projects) {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      setProjects(storedProjects);
    }

    if (params.id) {
      const findProject = projects.find(
        (project) => project.projNo === Number(params.id)
      );
      setFormData(findProject);
    }
    const storedDepartment =
      JSON.parse(localStorage.getItem("departments")) || [];
    setDepartments(storedDepartment);
  }, [projects, params.id]);

  const onAddProject = () => {
    const newProject = {
      ...formData,
      projNo:
        projects.length > 0 ? projects[projects.length - 1].projNo + 1 : 1,
    };

    const newProjects = [...projects, newProject];
    localStorage.setItem("projects", JSON.stringify(newProjects));
    setProjects(newProjects);

    ShowLoading({
      loadingMessage: "The new project is being added...",
      nextPage: () => navigate("/projects"),
    });
  };

  const onUpdateProject = () => {
    const updatedProjects = projects.map((project) => {
      if (project.projNo === formData.projNo) {
        return { ...project, ...formData };
      } else {
        return project;
      }
    });

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    ShowLoading({
      loadingMessage: `The project with id ${params.id} is updating...`,
      nextPage: () => navigate("/projects"),
    });
  };

  const onCancel = () => {
    setFormData({
      projNo: "",
      projName: "",
      deptNo: "",
    });
    navigate("/projects");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.projName ||
      formData.projName.length < 2 ||
      formData.projName.length > 100
    ) {
      newErrors.projName = "Project name must be between 2 and 100 characters.";
    }
    if (!formData.deptNo) {
      newErrors.deptNo = "Department ID is required.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (params.id) {
        onUpdateProject();
      } else {
        onAddProject();
      }
      setFormData({
        projNo: "",
        projName: "",
        deptNo: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const projectId =
    projects.length > 0 ? projects[projects.length - 1].projNo + 1 : 1;

  return (
    <div className="mb-5">
      <h2 className="ms-5">{params.id ? "Edit Project" : "Add Project"}</h2>
      <div className="container border">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="projNo" className="form-label">
              Project ID
            </label>
            <input
              type="number"
              className="form-control"
              id="projNo"
              name="projNo"
              value={params.id ? params.id : projectId}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="projName" className="form-label">
              Project Name
            </label>
            <input
              type="text"
              id="projName"
              name="projName"
              className={`form-control ${errors.projName ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.projName}
              required
              placeholder="Project Name"
            />
            {errors.projName && (
              <div className="invalid-feedback">{errors.projName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="deptNo" className="form-label">
              Department
            </label>
            <select
              id="deptNo"
              name="deptNo"
              className={`form-control ${
                errors.department ? "is-invalid" : ""
              }`}
              value={formData.deptNo}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((departments) => (
                <option key={departments.deptNo} value={departments.deptNo}>
                  {departments.deptName}
                </option>
              ))}
            </select>
            {errors.deptNo && (
              <div className="invalid-feedback">{errors.deptNo}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary m-1">
            {params.id ? "Edit Project" : "Add Project"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-danger m-1"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectsForm;
