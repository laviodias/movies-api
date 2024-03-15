import { useEffect, useState } from "react";
import { getMovies } from "../../api";

function Movies() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    try {
      getMovies().then((data) => {
        setMoviesList(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>Movies:</h1>
      {
        moviesList.length ? (
          <ul>
            {moviesList.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        ) : (
          <p>No movies found</p>
        )
      }
    </div>
  )
}

export default Movies;
