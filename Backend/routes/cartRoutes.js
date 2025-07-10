const express = require("express");
const router = express.Router();
const { addOrUpdateCart, getCart } = require("../controllers/cartController");

router.post("/", addOrUpdateCart);
router.get("/:userId", getCart);

module.exports = router;
