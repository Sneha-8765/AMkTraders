const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,  // Will store filename like "unique-salt.jpg"
});
module.exports = mongoose.model("Product", productSchema);