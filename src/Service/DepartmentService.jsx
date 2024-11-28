import baseApi from "../baseApi";

const getAllDepartments = async () => {
  return await baseApi.get("/Departements/all");
};

const getAllDepartmentsPagination = async (pageNumber, perPage) => {
  try {
    const response = await baseApi.get("/Departements", {
      params: { pageNumber, perPage },
    });
    return response;
  } catch (error) {
    console.error("Error fetching Departments : ", error);
    throw error;
  }
};

const getDepartmentsiId = async (id) => {
  return await baseApi.get(`/Departements/${id}`);
};

const addDepartments = async (data) => {
  return await baseApi.post("/Departements", data);
};

const updateDepartmentsiId = async (id, data) => {
  return await baseApi.put(`/Departements/${id}`, data);
};

const deleteDepartmentsiId = async (id) => {
  return await baseApi.delete(`/Departements/${id}`);
};

const DepartmentService = {
  getAllDepartments,
  getAllDepartmentsPagination,
  getDepartmentsiId,
  addDepartments,
  updateDepartmentsiId,
  deleteDepartmentsiId,
};

export default DepartmentService;
