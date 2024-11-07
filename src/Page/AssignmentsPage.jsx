import { useState } from "react";
import { Outlet } from "react-router-dom";

const AssignmentPage = () => {
  const [assignments, setAssignments] = useState([]);

  return (
    <>
      <Outlet context={{ assignments, setAssignments }} />
    </>
  );
};

export default AssignmentPage;
