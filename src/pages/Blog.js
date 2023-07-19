import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {

  const [postsData,setPostsData] = useState([])

useEffect(() => {
  const getData = async () => {
    const result = await fetch('https://vitbeta-api.onrender.com/getblogposts')
    .catch(err => console.log(err))
    result.json().then((post) => setPostsData(post.reverse()))    
  }
getData()
},[])

if(postsData.length === 0){
  return <div>Loading...</div>
}

  return (

    <div className="blog">
      <h1>Blog</h1>
     { postsData.map(article => 
      <div className="articles" key={article._id}>
        <div className="article">
        <img src={"https://vitbeta-api.onrender.com/" + article.picture} alt="picture" />
          <h2>{article.title}</h2>
          <article>{article.text}</article>
          <Link to={'/singleblog/' + article._id} >vstoupit do diskuze:</Link>
        </div>
      </div>
      )}
    </div>
  );
};

export default Blog;
