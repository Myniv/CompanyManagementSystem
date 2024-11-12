import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./Slicer/departmentSlicer";
import employeeReducer from "./Slicer/employeeSlicer";
import projectReducer from "./Slicer/projectSlicer";

export const store = configureStore({
  reducer: {
    department: departmentReducer,
    employee: employeeReducer,
    project: projectReducer,
  },
});
