const express = require("express");
const router = express.Router();
const { getGreenScore } = require("../controllers/greenScoreController");

router.get("/:userId", getGreenScore);

module.exports = router;
