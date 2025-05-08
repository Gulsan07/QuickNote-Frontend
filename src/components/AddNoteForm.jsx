import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../api/notesApi";

const AddNoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (title && content) {
      try {
        await addNote({ title, content, category, imageFile }, token);
        setTitle("");
        setContent("");
        setCategory("");
        setImageFile(null);
        navigate("/noteList");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 rounded-2xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📝 Add New Note
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="w-full p-3 border rounded-xl mb-4 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full p-3 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full p-3 border rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          ➕ Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNoteForm;
