import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";
import loading from "../images/loading.gif";

const Blog = () => {
  const [postsData, setPostsData] = useState([]);
  const singleBlock = useNavigate();
  const URL = useSelector(selectUrl);

  useEffect(() => {
    const getData = async () => {
      const result = await fetch(URL + "getblogposts").catch((err) =>
        console.log(err)
      );
      if(result.status === 201){
      result.json().then((post) => setPostsData(post.reverse()));
      }
      else{
        console.log('Internal Server Error')
      }
    };
    getData();
  }, []);

  const navigateToSingleBlog = (road) => {
    singleBlock("/singleblog/" + road);
  };

  if (postsData.length === 0) {
    return (
      <div className="loading">
        <img src={loading} alt="Loading..." />
        Loading...
      </div>
    );
  }

  return (
    <div className="blog">
      <h1>Blog</h1>
      {postsData.map((article) => (
        <div className="articles" key={article._id}>
          <div className="article">
            <img src={URL + article.picture} alt="picture" />
            <h2>{article.title}</h2>
            <article>{article.text}</article>
            <button
              className="navigateButton"
              onClick={() => navigateToSingleBlog(article._id)}
            >
              diskuze:
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
