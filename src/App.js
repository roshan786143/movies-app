import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
//96366d42 --->api key
import search_icon from "./search.svg";

const api_url = "https://www.omdbapi.com?apikey=96366d42";

// const movie = {
//   Title: "The King's Avatar",
//   Year: "2019",
//   imdbID: "tt10732794",
//   Type: "series",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BOGMxZDc1N2ItODI3NS00MDIwLWJkYzAtMTgyMDZlN2FlNGYzXkEyXkFqcGdeQXVyMjQ0OTYxOTc@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${api_url}&s=${title}`);
    console.log(response);
    const data = await response.json();
    // console.log(data);
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("avatar");
  }, []);
  return (
    <div className="App">
      <h1>amazon prime video</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img
          src={search_icon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.Poster} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
