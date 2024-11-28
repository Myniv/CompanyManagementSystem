import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Page/MainPage";
import LandingLayout from "./Component/Layout/LandingLayout";
import EmployeesLayout from "./Component/Layout/EmployeesLayout";
import EmployeesTable from "./Page/Employees/EmployeesTable";
import EmployeesForm from "./Page/Employees/EmployeesForm";
import DepartmentsLayout from "./Component/Layout/DepartmentsLayout";
import DepartmentsTable from "./Page/Departments/DepartmentsTable";
import DepartmentsForm from "./Page/Departments/DepartmentsForm";
import ProjectsLayout from "./Component/Layout/ProjectsLayout";
import ProjectsTable from "./Page/Projects/ProjectsTable";
import ProjectsForm from "./Page/Projects/ProjectsForm";
import AssignmentLayout from "./Component/Layout/AssignmentsLayout";
import AssignmentsTable from "./Page/Assignments/AssignmentsTable";
import AssignmentsDetail from "./Page/Assignments/AssignmentsDetail";
import AssignmentsForm from "./Page/Assignments/AssignmentsForm";
import EmployeeDetail from "./Page/Employees/EmployeesDetail";
import Login from "./Page/Authentication/Login";
import PrivateRoute from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/Login", element: <Login /> },
      {
        path: "/employees",
        element: (
          <PrivateRoute
            allowedRoles={[
              "Administrator",
              "HR Manager",
              "Department Manager",
              "Employee Supervisor",
              "Employee",
            ]}
          />
        ),
        children: [
          {
            element: <EmployeesLayout />,
            children: [
              { path: "", element: <EmployeesTable /> },
              { path: "/employees/new", element: <EmployeesForm /> },
              { path: "/employees/:id", element: <EmployeesForm /> },
              { path: "/employees/detail/:id", element: <EmployeeDetail /> },
            ],
          },
        ],
      },
      {
        path: "/departments",
        element: (
          <PrivateRoute
            allowedRoles={["Administrator", "Department Manager"]}
          />
        ),
        children: [
          {
            element: <DepartmentsLayout />,
            children: [
              { path: "", element: <DepartmentsTable /> },
              { path: "/departments/new", element: <DepartmentsForm /> },
              { path: "/departments/:id", element: <DepartmentsForm /> },
            ],
          },
        ],
      },
      {
        path: "/projects",
        element: (
          <PrivateRoute
            allowedRoles={["Administrator", "Department Manager", "HR Manager"]}
          />
        ),
        children: [
          {
            element: <ProjectsLayout />,
            children: [
              { path: "", element: <ProjectsTable /> },
              { path: "/projects/new", element: <ProjectsForm /> },
              { path: "/projects/:id", element: <ProjectsForm /> },
            ],
          },
        ],
      },
      {
        path: "/assignments",
        element: (
          <PrivateRoute
            allowedRoles={[
              "Administrator",
              "HR Manager",
              "Employee Supervisor",
              "Employee",
            ]}
          />
        ),
        children: [
          {
            element: <AssignmentLayout />,
            children: [
              { path: "", element: <AssignmentsTable /> },
              { path: "/assignments/new", element: <AssignmentsForm /> },
              {
                path: "/assignments/edit/:projId/:empId",
                element: <AssignmentsForm />,
              },
              {
                path: "/assignments/:empId/:projId",
                element: <AssignmentsDetail />,
              },
            ],
          },
        ],
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);
