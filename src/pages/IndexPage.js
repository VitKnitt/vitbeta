import pozvanka from '../images/pozvanka.png'

const IndexPage = () => {

    
  return (
    <div className="indexPage">
      <div className="news">
        <h2>novinky</h2>
        <p>stránky jsou ve zkušebním provozu a mohou padat</p>
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
      <div className='events'>
        <h2>události</h2>
        <img src={pozvanka} alt="pozvanka" />
      </div>
    </div>
  );
};

export default IndexPage;
