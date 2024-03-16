import { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import api from "../../utils/api";
import { RatingCell } from "../shared/RatingCell";
import { toast } from "react-toastify";

function Movies() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    try {
      api.get("movies").then((response) => {
        setMoviesList(response.data);
      });
    } catch (error) {
      toast.error("Error loading movies");
    }
  }, []);

  return (
    <div>
      <h1>Movies:</h1>
      <Grid
        style={{
          height: "400px",
        }}
        data={moviesList}
      >
        <Column field="title" title="Title" />
        <Column field="director" title="Director" />
        <Column
          field="average_score"
          title="Average Score"
          cells={{ data: RatingCell }}
        />
      </Grid>

      <a href="movies/new">Create new movie</a>
    </div>
  );
}

export default Movies;
