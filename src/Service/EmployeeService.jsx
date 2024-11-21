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
  sortOrder,
  name
) => {
  return await baseApi.post(
    "/Employees/search2",
    {
      pageNumber,
      perPage,
    },
    {
      params: {
        Fname: fName,
        Lname: lName,
        Position: position,
        EmpLevel: empLevel,
        EmpType: empType,
        KeyWord: keyWord,
        UpdateDate: updateDate,
        isActive: isActive,
        SortBy: sortBy,
        SortOrder: sortOrder,
        Name: name,
      },
    }
  );
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
