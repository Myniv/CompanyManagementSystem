import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const AssignmentsDetail = () => {
  const { assignments, selectedAssignments } = useOutletContext();
  const params = useParams();
  const [employee, setEmployee] = useState(null);
  const [project, setProject] = useState(null);
  const [assignmentDetail, setAssignmentDetail] = useState([]);

  useEffect(() => {
    if (params) {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const foundProject = storedProjects.find(
        (proj) => Number(proj.projNo) === Number(params.projId)
      );
      setProject(foundProject || null);

      const storedEmployees =
        JSON.parse(localStorage.getItem("employees")) || [];
      const foundEmployee = storedEmployees.find(
        (emp) => Number(emp.empNo) === Number(params.empId)
      );
      setEmployee(foundEmployee || null);

      const foundAssignment = assignments.find(
        (assign) => Number(assign.assNo) === Number(selectedAssignments)
      );
      setAssignmentDetail(foundAssignment || null);
    }
  }, [params]);

  return (
    <div className="mt-5">
      <h2>Work History</h2>
      <div className="container border">
        <h4>Employee Detail</h4>
        <p>
          <strong>Employee ID:</strong> {employee?.empNo || "N/A"}
        </p>
        <p>
          <strong>Employee Department ID:</strong> {employee?.deptNo || "N/A"}
        </p>
        <p>
          <strong>Employee Name:</strong>{" "}
          {employee ? `${employee.fName} ${employee.lName}` : "N/A"}
        </p>
        <p>
          <strong>Employee Position:</strong> {employee?.position || "N/A"}
        </p>

        <h4>Project Detail</h4>
        <p>
          <strong>Project ID:</strong> {project?.projNo || "N/A"}
        </p>
        <p>
          <strong>Project Department ID:</strong> {project?.deptNo || "N/A"}
        </p>
        <p>
          <strong>Project Name:</strong> {project?.projName || "N/A"}
        </p>

        <h4>Assignment Detail</h4>
        <p>
          <strong>Date Started:</strong> {assignmentDetail?.dateWorked || "N/A"}
        </p>
        <p>
          <strong>Hours Worked:</strong>{" "}
          {assignmentDetail?.hoursWorked || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default AssignmentsDetail;
