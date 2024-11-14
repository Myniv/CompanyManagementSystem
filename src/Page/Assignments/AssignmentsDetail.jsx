/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AssignmentsDetail = () => {
  const params = useParams();
  const [employees, setEmployee] = useState([]);
  const [projects, setProject] = useState([]);
  const [assignments, setAssignment] = useState([]);

  const department = useSelector((state) => state.department);
  const employee = useSelector((state) => state.employee);
  const project = useSelector((state) => state.project);
  const assignment = useSelector((state) => state.assignment);

  useEffect(() => {
    if (params.empId && params.projId) {
      const foundAssignment = assignment.data.find(
        (assignment) =>
          Number(assignment.projno) === Number(params.projId) &&
          Number(assignment.empno) === Number(params.empId)
      );
      setAssignment(foundAssignment);

      const foundProject = project.data.find(
        (proj) => Number(proj.projno) === Number(params.projId)
      );
      setProject(foundProject);

      const foundEmployee = employee.data.find(
        (emp) => Number(emp.empno) === Number(params.empId)
      );
      setEmployee(foundEmployee);
      console.log(employees.deptno);
    }
  }, [params.empId, params.projId]);

  const [loading, setLoading] = useState(true);
  const showLoading = () => {
    setTimeout(() => {
      return setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    if (loading) {
      showLoading();
    }
  }, [loading]);

  const getDepartmentName = (deptNo) => {
    const foundDepartment = department.data.find(
      (department) => Number(department.deptno) === Number(deptNo)
    );

    if (foundDepartment) {
      return foundDepartment.deptname;
    } else {
      return "";
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <img src="/img/LoadingSpinner.svg" alt="Loading..." />
        </div>
      ) : (
        <div>
          <h2 className="ms-5">Work History</h2>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3 border">
                  <h4 className="m-2">Employee Detail</h4>
                  <p className="m-2">
                    <strong>Employee ID : </strong> {` ${employees.empno}`}
                  </p>
                  <p className="m-2">
                    <strong>Employee Name: </strong>
                    {employees
                      ? `${employees.fname} ${employees.lname}`
                      : "null"}
                  </p>
                  <p className="m-2">
                    <strong>Employee Department: </strong>
                    {getDepartmentName(employees.deptno)}
                  </p>
                  <p className="m-2">
                    <strong>Employee Position: </strong>
                    {employees.position}
                  </p>
                </div>
                <div className="mb-3 border">
                  <h4 className="m-2">Assignment Detail</h4>
                  <p className="m-2">
                    <strong>Date Started: </strong>
                    {assignments.dateworked}
                  </p>
                  <p className="m-2">
                    <strong>Hours Worked: </strong>
                    {assignments.hoursworked}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 border">
                  <h4 className="m-2">Project Detail</h4>
                  <p className="m-2">
                    <strong>Project ID: </strong> {projects.projno}
                  </p>
                  <p className="m-2">
                    <strong>Project Department: </strong>
                    {getDepartmentName(projects.deptno)}
                  </p>
                  <p className="m-2">
                    <strong>Project Name: </strong> {projects.projname}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentsDetail;
