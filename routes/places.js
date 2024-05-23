const express = require("express");
const { requireAuth, requireRole } = require("../middleware/requireAuth");
const upload = require("../middleware/multer");
const {
  getPlaceUser,
  getPlaces,
  getPlace,
  createPlace,
  deletePlace,
  updatePlace,
} = require("../controllers/placeController");
const router = express.Router();

router.use(requireAuth);

// GET all places of user (open to all authenticated users)
router.get("/user", getPlaceUser);

// GET all places (open to all authenticated users)
router.get("/", getPlaces);

// GET a single place (open to all authenticated users)
router.get("/:id", getPlace);

// POST a new place (only accessible to users with the "admin" or "user" role)
router.post("/", requireRole(["admin", "host"]), upload, createPlace);

// DELETE a place (only accessible to users with the "admin" or "host" role)
router.delete("/:id", requireRole(["admin", "host"]), deletePlace);

// UPDATE a place (only accessible to users with the "admin" or "host" role)
router.put("/:id", requireRole(["admin", "host"]), updatePlace);

module.exports = router;
