import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../store/crudSlice";
import { toast } from "react-toastify";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const { employees } = useSelector((state) => state.employees);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    const isDelete = confirm("Are you sure to delete employee?");
    if (isDelete) {
      toast.success("Employee Deleted Successfully!");
      dispatch(deleteEmployee(id));
    }
  };
  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleSearch = (e) => {
    const sQuery = e.target.value;
    console.log(sQuery);

    setSearch(sQuery);
    const filteredEmployees = employees.filter((employee) => {
      if (employee.ename.toLowerCase().includes(sQuery.toLowerCase())) {
        return employee;
      }
    });
    setFilteredEmployees(filteredEmployees);
  };
  return (
    <>
      <Container className="main-container">
        <div className="d-flex justify-content-between">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search employee"
            onChange={handleSearch}
            value={search}
          />
          <Link
            className="d-flex justify-content-end"
            to={"/add"}
            style={{ textDecoration: "none" }}
          >
            <Button variant="secondary">Add Employee</Button>
          </Link>
        </div>
        <h2 className="heading text-center my-3">Employee List</h2>
        <Table
          bordered={true}
          striped
          responsive
          className="text-center"
          size="sm"
        >
          <thead>
            <tr className="align-middle">
              <th>Employee Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Date of Joining</th>
              <th>Designation</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Bank Name</th>
              <th>Branch Name</th>
              <th>Account No.</th>
              <th>IFSC Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              [...filteredEmployees].reverse().map((employee) => {
                return (
                  <tr key={employee.id} className="align-middle">
                    <td>{employee.ename}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.password}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.doj}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.address}</td>
                    <td>{employee.pincode}</td>
                    <td>{employee.bname}</td>
                    <td>{employee.bBranch}</td>
                    <td>{employee.account}</td>
                    <td>{employee.ifsc}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/update/${employee.id}`}>
                          <Button variant="warning">
                            <FaEdit />
                          </Button>
                        </Link>

                        <Button
                          variant="danger"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <RiDeleteBin5Fill />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={14}>No Employee found!</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default EmployeeList;
