import React from "react";
import "./Login.css";
import Input from "../Input/Input";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { loginUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userExist = () => toast.error("Invalid credentials");
const initialValues = {
  email: "",
  password: "",
};
const notify = () => toast.success("Login successfully");

const Login = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          const res = await loginUser(values);
          if (res?.data?.token) {
            console.log("Token is: ", res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userID", res.data.user.id);
            notify();
            setTimeout(() => {
              navigate("/viewNotes");
            }, 5000);
          } else {
            userExist();
          }
        } catch (error) {
          if (error.response?.data?.message === "user not exist") {
            userExist();
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        }
      },
    });
  return (
    <>
      <div className="LoginFormOuterWrapper">
        <form onSubmit={handleSubmit}>
          <div className="LoginFormContainer">
            <div className="LoginFormImage">
              <img
                className="w-50"
                src="./images/trade-banner.png"
                alt="Task Image"
              />
            </div>
            <div className="LoginFormContent">
              <h1>Login</h1>
              <div className="form-group">
                <label htmlFor="login_email">Email</label>
                <Input
                  placeholder="Enter your e-mail"
                  name="email"
                  id="login_email"
                  type="email"
                  onChange={handleChange}
                  values={values.email}
                  onBlur={handleBlur}
                  errors={errors.email}
                  touched={touched.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="login_password">Password</label>
                <Input
                  placeholder="Enter your password"
                  name="password"
                  id="login_password"
                  type="password"
                  onChange={handleChange}
                  values={values.password}
                  onBlur={handleBlur}
                  errors={errors.password}
                  touched={touched.password}
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="submit"
                  className="form-control btn btn-dark"
                  value="Login"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
