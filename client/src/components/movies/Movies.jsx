import { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import api from "../../utils/api";
import { RatingCell } from "../shared/RatingCell";
import { toast } from "react-toastify";
import { filterBy } from "@progress/kendo-data-query";

const initialFilter = {
  logic: "and",
  filters: [],
};

function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    try {
      api.get("movies").then((response) => {
        setMoviesList(response.data);
      });
    } catch (error) {
      toast.error("Error loading movies");
    }
  }, []);

  const handleRatingCsvImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      api
        .post("user_movies/create-from-csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Ratings imported successfully");
        })
        .catch(() => {
          toast.error("Error importing ratings");
        });
    });
  };

  return (
    <div>
      <h1>Movies:</h1>
      <Grid
        style={{
          height: "500px",
        }}
        data={filterBy(moviesList, filter)}
        filterable={true}
        filter={filter}
        onFilterChange={(e) => setFilter(e.filter)}
        resizable
      >
        <Column field="id" title="ID" filterable={false} width={"50px"} />
        <Column field="title" title="Title" />
        <Column field="director" title="Director" />
        <Column
          field="average_score"
          title="Average Score"
          cells={{ data: RatingCell }}
          filterable={false}
        />
      </Grid>

      <a href="movies/new">Create new movie</a>
      <button onClick={handleRatingCsvImport}>Import rating CSV</button>
    </div>
  );
}

export default Movies;
