const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
name: String,
price: Number,
img: String,
tag: String,
});

module.exports = mongoose.model("Product", productSchema);
