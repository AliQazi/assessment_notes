import React, { useEffect, useState } from "react";
import "./ShowNotes.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNotes, deleteNote } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const ShowNotes = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- search state
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const getUserNote = async () => {
    try {
      const res = await getNotes();
      const filteredNotes = res.filter((note) => note.user === userID);
      setData(filteredNotes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserNote();
  }, []);

  const notify = () => toast.error("Note deleted successfully");
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      notify();
      setTimeout(() => {
        getUserNote();
      }, 6000);
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  // search functionality
  const filteredData = data.filter((note) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(lowerSearch) ||
      note.description.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-end mb-4">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search notes by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredData.length === 0 ? (
            <h1 className="d-block w-100 text-dark">No record found...!!</h1>
          ) : (
            filteredData.map((taskData, ind) => {
              return (
                <div className="col" key={ind}>
                  <div className="card h-100">
                    <div className="card-body">
                      <p className="card-text text-capitalize">
                        <span className="fw-bold">Note title:</span>{" "}
                        {taskData.title}
                      </p>
                      <p className="card-text text-capitalize">
                        <span className="fw-bold">Note description:</span>{" "}
                        {taskData.description}
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() =>
                            navigate(`/updateNote/${taskData._id}`)
                          }
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteNote(taskData._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShowNotes;
