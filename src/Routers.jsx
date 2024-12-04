import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Page/MainPage";
import LandingLayout from "./Component/Layout/LandingLayout";
import EmployeesLayout from "./Component/Layout/EmployeesLayout";
import EmployeesTable from "./Page/Employees/EmployeesTable";
import EmployeesForm from "./Page/Employees/EmployeesForm";
import DepartmentsLayout from "./Component/Layout/DepartmentsLayout";
import DepartmentsForm from "./Page/Departments/DepartmentsForm";
import ProjectsLayout from "./Component/Layout/ProjectsLayout";
import ProjectsForm from "./Page/Projects/ProjectsForm";
import AssignmentLayout from "./Component/Layout/AssignmentsLayout";
import AssignmentsDetail from "./Page/Assignments/AssignmentsDetail";
import AssignmentsForm from "./Page/Assignments/AssignmentsForm";
import EmployeeDetail from "./Page/Employees/EmployeesDetail";
import Login from "./Page/Authentication/Login";
import PrivateRoute from "./PrivateRoutes";
import Profile from "./Page/Profile";
import DepartmentsTable2 from "./Page/Departments/DepartmentTablePaginationServer";
import ProjectsTablePaginationServer from "./Page/Projects/ProjectsTablePaginationServer";
import AssignmentsTablePaginationServer from "./Page/Assignments/AssignmentsTablePaginationServer";
import RegisterUser from "./Page/Authentication/Register";
import EmployeesLeaveReqForm from "./Page/Employees/EmployeesLeaveReqForm";
import EmployeesLeaveReqLayout from "./Component/Layout/EmployeeLeaveReqLayout";
import UploadFiles from "./Page/Employees/UploadFiles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "/profile",
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
        children: [{ path: "", element: <Profile /> }],
      },
      {
        path: "/upload",
        element: <PrivateRoute allowedRoles={["Employee"]} />,
        children: [
          {
            path: "",
            element: <EmployeesLeaveReqLayout />,
            children: [
              { path: "", element: <EmployeesLeaveReqForm /> },
              {
                path: "",
                element: <UploadFiles />,
              },
            ],
          },
        ],
      },
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
              { path: "", element: <DepartmentsTable2 /> },
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
              { path: "", element: <ProjectsTablePaginationServer /> },
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
              "Department Manager",
            ]}
          />
        ),
        children: [
          {
            element: <AssignmentLayout />,
            children: [
              { path: "", element: <AssignmentsTablePaginationServer /> },
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
      {
        path: "/register",
        element: <PrivateRoute allowedRoles={"Administrator"} />,
        children: [{ path: "", element: <RegisterUser /> }],
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);
