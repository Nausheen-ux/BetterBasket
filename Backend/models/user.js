const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, default: "Anonymous" },
  email: String,
  preferences: {
    vegan: { type: Boolean, default: false },
    crueltyFree: { type: Boolean, default: false },
    local: { type: Boolean, default: false },
    ecoPackaging: { type: Boolean, default: false },
    openToNewBrands: { type: Boolean, default: false },
  },
  persona: String,
});

module.exports = mongoose.model("User", userSchema);
