import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: JSON.parse(localStorage.getItem("students")) || [],
  selected: {},
};
const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id != action.payload
      );
    },
    updateStudent: (state, action) => {
      state.students = state.students.map((student) =>
        student.id == action.payload.id ? action.payload : student
      );
    },
    getSelectedStudent: (state, action) => {
      state.selected = state.students.find((stud) => stud.id == action.payload);
    },
  },
});

export const { addStudent, deleteStudent, updateStudent, getSelectedStudent } =
  crudSlice.actions;
export default crudSlice.reducer;
