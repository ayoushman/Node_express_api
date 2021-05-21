const express = require("express");
const { getCourses } = require("../controller/course");
const { getCourse } = require("../controller/course");
const { postCourses } = require("../controller/course");
// const { route } = require("./bootcamps");

// Since we are merging params with the bootcamps
const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(postCourses);
router.route("/:id").get(getCourse);

module.exports = router;
