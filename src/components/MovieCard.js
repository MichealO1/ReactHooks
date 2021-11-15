import React, { useState } from "react";
import "../assests/style/MovieCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "../components/MovieList";
import MovieListHeading from "./Header";
import Filter from "./Filter";
import AddFavourites from "./AddToFavourites";
import RemoveFavourites from "./RemoveFromFavourites";

const MovieCard = () => {
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [imdbList, setImdbList] = useState([]);

  const getMovieRequest = async (searchValue) => {
    setSearchValue(searchValue);
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b0967f48&page=1`;

    const response = await fetch(url);
    const responseJson = await response.json();

    const movies = responseJson.Response === "True" ? responseJson.Search : [];
    const imdbIds =
      movies.length > 0 ? movies.map((movie) => movie.imdbID) : [];

    setImdbList(imdbIds);
  };

  // useEffect(() => {
  //     getMovieRequest(searchValue);
  // }, [searchValue]);

  /* useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('movieapp-favourites')
        );

        setFavourites(movieFavourites);
    }, []);   

    const saveToLocalStorage = (items) => {
        localStorage.setItem('movieapp-favourites', JSON.stringify(items))
    };
    */

  const addFavouriteMovie = (imdbID) => {
    console.log(imdbID);
    const newFavouriteList = [...favourites, imdbID];
    setFavourites(newFavouriteList);
    //saveToLocalStorage(newFavouriteList)
  };

  const removeFavouritesMovie = (imdbID) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite !== imdbID
    );

    setFavourites(newFavouriteList);
  };

  console.log(favourites);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4 movie-heading">
        <MovieListHeading heading="Mikeflix" />
        <Filter searchValue={searchValue} setSearchValue={getMovieRequest} />
      </div>

      <div className="row">
        {imdbList.length > 0 && (
          <MovieList
            searchValue={searchValue}
            movieIdList={imdbList}
            favourites={favourites}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites}
          />
        )}
        {searchValue && imdbList.length === 0 && (
          <div className="alert alert-danger" role="alert">
            No movies found for {searchValue}
          </div>
        )}
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourite Movies" />
      </div>
      <div className="row">
        <MovieList
          movieIdList={favourites}
          handleFavouritesClick={removeFavouritesMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default MovieCard;
