import { useEffect, useState } from "react";
import requests from "../../request";
import axios from "../../axios";
import classes from "./Banner.module.css";
import Header from "../Header/header";
const Banner = () => {
  const baseURL = "https://image.tmdb.org/t/p/original/";
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      const request = await axios.get(requests.fetchChillFlixOriginals);
      setMovie(
        request.data.results[
          Math.round(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchMovies();
  }, []);

  const overviewString = (string, length) => {
    return string.length > length
      ? string.substring(0, length - 3) + "..."
      : string;
  };

  return (
    <header
      className={classes.banner}
      style={{
        backgroundImage: ` linear-gradient(
          to right,#111,rgba(37, 37, 37, 0.61) 70%,transparent
        ), URL(${baseURL}${movie.backdrop_path})`,
      }}
    >
      <Header />
      <div className={classes["banner__contents"]}>
        <h1 className={classes["banner__title"]}>
          {movie?.title || movie?.original_title || movie.original_name}
        </h1>
        <div>
          <button className={classes["banner__button"]}>Play</button>
          <button className={classes["banner__button"]}>My List</button>
        </div>
        <p className={classes["banner__description"]}>
          {movie.overview && overviewString(movie?.overview, 250)}
        </p>
      </div>
      <div className={classes["banner__gradient"]}></div>
    </header>
  );
};

export default Banner;
