import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: JSON.parse(localStorage.getItem("employees-v2")) || [],
  selected: {},
};
const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id != action.payload
      );
    },
    updateEmployee: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee.id == action.payload.id ? action.payload : employee
      );
    },
    getSelectedEmployee: (state, action) => {
      console.log(action.payload);
      state.selected = state.employees.find((emp) => emp.id == action.payload);
    },
    removeSelectedEmployee: (state) => {
      state.selected = {};
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getSelectedEmployee,
  removeSelectedEmployee,
} = crudSlice.actions;
export default crudSlice.reducer;
