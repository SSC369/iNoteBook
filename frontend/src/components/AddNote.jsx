import React, { useState, useContext } from "react";
import noteContext from "../context/notesContext";
import Cookie from "js-cookie";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const name = Cookie.get("name");

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex flex-column align-items-center container my-3 p-3">
      <h1>
        Hi{" "}
        <span className="text-uppercase font-monospace fw-bold text-primary">
          {name}
        </span>
      </h1>
      <h2>
        Add a{" "}
        <span className="text-primary font-monospace fw-normal">Note</span>
      </h2>
      <form
        style={{
          minWidth: "200px",
        }}
        onSubmit={handleSubmit}
        className=" w-50 my-3"
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            value={note.title}
            type="text"
            className="shadow-sm form-control"
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
            className="shadow-sm form-control"
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
            className="shadow-sm form-control"
            id="tag"
          />
        </div>
        <button type="submit" className="shadow btn btn-primary">
          Submit
        </button>
      </form>
      <h2 className="mb-0">
        Your{" "}
        <span className="text-primary font-monospace fw-normal">Notes</span>{" "}
      </h2>
    </div>
  );
};

export default AddNote;
