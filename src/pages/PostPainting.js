import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";

const PostPainting = () => {
  const URL = useSelector(selectUrl);
  const token = useSelector((state) => state.users.cookie);
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [serie, setSerie] = useState("");
  const [year, setYear] = useState("");
  const [smallFiles, setSmallFiles] = useState("");
  const [bigFiles, setBigFiles] = useState("");
  const [additionalFiles, setAdditionalFiles] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [neautorizovany, setNeautorizovany] = useState(false);

  useEffect(() => {
    const checkrole = async () => {
      const result = await fetch(URL + "checkrole", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      if (result.status !== 200) {
        console.log("neautorizovany vstup");
        setNeautorizovany(true);
      } else {
        console.log("welcome");
      }
    };
    checkrole();
  }, []);

  const postPainting = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("body", body);
    data.set("serie", serie);
    data.set("year", year);
    data.append("file", smallFiles[0]);
    data.append("file", bigFiles[0]);
    data.append("file", additionalFiles[0]);
    data.set("additionalInfo", additionalInfo);
    data.set("token", token);

    const response = await fetch(URL + "postpainting", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.status === 200) {
      console.log("painting added to gallery");
    } else {
      console.log("internal error");
    }
  };

  if (neautorizovany) {
    return <Navigate to="/" />;
  }

  return (
    <div className="postpainting">
      <h1>Post new painting</h1>
      <form onSubmit={postPainting} className="postpaintingform">
        <h2>title:</h2>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>text:</h2>
        <textarea
          placeholder="body"
          value={body}
          onChange={(e) => setbody(e.target.value)}
        />
        <h2>serie:</h2>
        <input
          type="text"
          placeholder="serie"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
        />
        <h2>year:</h2>
        <input
          type="text"
          placeholder="year"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <p>small file:</p>
        <input
          type="file"
          required
          onChange={(e) => setSmallFiles(e.target.files)}
        />
        <p>big file:</p>
        <input
          type="file"
          required
          onChange={(e) => setBigFiles(e.target.files)}
        />
        <p>additional file:</p>
        <input
          type="file"
          onChange={(e) => setAdditionalFiles(e.target.files)}
        />
        <textarea
          placeholder="additional info"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
        <button type="submit">vloz</button>
      </form>
    </div>
  );
};

export default PostPainting;
