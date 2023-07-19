import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleBlog = () => {
  const [postsData, setPostsData] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [limitComments, setLimitComments] = useState(false);
  const [regRequired, setregRequired] = useState(false);
  const id = useParams("");
  const history = useNavigate();

  const handleInsertNewComment = async (e) => {
    e.preventDefault();
    const result = await fetch("https://vit-betatest.onrender.com/postcomment", {
      method: "POST",
      body: JSON.stringify([{ newComment }, id]),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    }).catch((err) => console.log(err));
    if (result.status === 401) {
      setregRequired(true);
      console.log("nezaregistrovan");
    }
    if (result.status === 403) {
      setLimitComments(true);
      console.log("limmit překročen");
    }
    setComments(result);
    setNewComment("");
  };

  if (limitComments) {
    setTimeout(() => {
      setLimitComments(false);
    }, 4000);
  }

  if (regRequired) {
    setTimeout(() => {
      setregRequired(false);
    }, 4000);
  }

  useEffect(() => {
    const getData = async () => {
      const result = await fetch("https://vit-betatest.onrender.com/getsinglepost", {
        method: "POST",
        body: JSON.stringify(id),
        headers: { "Content-type": "application/json" },
      }).catch((err) => console.log(err));
      result.json().then((post) => setPostsData(post));
    };
    getData();
  }, [comments]);

  return (
    <div className="blog">
      <h1>Blog</h1>
      <div className="articles">
        <div className="article">
          <img
            src={"https://vit-betatest.onrender.com/" + postsData.picture}
            alt="picture"
          />
          <h2>{postsData.title}</h2>
          <article>{postsData.text}</article>
          <button className="backbutton" onClick={() => history("/blog")}>zpět</button>
        </div>
      </div>
      <div className="comments">
        <h2>Komentáře:</h2>
        {Array.isArray(postsData.comments) &&
          postsData.comments.length > 0 &&
          postsData.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-name">{comment.name}:</div>
              <div className="comment-text">{comment.comment}</div>
            </div>
          ))}
      </div>
      <form onSubmit={handleInsertNewComment} className="newcommentform">
        <p>pro vkládání komentářů je nutná registrace</p>
        <textarea
          className="newcommenttextarea"
          maxLength="2000"
          required
          placeholder="komentář"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="newcommentbutton">
          Vlož
        </button>
      </form>
      {limitComments && (
        <p className="alert-comment">limit pro komentáře byl překročen</p>
      )}
      {regRequired && (
        <p className="alert-comment">
          pro vkládání komentářů je nutná registrace
        </p>
      )}
    </div>
  );
};

export default SingleBlog;
