import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import NoteCard from "./NoteCard";
import {
  createNewNote,
  fetchNotes,
  updateNote,
  deleteNote,
} from "../config/notes";
import Editor from "./Editor";
import "../styles/NotesList.css";
import ColorFilter from "./ColorFilter";
import SearchFilter from "./SearchFilter";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { currentUser } = useAuthContext();
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [tempNoteText, setTempNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("#ffffff");
  const [colorFilter, setColorFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [error, setError] = useState(null);

  const currentNoteRef = useRef(null);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const notesData = await fetchNotes(currentUser);
        setNotes(notesData);
      } catch (err) {
        setError("Failed to fetch notes. ", err);
      }
    };
    if (currentUser) getAllNotes();
  }, [currentUser]);

  // Apply filters whenever the colorFilter or searchFilter changes
  useEffect(() => {
    let filteredNotes = notes;

    if (colorFilter) {
      filteredNotes = filteredNotes.filter(
        (note) => note.color === colorFilter
      );
    }

    if (searchFilter) {
      filteredNotes = filteredNotes.filter((note) =>
        note.content.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    setFilteredNotes(filteredNotes);
  }, [notes, colorFilter, searchFilter]);

  // Set initial current note when notes are loaded
  useEffect(() => {
    if (!currentNoteId && notes.length > 0) {
      setCurrentNoteId(notes[0].id);
    }
  }, [notes, currentNoteId]);

  // Update temp state and ref when currentNoteId changes
  useEffect(() => {
    if (notes.length === 0) {
      setTempNoteText("");
      setNoteColor("#ffffff");
    } else if (currentNoteId) {
      const note = notes.find((note) => note.id === currentNoteId);
      if (note) {
        currentNoteRef.current = note;
        setTempNoteText(note.content);
        setNoteColor(note.color || "#ffffff");
      }
    }
  }, [currentNoteId, notes]);

  const handleNoteUpdate = async () => {
    try {
      if (
        tempNoteText !==
          (currentNoteRef.current && currentNoteRef.current.content) ||
        noteColor !== (currentNoteRef.current && currentNoteRef.current.color)
      ) {
        await updateNote(currentUser, currentNoteId, tempNoteText, noteColor);

        currentNoteRef.current = {
          ...currentNoteRef.current,
          content: tempNoteText,
          color: noteColor,
          updatedAt: new Date(),
        };
      }
    } catch (err) {
      setError("Failed to update note. ", err);
    }
  };

  useEffect(() => {
    handleNoteUpdate();
  }, [tempNoteText, noteColor]);

  const switchNote = async (noteId) => {
    if (currentNoteId && currentNoteRef.current) {
      if (!currentNoteRef.current.content) {
        await deleteNoteClick(currentNoteId);
      } else {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === currentNoteId ? { ...currentNoteRef.current } : note
          )
        );
      }
    }
    setCurrentNoteId(noteId);
  };

  const handleCreateClick = async () => {
    try {
      const noteRef = await createNewNote(currentUser, "", noteColor);
      const newNote = {
        id: noteRef.id,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        color: noteColor,
      };
      setTempNoteText("");
      switchNote(noteRef.id);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    } catch (err) {
      setError("Failed to create note. ", err);
    }
  };

  const deleteNoteClick = async (noteId) => {
    try {
      await deleteNote(currentUser, noteId);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (err) {
      setError("Failed to delete note. ", err);
    }
  };

  return (
    <div className="main">
      <ColorFilter colorFilter={colorFilter} setColorFilter={setColorFilter} />
      <div className="container">
        <SearchFilter
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <div className="notes-list">
          {error && <p className="error">{error}</p>}
          <div className="note-card new-note" onClick={handleCreateClick}>
            <div className="plus">+</div>
          </div>
          {filteredNotes.map((note) => (
            <div key={note.id}>
              {currentNoteId === note.id ? (
                <Editor
                  value={tempNoteText}
                  setValue={setTempNoteText}
                  color={noteColor}
                  setColor={setNoteColor}
                />
              ) : (
                <NoteCard
                  note={note}
                  switchNote={switchNote}
                  deleteNoteClick={deleteNoteClick}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
