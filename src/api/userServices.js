import API from "./axios";

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await API.get("/users/profile");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await API.patch("/users/update", userData);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteUser = async () => {
  try {
    const response = await API.delete("/users/delete");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const uploadAvatar = async (formData) => {
  try {
    const response = await API.post("/users/upload-profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Unknown error occurred" };
  }
};
