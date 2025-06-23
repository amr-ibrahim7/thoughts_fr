// import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/postContext";
import { UserProvider } from "./context/userContext";
import "./index.css";
import { ThemeProvider } from "./context/ThemeProvider";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <AuthProvider>
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  </AuthProvider>
      </ThemeProvider>
  // </StrictMode>,
);
