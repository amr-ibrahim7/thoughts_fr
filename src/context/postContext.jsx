import { createContext, useContext, useState } from "react";
import {
  apiAddComment,
  apiCreatePost,
  apiDeleteComment,
  apiDeletePost,
  apiFetchPost,
  apiFetchPostByCategory,
  apiFetchPostByUser,
  apiFetchPosts,
  apiUpdatePost,
} from "../api/postServices";

const postContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCreatePost(formData);
      if (response.data) {
        setPosts([response.data, ...posts]);
      }
      return response;
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to create post");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (page = 1, limit = 5) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPosts(page, limit);
      if (page === 1) {
        setPosts(response.posts || response);
      } else {
        setPosts((prevPosts) => [
          ...prevPosts,
          ...(response.posts || response),
        ]);
      }
      return response;
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async (postId) => {
    if (post && post._id === postId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPost(postId);
      setPost(response);
      return response;
    } catch (error) {
      setError(error.message || "Failed to fetch post");
      setPost(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (postId, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiUpdatePost(postId, formData);
      if (response.data) {
        setPosts(
          posts.map((post) =>
            post._id === postId ? { ...post, ...response.data } : post
          )
        );
        if (post && post._id === postId) {
          setPost({ ...post, ...response.data });
        }
      }
      return response;
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to update post");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiDeletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      setUserPosts(userPosts.filter((post) => post._id !== postId));
      setCategoryPosts(categoryPosts.filter((post) => post._id !== postId));

      if (post && post._id === postId) {
        setPost(null);
      }

      return response;
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete post");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPostByCategory(category);
      setCategoryPosts(response);
      return response;
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to fetch posts by category");
    } finally {
      setLoading(false);
    }
  };

  const fetchByUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPostByUser(userId);
      setUserPosts(response);
      return response;
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to fetch posts by user");
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId, comment) => {
    setError(null);
    try {
      const response = await apiAddComment(postId, comment);
      if (response.status === "success") {
        setPosts(
          posts.map((p) =>
            p._id === postId ? { ...p, comments: response.data } : p
          )
        );

        if (post && post._id === postId) {
          setPost({ ...post, comments: response.data });
        }
      }
      return response;
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to add comment");
      throw error;
    }
  };

  const deleteComment = async (postId, commentId) => {
    setError(null);
    try {
      const response = await apiDeleteComment(postId, commentId);
      if (response.status === "success") {
        setPosts(
          posts.map((p) =>
            p._id === postId
              ? {
                  ...p,
                  comments: p.comments.filter((c) => c._id !== commentId),
                }
              : p
          )
        );

       
        if (post && post._id === postId) {
          setPost({
            ...post,
            comments: post.comments.filter((c) => c._id !== commentId),
          });
        }
      }
      return response;
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete comment");
      throw error;
    }
  };

 

  return (
    <postContext.Provider
      value={{
        posts,
        post,
        userPosts,
        categoryPosts,
        loading,
        error,
        createPost,
        fetchPosts,
        fetchPost,
        updatePost,
        deletePost,
        fetchByCategory,
        fetchByUser,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export const usePost = () => {
  return useContext(postContext);
};
