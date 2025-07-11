const Cart = require("../models/cart");

// Add or update cart items for a user
exports.addOrUpdateCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    if (!userId || !items) {
      return res.status(400).json({ message: "Missing userId or items" });
    }

    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = items;
    } else {
      cart = new Cart({ userId, items });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Cart update error:", error);
    res.status(500).json({ message: "Server error updating cart" });
  }
};

// Get current cart for user
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Server error fetching cart" });
  }
};
