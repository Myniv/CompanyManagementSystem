/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const AssignmentsDetail = () => {
  const { assignments, selectedAssignments } = useOutletContext();
  const params = useParams();
  const [employee, setEmployee] = useState([]);
  const [project, setProject] = useState([]);
  const [department, setDepartment] = useState([]);
  const [assignmentDetail, setAssignmentDetail] = useState([]);

  useEffect(() => {
    if (params) {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const foundProject = storedProjects.find(
        (proj) => Number(proj.projNo) === Number(params.projId)
      );
      setProject(foundProject);

      const storedEmployees =
        JSON.parse(localStorage.getItem("employees")) || [];
      const foundEmployee = storedEmployees.find(
        (emp) => Number(emp.empNo) === Number(params.empId)
      );
      setEmployee(foundEmployee);

      const foundAssignment = assignments.find(
        (assign) => Number(assign.assNo) === Number(selectedAssignments)
      );
      setAssignmentDetail(foundAssignment);

      const storedDepartment =
      JSON.parse(localStorage.getItem("departments")) || [];
      setDepartment(storedDepartment);
    }
  }, [params]);

  const getDepartmentName = (deptNo) => {
    const foundDepartment = department.find(
      (department) => Number(department.deptNo) === Number(deptNo)
    );

    if (foundDepartment) {
      return foundDepartment.deptName;
    } else {
      return "";
    }
  };

  return (
    <div>
      <h2 className="ms-5">Work History</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3 border">
              <h4 className="m-2">Employee Detail</h4>
              <p className="m-2">
                <strong>Employee ID : </strong> {` ${employee.empNo}`}
              </p>
              <p className="m-2">
                <strong>Employee Name: </strong>
                {employee ? `${employee.fName} ${employee.lName}` : "null"}
              </p>
              <p className="m-2">
                <strong>Employee Department: </strong>
                {getDepartmentName(employee.deptNo)}
              </p>
              <p className="m-2">
                <strong>Employee Position: </strong>
                {employee.position}
              </p>
            </div>
            <div className="mb-3 border">
              <h4 className="m-2">Assignment Detail</h4>
              <p className="m-2">
                <strong>Date Started: </strong>
                {assignmentDetail.dateWorked}
              </p>
              <p className="m-2">
                <strong>Hours Worked: </strong>
                {assignmentDetail.hoursWorked}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 border">
              <h4 className="m-2">Project Detail</h4>
              <p className="m-2">
                <strong>Project ID: </strong> {project.projNo}
              </p>
              <p className="m-2">
                <strong>Project Department: </strong>
                {getDepartmentName(project.deptNo)}
              </p>
              <p className="m-2">
                <strong>Project Name: </strong> {project.projName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsDetail;
