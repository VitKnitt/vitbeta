import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";

const PostBlog = () => {
  const URL = useSelector(selectUrl);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [files, setFiles] = useState("");
  const [neautorizovany, setNeautorizovany] = useState(false);

  useEffect(() => {
    const checkrole = async () => {
      const result = await fetch(URL + "checkrole", {
        method: "POST",
        credentials: "include",
      });
      if (result.status !== 200) {
        console.log("neautorizovany vstup");
        setNeautorizovany(true);
      }
    };
    checkrole();
  }, []);

  const handlePost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("text", text);
    data.set("file", files[0]);
    e.preventDefault();

    const response = await fetch(URL + "postblog", {
      method: "POST",
      body: data,
      credentials: "include",
    }).catch((err) => console.log(err));
  };

  if (neautorizovany) {
    return <Navigate to="/" />;
  }

  return (
    <div className="postblog">
      <h1>Post new blog</h1>
      <form onSubmit={handlePost} className="postblogform">
        <h2>Nadpis</h2>
        <input
          type="text"
          placeholder="nadpis"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>obsah</h2>
        <textarea
          placeholder="text blogu"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <h2>Obrazek</h2>
        <input
          type="file"
          required
          onChange={(e) => setFiles(e.target.files)}
        />
        <button type="submit">vloz</button>
      </form>
    </div>
  );
};

export default PostBlog;
