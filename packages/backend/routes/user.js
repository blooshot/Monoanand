const express = require("express");
const router = express.Router();
const moment = require("moment");
var _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../model/users");
const parseError = require("../helper/error_parser");
require("express-async-errors");
/* const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
 */

router.get("/", async (req, res) => {
  const allusers = await User.all({}).select(["name", "email", "-_id"]);
  res.status(200).send(allusers);
});

router.post("/register", async (req, res) => {
  try {
    const error = validate(req.body, "reg");
    if (error) {
      throw error;
    }

    let userExists = await User.findOne(_.pick(req.body, ["email"]));
    if (userExists) {
      throw new Error(`User already exists`);
    }

    const createUserObj = _.pick(req.body, [
      "name",
      "email",
      "password",
      "roles",
    ]);
    createUserObj.password = bcrypt.hashSync(createUserObj.password, 10); // hasing password with salt 10
    createUserObj.is_active = true; // hasing password with salt 10

    const createUser = new User(createUserObj);
    await createUser.save();
    const token = createUser.generateAuthToken();

    res.status(200).send(token);
  } catch (e) {
    parseError(e, res, 400);
  }
});

router.post("/login", async (req, res, next) => {
  const error = validate(req.body, "login");
  if (error) {
    throw error;
  }

  let userExists = await User.findOne(_.pick(req.body, ["email"]));
  if (!userExists) {
    throw new Error(`Invalid Username or Password`);
  }

  const validPassowrd = await bcrypt.compare(
    req.body.password,
    userExists.password
  );
  if (!validPassowrd) {
    throw new Error(`Invalid Username or Password1`);
  }
  setTimeout(() => {
    console.log("sending Token");
    const token = userExists.generateAuthToken();

    res.status(200).header({ "x-auth-token": token }).send(token);
  }, 3000);
});

/*
router.post("/logout", async (req, res) => {
  const allPosts = await Post.all({}).select(["title", "body"]);
  // console.log(allPosts);
  res.status(200).send(allPosts);
}); */

module.exports = router;
