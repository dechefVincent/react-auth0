import React from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import Auth from "./auth/Auth";
import Callback from "./components/Callback";
import Public from "./components/Public";
import Private from "./components/Private";
import Courses from "./components/Courses";

const App = (props) => {
  const auth = new Auth(props.history);
  return (
    <>
      <Nav auth={auth} />
      <div className="body">
        <Route
          exact
          path="/"
          render={(props) => <Home auth={auth} {...props} />}
        />
        <Route
          path="/profile"
          render={(props) =>
            auth.isAuthenticated() ? (
              <Profile auth={auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/callback"
          render={(props) => <Callback auth={auth} {...props} />}
        />
        <Route path="/public" component={Public} />
        <Route
          path="/private"
          render={(props) =>
            auth.isAuthenticated() ? (
              <Private auth={auth} {...props} />
            ) : (
              auth.login()
            )
          }
        />
        <Route
          path="/admin"
          render={(props) =>
            auth.isAuthenticated() ? (
              <Private auth={auth} {...props} />
            ) : (
              auth.login()
            )
          }
        />
        <Route
          path="/courses"
          render={(props) =>
            auth.isAuthenticated() && auth.hasScopes(["read:courses"]) ? (
              <Courses auth={auth} {...props} />
            ) : (
              auth.login()
            )
          }
        />
      </div>
    </>
  );
};
export default App;
