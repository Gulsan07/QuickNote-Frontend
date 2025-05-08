import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotes, addNote, updateNote, deleteNote } from "../api/notesApi";

// ✅ Fetch Notes Action
export const fetchNotesThunk = createAsyncThunk("notes/fetchNotes", async (token) => {
  return await fetchNotes(token);
});

// ✅ Add Note Action
export const addNoteThunk = createAsyncThunk("notes/addNote", async (noteData, token) => {
  return await addNote(token, noteData);
});

// ✅ Update Note Action
export const updateNoteThunk = createAsyncThunk("notes/updateNote", async ({ noteId, updatedData, token }, { getState }) => {
  return await updateNote(token, noteId, updatedData);
});

// ✅ Delete Note Action
export const deleteNoteThunk = createAsyncThunk("notes/deleteNote", async (noteId, token) => {
  return await deleteNote(token, noteId);
});

// Initial State
const noteSlice = createSlice({
  name: "notes",
  initialState: { notes: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesThunk.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNoteThunk.fulfilled, (state, action) => {
        const index = state.notes.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) state.notes[index] = action.payload;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.notes = state.notes.filter((n) => n.id !== action.payload);
      });
  },
});

export default noteSlice.reducer;
