const express = require('express');
const router = express.Router();
const CartItem = require('../models/cart');

// POST /api/cart
router.post('/', async (req, res) => {
try {
const { productId, name, price, quantity, tags } = req.body;
const newItem = new CartItem({ productId, name, price, quantity, tags });
await newItem.save();
res.status(201).json({ message: 'Cart item saved to DB' });
} catch (err) {
console.error('Error saving cart item:', err);
res.status(500).json({ error: 'Failed to save cart item' });
}
});

module.exports = router;
