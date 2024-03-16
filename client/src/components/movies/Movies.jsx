import { useEffect, useState } from "react";
import api from "../../api";

function Movies() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    try {
      api.get('movies').then((response) => {
        setMoviesList(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h1>Movies:</h1>
      {
        moviesList.length ? (
          <ul>
            {moviesList.map((movie) => (
              <li key={movie.id}>
                <a href={`/movies/${movie.id}`}>{movie.title}</a>
                <p>{movie.director}</p>
                <p>{movie.average_score}</p>
              </li>
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
