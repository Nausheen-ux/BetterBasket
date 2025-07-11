const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
productId: {
type: String,
required: true,
},
name: String,
price: Number,
quantity: {
type: Number,
default: 1,
},
tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);
