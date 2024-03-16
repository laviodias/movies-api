import { Route, Routes } from "react-router-dom";
import Movies from "../components/movies/Movies";
import MovieForm from "../components/movies/MovieForm";
import Login from "../components/auth/Login";
import SignUpView from "../components/auth/SignUp";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>home</h1>} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/new" element={<MovieForm />} />
      <Route path="/movies/:id" element={<MovieForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpView />} />
    </Routes>
  );
}

export default AppRoutes;
