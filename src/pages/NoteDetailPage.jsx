import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNotes } from "../api/notesApi"; // or fetchSingleNote if you have it

const NoteDetailPage = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const notes = await fetchNotes(token); // if you have a specific fetchNoteById, use that instead
        const foundNote = notes.find((n) => n.id.toString() === noteId);
        setNote(foundNote);
      } catch (err) {
        console.error("Error loading note:", err);
      }
    };
    fetchNote();
  }, [noteId, token]);

  if (!note) return <div className="p-6 text-center">Loading note...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <button
        onClick={() => navigate("/noteList")}
        className="mb-4 bg-gray-200 px-4 py-2 rounded"
      >
        ← Back
      </button>
      <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{note.title}</h2>
        <p className="text-gray-600 mb-2">{note.content}</p>
        <p className="text-sm text-gray-500 mb-4">📂 {note.category}</p>
        {note.image_url || (
          <img
            src={note.imageUrl}
            alt="Image ..."
            className="w-full rounded-xl shadow"
          />
        )}
      </div>
    </div>
  );
};

export default NoteDetailPage;
