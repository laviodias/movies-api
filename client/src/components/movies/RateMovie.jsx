import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../utils/api";
import { Rating } from "@progress/kendo-react-inputs";
import { toast } from "react-toastify";

function RateMovie() {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    let ignore = false;

    api
      .get(`movies/show/${id}`)
      .then(({ data }) => {
        if (ignore) return;
        setMovie(data);
        if (data.user_score) setRating(data.user_score);
      })
      .catch(() => {
        toast.error("Error loading movie");
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    api
      .post("ratings", { movie_id: id, score: rating })
      .then(() => {
        toast.success("Movie rated successfully");
      })
      .catch(() => {
        toast.error("Error rating movie");
      });
  };
  return (
    <div>
      <h1 className="is-size-1">Rate Movie</h1>

      <section className="box">
        <h2>{movie.title}</h2>
        <h3>{movie.director}</h3>
        <p>
          Average score: {movie.average_score} ({movie.rating_count} votes)
        </p>

        <div className="is-flex">
          <Rating value={rating} onChange={(e) => setRating(e.value)} />
          <button className="button ml-4" onClick={onSubmit}>
            Rate
          </button>
        </div>
      </section>
    </div>
  );
}

export default RateMovie;
