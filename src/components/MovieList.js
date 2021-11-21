import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../assests/style/MovieList.css";

const MovieList = ({
  movieIdList,
  searchValue,
  handleFavouritesClick,
  favouriteComponent,
  favourites,
}) => {
  const FavouriteComponent = favouriteComponent;
  const [movies, setMovies] = useState([]);
  const prevSearchValue = usePrevious(searchValue);
  const prevMovieIdList = usePrevious(movieIdList);

  const getMovieRequest = async (i) => {
    const url = `http://www.omdbapi.com/?i=${i}&apikey=b0967f48`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(async () => {
    //if (searchValue !== prevSearchValue) {
    if (
      (searchValue && searchValue !== prevSearchValue) ||
      movieIdList?.length !== prevMovieIdList?.length
    ) {
      setMovies([]);
      const movies = await Promise.all(movieIdList.map(getMovieRequest));
      setMovies(movies);
    }
  });

  return (
    <>
      {movies.map((movie, index) => (
        <div className="col-md-4 image-container" key={`movie-card-${index}`}>
          <Link to={`/trailer/${movie.imdbID}`}>
            {movie.Poster !== "N/A" && <img src={movie.Poster} alt="Poster" />}
          </Link>
          <h3 className="movie-title">{movie.Title}</h3>

          {(favourites && !favourites.includes(movie.imdbID)) || !favourites ? (
            <button
              onClick={() => handleFavouritesClick(movie.imdbID)}
              className="overlay btn btn-dark btn-lg"
            >
              <FavouriteComponent />
            </button>
          ) : (
            ""
          )}
          {movie.imdbRating && <h5 className="rating">{movie.imdbRating}</h5>}
        </div>
      ))}
    </>
  );
};

export default MovieList;
