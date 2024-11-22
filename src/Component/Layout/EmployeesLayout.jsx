import { useState } from "react";
import { Outlet } from "react-router-dom";

const EmployeesLayout = () => {
  const [employees, setEmployees] = useState(null);

  return (
    <>
      <Outlet context={{ employees, setEmployees }} />
    </>
  );
};

export default EmployeesLayout;
