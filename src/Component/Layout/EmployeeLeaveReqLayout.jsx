import { useState } from "react";
import { Outlet } from "react-router-dom";

const EmployeesLeaveReqLayout = () => {
  const [fixUpload, setFixUpload] = useState(false);

  return (
    <>
      <Outlet context={{ fixUpload, setFixUpload }} />
    </>
  );
};

export default EmployeesLeaveReqLayout;
