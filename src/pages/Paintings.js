import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";
import loading from "../images/loading.gif";

const Paintings = () => {
  const URL = useSelector(selectUrl);
  const token = useSelector((state) => state.users.cookie);
  const [paintData, setPaintData] = useState("");
  const [filter, setFilter] = useState("");
  const [filterYear, setFilterYear] = useState(null);

  const handleSortDown = (data) => {
    const vysledek = data.sort((a, b) => a.year - b.year);
    setFilterYear(vysledek);
  };

  const handleSortUp = (data) => {
    const vysledek = data.sort((a, b) => b.year - a.year);
    setFilterYear(vysledek);
  };

  useEffect(() => {
    const showData = async () => {
      try {
        const response = await fetch(URL + "getpaintings");
        response
          .json()
          .then((response) =>
            filter
              ? setPaintData(response.filter((title) => title.serie === filter))
              : setPaintData(response)
          )
          .catch((err) => console.log(err));
        if (response.status === 200) {
          console.log("paintings loaded");
        } else {
          console.log("internal error");
        }
      } catch (err) {
        console.log("internall error during fetch:" + err);
      }
    };

    showData();
  }, [filter]);

  useEffect(() => {
    if (filterYear) {
      setPaintData(filterYear);
      setFilterYear(null);
    }
  }, [filterYear]);

  const handleDownloaad = async () => {
    try {
      const response = await fetch(URL + "downloadpaintings", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      if (response.status === 200) {
        window.open(URL + "downloadpaintings");
        console.log("file downloaded");
      } else {
        console.log("internal error");
      }
    } catch (err) {
      console.log("internal error during fetch:" + err);
    }
  };

  return (
    <div className="paintins-page">
      <div className="filtr">
        <div className="filterSerie">
          <label htmlFor="filtserie">filtr: </label>
          <select name="filtrserie" onChange={(e) => setFilter(e.target.value)}>
            <option value={""} defaultValue={""}>
              vše
            </option>
            <option
              value={
                "Když dostatenčně dlouho hledíš do temnoty, spatříš světlo"
              }
            >
              Když pohlédneš do tmy
            </option>
            <option value={"Vítězství duše nad tělem"}>Vítězství duše</option>
            <option value={"Chaos v řádu"}>Chaos v řádu</option>
            <option value={"noSerie"}>ostatní</option>
          </select>
        </div>
        <div className="filtrDate">
          dle data:
          <button
            className="arrowDown"
            onClick={() => handleSortDown(paintData)}
          >
            ⇓
          </button>
          <button className="arrowUp" onClick={() => handleSortUp(paintData)}>
            ⇑
          </button>
        </div>
      </div>

      <div className="download">
        <p>stáhnout galerii:</p>
        <button onClick={handleDownloaad}>Download</button>
        <p>*pro registrované</p>
      </div>
      {!paintData ? (
        <div className="loading">
          <img src={loading} alt="Loading..." />
          Loading...
        </div>
      ) : (
        paintData.map((painting) => (
          <div className="paintings" key={painting._id}>
            <div className="description">
              <Link to={painting._id}>
                <h1>{painting.title}</h1>
              </Link>
              {painting.body ? <p>{painting.body}</p> : null}
              {painting.serie !== "noSerie" ? (
                <h3>
                  série:
                  <br />
                  {painting.serie}
                </h3>
              ) : null}
              <h3>rok: {painting.year}</h3>
            </div>
            <div>
              <Link to={painting._id}>
                <img src={URL + painting.cover} alt="cover" />
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Paintings;
