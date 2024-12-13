import baseApi from "../baseApi";

const getEmployeeReport = async (deptNo) => {
  return await baseApi.get(`Employees/report-pdf/${deptNo}`, {
    responseType: "blob",
  });
};

const getProjectReport = async () => {
  return await baseApi.get(`Projects/report-pdf`, { responseType: "blob" });
};

const getLeaveReport = async (startDate, endDate) => {
  return await baseApi.post(
    `Company/leave-report-pdf`,
    {
      startDate,
      endDate,
    },
    { responseType: "blob" }
  );
};
const ReportService = {
  getEmployeeReport,
  getLeaveReport,
  getProjectReport,
};

export default ReportService;
