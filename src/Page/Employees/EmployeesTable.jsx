/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const fetchEmployeesService = async ({
  pageNumber,
  perPage,
  // fName,
  // lName,
  // position,
  // empLevel,
  // empType,
  keyWord,
  // updateDate,
  // isActive,
  sortBy,
  sortOrder,
  // name,
}) => {
  const { data } = await EmployeeService.searchEmployee(
    pageNumber,
    perPage,
    "",
    "",
    "",
    "",
    "",
    keyWord,
    "",
    "",
    sortBy,
    sortOrder
  );
  return data;
};

const EmployeesTable = () => {
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(3);
  // const [position, setPosition] = useState("");
  // const [empLevel, setEmpLevel] = useState("");
  // const [empType, setEmpType] = useState("");
  const [keyWord, setKeyword] = useState("");
  // const [isActive, setIsActive] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employees", pageNumber, perPage, keyWord, sortBy, sortOrder],
    queryFn: () =>
      fetchEmployeesService({
        pageNumber: pageNumber,
        perPage: perPage,
        keyWord: keyWord,
        sortBy: sortBy,
        sortOrder: sortOrder,
      }),
    placeholderData: keepPreviousData,
  });

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
        .delete(`v1/Employees/${empNo}`)
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
      return (
        // <img
        //   className="img-fluid"
        //   src="/img/sortNoSort.png"
        //   alt="sorting"
        //   style={{ width: "20px", height: "20px" }}
        // />
        "↕️"
      );
    }
    if (sortOrder === "asc") {
      return (
        // <img
        //   className="img-fluid"
        //   src="/img/sortAscSort.png"
        //   alt="sorting"
        //   style={{ width: "20px", height: "20px" }}
        // />
        "↑"
      );
    } else {
      return (
        // <img
        //   className="img-fluid"
        //   src="/img/sortDescSort.png"
        //   alt="sorting"
        //   style={{ width: "20px", height: "20px" }}
        // />
        "↓"
      );
    }
    // return sortOrder === "asc" ? "↑" : "↓";
  };

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

  const handlePageSizeChange = (event) => {
    // setPageSize(event.target.value);
    setPageNumber(event.selected + 1);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPageNumber(1);
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
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h2 className="m-0">Employees Table</h2>
            <PrimaryButton
              onClick={onAddEmployees}
              buttonName="Add Employees"
            />
            <div className="input-group w-auto">
              <span className="input-group-text">Search</span>
              <input
                placeholder="Cari pengguna..."
                type="text"
                className="form-control-sm"
                onChange={handleSearch}
                value={keyWord}
              />
            </div>
          </div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col" className="text-center">
                  Employee Name
                </th>
                <th scope="col" className="text-center">
                  Department
                </th>
                <th scope="col" className="text-center">
                  Position
                  <span
                    onClick={() => handleSorting("position")}
                    className="text-decoration-none text-dark p-0"
                  >
                    {getSortIcon("position")}
                  </span>
                </th>
                <th scope="col" className="text-center">
                  Level
                </th>
                <th scope="col" className="text-center">
                  Employment Type
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
                <tr scope="row" key={employee.empNo}>
                  <td className="table-light text-center">{employee.name}</td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-center">
            <ReactPaginate
              previousLabel={
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={pageNumber === 1}
                >
                  Previous
                </button>
              }
              nextLabel={
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={pageNumber === pageCount}
                >
                  Next
                </button>
              }
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageSizeChange}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeesTable;
