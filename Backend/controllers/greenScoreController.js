const Cart = require("../models/cart");
const calculateGreenScore = require("../utils/greenScoreCalculator");
const Product = require("../models/product");

exports.getGreenScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Fetch product details for items in cart
    const productIds = cart.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const score = calculateGreenScore(products);
    res.json({ greenScore: score });
  } catch (error) {
    console.error("Green score error:", error);
    res.status(500).json({ message: "Server error calculating green score" });
  }
};
