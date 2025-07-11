const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// GET /api/products
router.get("/", async (req, res) => {
try {
const products = await Product.find({});
res.json(products); // includes _id
} catch (err) {
res.status(500).json({ error: "Failed to fetch products" });
}
});

module.exports = router;

