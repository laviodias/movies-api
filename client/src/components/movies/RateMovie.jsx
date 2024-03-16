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
    api
      .get(`movies/${id}`)
      .then(({ data }) => {
        setMovie(data);
        setRating(data.average_score);
      })
      .catch(() => {
        toast.error("Error loading movie");
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    api
      .post(`user_movies`, { movie_id: id, score: rating })
      .then(() => {
        toast.success("Movie rated successfully");
      })
      .catch(() => {
        toast.error("Error rating movie");
      });
  }
  return (
    <div>
      <h1>Rate Movie</h1>
      <h2>{movie.title}</h2>
      <h3>{movie.director}</h3>
        <Rating value={rating} onChange={(e) => setRating(e.value)} />
        <button onClick={onSubmit}>Rate</button>
    </div>
  );
}

export default RateMovie;
