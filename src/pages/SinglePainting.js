import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";
import loading from "../images/loading.gif"

const SinglePainting = () => {
  const URL = useSelector(selectUrl)
  const [painting, setPainting] = useState("");
  const id = useParams("");
  const navigate = useNavigate();

  useEffect(() => {
    const getSinglePaintingInfo = async () => {
      const result = await fetch(URL+"getsinglepainting", {
        method: "POST",
        body: JSON.stringify(id),
        headers: { "Content-type": "application/json" },
      });
      result.json().then((data) => setPainting(data));
    };
    getSinglePaintingInfo();
  }, []);

  const {
    title,
    body,
    serie,
    year,
    bigCover,
    additionalCover,
    additionalInfo,
  } = painting;

  return (
    <>
      {painting ? (
        <div className="singlepainting">
          <div className="singlepainting-description">
            <h1>{title && title}</h1>
            <p>{body && body}</p>
            <h3>{serie && serie}</h3>
            <h3>{year}</h3>
          </div>
          <img
            className="bigcover"
            alt="bigCover"
            src={URL + bigCover}
          />
          <div className="singlepainting-additional">
            <p>{additionalInfo && additionalInfo}</p>
            <div>
              {additionalCover && (
                <img
                  className="additionalcover"
                  alt="additionalCover"
                  src={URL + additionalCover}
                />
              )}
            </div>
          <button onClick={() => navigate('/paintings')}>zpět</button>
          </div>
        </div>
      ) : (
        <div className="loading"><img src={loading} alt="Loading..." />Loading...</div>
      )}
    </>
  );
};

export default SinglePainting;
