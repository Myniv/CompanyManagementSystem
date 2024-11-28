/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee } from "../../redux/Slicer/employeeSlicer";
import { fetchDepartment } from "../../redux/Slicer/departmentSlicer";
import baseApi from "../../baseApi";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import LoadingState from "../../Component/Elements/LoadingState";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import ErrorMessage2 from "../../Component/Elements/ErrorMessage2";
import SuccessMessage2 from "../../Component/Elements/SuccessMessage2";
import EmployeeService from "../../Service/EmployeeService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import SecondaryButton from "../../Component/Elements/SecondaryButton";
import ReactPagination from "../../Component/Widgets/ReactPagination";

const fetchEmployeesService = async ({
  pageNumber,
  perPage,
  // fName,
  // lName,
  position,
  empLevel,
  empType,
  keyWord,
  updateDate,
  isActive,
  sortBy,
  sortOrder,
  // name,
}) => {
  const { data } = await EmployeeService.searchEmployee(
    pageNumber,
    perPage,
    "",
    "",
    position,
    empLevel,
    empType,
    keyWord,
    "",
    isActive,
    sortBy,
    sortOrder
  );
  return data;
};

const EmployeesTable = () => {
  const navigate = useNavigate();

  const { setEmployee } = useOutletContext();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [position, setPosition] = useState("");
  const [empLevel, setEmpLevel] = useState("");
  const [empType, setEmpType] = useState("");
  const [keyWord, setKeyword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "employees",
      pageNumber,
      perPage,
      position,
      empLevel,
      empType,
      keyWord,
      isActive,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      fetchEmployeesService({
        pageNumber: pageNumber,
        perPage: perPage,
        position: position,
        empLevel: empLevel,
        empType: empType,
        keyWord: keyWord,
        isActive: isActive,
        sortBy: sortBy,
        sortOrder: sortOrder,
      }),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  // const employee = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(fetchDepartment());
    // dispatch(fetchEmployee());
  }, []);

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.total / perPage));
    }
  }, [data, perPage, pageNumber]);

  const onDeleteEmployees = (empNo) => {
    const deletedEmployees = () => {
      baseApi
        .delete(`/Employees/${empNo}`)
        .then((res) => {
          console.log(res);
          dispatch(fetchEmployee());
          refetch();
          SuccessMessage2("Employee data has been deleted!");
        })
        .catch((err) => {
          console.log(err);
          ErrorMessage2(
            "Employee data failed to delete, please try again later..."
          );
        });
    };
    DeleteConfirmation(deletedEmployees);
  };

  const onEditingEmployees = (empNo) => {
    navigate(`/employees/${empNo}`);
  };

  const onDetailEmployees = (empNo) => {
    navigate(`/employees/detail/${empNo}`);
  };

  const onAddEmployees = () => {
    navigate("/employees/new");
  };

  const handleSorting = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      console.log(sortOrder);
      console.log(sortBy);
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return "⇅";
    }
    if (sortOrder === "asc") {
      return "⇈";
    } else {
      return "⇊";
    }
  };

  const handlePageSizeChange = (event) => {
    // setPageSize(event.target.value);
    setPageNumber(event.selected + 1);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPageNumber(1);
  };

  const handleFilterInput = (e) => {
    const value = e.target.value;

    if (filter === "position") {
      setPosition(value);
    } else if (filter === "level") {
      setEmpLevel(value);
    } else if (filter === "type") {
      setEmpType(value);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPosition("");
    setEmpLevel("");
    setEmpType("");
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.value);
  };
  const handlePerPageChange = (e) => {
    setPerPage(e.target.value);
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage={"Error"} />
      ) : (
        <div className="m-4">
          {/* Top Header with Title and Add Button */}
          <h2 className="mb-3">Employees Table</h2>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
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
              <div className="input-group w-auto">
                <select
                  id="projno"
                  name="projno"
                  className="form-select"
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Filter </option>
                  <option value="position">Employee Position</option>
                  <option value="level">Employee Level</option>
                  <option value="type">Employee Type</option>
                </select>

                <input
                  placeholder="Filter"
                  type="text"
                  className="form-control"
                  onChange={handleFilterInput}
                  value={
                    filter === "position"
                      ? position
                      : filter === "level"
                      ? empLevel
                      : filter === "type"
                      ? empType
                      : ""
                  }
                  disabled={!filter}
                />
              </div>
            </div>
            <div>
              <div className="input-group w-auto">
                <PrimaryButton
                  onClick={onAddEmployees}
                  buttonName="Add Employees"
                />
              </div>
              <div className="input-group w-auto">
                <select
                  className="form-select"
                  value={isActive}
                  onChange={handleIsActiveChange}
                >
                  <option value="true">Active Employee</option>
                  <option value="false">In Active Employee</option>
                </select>
              </div>
            </div>
          </div>
          <table className="table table-hover table-bordered table-sm">
            <thead>
              <tr className="table-dark">
                <th scope="col" className="text-center">
                  Id
                  <span
                    onClick={() => handleSorting("name")}
                    style={{
                      backgroundColor: "dark",
                      color: "white",
                      padding: "2px 4px",
                      display: "inline-block",
                      cursor: "pointer",
                      width: "20px",
                      height: "25px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                    className="text-decoration-none text-white p-0"
                  >
                    {getSortIcon("empno")}
                  </span>
                </th>
                <th scope="col" className="text-center">
                  Employee Name{" "}
                  <span
                    onClick={() => handleSorting("name")}
                    style={{
                      backgroundColor: "dark",
                      color: "white",
                      padding: "2px 4px",
                      display: "inline-block",
                      cursor: "pointer",
                      width: "20px",
                      height: "25px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                    className="text-decoration-none text-white p-0"
                  >
                    {getSortIcon("name")}
                  </span>
                </th>
                <th scope="col" className="text-center">
                  Department{" "}
                  <span
                    onClick={() => handleSorting("department")}
                    className="text-decoration-none text-white p-0"
                    style={{
                      backgroundColor: "dark",
                      color: "white",
                      padding: "2px 4px",
                      display: "inline-block",
                      cursor: "pointer",
                      width: "20px",
                      height: "25px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    {getSortIcon("department")}
                  </span>
                </th>
                <th scope="col" className="text-center">
                  Position
                  <span
                    onClick={() => handleSorting("position")}
                    className="text-decoration-none text-white p-0"
                    style={{
                      backgroundColor: "dark",
                      color: "white",
                      padding: "2px 4px",
                      display: "inline-block",
                      cursor: "pointer",
                      width: "20px",
                      height: "25px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    {getSortIcon("position")}
                  </span>
                </th>
                <th scope="col" className="text-center">
                  Level{" "}
                  <span
                    onClick={() => handleSorting("level")}
                    className="text-decoration-none text-white p-0"
                    style={{
                      backgroundColor: "dark",
                      color: "white",
                      padding: "2px 4px",
                      display: "inline-block",
                      cursor: "pointer",
                      width: "20px",
                      height: "25px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    {getSortIcon("level")}
                  </span>
                </th>
                <th scope="col" className="text-center">
                  Employment Type{" "}
                  <span
                    onClick={() => handleSorting("type")}
                    className="text-decoration-none text-white p-0"
                    style={{
                      backgroundColor: "dark",
                      color: "white",
                      padding: "2px 4px",
                      display: "inline-block",
                      cursor: "pointer",
                      width: "20px",
                      height: "25px",
                      borderRadius: "4px",
                      border: "1px solid white",
                    }}
                  >
                    {getSortIcon("type")}
                  </span>
                </th>
                <th scope="col" className="text-center">
                  Is Active
                </th>
                <th scope="col" className="text-center">
                  Last Updated
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.result.map((employee) => (
                <tr scope="row" key={employee.empno}>
                  <td className="table-light text-left">{employee.empno}</td>
                  <td className="table-light text-left">{employee.name}</td>
                  <td className="table-light text-center">
                    {employee.departement}
                  </td>
                  <td className="table-light text-center">
                    {employee.position}
                  </td>
                  <td className="table-light text-center">
                    {employee.empLevel}
                  </td>
                  <td className="table-light text-center">
                    {employee.empType}
                  </td>
                  <td className="table-light text-center">
                    {employee.isActive ? "Active" : "In Active"}
                  </td>
                  <td className="table-light text-center">
                    {employee.updatedAt ? employee.updatedAt : getDate()}
                  </td>
                  <td className="table-light text-center">
                    <PrimaryButton
                      onClick={() => onEditingEmployees(employee.empno)}
                      buttonName="Edit"
                    />
                    <DangerButton
                      onClick={() => onDeleteEmployees(employee.empno)}
                      buttonName="Delete"
                    />
                    <SecondaryButton
                      onClick={() => onDetailEmployees(employee.empno)}
                      buttonName={"Detail"}
                    />
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

export default EmployeesTable;
