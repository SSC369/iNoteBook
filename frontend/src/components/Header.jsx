import { useLocation, Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import noteContext from "../context/notesContext";
import { useContext } from "react";

const Header = () => {
  const context = useContext(noteContext);
  let location = useLocation();
  const jwtToken = Cookie.get("jwt_token");
  const navigate = useNavigate();

  const { removeNotes } = context;

  const onLogout = () => {
    Cookie.remove("jwt_token");
    navigate("/api/auth/login");
    removeNotes();
  };

  return (
    <nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="font-monospace navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="m-auto navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li
              className={`nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
          </ul>

          {jwtToken ? (
            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={onLogout}
                className=" mt-3 btn btn-primary mb-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <ul className="d-flex nav-buttons">
              <li>
                <Link to="/api/auth/login">
                  <button type="button" className="btn btn-primary mx-2">
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/api/auth/signup">
                  <button type="button" className="btn btn-primary mx-2">
                    Signup
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
