const express = require("express");
const {
  getBootcamps,
  postBootcamps,
  getBootcamp,
  updateBootcamps,
  deleteBootcamps,
  getBootCampsWithinRadius,
} = require("../controller/bootcamps");

const router = express.Router();
router.route("/radius/:zipcode/:distance").get(getBootCampsWithinRadius);
router.route("/").get(getBootcamps).post(postBootcamps);
// router.route("/:id").get(getBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);
// router.route("/:id").delete(deleteBootcamps);

module.exports = router;
