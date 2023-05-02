import noteContext from "./notesContext";
import { useState } from "react";
import Cookie from "js-cookie";

const NoteState = (props) => {
  // const host = "https://inotebook-backend-0jvu.onrender.com";

  const host = "http://localhost:5000";

  const jwtToken = Cookie.get("jwt_token");

  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const url = `${host}/api/notes/fetchAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": jwtToken,
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  const addNote = async (note) => {
    const url = `${host}/api/notes/addNote`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwtToken,
      },

      body: JSON.stringify(note),
    });
    getNotes();
  };

  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deleteNote/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": jwtToken,
      },
    });
    console.log("Deleting the note with id" + id);
    getNotes();
  };

  const editNote = async (note) => {
    const { title, description, tag, id } = note;
    const url = `${host}/api/notes/updateNote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwtToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNotes = await response.json();
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, editNote, getNotes, addNote, deleteNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
