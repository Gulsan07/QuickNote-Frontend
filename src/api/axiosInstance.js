import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust according to your backend
});

export default axiosInstance;
