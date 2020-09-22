require("dotenv").config();

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

const checkJwt = jwt({
  algorithms: ["RS256"],
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: "https://" + process.env.REACT_APP_AUTH0_DOMAIN + "/",
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri:
      "https://" +
      process.env.REACT_APP_AUTH0_DOMAIN +
      "/.well-known/jwks.json",
  }),
});

const checkRole = (role) => (req, res, next) => {
  const asignedRoles = req.user["http://localhost:3000/roles"];
  if (asignedRoles instanceof Array && asignedRoles.includes(role))
    return next();
  else return res.status(500).send("Unsufficient roles.");
};

const svr = require("express")();

svr.get("/private", checkJwt, (req, res) => {
  res.json({
    message: "Hello private API!",
  });
});

svr.get("/public", (req, res) => {
  res.json({
    message: "Hello public API!",
  });
});

svr.get("/courses", checkJwt, checkScope(["read:courses"]), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: "test" },
      { id: 2, title: "succeed" },
    ],
  });
});

svr.get("/admin", checkJwt, checkRole("admin"), (req, res) => {
  res.json({
    message: "Hello admin API!",
  });
});

svr.listen(3001, () => {
  console.info("API lisent on " + process.env.REACT_APP_API_URI);
});
