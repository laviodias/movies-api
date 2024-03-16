import { useEffect, useState } from "react";
import { createMovie, getMovie, updateMovie, uploadMoviesCsv } from "../../api";
import { useParams } from "react-router";

function MovieForm() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [file, setFile] = useState(null);

  const { id } = useParams();

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
    if(file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadMoviesCsv(formData)
        .then(() => {
          console.log("ok");
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }

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
      {!id && (
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      )}
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
          <button>{file ? "Upload" : "Save"}</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
