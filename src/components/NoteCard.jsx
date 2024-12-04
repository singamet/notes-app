import PropTypes from "prop-types";

export default function NoteCard({ note, switchNote, deleteNoteClick }) {
  return (
    <div
      className="note-card"
      onClick={() => switchNote(note.id)}
      style={{ backgroundColor: note.color || "#ffffff" }}
    >
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          deleteNoteClick(note.id);
        }}
      >
        <i className="material-icons">delete</i>
      </button>
      <div
        dangerouslySetInnerHTML={{ __html: note.content }}
        className="content"
      ></div>
    </div>
  );
}
NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    color: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  switchNote: PropTypes.func.isRequired,
  deleteNoteClick: PropTypes.func.isRequired,
};
