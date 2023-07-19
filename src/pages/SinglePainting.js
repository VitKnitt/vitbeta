import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SinglePainting = () => {
  const [painting, setPainting] = useState("");
  const id = useParams("");
  const navigate = useNavigate();

  useEffect(() => {
    const getSinglePaintingInfo = async () => {
      const result = await fetch("https://vit-betatest.onrender.com/getsinglepainting", {
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
            src={"https://vit-betatest.onrender.com/" + bigCover}
          />
          <div className="singlepainting-additional">
            <p>{additionalInfo && additionalInfo}</p>
            <div>
              {additionalCover && (
                <img
                  className="additionalcover"
                  alt="additionalCover"
                  src={"https://vit-betatest.onrender.com/" + additionalCover}
                />
              )}
            </div>
          </div>
          <button onClick={() => navigate('/paintings')}>zpět</button>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default SinglePainting;
