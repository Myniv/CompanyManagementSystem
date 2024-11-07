import { useState } from "react";
import { Outlet } from "react-router-dom";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);

  return (
    <>
      <Outlet context={{ departments, setDepartments }} />
    </>
  );
};
export default DepartmentsPage;
