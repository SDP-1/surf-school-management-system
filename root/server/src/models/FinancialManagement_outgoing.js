const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  refId: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Store date as string
    default: () => new Date().toISOString().substring(0, 10), // Get date in YYYY-MM-DD format
  },
  time: {
    type: String, // Assuming time is stored as a string
    default: getTime, // Set default value to current time
  },
  details: {
    type: String,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  acceptBy: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
    requied: true,
  },
});

// Function to get current time in HH:MM format
function getTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Ensure two digits for hours
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Ensure two digits for minutes
  return `${hours}:${minutes}`;
}

module.exports = mongoose.model("outgoing", postSchema);
