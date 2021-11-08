import React from 'react'
import '../assests/style/MovieList.css'
//import Movies from '../assests/data/Movie'

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent


    const getMovieRequest = async (i) => {
        const url = `http://www.omdbapi.com/?i=${i}&apikey=b0967f48`;

        const response = await fetch(url); 
        const responseJson = await response.json();
       return responseJson
    }

   // getMovieRequest()

   console.log(props.movieIdList)

   return <div> {(props.movieIdList || []).map( async (id, index) => {
    const movie =  await getMovieRequest(id)

    
    return <div className="col-md-4 image-container" key={`movie-card-${index}`}>
                <img src={movie.Poster} alt= "Poster" />
                
                {/* <h3 className="movie-title">{movie.Title}</h3>

                <button    
                    onClick={() => props.handleFavouritesClick(movie)}
                    className='overlay btn btn-dark btn-lg'
                >
                    <FavouriteComponent/>  
                </button>
                
                <h5 className="rating">{movie.Ratings}</h5> */}
            </div>

})} </div>



    // return (
    //     <>
    //         {props.movies.map((movie, index) => (
    //             <div className="col-md-4 image-container" key={`movie-card-${index}`}>
    //                 <img src={movie.Poster} alt= "Poster" />
                    
    //                 <h3 className="movie-title">{movie.Title}</h3>

    //                 <button    
    //                     onClick={() => props.handleFavouritesClick(movie)}
    //                     className='overlay btn btn-dark btn-lg'
    //                 >
    //                     <FavouriteComponent/>  
    //                 </button>
                    
    //                 <h5 className="rating">{movie.Ratings}</h5>
    //             </div>
    //         ))}
    //     </>
    // );
};

export default MovieList;