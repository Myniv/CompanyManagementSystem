/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee } from "../../redux/Slicer/employeeSlicer";
import { fetchDepartment } from "../../redux/Slicer/departmentSlicer";
import baseApi from "../../baseApi";
import Pagination from "../../Component/Widgets/Pagination";
import PrimaryButton from "../../Component/Elements/PrimaryButton";
import DangerButton from "../../Component/Elements/DangerButton";
import LoadingState from "../../Component/Elements/LoadingState";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import ErrorMessage2 from "../../Component/Elements/ErrorMessage2";
import SuccessMessage2 from "../../Component/Elements/SuccessMessage2";

const EmployeesTable = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const employee = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchEmployee());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(5);

  const onDeleteEmployees = (empNo) => {
    const deletedEmployees = () => {
      baseApi
        .delete(`v1/Employees/${empNo}`)
        .then((res) => {
          console.log(res);
          dispatch(fetchEmployee());
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

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentPosts = employee.data.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {employee.isLoading ? (
        <LoadingState />
      ) : employee.error ? (
        <ErrorMessage errorMessage={employee.error} />
      ) : (
        <div className="m-4">
          {/* Top Header with Title and Add Button */}
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h2 className="m-0">Employees Table</h2>
            <PrimaryButton
              onClick={onAddEmployees}
              buttonName="Add Employees"
            />
          </div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col" className="text-center">
                  ID
                </th>
                <th scope="col" className="text-center">
                  Front Name
                </th>
                <th scope="col" className="text-center">
                  Last Name
                </th>
                <th scope="col" className="text-center">
                  Address
                </th>
                <th scope="col" className="text-center">
                  Date of Birth
                </th>
                <th scope="col" className="text-center">
                  Gender
                </th>
                <th scope="col" className="text-center">
                  Position
                </th>
                <th scope="col" className="text-center">
                  Department
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((employee) => (
                <tr scope="row" key={employee.empNo}>
                  <td className="table-light text-center">{employee.empno}</td>
                  <td className="table-light text-center">{employee.fname}</td>
                  <td className="table-light text-center">{employee.lname}</td>
                  <td className="table-light text-center">
                    {employee.address}
                  </td>
                  <td className="table-light text-center">{employee.dob}</td>
                  <td className="table-light text-center">{employee.sex}</td>
                  <td className="table-light text-center">
                    {employee.position}
                  </td>
                  <td className="table-light text-center">
                    {getDepartmentName(employee.deptno)}
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
          <Pagination
            length={employee.data.length}
            postsPerPage={postsPerPge}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default EmployeesTable;
