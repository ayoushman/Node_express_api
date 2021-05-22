const express = require("express");
const { register } = require("../controller/auth");
const { route } = require("./courses");

const router = express.Router();

router.route("/").post(register);
