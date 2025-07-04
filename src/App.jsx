import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import ScrollToTop from "./components/ScrollToTop";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPosts from "./pages/MyPosts";
import NotFound from "./pages/NotFound";
import PostDescription from "./pages/PostDescription";
import Profile from "./pages/Profile";
import SignUp from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import AddPostIcon from "./components/AddPostIcon";

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
          path="/editpost/:id"
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
          path="/myposts"
          element={
            <PrivateRoute>
              <MyPosts />
            </PrivateRoute>
          }
        />

        <Route path="/post/:id" element={<PostDescription />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
       <AddPostIcon />
      <ScrollToTop />
    </>
  );
}

export default App;
