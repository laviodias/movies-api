import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useParams } from "react-router";
import { toast } from 'react-toastify';

function MovieForm() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [file, setFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`movie/${id}`).then((data) => {
        setTitle(data.title);
        setDirector(data.director);
      });
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append('teste', 'ola')
      console.log('formData', formData)
      api.post('movies/create-from-csv',
       formData
      ).then(() => {
        console.log("ok");
      }).catch((error) => {
        console.error(error);
      })
    } else if (id) {
      api
        .put("movie", { movie: { id, title, director } })
        .then(() => {
          toast.success('Movie updated');
        })
        .catch((error) => {
          toast.error('Error updating movie');
        });
    } else {
      api
        .post("movies", { movie: { title, director } })
        .then(() => {
          toast.success('Movie created');
        })
        .catch((error) => {
          toast.error('Error creating movie');
        });
    }
  };

  return (
    <div>
      <h1>{id ? "Edit" : "New"} Movie</h1>
      {!id && (
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
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
