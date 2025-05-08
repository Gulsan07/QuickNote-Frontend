import React, { useEffect, useState } from "react";
import {
  fetchNotes,
  deleteNote,
  updateNote,
  searchNote,
} from "../api/notesApi";
import { useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNote, setEditedNote] = useState({
    title: "",
    content: "",
    category: "",
    image_url: "",
  });
  const [keyword, setkeyword] = useState("");
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const getNotes = async () => {
      if (!token) return;
      const fetchedNotes = await fetchNotes(token);
      setNotes(fetchedNotes);
    };
    getNotes();
  }, [token]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!token) return;

      try {
        const result = keyword.trim()
          ? await searchNote(keyword, token)
          : await fetchNotes(token); // If search box is empty, fetch all notes
        setNotes(result);
      } catch (error) {
        console.error("Search failed:", error.message);
      }
    }, 500); // Wait 500ms before making the search

    return () => clearTimeout(delayDebounce); // Clean up the timeout
  }, [keyword, token]);

  const handleDelete = async (noteId) => {
    if (!token) return;
    console.log("delete note ", token)
    await deleteNote( noteId, token);
    setNotes(notes.filter((note) => note.id !== noteId));
    // await fetchNotes();
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditedNote({
      id: note.id,
      title: note.title,
      content: note.content,
      category: note.category,
      image_url: note.image_url || "",
    });
  };

  const handleAddNote = () => {
    navigate("/addNote");
  };

  const handleSave = async (note) => {
    if (!token) return;
    const updatedNote = { ...note, ...editedNote };
    await updateNote(note.id, updatedNote, token);
    setNotes(notes.map((n) => (n.id === note.id ? updatedNote : n)));
    setEditingNoteId(null);
  };

  const filteredNotes = notes.sort((a, b) =>
    sortOrderAsc
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-2xl">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
        📝 Your Notes
      </h2>

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-md min-w-96 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search notes by title ..."
          value={keyword}
          onChange={(e) => setkeyword(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex space-x-3 justify-end">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
            onClick={handleAddNote}
          >
            + Add Note
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md shadow"
            onClick={() => setSortOrderAsc(!sortOrderAsc)}
          >
            Sort: {sortOrderAsc ? "A → Z" : "Z → A"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
            onClick={() => {
              localStorage.removeItem("authToken"); // Clear token
              navigate("/"); // Redirect to login page
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isEditing={editingNoteId === note.id}
              editedNote={editedNote}
              onChange={(field, value) =>
                setEditedNote({ ...editedNote, [field]: value })
              }
              onSave={handleSave}
              onEdit={startEditing}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No notes found.
          </p>
        )}
      </div>
    </div>
  );
}

export default NoteList;


