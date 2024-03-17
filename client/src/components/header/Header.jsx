import { Link } from "react-router-dom";
import logoutIcon from "../../assets/icons/logout.svg";
import "./header.css";
import api from "../../utils/api";

function Header() {
  const path = window.location.pathname;
  const showNav = !["/login", "/signup"].includes(path);

  const logout = () => {
    localStorage.removeItem("authToken");
    api.delete("logout").then(() => {
      window.location.href = "/login";
    });
  };
  return (
    <header className="is-flex is-justify-content-space-between is-align-items-center">
      <div className="logo">
        <Link to="/">Movie Ratings</Link>
      </div>

      {showNav && (
        <nav role="navigation" aria-label="main navigation">
          <ul className="is-flex is-align-items-center">
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/movies/new">Add Movie</Link>
            </li>
            <li>
              <img
                src={logoutIcon}
                alt="Logout"
                className="is-clickable image"
                onClick={logout}
              />
            </li>
          </ul>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;
