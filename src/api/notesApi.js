import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/notes"; // Update with your backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all notes for the logged-in user
export const fetchNotes = async (token) => {
  if (!token || token === "null") {
    throw new Error("No token found");
  }

  console.log("Fetching notes from backend...");

  try {
    const response = await axiosInstance.get("/get-user-note", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // If response is valid, return notes
    console.log("Notes fetched successfully");
    return response.data;
  } catch (error) {
    // Enhanced error handling
    console.error("Error fetching notes:", error.response ? error.response.data : error.message);
    return []; // Return an empty array as a fallback
  }
};


// Add note
export const addNote = async (noteData, token) => {
  if (!token) throw new Error("No token found");

  try {
    const formData = new FormData();
    formData.append("title", noteData.title);
    formData.append("content", noteData.content);
    formData.append("category", noteData.category);
    if (noteData.imageFile) {
      formData.append("image", noteData.imageFile);
    }

    const response = await axiosInstance.post("/create-note", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in adding note:", error);
    throw error;
  }
};

// Update note
export const updateNote = async (noteId, updatedNote ,token) => {
  if (!token) throw new Error("No token found");
  console.log(token)

  try {
    const response = await axiosInstance.put(`/update-note/${noteId}`, updatedNote, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating note: ", error.response?.data || error.message);
    throw error;
  }
  
};

// Delete note
export const deleteNote = async (noteId, token) => {
  if (!token) throw new Error("No token found");
  console.log(token);

  try {
    const response = await axiosInstance.delete(`/delete-note/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("errer deleting notes: ", error);
    throw error;
  }
};

// Serch note
export const searchNote = async (keyword, token) => {
  if (!token) throw new Error("No token found");
console.log(token)
  try {
    const response = await axiosInstance.get("/search", {
      params:{keyword},
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("errer deleting notes: ", error);
    throw error;
  }
};
