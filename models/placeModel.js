const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },

  image: [
    {
      url: {
        type: String, // URL of the image
      },
      public_id: {
        type: String, // Public ID from Cloudinary
        required: true,
      },
    },
  ],

  description: {
    type: String,
    required: [true, "Please add a description"],
  },

  perks: {
    type: [String],
    required: [true, "Please add perks"],
  },

  extraInfo: {
    type: String,
    required: [true, "Please add extraInfo"],
  },

  checkIn: {
    type: Number,
    required: [true, "Please add checkIn"],
  },

  checkOut: {
    type: Number,
    required: [true, "Please add checkOut"],
  },

  maxGuests: {
    type: Number,
    required: [true, "Please add maxGuests"],
  },
  price: {
    type: Number,
    required: [true, "Please add price"],
  },
});

module.exports = mongoose.model("Place", placeSchema);
