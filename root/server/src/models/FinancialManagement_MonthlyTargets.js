const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

// Define a compound unique index for year, name, and month together
postSchema.index({ year: 1, name: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("MonthlyTarget", postSchema);
