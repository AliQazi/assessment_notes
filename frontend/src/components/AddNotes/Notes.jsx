import React from "react";
import Input from "../Input/Input";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notesSchema } from "../../schemas";
import { addNote } from "../../api/userApi";


const initialValues = {
  title: "",
  description: "",
};

const Notes = () => {
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const notify = () => toast.success("Note added successfully");

  const onSubmit = async (values) => {
    try {
      await addNote({...values, user: userID});
      notify();
      navigate("/viewNotes");
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: notesSchema,
      onSubmit,
    });
  return (
    <>
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <form className="form" onSubmit={handleSubmit}>
              <h1 className="mb-4">Add note</h1>
              <div className="form-group my-3">
                <label htmlFor="title">Title:</label>
                <Input
                  placeholder="Enter note title"
                  id="title"
                  name="title"
                  type="text"
                  onChange={handleChange}
                  values={values.title}
                  onBlur={handleBlur}
                  errors={errors.title}
                  touched={touched.title}
                />
              </div>

              <div className="form-group my-3">
                <label htmlFor="description">Description:</label>
                <textarea
                  className={`form-control ${
                    touched.description && errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  rows={7}
                  placeholder="Enter note description"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </div>

              <div className="row mt-4">
                <div className="col-md-6">
                  <input
                    className="btn btn-dark form-control"
                    type="submit"
                    value="Add note"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="image-container">
              {/* Add your beautiful image here */}
              <img
                className="w-100"
                src="./images/task-management.avif"
                alt="Task sas"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Notes;
