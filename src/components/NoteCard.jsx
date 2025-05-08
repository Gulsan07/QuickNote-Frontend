import React from "react";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note, isEditing, editedNote, onChange, onSave, onEdit, onDelete }) => {
  const navigate = useNavigate();
  // console.log(note);

  return (
    <div
      className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
      
    >
      {isEditing ? (
        <>
          <input
            className="w-full p-2 border rounded mb-2"
            value={editedNote.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded mb-2"
            value={editedNote.content}
            onChange={(e) => onChange("content", e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            value={editedNote.category}
            onChange={(e) => onChange("category", e.target.value)}
          />
         
          <input 
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded mb-2"          
          onChange={(e) => onChange("image_url", e.target.files[0])}
          />
         
          <button
            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onSave(editedNote);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <div  onClick={() => navigate(`/notes/${note.id}`)}>
          <h3 className="text-xl font-semibold">{note.title}</h3>
          <p className="text-gray-600 line-clamp-2">{note.content}</p>
          <p className="text-sm text-gray-400 mt-2">📂 {note.category}</p>
          {note.image_url && (
            <img
              src={note.image_url}
              alt="Note"
              className="mt-4 rounded-xl w-full h-36 object-cover"
            />
          )}
          <div className="mt-4 flex justify-center space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
