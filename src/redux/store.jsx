import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./Slicer/departmentSlicer";
import employeeReducer from "./Slicer/employeeSlicer";
import projectReducer from "./Slicer/projectSlicer";
import assignmentReducer from "./Slicer/assignmentSlicer";
import authReducer from "./Slicer/authSlicer"

export const store = configureStore({
  reducer: {
    department: departmentReducer,
    employee: employeeReducer,
    project: projectReducer,
    assignment: assignmentReducer,
    auth: authReducer,
  },
});
