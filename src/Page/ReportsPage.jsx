import ReportsWithDate from "../Component/Widgets/ReportsWithDate";
import { Tab, Tabs } from "react-bootstrap";
import ReportsWithoutDate from "../Component/Widgets/ReportsWithoutDate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../redux/Slicer/departmentSlicer";
import ReportService from "../Service/ReportService";

const ReportsPage = () => {
  const [id, setId] = useState("");
  //   const [hidden, setHidden] = useState(true);

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  useEffect(() => {
    dispatch(fetchDepartment());
  }, []);

  useEffect(() => {
    if (currentUser.roles.includes("Department Manager")) {
      setId(currentUser.employee.deptno);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("ID", id);
    console.log("Current User", currentUser);
  }, [id]);

  //   useEffect(() => {
  //     if (!id) {
  //       setHidden(true);
  //     } else {
  //       setHidden(false);
  //     }
  //   }, []);

  return (
    <>
      <div className="container mt-4">
        <Tabs
          defaultActiveKey="projectReport"
          id="report-tabs"
          className="mb-3"
        >
          <Tab eventKey="projectReport" title="Project Report">
            <h4>Project Report</h4>
            <ReportsWithoutDate
              apiUrl={ReportService.getProjectReport}
              docName="Project Report"
            />
          </Tab>

          {(currentUser.roles.includes("HR Manager") ||
            currentUser.roles.includes("Administrator")) && (
            <Tab eventKey="leaveReport" title="Leave Report">
              <h4>Leave Report</h4>
              <ReportsWithDate
                apiUrl={ReportService.getLeaveReport}
                docName="Leave Report"
              />
            </Tab>
          )}

          {(currentUser.roles.includes("Department Manager") ||
            currentUser.roles.includes("HR Manager") ||
            currentUser.roles.includes("Administrator")) && (
            <Tab eventKey="employeeReport" title="Employee Report">
              <h4>Employee Report</h4>
              <div className="col-md-4 mb-3">
                <label htmlFor="deptno" className="form-label">
                  Select Department
                </label>
                <select
                  id="deptno"
                  name="deptno"
                  className={`form-select`}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  disabled={currentUser.roles.includes("Department Manager")}
                  required
                >
                  <option value="" disabled selected>
                    Select Department
                  </option>
                  {department.data.map((department) => (
                    <option key={department.deptno} value={department.deptno}>
                      {department.deptname}
                    </option>
                  ))}
                </select>
              </div>

              {id && (
                <ReportsWithoutDate
                  apiUrl={() => ReportService.getEmployeeReport(id)}
                  docName="Employee Report"
                />
              )}
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default ReportsPage;
