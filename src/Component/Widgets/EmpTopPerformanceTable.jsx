import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const EmpTopPerformanceTable = ({ data }) => {
  const [empTopPerformance, setEmpTopPerformance] = useState([]);

  useEffect(() => {
    if (data) {
      setEmpTopPerformance(data);
    }
  }, [data]);

  return (
    <>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {empTopPerformance?.map((emp) => (
            <tr scope="row" key={emp.empno}>
              <td>{emp.empName}</td>
              <td>{emp.totalHoursworked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmpTopPerformanceTable;
