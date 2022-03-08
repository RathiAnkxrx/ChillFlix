import requests from "../../request";

import Row from "./Row";
const Movies = () => {
  return (
    <div>
      <Row
        title="Chillflix Originals"
        fetchUrl={requests.fetchChillFlixOriginals}
        isLarge
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />

      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documantries" fetchUrl={requests.fetchDocumantaries} />
    </div>
  );
};

export default Movies;
