const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("monthlyTargets", postSchema);
