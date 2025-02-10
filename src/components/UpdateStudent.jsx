import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSelectedStudent, updateStudent } from "../store/crudSlice";
import { toast } from "react-toastify";
const UpdateStudent = () => {
  const { students } = useSelector((state) => state.students);
  const { sid } = useParams();
  const { selected } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const initialValues = {
    sname: selected.sname,
    email: selected.email,
    phone: selected.phone,
    password: selected.password,
    gender: selected.gender,
    course: selected.course,
    dob: selected.dob,
    address: selected.address,
    pincode: selected.pincode,
    bname: selected.bname,
    bBranch: selected.bBranch,
    ifsc: selected.ifsc,
    account: selected.account,
  };

  useEffect(() => {
    const fetchStudent = async () => {
      dispatch(getSelectedStudent(sid));
    };
    fetchStudent();
  }, [sid]);

  console.log(selected);
  if (selected == undefined) {
    return (
      <h1 className="heading text-center mt-5 text-muted">
        Invalid Student ID
      </h1>
    );
  }
  if (Object.keys(selected).length == 0) {
    return <h1>Loading...</h1>;
  }

  const validations = (values) => {
    const errors = {};
    if (values.sname === "") {
      errors.sname = "Student name is required.";
    } else if (values.sname.length < 3) {
      errors.sname = "Name must contain atleast 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(values.sname)) {
      errors.sname = "Name can only contain alphabets.";
    }

    if (values.phone == "") {
      errors.phone = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(values.phone)) {
      errors.phone = "Mobile number must be of 10 digits.";
    } else if (
      students.some((stud) => stud.id != sid && stud.phone == values.phone)
    ) {
      errors.phone = "Mobile number already exists!";
    }

    if (values.email == "") {
      errors.email = "Email is required.";
    } else if (!/^[A-z0-9_.]+@[A-z0-9_.]+\.[A-Za-z]{2,4}$/.test(values.email)) {
      errors.email = "Invalid email format";
    } else if (
      students.some((stud) => stud.id != sid && stud.email == values.email)
    ) {
      errors.email = "Email already exists!";
    }

    if (values.password == "") {
      errors.password = "Password is required.";
    } else if (!/[^A-Za-z0-9 ]/.test(values.password)) {
      errors.password = "Password must contain atleast one special characters";
    } else if (values.password.length < 6) {
      errors.password = "Password must be of atleast 6 characters.";
    }

    if (values.gender == "") {
      errors.gender = "Please select gender.";
    }

    if (values.course == "") {
      errors.course = "Please select course";
    }

    if (values.address == "") {
      errors.address = "Please provide student address";
    } else if (values.address.length < 10) {
      errors.address = "Address must contain atleast 10 characters";
    }

    if (values.pincode == "") {
      errors.pincode = "Pincode is required";
    } else if (!/^[1-9]{1}[0-9]{5}$/.test(values.pincode)) {
      errors.pincode = "Pincode is not valid";
    }

    if (values.dob == "") {
      errors.dob = "Please select Date of Birth";
    } else if (values.dob > new Date().toISOString().split("T")[0]) {
      errors.dob = "Birth date cannot be in future";
    }

    if (values.bname == "") {
      errors.bname = "Bank name is required";
    } else if (values.bname.length < 3) {
      errors.bname = "Bank name contain atleast 3 characters";
    } else if (values.bname.length > 50) {
      errors.bname = "Bank name connot exceed 50 characters";
    }

    if (values.bBranch == "") {
      errors.bBranch = "Branch name is required";
    } else if (values.bBranch.length < 3) {
      errors.bBranch = "Branch name contain atleast 3 characters";
    } else if (values.bBranch.length > 50) {
      errors.bBranch = "Branch name connot exceed 50 characters";
    }

    if (values.ifsc == "") {
      errors.ifsc = "Please provide IFSC code.";
    } else if (!/^[A-Z]{4}0[0-9]{6}$/.test(values.ifsc)) {
      errors.ifsc = "IFSC code is not valid";
    }
    if (values.account == "") {
      errors.account = "Please provide Account number";
    } else if (!/^[0-9]{9,18}$/.test(values.account)) {
      errors.account = "Account number must contain digits between 9 to 18";
    }
    return errors;
  };
  return (
    <>
      <Container className="main-container">
        <div
          className="text-dark p-4 rounded shadow"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <h2 className="heading text-center mb-3">
            Update Student Information
          </h2>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = validations(values);
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              dispatch(updateStudent({ ...values, id: sid }));
              toast.success("Student Updated successfully!");
              resetForm();
              navigateTo("/");
            }}
          >
            {({ values, errors }) => {
              return (
                <Form noValidate={true}>
                  <div className="row">
                    <div className="form-group mb-2 col-lg-4 col-sm-6 col-12">
                      <label htmlFor="sname">Student Name: </label>
                      <Field
                        type="text"
                        name="sname"
                        id="sname"
                        className="form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        className="form-text text-danger"
                        name="sname"
                        component={"div"}
                      />
                    </div>
                    <div className="form-group mb-2 col-lg-4 col-sm-6 col-12">
                      <label htmlFor="phone">Mobile number: </label>
                      <Field
                        type="number"
                        name="phone"
                        id="phone"
                        className="form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        className="form-text text-danger"
                        name="phone"
                        component="div"
                      />
                    </div>
                    <div className="form-group mb-2 col-lg-4 col-sm-12">
                      <label htmlFor="email">Student Email: </label>
                      <Field
                        type="text"
                        name="email"
                        id="email"
                        className="form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        className="form-text text-danger"
                        name="email"
                        component="div"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mb-2 col-md-6 col-12">
                      <label htmlFor="password">Password: </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        className="form-text text-danger"
                        name="password"
                        component="div"
                      />
                    </div>
                    <div className="form-group col-md-6 col-12 mb-2 align-self-center">
                      <label htmlFor="gender" className="me-2">
                        gender:
                      </label>
                      <div className="form-check form-check-inline">
                        <Field
                          type="radio"
                          name="gender"
                          id="male"
                          value="Male"
                          className="form-check-input"
                        />
                        <label htmlFor="male" className="form-check-label">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <Field
                          type="radio"
                          name="gender"
                          id="female"
                          value="Female"
                          className="form-check-input"
                        />
                        <label htmlFor="female" className="form-check-label">
                          Female
                        </label>
                      </div>
                      <ErrorMessage
                        name="gender"
                        component={"div"}
                        className="form-text text-danger"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mb-2 col-md-6 col-12">
                      <label htmlFor="course">Course:</label>
                      <Field
                        as="select"
                        name="course"
                        className="form-control form-control-sm mt-1"
                      >
                        <option value="">select course</option>
                        <option value="BCA">BCA</option>
                        <option value="BCOM">BCOM</option>
                        <option value="BA">BA</option>
                        <option value="MCOM">MCOM</option>
                        <option value="MCA">MCA</option>
                        <option value="MscIT">MscIT</option>
                      </Field>
                      <ErrorMessage
                        name="course"
                        id="course"
                        className="form-text text-danger"
                        component={"div"}
                      />
                    </div>
                    <div className="form-group mb-2 col-md-6 col-12">
                      <label htmlFor="dob">Date of Birth: </label>
                      <Field
                        type="date"
                        name="dob"
                        id="dob"
                        className="form-control form-control-sm mt-1"
                        max={new Date().toISOString().split("T")[0]}
                      />
                      <ErrorMessage
                        className="form-text text-danger"
                        name="dob"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6 col-12">
                      <label htmlFor="address">Address:</label>
                      <Field
                        as="textarea"
                        name="address"
                        id="address"
                        rows="3"
                        className="w-100 form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        name="address"
                        className="form-text text-danger"
                        component={"div"}
                      />
                    </div>
                    <div className="form-group mb-2 col-md-6 col-12 align-self-center">
                      <label htmlFor="pincode">Pincode:</label>
                      <Field
                        type="textarea"
                        name="pincode"
                        id="pincode"
                        rows="3"
                        className="w-100 form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        name="address"
                        className="form-text text-danger"
                        component={"div"}
                      />
                    </div>
                  </div>
                  <hr />

                  {/* bank info */}
                  <h2 className="heading my-3 text-center">Bank Information</h2>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6 col-12">
                      <label htmlFor="bname">Bank Name:</label>
                      <Field
                        type="text"
                        name="bname"
                        className="form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        name="bname"
                        className="text-danger form-text"
                        component={"div"}
                      />
                    </div>
                    <div className="form-group mb-2 col-md-6 col-12">
                      <label htmlFor="bBranch">Bank Name:</label>
                      <Field
                        type="text"
                        name="bBranch"
                        className="form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        name="bBranch"
                        className="text-danger form-text"
                        component={"div"}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6 col-12">
                      <label htmlFor="account">Account Number:</label>
                      <Field
                        type="text"
                        name="account"
                        className="form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        name="account"
                        className="text-danger form-text"
                        component={"div"}
                      />
                    </div>
                    <div className="form-group mb-2 col-md-6 col-12">
                      <label htmlFor="ifsc">IFSC Code:</label>
                      <Field
                        type="text"
                        name="ifsc"
                        className="form-control form-control-sm mt-1"
                      />
                      <ErrorMessage
                        name="ifsc"
                        className="text-danger form-text"
                        component={"div"}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex gap-2 justify-content-end">
                    <Button type="submit" variant="warning" className="mt-2">
                      Update Student
                    </Button>
                    <Link to={"/"}>
                      <Button
                        type="button"
                        variant="secondary"
                        className="mt-2"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default UpdateStudent;
