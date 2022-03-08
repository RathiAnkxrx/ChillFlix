import { useEffect, useState } from "react";
import axios from "../../axios";
import classes from "./Row.module.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const Row = ({ title, fetchUrl, isLarge }) => {
  const baseURL = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchMovies() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return;
    }
    fetchMovies();
  }, [fetchUrl]);

  const opts = {
    height: "600",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const playHandler = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.title || movie?.original_title || movie.original_name
      ).then((url) => {
        const urlPrams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlPrams.get("v"));
        console.log(trailerUrl);
      });
    }
  };
  const movieClass = isLarge
    ? classes["row__poster"]
    : classes["row__landscape"];
  return (
    <div>
      <div className={classes.row}>
        <h2>{title}</h2>
        <div className={classes["row__posters"]}>
          {movies.map((movie) => (
            <img
              onClick={() => playHandler(movie)}
              key={movie.id}
              src={`${baseURL}${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              className={movieClass}
            ></img>
          ))}
        </div>
      </div>
      <div className={classes.trailer}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
