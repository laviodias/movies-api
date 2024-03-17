import { toast } from "react-toastify";
import api from "../utils/api";
import { useEffect, useState } from "react";

function Home() {
  const [previousMovies, setPreviousMovies] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let ignore = false;

    api
      .get("movies/find-by-user")
      .then((response) => {
        if (ignore) return;
        setPreviousMovies(response.data.movies);
        setUserName(response.data.user_name);
      })
      .catch(() => {
        toast.error("Error loading previous movies");
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {userName && <h1 className="is-size-3 mb-4">Welcome back, {userName}</h1>}

      {previousMovies.length > 0 ? (
        <section className="is-flex is-flex-direction-column">
          <article className="box p-4 has-background-light">
            <h3 className="is-size-5 mb-4">Your movies</h3>
            <ul>
              {previousMovies.map((movie) => (
                <li
                  key={movie.id}
                  className="card p-4 rounded mb-3 is-flex is-justify-content-space-between"
                >
                  <div>
                    <p>{movie.title}</p>
                    <p>Director: {movie.director}</p>
                    <p>Average score: {movie.average_score || "-"}/5</p>
                    <p className="is-hidden-tablet">
                      Created at: {movie.created_at}
                    </p>
                  </div>
                  <p className="is-hidden-mobile">
                    Created at: {movie.created_at}
                  </p>
                </li>
              ))}
            </ul>
          </article>
          <a href="/movies" className="button">
            Check out the movies list
          </a>
        </section>
      ) : (
        <section className="box p-4 has-text-centered">
          <h3 className="is-size-4 mb-4">You have not added any movies yet</h3>
          <div className="is-flex is-align-items-center is-justify-content-center column-mobile">
            <a href="/movies/new" className="button">
              Add a movie now
            </a>
            <span className="mx-2">or</span>
            <a href="/movies" className="button">
              Check out the movies list
            </a>
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
