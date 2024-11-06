import { useState } from "react";
import { Outlet } from "react-router-dom";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);

  return (
    <>
      <Outlet context={{ employees, setEmployees }} />
    </>
  );
};

export default EmployeesPage;
