// const post = require("../routes/posts");
// const register = require("../routes/register");
// const login = require("../routes/login");
const express = require("express");
const error = require("../middleware/error");
const user = require("../routes/user");
const students = require("../routes/students");
const fees = require("../routes/fees");
const sanitizer = require("../helper/sanitizer");
const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/au")

// const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");

module.exports = function (app) {
  app.use(express.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());
  app.use(mongoSanitize());
  // app.use(sanitizer);

  app.get("/", (req, res) => {
    res.send("Hello Worldsadsaf!");
  });

  app.use("/api/user", user);
  app.use("/api/student", students);
  app.use("/api/fee", fees);
  /*   app.use("/api/post", post);
  app.use("/api/register", register);
  app.use("/api/login", login); */
  app.use(error);
};
