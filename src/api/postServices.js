import API from "./axios";

export const apiCreatePost = async (formData) => {
  try {
    const response = await API.post("/posts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiFetchPosts = async (page = 1, limit = 5) => {
  try {
    const response = await API.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiFetchPost = async (postId) => {
  try {
    const response = await API.get(`/posts/?postId=${postId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiUpdatePost = async (postId, postData) => {
  try {
    const response = await API.patch(
      `/posts/update/?postId=${postId}`,
      postData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiDeletePost = async (postId) => {
  try {
    const response = await API.delete(`/posts/delete/?postId=${postId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiFetchPostByCategory = async (category) => {
  try {
    const response = await API.get(`/posts/category/?category=${category}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiFetchPostByUser = async (userId) => {
  try {
    const response = await API.get(`/posts/author?authorId=${userId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
