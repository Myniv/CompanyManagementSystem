import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import EmployeesTable from "./Component/Layout/Employees/EmployeesTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [{ path: "", element: <EmployeesTable /> }],
  },
]);
