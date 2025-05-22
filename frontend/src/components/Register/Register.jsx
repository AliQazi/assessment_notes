import React from "react";
import "./Register.css";
import Input from "../Input/Input.jsx";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/index.jsx";
import { registerUser } from "../../api/userApi.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const userExist = () => toast.warning("User already registered");
const userRegistered = () => toast.success("User registered successfully");
const fieldsMissing = () => toast.error("Fill form completely");

const Register = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        if (
          !values.name ||
          !values.email ||
          !values.password ||
          !values.confirm_password
        ) {
          fieldsMissing();
        } else {
          try {
            const res = await registerUser(values);
            if (res?.data?.message === "User already register") {
              userExist();
            } else if (res?.data?.message === "User added successfully") {
              userRegistered();
              setTimeout(() => {
                navigate("/");
              }, 3000);
            }
          } catch (err) {
            toast.error("Something went wrong. Please try again.");
          }
        }
      },
    });
  return (
    <>
      <div className="RegisterOuterWrapper">
        <div className="RegisterContainer">
          <div className="row">
            <div className="col-md-6">
              <div className="RegisterForm">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="reg_name">Name</label>
                    <Input
                      type="text"
                      id="reg_name"
                      name="name"
                      placeholder="Enter your name"
                      onChange={handleChange}
                      values={values.name}
                      onBlur={handleBlur}
                      errors={errors.name}
                      touched={touched.name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg_email">Email</label>
                    <Input
                      type="text"
                      id="reg_email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      values={values.email}
                      onBlur={handleBlur}
                      errors={errors.email}
                      touched={touched.email}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      values={values.password}
                      onBlur={handleBlur}
                      errors={errors.password}
                      touched={touched.password}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirm_password"
                      placeholder="Enter your password again"
                      onChange={handleChange}
                      values={values.confirm_password}
                      onBlur={handleBlur}
                      errors={errors.confirm_password}
                      touched={touched.confirm_password}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <input
                      type="submit"
                      className="form-control btn btn-dark"
                      value="Register"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="RegisterImage">
                <img src="./images/user-registration.png" alt="Register" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
