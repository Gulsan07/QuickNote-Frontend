import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Replace with backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signupUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
