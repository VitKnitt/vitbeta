import { useEffect } from "react";
import pozvanka from "../images/pozvanka.png";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";

const IndexPage = () => {
  const URL = useSelector(selectUrl);

  //loading database on background
  useEffect(() => {
    const loadDatabase = async () => {
      try{
      const response = await fetch(URL + "getpaintings");
      if (response.status === 200) {
        console.log("loaded");
      } else {
        console.log("internal error");
      }
    }catch(err){
      console.log('internal error during fetch:' + err)
    }
    };
    loadDatabase();
  }, []);

  return (
    <div className="indexPage">
      <div className="news">
        <h2>novinky</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/RtxFRHTuhHM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
  ></iframe>
      </div>
      <div className="events">
        <h2>události</h2>
        <img src={pozvanka} alt="pozvanka" />
      </div>
    </div>
  );
};

export default IndexPage;
