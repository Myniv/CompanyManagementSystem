import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import EmployeesTable from "./Component/Layout/Employees/EmployeesTable";
import EmployeesPage from "./Page/EmployeesPage";
import EmployeesForm from "./Component/Layout/Employees/EmployeesForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      { path: "", element: <EmployeesTable /> },
      {
        path: "/employees",
        element: <EmployeesPage />,
        children: [
          { path: "", element: <EmployeesTable /> },
          { path: "/employees/new", element: <EmployeesForm /> },
          { path: "/employees/:id", element: <EmployeesForm /> },
        ],
      },
    ],
  },
]);
