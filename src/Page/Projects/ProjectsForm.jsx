/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowLoading from "../../Component/Elements/ShowLoading";
import { useSelector } from "react-redux";
import baseApi from "../../baseApi";
import DangerButton from "../../Component/Elements/DangerButton";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import Projectservice from "../../Service/ProjectService";

const ProjectsForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const departments = useSelector((state) => state.department);
  // const projects = useSelector((state) => state.project);

  const [projects, setProjects] = useState([]);

  const [errorAPI, setErrorAPI] = useState("");

  const [formData, setFormData] = useState({
    projno: "",
    projname: "",
    deptno: "",
  });

  useEffect(() => {
    if (params.id) {
      Projectservice.getProjectsiId(params.id)
        .then((response) => {
          console.log(response);
          setProjects(response);
          setFormData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // const findProject = projects.data.find(
      //   (project) => Number(project.projno) === Number(params.id)
      // );
      // setFormData(findProject);
    }
  }, [params.id]);

  const onAddProject = () => {
    const newProject = {
      ...formData,
      projno:
        projects.data.length > 0
          ? projects.data[projects.data.length - 1].projno + 1
          : 1,
    };

    baseApi
      .post("/Projects", newProject)
      .then(() => {
        ShowLoading({
          loadingMessage: "The new project is being added...",
          nextPage: () => navigate("/projects"),
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorAPI(`Failed to add project, please train again later...`);
      });
  };

  const onUpdateProject = () => {
    baseApi
      .put(`/Projects/${params.id}`, formData)
      .then(() => {
        ShowLoading({
          loadingMessage: `The project with id ${params.id} is updating...`,
          nextPage: () => navigate("/projects"),
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorAPI(`Failed to update project, please train again later...`);
      });
  };

  const onCancel = () => {
    setFormData({
      projno: "",
      projname: "",
      deptno: "",
    });
    navigate("/projects");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.projname ||
      formData.projname.length < 2 ||
      formData.projname.length > 100
    ) {
      newErrors.projname = "Project name must be between 2 and 100 characters.";
    }
    if (!formData.deptno) {
      newErrors.deptno = "Department ID is required.";
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
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="ms-5">{params.id ? "Edit Project" : "Add Project"}</h2>
      <div className="container border">
        {errorAPI && <ErrorMessage errorMessage={errorAPI} />}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="projno" className="form-label">
              Project ID
            </label>
            <input
              type="number"
              className="form-control"
              id="projno"
              name="projno"
              value={params.id ? params.id : ""}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="projname" className="form-label">
              Project Name
            </label>
            <input
              type="text"
              id="projname"
              name="projname"
              className={`form-control ${errors.projname ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.projname}
              required
              placeholder="Project Name"
            />
            {errors.projname && (
              <div className="invalid-feedback">{errors.projname}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="deptno" className="form-label">
              Department
            </label>
            <select
              id="deptno"
              name="deptno"
              className={`form-control ${
                errors.department ? "is-invalid" : ""
              }`}
              value={formData.deptno}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.data.map((departments) => (
                <option key={departments.deptno} value={departments.deptno}>
                  {departments.deptname}
                </option>
              ))}
            </select>
            {errors.deptno && (
              <div className="invalid-feedback">{errors.deptno}</div>
            )}
          </div>
          <PrimaryButton
            type={"submit"}
            buttonName={params.id ? "Edit Project" : "Add Project"}
          />
          <DangerButton onClick={onCancel} buttonName="Cancel" />
        </form>
      </div>
    </div>
  );
};

export default ProjectsForm;
