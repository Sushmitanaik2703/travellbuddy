const express = require("express");
const router = express.Router();

const {
  createTrip,
  getTrips,
  getMyTrips,
} = require("../controllers/tripController");

router.post("/create", createTrip);
router.get("/all", getTrips);
router.get("/my/:userId", getMyTrips);

module.exports = router;