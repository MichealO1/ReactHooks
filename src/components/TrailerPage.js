import React, { useState, useEffect } from "react";
import MovieListHeading from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import "../assests/style/TrailerPage.css";

const TrailerPage = () => {
  const [movie, setMovie] = useState({});

  const { imdbID } = useParams();

  const navigate = useNavigate();

  const goBack = () => {
    const navigateHome = "/";
    navigate(navigateHome);
  };

  const getMovieRequest = async (i) => {
    const url = `http://www.omdbapi.com/?i=${i}&apikey=b0967f48`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(response);
    return responseJson;
  };

  useEffect(async () => {
    console.log(imdbID);
    const movie = await getMovieRequest(imdbID);
    console.log(movie);
    setMovie(movie);
  }, []);

  console.log(movie);
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={movie.Title} />
        <button
          onClick={goBack}
          type="button"
          className=" btn btn-primary col col-sm-1"
        >
          Back
        </button>
      </div>
      <div ClassName="trailer">
        <img src={movie.Poster} alt="videoposter" />
        <h5 className="description">{movie.Plot}</h5>
      </div>
    </div>
  );
};

export default TrailerPage;
