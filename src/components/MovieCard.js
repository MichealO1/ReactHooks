import React,{useState, useEffect} from 'react';
import "../assests/style/MovieCard.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from '../components/MovieList';
import MovieListHeading from './Header';
import Filter from './Filter'
import AddFavourites from './AddToFavourites';
import RemoveFavourites from './RemoveFromFavourites';
//import Movies from '../assests/data/Movie'


const MovieCard = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const [imdbList, setImdbList] = useState([]);

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b0967f48&page=1`;
        //const url =   `http://www.omdbapi.com/?t=${searchValue}&apikey=b0967f48`;

        

        const response = await fetch(url); 
        const responseJson = await response.json();

        

        if (responseJson.Search){
            const searchList = responseJson.Search
           // console.log(searchList, 'me')
            const imdbIds = searchList.map(({imdbID}) => imdbID)
            //console.log(imdbIds, 'me')
            setImdbList(imdbIds)
            //console.log(imdbIds)
            //console.log(responseJson.Search)

            setMovies(responseJson.Search);
        }
    }; 
    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

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


    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites (newFavouriteList)
        //saveToLocalStorage(newFavouriteList)
        
    };
    
    const removeFavouritesMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
    };

    return(
        <div className= 'container-fluid movie-app'>
            <div className = 'row d-flex align-items-center mt-4 mb-4 movie-heading'>
                <MovieListHeading heading = 'Mikeflix'/>
                <Filter  searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

            <div className='row'>
                <MovieList
                    //movies= {movies} 
                    movieIdList = {imdbList} 
                    handleFavouritesClick= {addFavouriteMovie} 
                    favouriteComponent= {AddFavourites}
                />
            </div>

            {/* <div className = 'row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading = 'Favourite Movies'/>
            </div>
            <div className='row'>
                <MovieList
                    movies= {favourites} 
                    handleFavouritesClick= {removeFavouritesMovie} 
                    favouriteComponent= {RemoveFavourites}
                />
            </div> */}
        </div>
    );
};


export default MovieCard;