import baseApi from "../baseApi";

const getAllEmployees = async () => {
  return await baseApi.get("/Employees/all");
};

const getAllEmployeesPagination = async () => {
  return await baseApi.get("/Employees");
};

const getEmployeeId = async (id) => {
  return await baseApi.get(`/Employees/${id}`);
};

const getEmployeeLeaveReqList = async () => {
  return await baseApi.get(`/Company/workflow-dashboard`);
};

const addEmployee = async (data) => {
  return await baseApi.post("/Employees", data);
};

const updateEmployeeId = async (id, data) => {
  return await baseApi.put(`/Employees/${id}`, data);
};

const updateEmployeeDeactivate = async (id, data) => {
  return await baseApi.put(`/Employees/${id}/deactivate`, data);
};

const deleteEmployee = async (id) => {
  return await baseApi.delete(`/Employees/${id}`);
};

const searchEmployee = async (
  pageNumber,
  perPage,
  fName,
  lName,
  position,
  empLevel,
  empType,
  keyWord,
  updateDate,
  isActive,
  sortBy,
  sortOrder
  //   name
) => {
  try {
    const response = await baseApi.post(
      "/Employees/search2",
      {
        pageNumber,
        perPage,
      },
      {
        params: {
          Fname: fName || null,
          Lname: lName || null,
          Position: position || null,
          EmpLevel: empLevel || null,
          EmpType: empType || null,
          KeyWord: keyWord || null,
          UpdateDate: updateDate || null,
          isActive,
          SortBy: sortBy,
          SortOrder: sortOrder,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching books : ", error);
    throw error;
  }
};

const leaveReqEmployee = async (data) => {
  return await baseApi.post("/Employees/leave", data);
};

const EmployeeService = {
  getAllEmployees,
  getAllEmployeesPagination,
  getEmployeeId,
  getEmployeeLeaveReqList,
  addEmployee,
  updateEmployeeId,
  updateEmployeeDeactivate,
  deleteEmployee,
  searchEmployee,
  leaveReqEmployee,
};

export default EmployeeService;
