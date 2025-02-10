import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStudent } from "../store/crudSlice";
import { toast } from "react-toastify";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const StudentList = () => {
  const { students } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    const isDelete = confirm("Are you sure to delete student?");
    if (isDelete) {
      dispatch(deleteStudent(id));
      toast.success("Student Deleted Successfully!");
    }
  };

  return (
    <>
      <Container className="main-container">
        <Link
          className="d-flex w-100 justify-content-end"
          to={"/add"}
          style={{ textDecoration: "none" }}
        >
          <Button variant="secondary">Add Student</Button>
        </Link>
        <h2 className="heading text-center my-3">Student List</h2>
        <Table
          bordered={true}
          striped
          responsive
          className="text-center"
          size="sm"
        >
          <thead>
            <tr className="align-middle">
              <th>Student Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              {/* <th>Password</th> */}
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Course</th>
              {/* <th>Address</th> */}
              <th>Pincode</th>
              <th>Bank Name</th>
              <th>Branch Name</th>
              <th>Account No.</th>
              <th>IFSC Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              [...students].reverse().map((student) => {
                return (
                  <tr key={student.id} className="align-middle">
                    <td>{student.sname}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    {/* <td>{student.password}</td> */}
                    <td>{student.gender}</td>
                    <td>{student.dob}</td>
                    <td>{student.course}</td>
                    {/* <td>{student.address}</td> */}
                    <td>{student.pincode}</td>
                    <td>{student.bname}</td>
                    <td>{student.bBranch}</td>
                    <td>{student.account}</td>
                    <td>{student.ifsc}</td>
                    <td className="d-flex gap-2">
                      <Link to={`/update/${student.id}`}>
                        <Button variant="warning">
                          <FaEdit />
                        </Button>
                      </Link>

                      <Button
                        variant="danger"
                        onClick={() => handleDelete(student.id)}
                      >
                        <RiDeleteBin5Fill />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={14}>No Students found!</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default StudentList;
