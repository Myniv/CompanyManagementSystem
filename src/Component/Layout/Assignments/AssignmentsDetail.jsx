/* eslint-disable react-hooks/exhaustive-deps */
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
    <div className="">
      <h2 className="ms-5">Work History</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3 border">
              <h4 className="m-2">Employee Detail</h4>
              <p className="m-2">
                <strong>Employee ID:</strong> {employee?.empNo || "null"}
              </p>
              <p className="m-2">
                <strong>Employee Department ID:</strong>{" "}
                {employee?.deptNo || "null"}
              </p>
              <p className="m-2">
                <strong>Employee Name:</strong>{" "}
                {employee ? `${employee.fName} ${employee.lName}` : "null"}
              </p>
              <p className="m-2">
                <strong>Employee Position:</strong>{" "}
                {employee?.position || "null"}
              </p>
            </div>
            <div className="mb-3 border">
              <h4 className="m-2">Assignment Detail</h4>
              <p className="m-2">
                <strong>Date Started:</strong>{" "}
                {assignmentDetail?.dateWorked || "null"}
              </p>
              <p className="m-2">
                <strong>Hours Worked:</strong>{" "}
                {assignmentDetail?.hoursWorked || "null"}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 border">
              <h4 className="m-2">Project Detail</h4>
              <p className="m-2">
                <strong>Project ID:</strong> {project?.projNo || "null"}
              </p>
              <p className="m-2">
                <strong>Project Department ID:</strong>
                {project?.deptNo || "null"}
              </p>
              <p className="m-2">
                <strong>Project Name:</strong> {project?.projName || "null"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsDetail;
