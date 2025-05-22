import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const notify = () => toast.success('Logout successfully');
  const auth = localStorage.getItem('token');
  const navigate = useNavigate()
  const logout = () => {
    notify()
    setTimeout(() => {
      navigate("/")
      localStorage.clear();
    }, 5000);
  };


  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
              <Link className="navbar-brand text-danger fw-bold" to="/">
                NOTES
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {auth ? (
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-2">
                      <Link className=" btn btn-warning" to="/add-notes">
                        <i className="fa-solid fa-plus me-1"></i>Add Notes
                      </Link>
                    </li>
                    <li className="nav-item me-2">
                      <Link className=" btn btn-info" to="/viewNotes">
                        <i className="fa-solid fa-eye me-1"></i>View Notes
                      </Link>
                    </li>
                    <Link onClick={logout} className="btn btn-danger" type="submit">
                      <i className="fa-solid fa-right-from-bracket me-1"></i>Logout
                    </Link>
                  </ul>
                ) : (
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                      <Link className="btn btn-warning" to="/">
                        <i className="fa-solid fa-right-to-bracket me-1"></i>Login
                      </Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="btn btn-danger ms-2" to="/register">
                        <i className="fa-solid fa-file-invoice me-1"></i>Register
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
