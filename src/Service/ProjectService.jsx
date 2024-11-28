import baseApi from "../baseApi";

const getAllProjects = async () => {
  return await baseApi.get("/Projects/all");
};

const getAllProjectsPagination = async (pageNumber, perPage) => {
  try {
    const response = await baseApi.get("/Projects", {
      params: { pageNumber, perPage },
    });
    return response;
  } catch (error) {
    console.error("Error fetching Projects : ", error);
    throw error;
  }
};

const getProjectsiId = async (id) => {
  return await baseApi.get(`/Projects/${id}`);
};

const addProjects = async (data) => {
  return await baseApi.post("/Projects", data);
};

const updateProjectsiId = async (id, data) => {
  return await baseApi.put(`/Projects/${id}`, data);
};

const deleteProjectsiId = async (id) => {
  return await baseApi.delete(`/Projects/${id}`);
};

const Projectservice = {
  getAllProjects,
  getAllProjectsPagination,
  getProjectsiId,
  addProjects,
  updateProjectsiId,
  deleteProjectsiId,
};

export default Projectservice;
