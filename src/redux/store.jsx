import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./Slicer/departmentSlicer";

export const store = configureStore({
  reducer: {
    department: departmentReducer,
  },
});
