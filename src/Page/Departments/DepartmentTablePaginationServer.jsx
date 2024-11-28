// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDepartment,
//   setLoading,
// } from "../../redux/Slicer/departmentSlicer";
// import { fetchEmployee } from "../../redux/Slicer/employeeSlicer";
// import baseApi from "../../baseApi";
// import PrimaryButton from "../../Component/Elements/PrimaryButton";
// import DangerButton from "../../Component/Elements/DangerButton";
// import SecondaryButton from "../../Component/Elements/SecondaryButton";
// import LoadingState from "../../Component/Elements/LoadingState";
// import Pagination from "../../Component/Widgets/Pagination";
// import ErrorMessage from "../../Component/Elements/ErrorMessage";
// import ErrorMessage2 from "../../Component/Elements/ErrorMessage2";
// import SuccessMessage2 from "../../Component/Elements/SuccessMessage2";
// import DepartmentService from "../../Service/DepartmentService";
// import EmployeeService from "../../Service/EmployeeService";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import ReactPaginate from "react-paginate";

// const fetchDepartmentService = async ({ pageNumber, perPage }) => {
//   const { data } = await DepartmentService.getAllDepartmentsPagination(
//     pageNumber,
//     perPage
//   );
//   console.log(data);
//   return data;
// };

// const DepartmentsTable = () => {
//   const [detailDepartment, setDetailDepartment] = useState([]);
//   const [show, setShow] = useState(false);
//   const [departmentId, setDepartmentId] = useState([]);

//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageCount, setPageCount] = useState(0);
//   const [perPage, setPerPage] = useState(3);

//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["departments", pageNumber, perPage],
//     queryFn: () =>
//       fetchDepartmentService({ pageNumber: pageNumber, perPage: perPage }),
//     placeholderData: keepPreviousData,
//   });

//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   // const department = useSelector((state) => state.department);
//   const employee = useSelector((state) => state.employee);
//   useEffect(() => {
//     // dispatch(fetchDepartment());
//     dispatch(fetchEmployee());
//   }, []);

//   useEffect(() => {
//     if (data) {
//       setPageCount(Math.ceil(data.total / perPage));
//     }
//   }, [data, perPage, pageNumber]);

//   const handlePageSizeChange = (event) => {
//     // setPageSize(event.target.value);
//     setPageNumber(event.selected + 1);
//   };

//   // const [currentPage, setCurrentPage] = useState(1);
//   // const [postsPerPge, SetPostsPerPage] = useState(5);

//   const onDeleteDepartments = (deptno) => {
//     const deleteDepartments = () => {
//       dispatch(setLoading(true));
//       DepartmentService.deleteDepartmentsiId(deptno)
//         .then((res) => {
//           dispatch(fetchDepartment());
//           SuccessMessage2("Department data has been deleted!");
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//           dispatch(setLoading(false));
//           ErrorMessage2(
//             "Department data failed to delete, please try again later..."
//           );
//         });
//     };
//     DeleteConfirmation(deleteDepartments);
//   };

//   const onEditDepartments = (deptno) => {
//     navigate(`/departments/${deptno}`);
//   };

//   const onAddDepartments = () => {
//     navigate(`/departments/new`);
//   };

//   const onDetailEmployee = (deptno) => {
//     const employeeDepartment = employee.data.filter(
//       (emp) => Number(emp.deptno) === Number(deptno)
//     );
//     setDetailDepartment(employeeDepartment);

//     const departmentId = data.data.find(
//       (departments) => Number(departments.deptno) === Number(deptno)
//     );
//     setDepartmentId(departmentId);
//     setShow(true);
//   };

//   const getEmployeesName = (mgrempno) => {
//     const foundEmployees = employee.data.find(
//       (emp) => Number(emp.empno) === Number(mgrempno)
//     );

//     if (foundEmployees) {
//       return <>{`${foundEmployees.fname} ${foundEmployees.lname}`}</>;
//     }
//   };

//   const handlePerPageChange = (e) => {
//     setPerPage(e.target.value);
//   };

//   const locationData = [
//     "Jakarta Utara",
//     "Jakarta Barat",
//     "Jakarta Selatan",
//     "Tangerang",
//     "Bogor",
//     "Depok",
//   ];

//   return (
//     <>
//       {isLoading ? (
//         <LoadingState />
//       ) : isError ? (
//         <ErrorMessage errorMessage={"Error"} />
//       ) : (
//         <div className="m-4">
//           <div className="d-flex justify-content-between align-items-center mb-1">
//             <h2>Departments Table</h2>
//             <PrimaryButton
//               onClick={onAddDepartments}
//               buttonName={"Add Departments"}
//             />
//           </div>
//           <table className="table table-hover table-bordered ">
//             <thead>
//               <tr className="table-dark">
//                 <th scope="col" className="text-center">
//                   ID Department
//                 </th>
//                 <th scope="col" className="text-center">
//                   Department Name
//                 </th>
//                 <th scope="col" className="text-center">
//                   Department Manager
//                 </th>
//                 <th scope="col" className="text-center">
//                   Department Location ID
//                 </th>
//                 <th scope="col" className="text-center">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((departments) => (
//                 <tr scope="row" key={departments.deptno}>
//                   <td className="table-light text-center">
//                     {departments.deptno}
//                   </td>
//                   <td className="table-light text-center">
//                     {departments.deptname}
//                   </td>
//                   <td className="table-light text-center">
//                     {/* {departments.mgrempno
//                       ? getEmployeesName(departments.mgrempno)
//                       : "N/A"} */}
//                     {departments.mgrempno ? departments.mgrempno : "N/A"}
//                   </td>
//                   <td className="table-light text-center">
//                     {locationData[departments.locationId[0] - 1]}
//                   </td>
//                   <td className="table-light text-center">
//                     <div>
//                       <PrimaryButton
//                         onClick={() => onEditDepartments(departments.deptno)}
//                         buttonName="Edit"
//                       />
//                       <DangerButton
//                         onClick={() => onDeleteDepartments(departments.deptno)}
//                         buttonName="Delete"
//                       />
//                       <SecondaryButton
//                         onClick={() => onDetailEmployee(departments.deptno)}
//                         buttonName="Detail"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {/* <Pagination
//             length={department.data.length}
//             postsPerPage={postsPerPge}
//             handlePagination={handlePagination}
//             currentPage={currentPage}
//           /> */}
//           <div className="d-grid gap-2 d-md-flex justify-content-between">
//             <div className="input-group w-auto">
//               <select
//                 className="form-select-sm"
//                 value={perPage}
//                 onChange={handlePerPageChange}
//               >
//                 <option value="3">3</option>
//                 <option value="6">6</option>
//               </select>
//             </div>
//             <ReactPaginate
//               previousLabel={
//                 <button
//                   type="button"
//                   className="btn btn-outline-dark"
//                   aria-label="Previous"
//                   disabled={pageNumber === 1}
//                 >
//                   <span aria-hidden="true">&laquo;</span>
//                 </button>
//               }
//               nextLabel={
//                 <button
//                   type="button"
//                   className="btn btn-outline-dark"
//                   aria-label="Next"
//                   disabled={pageNumber === pageCount}
//                 >
//                   <span aria-hidden="true">&raquo;</span>
//                 </button>
//               }
//               pageClassName="btn-dark"
//               pageLinkClassName="btn btn-outline-dark"
//               breakLabel={"..."}
//               breakClassName={"break-me"}
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={3}
//               onPageChange={handlePageSizeChange}
//               containerClassName="pagination"
//               activeClassName="active"
//             />
//           </div>
//           {show && (
//             <div className="mt-4">
//               <div className="card">
//                 <div className="card-header d-flex justify-content-between bg-dark">
//                   <h5 className="text-white">
//                     Employee Details on {departmentId.deptname}
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShow(false)}
//                   ></button>
//                 </div>
//                 <div className="card-body">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Employee ID</th>
//                         <th scope="col">Employee Name</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {detailDepartment.map((emp) => (
//                         <tr key={emp.empno}>
//                           <td>{emp.empno}</td>
//                           <td>
//                             {emp.fname} {emp.lname}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default DepartmentsTable;
