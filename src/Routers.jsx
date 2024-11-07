import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import EmployeesTable from "./Component/Layout/Employees/EmployeesTable";
import EmployeesPage from "./Page/EmployeesPage";
import EmployeesForm from "./Component/Layout/Employees/EmployeesForm";
import DepartmentsPage from "./Page/DepartmentsPage";
import DepartmentsTable from "./Component/Layout/Departments/DepartmentsTable";
import DepartmentsForm from "./Component/Layout/Departments/DepartmentsForm";
import ProjectsPage from "./Page/ProjectsPage";
import ProjectsTable from "./Component/Layout/Projects/ProjectsTable";
import ProjectsForm from "./Component/Layout/Projects/ProjectsForm";
import AssignmentPage from "./Page/AssignmentsPage";
import AssignmentsTable from "./Component/Layout/Assignments/AssignmentsTable";
import AssignmentsForm from "./Component/Layout/Assignments/AssignmentsForm";
import AssignmentsDetail from "./Component/Layout/Assignments/AssignmentsDetail";
import MainPage from "./Page/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      { path: "", element: <MainPage /> },
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
        path: "/departments",
        element: <DepartmentsPage />,
        children: [
          { path: "", element: <DepartmentsTable /> },
          { path: "/departments/new", element: <DepartmentsForm /> },
          { path: "/departments/:id", element: <DepartmentsForm /> },
        ],
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
        children: [
          { path: "", element: <ProjectsTable /> },
          { path: "/projects/new", element: <ProjectsForm /> },
          { path: "/projects/:id", element: <ProjectsForm /> },
        ],
      },
      {
        path: "/assignments",
        element: <AssignmentPage />,
        children: [
          { path: "", element: <AssignmentsTable /> },
          { path: "/assignments/new", element: <AssignmentsForm /> },
          { path: "/assignments/:id", element: <AssignmentsForm /> },
          {
            path: "/assignments/:empId/:projId",
            element: <AssignmentsDetail />,
          },
        ],
      },
    ],
  },
]);
