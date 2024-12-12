import ReportsWithDate from "../Component/Widgets/ReportsWithDate";
import { Tab, Tabs } from "react-bootstrap";
import ReportsWithoutDate from "../Component/Widgets/ReportsWithoutDate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ReportsPage = () => {
  const [id, setId] = useState("");
  //   const [hidden, setHidden] = useState(true);

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser.roles.includes("Department Manager")) {
      setId(currentUser.employee.empno);
    }
  }, [currentUser]);

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
        <Tabs defaultActiveKey="leaveReport" id="report-tabs" className="mb-3">
          {currentUser.roles.includes("HR Manager") ||
            (currentUser.roles.includes("Administrator") && (
              <Tab eventKey="leaveReport" title="Leave Report">
                <h4>Leave Report</h4>
                <ReportsWithDate apiUrl="http://localhost:5045/api/v1/Company/leave-report-pdf" />
              </Tab>
            ))}

          {currentUser.roles.includes("Department Manager") ||
            currentUser.roles.includes("HR Manager") ||
            (currentUser.roles.includes("Administrator") && (
              <Tab eventKey="employeeReport" title="Employee Report">
                <h4>Employee Report</h4>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Id</label>
                  <input
                    type="number"
                    className="form-control"
                    value={id}
                    disabled={
                      currentUser.roles.includes("Department Manager")
                        ? true
                        : false
                    }
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>

                {id && (
                  <ReportsWithoutDate
                    apiUrl={`http://localhost:5045/api/v1/Employees/report-pdf/${id}`}
                  />
                )}
              </Tab>
            ))}

          <Tab eventKey="projectReport" title="Project Report">
            <h4>Project Report</h4>
            <ReportsWithoutDate apiUrl="http://localhost:5045/api/v1/Projects/report-pdf" />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ReportsPage;
