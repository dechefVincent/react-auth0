import { WebAuth } from "auth0-js";

class Auth {
  constructor(history) {
    this.requestedScopes = "openid profile email read:courses";
    this.auth0 = new WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: this.requestedScopes,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    this.history = history;
    this.profile = null;
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("No access token.");

    return accessToken;
  };

  getProfile = (callback) => {
    if (this.profile) return callback(this.profile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, res) => {
      if (res) this.profile = res;
      callback(res, err);
    });
  };

  handleAuthenticaton = () => {
    this.auth0.parseHash((err, res) => {
      if (res && res.accessToken && res.idToken) {
        this.setSession(res);
        const redirectLocation = localStorage.getItem("redirect_on_login")
          ? "/"
          : JSON.parse(localStorage.getItem("redirect_on_login"));
        this.history.push(redirectLocation);
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
        this.history.push("/");
      }
      localStorage.removeItem("redirect_on_login");
    });
  };

  hasScopes(scopes) {
    const grantedScopes = (
      JSON.parse(localStorage.getItem("scopes")) || ""
    ).split(" ");
    return scopes.every((scope) => grantedScopes.includes(scope));
  }

  isAuthenticated = () =>
    new Date().getTime() < JSON.parse(localStorage.getItem("expires_at"));

  login = () => {
    localStorage.setItem(
      "redirect_on_login",
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("id_token");
    localStorage.removeItem("scopes");
    this.profile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000/",
    });
  };

  setSession = (res) => {
    const expiresAt = JSON.stringify(
      res.expiresIn * 1000 + new Date().getTime()
    );
    const scopes = res.scope || this.requestedScopes || "";

    localStorage.setItem("access_token", res.accessToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("id_token", res.idToken);
    localStorage.setItem("scopes", JSON.stringify(scopes));
  };
}

export default Auth;
