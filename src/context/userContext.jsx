import { createContext, useContext, useState } from "react";
import { deleteUser, updateUser, uploadAvatar } from "../api/userServices";
import { useAuth } from "./AuthContext";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser, setLoading } = useAuth();
  const [error, setError] = useState(null);

  const updateUserProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateUser(userData);
      setUser((user) => ({
        ...user,
        ...response.data,
      }));
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const deleteUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteUser();
      localStorage.removeItem("accessToken");
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete profile");
      localStorage.removeItem("accessToken");
      setUser(null);
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  const uploadUserAvatar = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await uploadAvatar(formData);
      if (response.data) {
        setUser((user) => ({
          ...user,
          profilePicture: response.data.profilePicture,
        }));
      }
    } catch (error) {
      setError(error.message || "Failed to upload avatar");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <userContext.Provider
      value={{
        user,
        error,
        updateUserProfile,
        deleteUserProfile,
        uploadUserAvatar,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
