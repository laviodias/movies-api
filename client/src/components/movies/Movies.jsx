import { useCallback, useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import api from "../../utils/api";
import { RatingCell } from "../shared/RatingCell";
import { toast } from "react-toastify";
import { filterBy } from "@progress/kendo-data-query";

const initialFilter = {
  logic: "and",
  filters: [],
};

const initialColumns = [
  { field: "id", title: "ID", filterable: false, width: "70px", minGridWidth: 500 },
  { field: "title", title: "Title" },
  { field: "director", title: "Director" },
  { field: "creator", title: "Created by", minGridWidth: 500 },
  {
    field: "average_score",
    title: "Average Score",
    filterable: false,
    cell: RatingCell,
  },
];

function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const [filter, setFilter] = useState(initialFilter);
  const [columns, setColumns] = useState(initialColumns);


  useEffect(() => {
    let ignore = false;
    api
      .get("movies")
      .then((response) => {
        if (ignore) return;
        setMoviesList(response.data);
      })
      .catch(() => {
        toast.error("Error loading movies");
      });

    return () => {
      ignore = true;
    };
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
        .post("ratings/create-from-csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success(
            "Ratings imported successfully. This task is async, so it may take a while to see the changes."
          );
        })
        .catch(() => {
          toast.error("Error importing ratings");
        });
    });
  };


  const handleResize = useCallback(() => {
      const grid = document.querySelector(".k-grid");
      const currentVisibleColumns = columns.filter(
        (c) => !(c.minGridWidth > grid.offsetWidth)
      );
      if (currentVisibleColumns.length !== columns.length) {
        setColumns(currentVisibleColumns);
      }
  }, [columns])

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  return (
    <div>
      <h1 className="is-size-1 mb-2">Movies</h1>

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
        {columns.map((column, index) => {
          return (
            <Column field={column.field} title={column.title} key={index} width={column?.width} filterable={column?.filterable} cell={column?.cell}/>
          );
        })}
      </Grid>

      <div className="is-flex is-justify-content-center is-align-items-center mt-6 column-mobile">
        <a href="movies/new" className="button">
          Add new movie
        </a>
        <span className="mx-2">or</span>
        <button className="button" onClick={handleRatingCsvImport}>
          Import ratings from CSV
        </button>
      </div>
    </div>
  );
}

export default Movies;
