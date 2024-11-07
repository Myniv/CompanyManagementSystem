import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import EmployeesTable from "./Component/Layout/Employees/EmployeesTable";
import EmployeesPage from "./Page/EmployeesPage";
import EmployeesForm from "./Component/Layout/Employees/EmployeesForm";
import DepartmentsPage from "./Page/DepartmentsPage";
import DepartmentsTable from "./Component/Layout/Departments/DepartmentsTable";
import DepartmentsForm from "./Component/Layout/Departments/DepartmentsForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "/employees",
        element: <EmployeesPage />,
        children: [
          { path: "", element: <EmployeesTable /> },
          { path: "/employees/new", element: <EmployeesForm /> },
          { path: "/employees/:id", element: <EmployeesForm /> },
        ],
      },
      {
        path:"/departments",
        element:<DepartmentsPage/>,
        children:[
          {path:"", element:<DepartmentsTable/>},
          { path: "/departments/new", element: <DepartmentsForm /> },
          { path: "/departments/:id", element: <DepartmentsForm /> },

        ]
      }
    ],
  },
]);
