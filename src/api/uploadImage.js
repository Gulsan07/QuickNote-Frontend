import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post("http://localhost:8080/api/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.imageUrl;
};