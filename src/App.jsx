import "./App.css";
import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddNoteForm from "./components/AddNoteForm";
import NoteList from "./components/NotesList";
import NoteDetailPage from "./pages/NoteDetailPage";

function App() {
  return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addNote" element={<AddNoteForm />} />
          <Route path="/noteList" element={<NoteList />} />
          <Route path="/notes/:noteId" element={<NoteDetailPage />} />
        </Routes>
  );
}

export default App;
