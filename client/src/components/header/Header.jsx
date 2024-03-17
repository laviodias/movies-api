import { Link } from "react-router-dom";
import logoutIcon from "../../assets/icons/logout.svg";
import "./header.css";
import api from "../../utils/api";
import { useState } from "react";

function Header() {
  const path = window.location.pathname;
  const showNav = !["/login", "/signup"].includes(path);

  const [hamburgerActive, setHamburgerActive] = useState(false);

  const logout = () => {
    localStorage.removeItem("authToken");
    api.delete("logout").then(() => {
      window.location.href = "/login";
    });
  };
  return (
    <>
    <header className="is-flex is-justify-content-space-between is-align-items-center">
      <div className="logo">
        <Link to="/">Movie Ratings</Link>
      </div>

      {showNav && (
        <nav role="navigation" aria-label="main navigation">
          <ul className="is-flex is-align-items-center is-hidden-mobile">
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
            className={`navbar-burger has-text-white is-hidden-tablet ${hamburgerActive ? "is-active" : ""}`}
            onClick={() => setHamburgerActive(!hamburgerActive)}
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
      {hamburgerActive && (
        <nav role="navigation" aria-label="main navigation">
          <ul className="is-flex is-justify-content-space-around has-background-grey-dark p-2">
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
        </nav>

      )}
    </>
  );
}

export default Header;
