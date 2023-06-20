//3b236e98 OMDB API KEY 

import { useState, useEffect } from "react";
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=3b236e98';

const movie1 = {
    "Title": "Spiderman in Cannes",
    "Year": "2016",
    "imdbID": "tt5978586",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg"
}

const App = () => {

    const [ movies, setMovies ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies();
    }, []);


    return (
        <div className="app">
          <h1>Movieland</h1>  

          <div className="search">
            <input 
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
            />
          </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) =>(
                            <MovieCard title={movie.Title} year={movie.Year} type={movie.Type} poster={movie.Poster} />
                        ))}
                    </div> 
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )
            }

            {/* <div className="container">
                <MovieCard title={movies.Title} year={movies.Year} type={movies.Type} poster={movies.Poster} />
            </div> */}
        </div>     
    );
}

export default App;