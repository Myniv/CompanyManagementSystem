import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../redux/Slicer/departmentSlicer";
import { fetchEmployee } from "../redux/Slicer/employeeSlicer";
import { fetchProject } from "../redux/Slicer/projectSlicer";
import { fetchAssignment } from "../redux/Slicer/assignmentSlicer";
import { useEffect, useState } from "react";
import { Card as CardSCript } from "../Component/Elements/Card";
import LoadingState from "../Component/Elements/LoadingState";
import ErrorMessage from "../Component/Elements/ErrorMessage";
import { Card } from "react-bootstrap";
import PieChartScript from "../Component/Widgets/PieChartScript";
import baseApi from "../baseApi";
import BarChartScript from "../Component/Widgets/BarChartScript";
import EmpTopPerformanceTable from "../Component/Widgets/EmpTopPerformanceTable";
import EmployeesLeaveReqTablePaginationServer from "./Employees/EmployeesLeaveReqTablePaginationServer";

const MainPage = () => {
  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const employee = useSelector((state) => state.employee);
  const project = useSelector((state) => state.project);
  const assignment = useSelector((state) => state.assignment);

  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchEmployee());
    dispatch(fetchProject());
    dispatch(fetchAssignment());
    getDashboardData();
  }, [dispatch]);

  useEffect(() => {
    console.log(dashboard);
    console.log(dashboard.empDistribution);
  });

  const getDashboardData = async () => {
    try {
      const res = await baseApi.get("/Company/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(dashboard);
    }
  };
  return (
    <>
      {employee.isLoading &&
      department.isLoading &&
      project.isLoading &&
      assignment.isLoading ? (
        <LoadingState />
      ) : department.error ||
        employee.error ||
        project.error ||
        assignment.error ? (
        <>
          <ErrorMessage errorMessage={department.error} />
          <ErrorMessage errorMessage={employee.error} />
          <ErrorMessage errorMessage={project.error} />
          <ErrorMessage errorMessage={assignment.error} />
        </>
      ) : (
        <div className="container text-center my-4">
          <h2>Welcome to the Company Management</h2>
          <div className="container d-flex justify-content-center">
            <CardSCript
              title={"Department"}
              description={department.data.length}
            />
            <CardSCript title={"Employee"} description={employee.data.length} />
            <CardSCript title={"Project"} description={project.data.length} />
            <CardSCript
              title={"Assignment"}
              description={assignment.data.length}
            />
          </div>
          <div className="row ">
            <div className="col">
              <Card>
                <Card.Header
                  style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                  className="bg-dark text-white p-2 rounded"
                >
                  Employee Distribution
                </Card.Header>
                <Card.Body>
                  <PieChartScript
                    data={dashboard?.empDistribution}
                    name="department"
                    value="empCount"
                  />
                </Card.Body>
              </Card>
            </div>
            <div className="col">
              <Card>
                <Card.Header
                  style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                  className="bg-dark text-white p-2 rounded"
                >
                  Average Salary
                </Card.Header>
                <Card.Body>
                  <BarChartScript
                    data={dashboard?.deptAvgSalary}
                    name="department"
                    value="avgSalary"
                  />
                </Card.Body>
              </Card>
            </div>
            <div className="col">
              <Card>
                <Card.Header
                  style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                  className="bg-dark text-white p-2 rounded"
                >
                  Top Performance Employee
                </Card.Header>
                <Card.Body>
                  <EmpTopPerformanceTable data={dashboard?.empTopPerformance} />
                </Card.Body>
              </Card>
            </div>
          </div>
          <Card className="mt-3">
            <Card.Header
              style={{ fontSize: "1.3rem", fontWeight: "bold" }}
              className="bg-dark text-white p-2 rounded"
            >
              Top Performance Employee
            </Card.Header>
            <Card.Body>
              <EmployeesLeaveReqTablePaginationServer title={true} />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default MainPage;
