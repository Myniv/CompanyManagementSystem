import { useEffect, useState } from "react";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import LoadingState from "../../Component/Elements/LoadingState";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Component/Widgets/Pagination";
import EmployeeService from "../../Service/EmployeeService";

const EmployeesLeaveReqTable = () => {
  const [empReqList, setEmpReqList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting state
  const [sorting, setSorting] = useState({
    key: "processId",
    direction: "asc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    EmployeeService.getEmployeeLeaveReqList()
      .then((res) => {
        const sortedEmpReq = res.data.sort((a, b) => a.processId - b.processId);
        setEmpReqList(sortedEmpReq);
        console.log(sortedEmpReq);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.message);
        console.log(err);
      });
  }, []);

  const handleSort = (key) => {
    const direction =
      sorting.key === key && sorting.direction === "asc" ? "desc" : "asc";
    setSorting({ key, direction });

    const sortedData = [...empReqList].sort((a, b) => {
      const valA = a[key] ? a[key].toString().toLowerCase() : ""; // Normalize strings
      const valB = b[key] ? b[key].toString().toLowerCase() : "";

      if (!isNaN(valA) && !isNaN(valB)) {
        // Numerical sort
        return direction === "asc" ? valA - valB : valB - valA;
      } else {
        // String sort
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
    });

    setEmpReqList(sortedData);
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = empReqList.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(empReqList.length / itemsPerPage);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const countTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    //result in miliseconds
    const differenceInTime = end - start;

    //to convert it into 1 days
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

    return differenceInDays + 1;
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage="Error" />
      ) : (
        <div className="m-4">
          <h2>Book Request List</h2>
          <table className="table table-hover table-bordered table-sm">
            <thead className="thead-dark">
              <tr className="table-dark">
                <th scope="col" onClick={() => handleSort("processId")}>
                  ID
                  {sorting.key === "processId"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("requester")}>
                  Name
                  {sorting.key === "requester"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("type")}>
                  Type
                  {sorting.key === "type"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("reason")}>
                  Reason
                  {sorting.key === "reason"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("startDate")}>
                  Start Date
                  {sorting.key === "startDate"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("endDate")}>
                  End Date
                  {sorting.key === "endDate"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("totalDays")}>
                  Total Days
                  {sorting.key === "totalDays"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("requestDate")}>
                  Submission Date
                  {sorting.key === "requestDate"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col" onClick={() => handleSort("status")}>
                  Status
                  {sorting.key === "status"
                    ? sorting.direction === "asc"
                      ? "⇈"
                      : "⇊"
                    : "⇅"}
                </th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((emp) => (
                <tr scope="row" key={emp.processId}>
                  <td>{emp.processId}</td>
                  <td>{emp.requester || "N/A"}</td>
                  <td>{emp.leaveRequest?.leaveType || "N/A"}</td>
                  <td>{emp.leaveRequest?.leaveReason || "N/A"}</td>
                  <td>{emp.leaveRequest?.startDate || "N/A"}</td>
                  <td>{emp.leaveRequest?.endDate || "N/A"}</td>
                  <td>
                    {countTotalDays(
                      emp.leaveRequest.startDate,
                      emp.leaveRequest.endDate
                    )}
                  </td>
                  <td>{formatDate(emp.requestDate) || "N/A"}</td>
                  <td
                    style={{
                      backgroundColor:
                        emp.status === "Pending"
                          ? "yellow"
                          : emp.status === "Reject"
                          ? "red"
                          : emp.status === "Approved"
                          ? "blue"
                          : "transparent",
                      color:
                        emp.status === "Pending" || emp.status === "Reject"
                          ? "black"
                          : "white",
                    }}
                  >
                    {emp.status}
                  </td>
                  <td>
                    <div className="d-grid gap-2 justify-content-md">
                      <PrimaryButton
                        onClick={() =>
                          navigate(`/leavereqapproval/${emp.processId}`)
                        }
                        buttonName={"View"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeesLeaveReqTable;
