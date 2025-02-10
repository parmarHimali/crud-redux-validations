import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "./crudSlice";
export const store = configureStore({
  reducer: {
    students: crudSlice,
  },
});
