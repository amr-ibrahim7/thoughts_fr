import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import ScrollToTop from "./components/ScrollToTop";
import AddPost from "./pages/AddPost";
import BlogDescription from "./pages/BlogDescription";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBlogs from "./pages/MyBlogs";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignUp from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/addpost"
          element={
            <PrivateRoute>
              <AddPost />
            </PrivateRoute>
          }
        />
        <Route
          path="/editblog/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/myblogs"
          element={
            <PrivateRoute>
              <MyBlogs />
            </PrivateRoute>
          }
        />

        <Route path="/blog/:id" element={<BlogDescription />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
