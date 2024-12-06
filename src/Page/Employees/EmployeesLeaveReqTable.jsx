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

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const handlePerPageChange = (e) => {
    setItemsPerPage(e.target.value);
  };

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
  }, [setIsLoading]);

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = empReqList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  const onDownloadFile = () => {
    const pdfUrl = "Assignment 7.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalingDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInTime = end - start;
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    return diffInDays;
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage="Error" />
      ) : (
        <div className="m-4">
          <h2>Leave Request List</h2>
          <table className="table table-hover table-bordered table-sm">
            <thead className="thead-dark">
              <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Reason</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Total Days</th>
                <th scope="col">Submission Date</th>
                <th scope="col">Status</th>
                <th scope="col">File</th>
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
                          : emp.status === "Rejected"
                          ? "red"
                          : emp.status === "Approved"
                          ? "green"
                          : "transparent",
                      color:
                        emp.status === "Pending" || emp.status === "Rejected"
                          ? "black"
                          : "white",
                    }}
                  >
                    {emp.status}
                  </td>
                  <td>
                    {" "}
                    {totalingDate(
                      emp.leaveRequest.startDate,
                      emp.leaveRequest.endDate
                    ) > 2 && emp.leaveRequest.leaveType === "Sick Leave" ? (
                      <PrimaryButton
                        onClick={onDownloadFile}
                        buttonName={"Letter"}
                      />
                    ) : (
                      "No Letter"
                    )}
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
          <div className="d-grid gap-2 d-md-flex justify-content-between">
            <div className="input-group w-auto">
              <select
                className="form-select-sm"
                value={itemsPerPage}
                onChange={handlePerPageChange}
              >
                <option value="3">3</option>
                <option value="6">6</option>
              </select>
            </div>
            <Pagination
              postsPerPage={itemsPerPage}
              length={empReqList.length}
              handlePagination={(page) => setCurrentPage(page)}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeesLeaveReqTable;
