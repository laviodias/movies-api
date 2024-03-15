import { useEffect, useState } from "react";
import { createMovie, getMovie, updateMovie } from "../../api";
import { useParams } from "react-router";

function MovieForm() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");

  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    if (id) {
      getMovie(id)
        .then((data) => {
          setTitle(data.title);
          setDirector(data.director);
        });
    }
  }, [id]);


  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateMovie({ id, title, director })
        .then(() => {
          console.log("ok");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createMovie({ title, director })
        .then(() => {
          console.log("ok");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>{id ? "Edit" : "New"} Movie</h1>
      <form onSubmit={onSubmit} method="POST">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="director">Director:</label>
          <input
            type="text"
            id="director"
            name="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
