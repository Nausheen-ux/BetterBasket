const Product = require("../models/product");
const User = require("../models/user");

// Recommendation logic: filter products based on user preferences
exports.getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const prefs = user.preferences;

    // Build query filter based on preferences
    const filters = {};

    if (prefs.vegan) filters["tags.isVegan"] = true;
    if (prefs.crueltyFree) filters["tags.isCrueltyFree"] = true;
    if (prefs.local) filters["tags.localScore"] = { $gte: 50 };
    if (prefs.ecoPackaging) filters["tags.packagingType"] = { $in: ["recyclable", "compostable"] };

    // Fetch products matching all filters (simple AND)
    const products = await Product.find(filters).limit(50);

    res.json(products);
  } catch (error) {
    console.error("Recommendations error:", error);
    res.status(500).json({ message: "Server error fetching recommendations" });
  }
};
