import baseApi from "../baseApi";

const getAllAssignments = async () => {
  return await baseApi.get("/WorksOn/all");
};

const getAllAssignmentsPagination = async (pageNumber, perPage) => {
  try {
    const response = await baseApi.get("/WorksOn", {
      params: { pageNumber, perPage },
    });
    return response;
  } catch (error) {
    console.error("Error fetching WorksOn : ", error);
    throw error;
  }
};

const getAssignmentsId = async (projNo, empNo) => {
  return await baseApi.get(`/WorksOn/${projNo}/${empNo}`);
};

const addAssignments = async (data) => {
  return await baseApi.post("/WorksOn", data);
};

const updateAssignmentsId = async (projNo, empNo, data) => {
  return await baseApi.put(`/WorksOn/${projNo}/${empNo}`, data);
};

const deleteAssignmentsId = async (projNo, empNo) => {
  return await baseApi.delete(`/WorksOn/${projNo}/${empNo}`);
};

const AssignmentService = {
  getAllAssignments,
  getAllAssignmentsPagination,
  getAssignmentsId,
  addAssignments,
  updateAssignmentsId,
  deleteAssignmentsId,
};

export default AssignmentService;
