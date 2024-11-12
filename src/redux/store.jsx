import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./Slicer/departmentSlicer";
import employeeReducer from "./Slicer/employeeSlicer";

export const store = configureStore({
  reducer: {
    department: departmentReducer,
    employee: employeeReducer,
  },
});
