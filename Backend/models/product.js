const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  isVegan: Boolean,
  isCrueltyFree: Boolean,
  packagingType: String,
  isLocal: Boolean,
  tags: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
