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

const addEmployee = async (data) => {
  return await baseApi.post("/Employees", data);
};

const updateEmployeeId = async (id) => {
  return await baseApi.put(`/Employees/${id}`);
};

const updateEmployeeDeactivate = async (id) => {
  return await baseApi.put(`/Employees/${id}/deactivate`);
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

const EmployeeService = {
  getAllEmployees,
  getAllEmployeesPagination,
  getEmployeeId,
  addEmployee,
  updateEmployeeId,
  updateEmployeeDeactivate,
  deleteEmployee,
  searchEmployee,
};

export default EmployeeService;
