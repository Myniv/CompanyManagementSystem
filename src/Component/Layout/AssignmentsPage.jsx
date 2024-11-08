import { useState } from "react";
import { Outlet } from "react-router-dom";

const AssignmentPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState(null);

  return (
    <>
      <Outlet
        context={{
          assignments,
          setAssignments,
          selectedAssignments,
          setSelectedAssignments,
        }}
      />
    </>
  );
};

export default AssignmentPage;
