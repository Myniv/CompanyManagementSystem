import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Page/MainPage";
import LandingPage from "./Component/Layout/LandingPage";
import EmployeesPage from "./Component/Layout/EmployeesPage";
import EmployeesTable from "./Page/Employees/EmployeesTable";
import EmployeesForm from "./Page/Employees/EmployeesForm";
import DepartmentsPage from "./Component/Layout/DepartmentsPage";
import DepartmentsTable from "./Page/Departments/DepartmentsTable";
import DepartmentsForm from "./Page/Departments/DepartmentsForm";
import ProjectsPage from "./Component/Layout/ProjectsPage";
import ProjectsTable from "./Page/Projects/ProjectsTable";
import ProjectsForm from "./Page/Projects/ProjectsForm";
import AssignmentPage from "./Component/Layout/AssignmentsPage";
import AssignmentsTable from "./Page/Assignments/AssignmentsTable";
import AssignmentsDetail from "./Page/Assignments/AssignmentsDetail";
import AssignmentsForm from "./Page/Assignments/AssignmentsForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
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
