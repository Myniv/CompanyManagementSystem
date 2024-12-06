import { useEffect, useState } from "react";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import LoadingState from "../../Component/Elements/LoadingState";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../Service/EmployeeService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

const fetchEmployeesReqService = async ({ pageNumber, perPage, keyWord }) => {
  const { data } = await EmployeeService.getEmployeeLeaveReqListPagination(
    pageNumber,
    perPage,
    keyWord
  );
  console.log(data);
  return data;
};

const EmployeesLeaveReqTablePaginationServer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [keyWord, setKeyword] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees", pageNumber, perPage, keyWord],
    queryFn: () =>
      fetchEmployeesReqService({
        pageNumber: pageNumber,
        perPage: perPage,
        keyWord: keyWord,
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.total / perPage));
    }
  }, [data, perPage, pageNumber]);

  const handlePageSizeChange = (event) => {
    // setPageSize(event.target.value);
    setPageNumber(event.selected + 1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(e.target.value);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPageNumber(1);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   setIsLoading(true);
  //   EmployeeService.getEmployeeLeaveReqList()
  //     .then((res) => {
  //       const sortedEmpReq = res.data.sort((a, b) => a.processId - b.processId);
  //       setEmpReqList(sortedEmpReq);
  //       console.log(sortedEmpReq);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [setIsLoading]);

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
          <div className="input-group w-auto me-2">
            <span className="input-group-text">Search</span>
            <input
              placeholder="Search all"
              type="text"
              className="form-control"
              onChange={handleSearch}
              value={keyWord}
            />
          </div>
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
              {data.data?.map((emp) => (
                <tr scope="row" key={emp.processId}>
                  <td>{emp.processId}</td>
                  <td>{emp.requester || "N/A"}</td>
                  <td>{emp.leaveType || "N/A"}</td>
                  <td>{emp.leaveReason || "N/A"}</td>
                  <td>{emp.startDate || "N/A"}</td>
                  <td>{emp.endDate || "N/A"}</td>
                  <td>{countTotalDays(emp.startDate, emp.endDate)}</td>
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
                    {totalingDate(emp.startDate, emp.endDate) > 2 &&
                    emp.leaveType === "Sick Leave" ? (
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
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value="3">3</option>
                <option value="6">6</option>
              </select>
            </div>
            <ReactPaginate
              previousLabel={
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  aria-label="Previous"
                  disabled={pageNumber === 1}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              }
              nextLabel={
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  aria-label="Next"
                  disabled={pageNumber === pageCount}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              }
              pageClassName="btn-dark"
              pageLinkClassName="btn btn-outline-dark"
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageSizeChange}
              containerClassName="pagination"
              activeClassName="active"
            />
            {/* <ReactPagination
              pageNumber={pageNumber}
              pageCount={pageCount}
              handlePageSizeChange={handlePageSizeChange}
            /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeesLeaveReqTablePaginationServer;
