import React, { useContext, useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import Header from "./Header";
import noteContext from "../context/notesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const [status, setStatus] = useState("LOADING");
  const context = useContext(noteContext);
  const { getNotes, notes, editNote } = context;
  const ref = useRef(null);
  const jwtToken = Cookie.get("jwt_token");
  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  useEffect(() => {
    if (jwtToken) {
      getNotes();
      setStatus("SUCCESS");
    } else {
      navigate("/api/auth/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <AddNote />

      <button
        ref={ref}
        type="button"
        style={{ display: "none" }}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    value={note.title}
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    value={note.description}
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tag">
                    Tag
                  </label>
                  <input
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                    type="text"
                    className="form-control"
                    id="tag"
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    data-bs-dismiss="modal"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-center p-3 m-auto">
        {status === "LOADING" ? (
          <div className="loading-container">
            <ColorRing
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        ) : notes.length === 0 ? (
          <h1 className="text-primary fw-normal font-monospace">
            No Notes To Show !!
          </h1>
        ) : (
          <ul className="d-flex flex-wrap">
            {notes.map((note) => (
              <NoteItem note={note} updateNote={updateNote} key={note._id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Notes;
