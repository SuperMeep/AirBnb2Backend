const Booking = require("../models/bookingModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const createBooking = asyncHandler(async (req, res) => {
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  const user = req.user.userId;

  const booking = await Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user,
  });

  console.log(booking);
  res.status(200).json({ booking });
});

// get bookings
const getBookingUser = asyncHandler(async (req, res) => {
  const user = req.user.userId;
  res.json(await Booking.find({ user }).populate("place"));
});

// get a booking
const getBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }
  const booking = await Booking.findById(id).populate("place");
  if (!booking) {
    return res.status(404).json({ error: "No such booking" });
  }
  res.status(200).json(booking);
});

module.exports = {
  createBooking,
  getBookingUser,
  getBooking,
};
