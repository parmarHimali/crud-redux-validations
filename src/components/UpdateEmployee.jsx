import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSelectedEmployee,
  removeSelectedEmployee,
  updateEmployee,
} from "../store/crudSlice";
import { toast } from "react-toastify";
const UpdateEmployee = () => {
  const { employees, selected } = useSelector((state) => state.employees);
  const { eid } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchEmployee = async () => {
      dispatch(getSelectedEmployee(eid));
    };
    fetchEmployee();
    return () => {
      dispatch(removeSelectedEmployee());
    };
  }, [eid]);
  if (selected === undefined) {
    return (
      <h1 className="heading text-center mt-5 text-muted">
        Invalid Employee ID
      </h1>
    );
  }
  if (Object.keys(selected).length == 0) {
    return <h1 className="heading text-center mt-5 text-muted">Loading...</h1>;
  }

  const initialValues = {
    ename: selected.ename,
    email: selected.email,
    phone: selected.phone,
    password: selected.password,
    cpassword: selected.cpassword,
    gender: selected.gender,
    designation: selected.designation,
    doj: selected.doj,
    address: selected.address,
    pincode: selected.pincode,
    bname: selected.bname,
    bBranch: selected.bBranch,
    ifsc: selected.ifsc,
    account: selected.account,
  };

  console.log(selected);

  const validations = (values) => {
    const errors = {};
    if (values.ename.trim() === "") {
      errors.ename = "Employee name is required.";
    } else if (values.ename.length < 3) {
      errors.ename = "Name must contain atleast 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(values.ename)) {
      errors.ename = "Name can only contain alphabets.";
    }

    if (values.phone == "") {
      errors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Mobile number must be of 10 digits.";
    } else if (
      employees.some((emp) => emp.id != eid && emp.phone == values.phone)
    ) {
      errors.phone = "Mobile number already exists!";
    }

    if (values.email.trim() == "") {
      errors.email = "Email is required.";
    } else if (!/^[A-z0-9_.]+@[A-z0-9_.]+\.[A-Za-z]{2,4}$/.test(values.email)) {
      errors.email = "Invalid email format";
    } else if (
      employees.some((emp) => emp.id != eid && emp.email == values.email)
    ) {
      errors.email = "Email already exists!";
    }

    if (values.password.trim() == "") {
      errors.password = "Password is required.";
    } else if (!/[^A-Za-z0-9 ]/.test(values.password)) {
      errors.password = "Password must contain atleast one special characters";
    } else if (values.password.length < 6) {
      errors.password = "Password must be of atleast 6 characters.";
    }
    if (values.cpassword.trim() == "") {
      errors.cpassword = "Confirm password is require";
    } else if (values.password && values.cpassword != values.password) {
      errors.cpassword = "Password and confirm password must match!";
    }

    if (values.gender == "") {
      errors.gender = "Please select gender.";
    }

    if (values.designation == "") {
      errors.designation = "Please select designation";
    }

    if (values.address.trim() == "") {
      errors.address = "Please provide employee address";
    } else if (values.address.length < 10) {
      errors.address = "Address must contain atleast 10 characters";
    }

    if (values.pincode == "") {
      errors.pincode = "Pincode is required";
    } else if (!/^[1-9]{1}[0-9]{5}$/.test(values.pincode)) {
      errors.pincode = "Pincode is not valid";
    }

    if (values.doj == "") {
      errors.doj = "Please select Date of joining";
    } else if (values.doj > new Date().toISOString().split("T")[0]) {
      errors.doj = "joining date cannot be in future";
    }

    if (values.bname.trim() == "") {
      errors.bname = "Bank name is required";
    } else if (values.bname.length < 3) {
      errors.bname = "Bank name contain atleast 3 characters";
    } else if (values.bname.length > 50) {
      errors.bname = "Bank name connot exceed 50 characters";
    }

    if (values.bBranch.trim() == "") {
      errors.bBranch = "Branch name is required";
    } else if (values.bBranch.length < 3) {
      errors.bBranch = "Branch name contain atleast 3 characters";
    } else if (values.bBranch.length > 50) {
      errors.bBranch = "Branch name connot exceed 50 characters";
    }

    if (values.ifsc.trim() == "") {
      errors.ifsc = "Please provide IFSC code.";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(values.ifsc)) {
      errors.ifsc = "IFSC code is not valid";
    }
    if (values.account == "") {
      errors.account = "Please provide Account number";
    } else if (!/^\d{9,18}$/.test(values.account)) {
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
            Update Employee Information
          </h2>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = validations(values);
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              dispatch(updateEmployee({ ...values, id: eid }));
              toast.success("Employee Updated successfully!");
              resetForm();
              navigateTo("/");
            }}
          >
            <Form noValidate={true}>
              <div className="row">
                <div className="form-group mb-2 col-lg-6 col-sm-6 col-12">
                  <label htmlFor="ename">Employee Name: </label>
                  <Field
                    type="text"
                    name="ename"
                    id="ename"
                    className="form-control form-control-sm mt-1"
                  />
                  <ErrorMessage
                    className="form-text text-danger"
                    name="ename"
                    component={"div"}
                  />
                </div>

                <div className="form-group mb-2 col-lg-6 col-sm-12">
                  <label htmlFor="email">Employee Email: </label>
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
                <div className="form-group mb-2 col-lg-6 col-sm-6 col-12">
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
                <div className="form-group mb-2 col-md-6 col-12">
                  <label htmlFor="cpassword">Confirm Password: </label>
                  <Field
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    className="form-control form-control-sm mt-1"
                  />
                  <ErrorMessage
                    className="form-text text-danger"
                    name="cpassword"
                    component="div"
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group mb-2 col-md-6 col-12">
                  <label htmlFor="designation">Designation:</label>
                  <Field
                    as="select"
                    name="designation"
                    className="form-control form-control-sm mt-1"
                    id="designation"
                  >
                    <option value="">Select Designation</option>
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Laravel Developer">Laravel Developer</option>
                    <option value="Fullstack Developer">
                      Fullstack Developer
                    </option>
                    <option value="MERN stack Developer">
                      MERN stack Developer
                    </option>
                  </Field>
                  <ErrorMessage
                    name="designation"
                    id="designation"
                    className="form-text text-danger"
                    component={"div"}
                  />
                </div>
                <div className="form-group mb-2 col-md-6 col-12">
                  <label htmlFor="doj">Date of joining: </label>
                  <Field
                    type="date"
                    name="doj"
                    id="doj"
                    className="form-control form-control-sm mt-1"
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <ErrorMessage
                    className="form-text text-danger"
                    name="doj"
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
                    id="bname"
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
                    id="bBranch"
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
                    id="account"
                  />
                </div>
                <div className="form-group mb-2 col-md-6 col-12">
                  <label htmlFor="ifsc">IFSC Code:</label>
                  <Field
                    type="text"
                    name="ifsc"
                    className="form-control form-control-sm mt-1"
                    id="ifsc"
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
                  Update Employee
                </Button>
                <Link to={"/"}>
                  <Button type="button" variant="secondary" className="mt-2">
                    Cancel
                  </Button>
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default UpdateEmployee;
