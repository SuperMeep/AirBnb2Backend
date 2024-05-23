const Place = require("../models/placeModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const cloudinary = require("../cloudinary");

// get places
const getPlaceUser = asyncHandler(async (req, res) => {
  const owner = req.user.userId;
  const places = await Place.find({ owner }).sort({ createdAt: -1 });

  res.status(200).json(places);
});

// get places
const getPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find().sort({ createdAt: -1 });

  res.status(200).json(places);
});

// get a place
const getPlace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such place" });
  }
  const place = await Place.findById(id);
  if (!place) {
    return res.status(404).json({ error: "No such place" });
  }
  res.status(200).json(place);
});

const createPlace = asyncHandler(async (req, res) => {
  // Destructure request body and owner
  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    image, // Include image in the request body
  } = req.body;

  const owner = req.user.userId;

  // Map the image data to match the frontend format
  const imageUrls = image.map(({ url, public_id }) => ({
    url,
    public_id,
  }));

  // Create place with imageUrls
  const place = await Place.create({
    title,
    address,
    image: imageUrls,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    owner,
  });

  console.log("Image data received:", imageUrls);
  console.log(place);
  res.status(200).json({ place });
});
// delete a book
const deletePlace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("No such place");
  }
  const place = await Place.findOneAndDelete({ _id: id });
  if (!place) {
    res.status(400);
    throw new Error("No such place");
  }

  res.status(200).json(place);
});

// update a place
const updatePlace = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array());
  }

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("No such place");
  }

  // Now, update the place using valid data from req.body
  const place = await Place.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // This ensures you get the updated place as the response
  );

  if (!place) {
    res.status(404);
    throw new Error("No such place");
  }

  res.status(200).json(place);
});

module.exports = {
  getPlaceUser,
  getPlaces,
  getPlace,
  createPlace,
  deletePlace,
  updatePlace,
};
