const express = require("express");
const {
  getBootcamps,
  postBootcamps,
  getBootcamp,
  updateBootcamps,
  deleteBootcamps,
  getBootCampsWithinRadius,
  uploadImageBootcamp,
} = require("../controller/bootcamps");

// Include other resources routes
const courseRouter = require("./courses");

const router = express.Router();

//  Re-route into other resources remeber here we used "use" not route

router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootCampsWithinRadius);
router.route("/:id/photo").put(uploadImageBootcamp);
router.route("/").get(getBootcamps).post(postBootcamps);

// router.route("/:id").get(getBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);
// router.route("/:id").delete(deleteBootcamps);

module.exports = router;
