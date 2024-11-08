import { useState } from "react";
import { Outlet } from "react-router-dom";

const DepartmentsLayout = () => {
  const [departments, setDepartments] = useState([]);

  return (
    <>
      <Outlet context={{ departments, setDepartments }} />
    </>
  );
};
export default DepartmentsLayout;
