import { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

function MovieForm() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [file, setFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      api
        .post("movies/create-from-csv", formData)
        .then(() => {
          console.log("ok");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .post("movies", { movie: { title, director } })
        .then(() => {
          toast.success("Movie created");
        })
        .catch(() => {
          toast.error("Error creating movie");
        });
    }
  };

  return (
    <div>
      <h1>New Movie</h1>
      (
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />
      )
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
          <button>{file ? "Upload file" : "Save"}</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
