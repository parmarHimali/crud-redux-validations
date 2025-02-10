import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import { Route, Routes } from "react-router-dom";
import UpdateStudent from "./components/UpdateStudent";
import NotFound from "./components/NotFound";

const App = () => {
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <>
      <Routes>
        <Route path="/" Component={StudentList} />
        <Route path="/add" Component={AddStudent} />
        <Route path="/update/:sid" Component={UpdateStudent} />
        <Route path="*" Component={NotFound} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
