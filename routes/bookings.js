const express = require("express");
const {
  createBooking,
  getBookingUser,
  getBooking,
} = require("../controllers/bookingController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all booking (open to all authenticated users)
router.get("/", getBookingUser);

// POST a new booking
router.post("/", createBooking);

// GET a single place (open to all authenticated users)
router.get("/:id", getBooking);

module.exports = router;
