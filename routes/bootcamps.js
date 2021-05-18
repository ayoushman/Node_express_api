const express = require("express");
const {
  getBootcamps,
  postBootcamps,
  getBootcamp,
  updateBootcamps,
  deleteBootcamps,
} = require("../controller/bootcamps");

const router = express.Router();

router.route("/").get(getBootcamps).post(postBootcamps);
// router.route("/:id").get(getBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);
// router.route("/:id").delete(deleteBootcamps);

module.exports = router;
