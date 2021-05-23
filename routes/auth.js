const express = require("express");
const { register, login } = require("../controller/auth");
const { route } = require("./courses");

const router = express.Router();
const useless = (req, res, next) => {
  console.log(req);
  next();
};

router.route("/register").post(useless, register);
router.route("/login").post(login);

module.exports = router;
