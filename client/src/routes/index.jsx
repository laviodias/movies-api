import { Route, Routes } from "react-router-dom";
import Movies from "../components/movies/Movies";
import MovieForm from "../components/movies/MovieForm";
import Login from "../components/auth/Login";
import SignUpView from "../components/auth/SignUp";
import RateMovie from "../components/movies/RateMovie";
import Home from "../components/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Movies routes */}
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/new" element={<MovieForm />} />
      <Route path="/movies/:id/rate" element={<RateMovie />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpView />} />
    </Routes>
  );
}

export default AppRoutes;
