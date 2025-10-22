const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../utils/multerConfig");  // Your config file

// GET all products (unchanged)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new product with image upload
router.post("/", upload.single('image'), async (req, res) => {  // 'image' is the form field name
  try {
    const { name, price } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required!" });
    }
    const newProduct = new Product({
      name,
      price,
      image: req.file.filename  // Save filename (or req.file.path for full path)
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;