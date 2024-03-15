import { Route, Routes } from "react-router-dom";
import Movies from "../components/movies/Movies";
import MovieForm from "../components/movies/MovieForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>home</h1>} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/new" element={<MovieForm />} />
      <Route path="/movies/:id" element={<MovieForm />} />
    </Routes>
  );
}

export default AppRoutes;
