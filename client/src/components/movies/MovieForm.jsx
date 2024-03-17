import api from "../../utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { TextBox } from "@progress/kendo-react-inputs";

function MovieForm() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");

  const handleCsvImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      api
        .post("movies/create-from-csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success(
            "Movies imported successfully. This task is async, so it may take a while to see the changes."
          );
        })
        .catch(() => {
          toast.error("Error importing movies");
        });
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    api
      .post("movies", { movie: { title, director } })
      .then(() => {
        toast.success("Movie created successfully");
      })
      .catch(() => {
        toast.error("Error creating movie");
      });
  };

  return (
    <section>
      <h1 className="is-size-1 mb-2">New Movie</h1>

      <section className="is-flex  is-align-items-flex-start">
        <form
          onSubmit={onSubmit}
          method="POST"
          className="box has-background-light"
        >
          <h3 className="has-text-centered is-size-5">
            Fill the movie information
          </h3>

          <div className="is-flex is-align-items-center mt-4">
            <div>
              <p className="mb-2">Title:</p>
              <p>Director:</p>
            </div>

            <div className="ml-2">
              <TextBox
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter movie title"
                name="title"
                className="mb-2"
              />
              <TextBox
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                placeholder="Enter movie director"
                name="director"
              />
            </div>
          </div>

          <div className="is-flex is-justify-content-center">
            <button disabled={!title || !director} className="button mt-4">
              Create movie
            </button>
          </div>
        </form>

        <article className="box ml-4 is-flex is-flex-direction-column is-align-items-center has-background-light">
          <h3 className="is-size-5">Or import from a CSV file</h3>
          <button onClick={handleCsvImport} className="button mt-4">
            Upload a CSV file
          </button>
        </article>
      </section>
    </section>
  );
}

export default MovieForm;
