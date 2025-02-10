import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import UpdateEmployee from "./components/UpdateEmployee";

const App = () => {
  const { employees } = useSelector((state) => state.employees);

  useEffect(() => {
    localStorage.setItem("employees-v2", JSON.stringify(employees));
  }, [employees]);

  return (
    <>
      <Routes>
        <Route path="/" Component={EmployeeList} />
        <Route path="/add" Component={AddEmployee} />
        <Route path="/update/:eid" Component={UpdateEmployee} />
        <Route path="*" Component={NotFound} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
