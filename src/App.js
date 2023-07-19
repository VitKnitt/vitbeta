import "./App.css";
import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import PostBlog from "./pages/PostBlog";
import SingleBlog from "./pages/SingleBlog";
import Books from "./pages/Books";
import Contact from "./pages/Contact";
import IndexPage from "./pages/IndexPage";
import Paintings from "./pages/Paintings";
import Layout from "./Layout";
import Login from "./pages/Login";
import { UserContextProvider } from "./UserContext";
import Register from "./pages/Register";
import PostPainting from "./pages/PostPainting";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import SinglePainting from "./pages/SinglePainting";
import PersonalData from "./pages/PersonalData";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/PostBlog" element={<PostBlog />} />
          <Route path="/singleblog/:id" element={<SingleBlog />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/paintings" element={<Paintings />} />
          <Route path="/paintings/:id" element={<SinglePainting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/postpainting" element={<PostPainting />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/passwordreset/:id/:token" element={<PasswordReset />} />
          <Route path="/personaldata" element={<PersonalData />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
