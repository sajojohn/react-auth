const express = require("express");

require("dotenv").config();

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const checkScopes = require("express-jwt-authz");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

const app = express();

function checkRole(role) {
  return function(req, res, next) {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("Invalid user role");
    }
  };
}

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a Public API!",
  });
});

app.get("/private", jwtCheck, function(req, res) {
  res.json({
    message: "Hello from a Private API!",
  });
});

app.get("/course", jwtCheck, checkScopes(["read:courses"]), function(req, res) {
  res.json({
    courses: [{ id: 1, title: "building apps with react and redux" }, { id: 2, title: "Creating resusable react components" }],
  });
});

app.get("/admin", jwtCheck, checkRole("admin"), function(req, res) {
  res.json({
    message: "Hello from a Admin API",
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
