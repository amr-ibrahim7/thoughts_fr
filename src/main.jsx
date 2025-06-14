// import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/postContext";
import { UserProvider } from "./context/userContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  </AuthProvider>
  // </StrictMode>,
);
