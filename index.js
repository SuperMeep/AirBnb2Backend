const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const cors = require("cors");
const connectDB = require("./constants/db");
const placeRoutes = require("./routes/places");
const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/bookings");
const mongoose = require("mongoose");
const colors = require("colors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

connectDB();
// express app
const app = express();
app.use(bodyParser.json({ limit: "20mb" })); // Adjust the limit as needed

// Multer configuration to handle file uploads

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/places", placeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
