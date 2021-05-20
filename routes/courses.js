const express = require("express");
const { getCourses } = require("../controller/course");
// const { route } = require("./bootcamps");

// Since we are merging params with the bootcamps
const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses);

module.exports = router;
