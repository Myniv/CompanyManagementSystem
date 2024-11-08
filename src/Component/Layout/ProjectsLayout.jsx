import { useState } from "react";
import { Outlet } from "react-router-dom";

const ProjectsLayout = () => {
  const [projects, setProjects] = useState([]);

  return (
    <>
      <Outlet context={{ projects, setProjects }} />
    </>
  );
};

export default ProjectsLayout;
