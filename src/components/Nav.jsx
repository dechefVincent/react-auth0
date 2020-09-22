import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ auth }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/public">Public</Link>
      </li>
      {auth.isAuthenticated() && (
        <li>
          <Link to="/private">Private</Link>
        </li>
      )}
      {auth.isAuthenticated() && auth.hasScopes(["read:courses"]) && (
        <li>
          <Link to="/courses">Courses</Link>
        </li>
      )}
      <li>
        <button onClick={auth.isAuthenticated() ? auth.logout : auth.login}>
          {auth.isAuthenticated() ? "Log out" : "Log in"}
        </button>
      </li>
    </ul>
  </nav>
);

export default Nav;
