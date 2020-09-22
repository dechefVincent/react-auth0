import React from "react";
import { Link } from "react-router-dom";

const Home = ({ auth }) => (
  <div>
    <h1>Home</h1>
    {auth.isAuthenticated() ? (
      <Link to="/profile">View Profile</Link>
    ) : (
      <button onClick={auth.login}>Login</button>
    )}
  </div>
);

export default Home;
