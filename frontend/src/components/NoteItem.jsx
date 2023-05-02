import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";
import noteContext from "../context/notesContext";
import { useContext } from "react";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="note-card flex-grow-1 shadow bg-body rounded">
      <div className="name-icons-container">
        <h5 className="text-capitalize card-title">{note.title}</h5>
        <div className="icons-container">
          <button
            type="button"
            style={{
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={() => deleteNote(note._id)}
          >
            <MdOutlineDelete fontSize={20} />
          </button>
          <button
            type="button"
            style={{
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={() => updateNote(note)}
          >
            <MdOutlineEditNote fontSize={20} />
          </button>
        </div>
      </div>
      <p className="text-capitalize font-monospace fw-normal card-text mt-2">
        {note.description}
      </p>
    </div>
  );
};

export default NoteItem;
