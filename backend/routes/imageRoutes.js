const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");
const router = express.Router();

// Multer Storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort("order");
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload a new image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const newImage = new Image({
      url: `/uploads/${req.file.filename}`,
      title,
      description,
      order,
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an image
router.delete("/:id", async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update image order
router.put("/:id", async (req, res) => {
  try {
    const { order } = req.body;
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, { order }, { new: true });

    
    res.json(updatedImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
