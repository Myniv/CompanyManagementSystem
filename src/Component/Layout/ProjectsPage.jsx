import { useState } from "react";
import { Outlet } from "react-router-dom";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  return (
    <>
      <Outlet context={{ projects, setProjects }} />
    </>
  );
};

export default ProjectsPage;
