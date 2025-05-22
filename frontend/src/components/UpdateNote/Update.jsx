import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { notesSchema } from "../../schemas";
import { getNoteById, updateNote } from "../../api/userApi.js";
import Navbar from "../Navbar/Navbar.jsx";

const Update = () => {
  const [noteData, setNoteData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const notify = () => toast.success("Note updated successfully");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(params.id);
        setNoteData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [params.id]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: notesSchema,
    onSubmit: async (values) => {
      try {
        await updateNote(params.id, values);
        notify();
        navigate("/viewNotes");
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (Object.keys(noteData).length > 0) {
      formik.setValues(noteData);
    }
  }, [noteData]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
    <Navbar />
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <form className="form" onSubmit={formik.handleSubmit}>
              <h1 className="mb-4">Update note</h1>
              <div className="form-group my-3">
                <label htmlFor="title">Title:</label>
                <Input
                  placeholder="Enter note title"
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values.title}
                  touched={formik.touched.title}
                  errors={formik.errors.title}
                />
              </div>

              <div className="form-group my-3">
                <label htmlFor="description">Description:</label>
                <textarea
                  className={`form-control ${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  rows={7}
                  placeholder="Enter note description"
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
              </div>

              <div className="row mt-4">
                <div className="col-md-6">
                  <input
                    className="btn btn-dark form-control"
                    type="submit"
                    value="Update note"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="image-container">
              <img
                className="w-100"
                src="/images/task-management.avif"
                alt="Task"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Update;
