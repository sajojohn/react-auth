const express = require("express");

require("dotenv").config();

var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const checkScopes = require("express-jwt-authz");
var port = process.env.PORT || 8080;

var jwtCheck = jwt({
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
    message: "hello from a public api",
  });
});

app.get("/private", jwtCheck, function(req, res) {
  res.json({
    message: "hello from a private api",
  });
});

app.get("/course", jwtCheck, checkScopes(["read:courses"]), function(req, res) {
  res.json({
    courses: [{ id: 1, title: "building apps with react and redux" }, { id: 2, title: "Creating resusable react components" }],
  });
});

app.get("/admin", jwtCheck, checkRole("admin"), function(req, res) {
  res.json({
    message: "hello from a admin API",
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
